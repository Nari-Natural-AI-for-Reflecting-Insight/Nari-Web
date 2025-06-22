import { toast } from 'sonner';
import { TalkSessionStatus } from '@/features/talk/hooks/constants';
import useHandleTalkSession from '@/features/talk/hooks/useHandleTalkSession';

const Talk = () => {
  
  const apiUrl = import.meta.env.VITE_RELAY_SERVER_URL;
  const { sessionStatus, connectTalkSession, disconnectTalkSession  } = useHandleTalkSession(apiUrl);

  const startTalk = async () => {
    if (sessionStatus !== TalkSessionStatus.Idle) {
      return;
    }
    
    connectTalkSession();
    toast.success('대화가 시작되었습니다.');
  };

  const endTalk = async () => {
    if (sessionStatus !== TalkSessionStatus.Connected) {
      return;
    }

    disconnectTalkSession();
    toast.success('대화가 종료되었습니다.');
  }

  return (
    <div>
      <h1>Talk Page</h1>

      <button onClick={startTalk} disabled={sessionStatus !== TalkSessionStatus.Idle}> start </button>      
      <br/>
      <button onClick={endTalk} disabled={sessionStatus !== TalkSessionStatus.Connected}> stop </button>
    </div>
  );
};

export default Talk;