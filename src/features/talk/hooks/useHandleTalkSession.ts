import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import { WavRecorder, WavStreamPlayer } from 'wavtools';
import { TalkUpdatedEvent } from '@/features/talk/hooks/types';
import { TalkEventType, TalkSessionStatus } from './constants';
import useRealtimeClient from './useRealtimeClient';
import useTalkEventHandler from './useTalkEventHandler';

const useHandleTalkSession = (apiUrl: string) => {

  const recRef = useRef<WavRecorder>(new WavRecorder({ sampleRate: 24000 }));
  const playerRef = useRef<WavStreamPlayer>(new WavStreamPlayer({ sampleRate: 24000 }));
  const [sessionStatus, setSessionStatus] = useState<TalkSessionStatus>(TalkSessionStatus.Idle);
  const connectedRef = useRef(false);
  const client = useRealtimeClient({ apiUrl });
  const talkEventHandler = useTalkEventHandler();

  const disconnectTalkSession = useCallback(async () => {

    if (!connectedRef.current) {
        return;
    }

    client.disconnectRealtime();
    await recRef.current.end();
    playerRef.current.interrupt();

    setSessionStatus(TalkSessionStatus.Idle);
    connectedRef.current = false;
  }, [client]);

  const connectTalkSession = useCallback(async () => {
    if (connectedRef.current) {return;}
    connectedRef.current = true;
    setSessionStatus(TalkSessionStatus.Connecting);

    const rec = recRef.current;
    const player = playerRef.current;
    
    try {
      await rec.begin();
      await player.connect();
      
      await client.connectRealtime();
      client.initTalkSession();
      
      rec.record((d) => client.appendInputAudio(d.mono));

      talkEventHandler.on(TalkEventType.TalkUpdated, ({item, delta}: TalkUpdatedEvent) => {
        if (delta?.audio) {
          player.add16BitPCM(delta.audio, item.id);
        }
      });

      talkEventHandler.on(TalkEventType.TalkInterrupted, async () => {
        const trackSampleOffset = player.interrupt();
        if (trackSampleOffset?.trackId) {
          const { trackId, offset } = trackSampleOffset;
          client.cancelResponse(trackId, offset);
        }
      });

      setSessionStatus(TalkSessionStatus.Connected);
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : '연결에 실패했습니다. 다음에 다시 시도해주세요.'
      );

      disconnectTalkSession();
    }
    
  }, [client, disconnectTalkSession, talkEventHandler]);

  return {
    sessionStatus,
    connectTalkSession,
    disconnectTalkSession
  }
}

export default useHandleTalkSession;