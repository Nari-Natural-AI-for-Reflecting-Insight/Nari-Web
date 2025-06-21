
import { useCallback, useRef } from 'react';
import { RealtimeUtils } from '@openai/realtime-api-beta';
import { ServerEvent } from './types';
import useTalkEventHandler from './useTalkEventHandler';

type UseRealtimeSocketProps = {
    apiUrl: string;
}

type DisconnectProps = {
  isError?: boolean;
};

const useRealtimeSocket = ({apiUrl}: UseRealtimeSocketProps) => {

  const token = localStorage.getItem('accessToken');
  const wsRef = useRef<WebSocket | null>(null);
  const talkEventHandler = useTalkEventHandler();

  const disconnect = useCallback(({isError = false}: DisconnectProps = {}) => {    
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    talkEventHandler.emit('close', { isError });
  }, [talkEventHandler]);

  const connect = useCallback(() => {    
    return new Promise<boolean>((resolve, reject) => {
      const ws = new WebSocket(apiUrl,
      [
        'realtime',
        'openai-beta.realtime-v1',
        `bearer.${token}`,
      ]);

      ws.onmessage = (event) => {
        const serverEvent = JSON.parse(event.data as string) as ServerEvent;
        talkEventHandler.emit(`server.${serverEvent.type}`, serverEvent);
        talkEventHandler.emit('server.*', serverEvent);
      }

      const errorHandler = () => {
        disconnect({ isError: true });
        reject(new Error('웹소켓 연결에 실패했습니다.'));
      };

      ws.addEventListener('error', errorHandler);

      ws.onopen = () => {
        resolve(true);
        ws.removeEventListener('error', errorHandler);
        ws.addEventListener('error', () => {
          disconnect({ isError: true });
        });

        ws.onclose = () => {
          disconnect();
        };
      }

      wsRef.current = ws;
  })}, [apiUrl, token, talkEventHandler, disconnect]);

  const send = useCallback(({eventType, data}: {eventType: string, data: unknown}) => {
    if (!wsRef.current) {
      throw new Error('웹소켓이 연결되지 않았습니다. 먼저 connect()를 호출하세요.');
    }

    data = data || {};
    if (!eventType || !data) {
      throw new Error('이벤트 타입과 데이터는 필수입니다.');
    }

    eventType = eventType.replace('client.', ''); 
    wsRef.current.send(JSON.stringify({ type: eventType, ...data, event_id: RealtimeUtils.generateId('evt_') }));
  }, []);

  return { connect, disconnect, send };
}

export default useRealtimeSocket;