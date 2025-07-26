import { toast } from 'sonner';
import { TalkSessionStatus } from '@/features/talk/hooks/constants';
import useHandleTalkSession from '@/features/talk/hooks/useHandleTalkSession';
import BottomNavigation from '@/shared/components/BottomNavigation';
import { useQuery } from '@tanstack/react-query';
import { userQueryOption } from '@/features/auth/apis/queryOption';
import CreditBox from '@/shared/components/CreditBox';

const Talk = () => {
  const { data } = useQuery(userQueryOption.all());
  const apiUrl = import.meta.env.VITE_RELAY_SERVER_URL;

  // Todo : 크레딧 충전 후 -> 일일권 결제 후 -> talkId
  const parentTalkId = 20;
  const newApiUrl = `${apiUrl}?parentTalkId=${encodeURIComponent(parentTalkId)}`;

  const { sessionStatus, connectTalkSession, disconnectTalkSession } =
    useHandleTalkSession(newApiUrl);

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
  };

  return (
    <div className="flex flex-col items-center h-full justify-evenly px-9 pb-[108px]">
      <div className="flex flex-col w-full">
        <CreditBox
          className="self-end"
          credit={data?.data.currentCreditAmount || 0}
        />
        <h1 className="font-mochiy text-4xl text-white text-start w-full">
          Welcome!
          <br />
          <span className="font-kbo">my_nari</span>
        </h1>
      </div>
      <div className="max-w-[244px] w-full h-[334px] bg-[url('public/images/nari-standard.svg')] bg-no-repeat bg-contain" />
      <div className="flex flex-col items-center">
        <button
          className="text-white font-kbo text-2xl"
          onClick={startTalk}
          disabled={sessionStatus !== TalkSessionStatus.Idle}
        >
          대화하기
        </button>
        <button
          onClick={endTalk}
          disabled={sessionStatus !== TalkSessionStatus.Connected}
        >
          {' '}
          stop{' '}
        </button>
        <p className="font-kbo text-[#C4C9C2] text-sm">
          <span className="underline">나리</span>를 탭하여 대화를 시작 해보세요
        </p>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Talk;
