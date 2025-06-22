
import { useCallback } from 'react';
import { RealtimeUtils } from '@/shared/utils/RealtimeUtils';
import { AudioTransactionModel, ClientEventType, ItemStatus, ServerEventType, TalkEventType, TurnDetectionType } from './constants';
import { ConversationEventType, useRealtimeConversation } from './useRealtimeConversation';
import useRealtimeSocket from './useRealtimeSocket';
import useTalkEventHandler from './useTalkEventHandler';

type UseHandleRealtimeAPIProps = {
    apiUrl: string;
    sampleRate: number;
};

const defaultSessionConfig = {
  modalities: ['text', 'audio'],
  instructions: '',
  voice: 'verse',
  input_audio_format: 'pcm16',
  output_audio_format: 'pcm16',
  input_audio_transcription: null,
  turn_detection: null,
  tools: [],
  tool_choice: 'auto',
  temperature: 0.8,
  max_response_output_tokens: 4096,
};

const useHandleRealtimeAPI = ({ apiUrl, sampleRate }:UseHandleRealtimeAPIProps) => {

  const { connect, disconnect, send } = useRealtimeSocket({ apiUrl }); 

  const realtimeConversation = useRealtimeConversation({sampleRate});

  const handler = useCallback((event: unknown, ...args: unknown[]) => {
    const { item, delta } = realtimeConversation.processEvent(event as ConversationEventType, ...args);

    return { item, delta };
  }, [realtimeConversation]);

  const talkEventHandler = useTalkEventHandler();

  const handlerWithDispatch = useCallback((event: unknown, ...args: unknown[]) => {
    const { item, delta } = handler(event, ...args);

    if(item) {
      talkEventHandler.emit(TalkEventType.TalkUpdated, { item, delta });
    }
    
    return { item, delta };
  },[handler, talkEventHandler]);

  const initEventListener = useCallback(() => {
    talkEventHandler.on(ServerEventType.ResponseCreated, handler);
    talkEventHandler.on(ServerEventType.ResponseOutputItemAdded, handler);
    talkEventHandler.on(ServerEventType.ResponseContentPartAdded, handler);

    talkEventHandler.on(ServerEventType.InputAudioBufferSpeechStarted, (event) => {
      handler(event);
      talkEventHandler.emit(TalkEventType.TalkInterrupted, null); 
    });

    talkEventHandler.on(ServerEventType.ConversationItemCreated, (event) => {
      const { item } = handlerWithDispatch(event);
      talkEventHandler.emit(TalkEventType.TalkItemAppended, { item });

      if (item && item.status === ItemStatus.Completed) {
        talkEventHandler.emit(TalkEventType.TalkItemCompleted, { item });
      }
    });

    talkEventHandler.on(ServerEventType.ConversationItemTruncated, handlerWithDispatch);
    talkEventHandler.on(ServerEventType.ConversationItemDeleted, handlerWithDispatch);
    talkEventHandler.on(
      ServerEventType.ConversationItemInputAudioTranscriptionDone,
      handlerWithDispatch,
    );
    talkEventHandler.on(ServerEventType.ResponseAudioTranscriptDelta, handlerWithDispatch);
    talkEventHandler.on(ServerEventType.ResponseAudioDelta, handlerWithDispatch);
    talkEventHandler.on(ServerEventType.ResponseTextDelta, handlerWithDispatch);
    talkEventHandler.on(
      ServerEventType.ResponseFunctionCallArgumentsDelta,
      handlerWithDispatch,
    );

    talkEventHandler.on(ServerEventType.ResponseOutputItemDone, async (event) => {
      const { item } = handlerWithDispatch(event);
      if (item && item.status === ItemStatus.Completed) {
        talkEventHandler.emit(TalkEventType.TalkItemCompleted, { item });
      }
    });
  }, [talkEventHandler, handler, handlerWithDispatch]);

  const connectRealtime = useCallback(async () => {
    initEventListener();
    await connect();
  }, [initEventListener, connect]); 

  const disconnectRealtime = useCallback(() => {
    realtimeConversation.clear();
    talkEventHandler.all.clear();
    disconnect();
  }, [disconnect, realtimeConversation, talkEventHandler]);

  const appendInputAudio = useCallback((arrayBuffer: Int16Array|ArrayBuffer) => {
    if (!arrayBuffer) {
      throw new Error('오디오 데이터가 없습니다.');
    }

    send({
      eventType: ClientEventType.InputAudioBufferAppend,
      data: { audio:  RealtimeUtils.arrayBufferToBase64(arrayBuffer) },
    });

  }, [send]);

  const initTalkSession = useCallback(() => {
      const session = {
        ...defaultSessionConfig,
        turn_detection: { type: TurnDetectionType.ServerVad },
        input_audio_transcription: { model: AudioTransactionModel.Whisper1 },
      };

      send({
        eventType: ClientEventType.SessionUpdated,
        data: { session },
      });
      
    }, [send],
  );

  const cancelResponse = useCallback((trackId: string, sampleCount: number) => {

    if (!trackId) {
      send({eventType: ClientEventType.ResponseCancel, data: {}});
      return { item: null};
    }

    const item = realtimeConversation.getItem(trackId);

    if(!item) {
      throw new Error('존재 하지 않는 트랙 ID입니다: ' + trackId);
    }

    if( item.type !== 'message') {
      throw new Error(`아이템 타입이 메시지가 아닙니다: ${item.type}`);
    } else if (item.role !== 'assistant') {
      throw new Error(`아이템의 역할이 어시스턴트가 아닙니다: ${item.role}`);
    }

    send({
      eventType: ClientEventType.ResponseCancel,
      data: {},
    });

    const audioIndex = item.content.findIndex((c) => c.type === 'audio');
    if (audioIndex === -1) {
      throw new Error(`아이템에 오디오 콘텐츠가 없습니다: ${trackId}`);
    }

    send({
      eventType: ClientEventType.ConversationItemTruncate, 
      data: {
        item_id: trackId,
        content_index: audioIndex,
        audio_end_ms: Math.floor((sampleCount / 24_000) * 1000)
      }
    });
  }, [realtimeConversation, send]);

  return { connectRealtime, disconnectRealtime, appendInputAudio, initTalkSession, cancelResponse };
}

export default useHandleRealtimeAPI;
