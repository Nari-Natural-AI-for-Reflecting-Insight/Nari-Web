import { toast } from 'sonner';
import { TalkSessionStatus } from '@/features/talk/hooks/constants';
import useHandleTalkSession from '@/features/talk/hooks/useHandleTalkSession';
import BottomNavigation from '@/shared/components/BottomNavigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  userQueryKeys,
  userQueryOption,
} from '@/features/auth/apis/queryOption';
import CreditBox from '@/shared/components/CreditBox';
import { talkyQueryOption } from '@/features/talk/apis/queryOption';
import Dialog from '@/shared/components/Dialog';
import { useEffect, useState, useMemo } from 'react';
import CreditViewModal from '@/features/credit/components/CreditViewModal';
import TalkViewModal from '@/features/talk/components/TalkViewModal';
import Button from '@/shared/components/Button';
import usePayDailyCounselingMutation from '@/features/credit/hooks/usePayDailyCounselingMutation';
import { creditPayDailyCounselingResponse } from '@/features/credit/apis/type';

const Talk = () => {
  const queryClient = useQueryClient();
  const { data: userData } = useQuery(userQueryOption.all());
  const apiUrl = import.meta.env.VITE_RELAY_SERVER_URL;
  const { data: TalkTopActiveData } = useQuery(talkyQueryOption.topActive());
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isOpenCreditViewModal, setIsOpenCreditViewModal] =
    useState<boolean>(false);
  const [isOpenTalkViewModal, setIsOpenTalkViewModal] =
    useState<boolean>(false);
  const { mutateAsync: payDailyCounselingMutateAsync } =
    usePayDailyCounselingMutation();
  const [parentTalkId, setParentTalkId] = useState<number>(0);
  const newApiUrl = useMemo(
    () => `${apiUrl}?parentTalkId=${encodeURIComponent(parentTalkId)}`,
    [apiUrl, parentTalkId],
  );

  const { sessionStatus, connectTalkSession, disconnectTalkSession } =
    useHandleTalkSession(newApiUrl);

  const startTalk = async () => {
    if (sessionStatus !== TalkSessionStatus.Idle) {
      return;
    }

    if (!parentTalkId) {
      toast.error('이용권을 먼저 구매해주세요.');
      return;
    }
    connectTalkSession();
    toast.success('대화가 시작되었습니다.');
  };

  useEffect(() => {
    setIsOpenDialog(!TalkTopActiveData?.data.existsActiveTalk);
  }, [TalkTopActiveData]);

  const handleBuyDailyCounseling = async () => {
    try {
      const data: creditPayDailyCounselingResponse =
        await payDailyCounselingMutateAsync();
      toast.success('이용권이 정상적으로 구매되었습니다.');
      queryClient.invalidateQueries({ queryKey: { ...userQueryKeys.all() } });
      setParentTalkId(data.data.talkId);
    } catch {
      toast.error('문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center h-full justify-evenly px-9 pb-[108px]">
      <div className="flex flex-col w-full">
        <CreditBox
          className="self-end"
          credit={userData?.data.currentCreditAmount || 0}
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
          onClick={() => {
            setIsOpenTalkViewModal(true);
            startTalk();
          }}
          disabled={sessionStatus !== TalkSessionStatus.Idle}
        >
          대화하기
        </button>
        <p className="font-kbo text-[#C4C9C2] text-sm">
          <span className="underline">나리</span>를 탭하여 대화를 시작 해보세요
        </p>
        {/* <button className="text-white" onClick={handleBuyDailyCounseling}>
          임시 버튼
        </button> */}
      </div>

      <BottomNavigation />
      <Dialog
        open={isOpenDialog}
        onOpenChange={setIsOpenDialog}
        isPriority={true}
        title={
          (userData?.data.currentCreditAmount ?? 0) >= 1000
            ? '이용권을 구매하세요'
            : '크레딧이 부족해요'
        }
        description={
          (userData?.data.currentCreditAmount ?? 0) >= 1000
            ? '이용권을 구매하고 나리와 \n 대화를 진행해보세요!'
            : '크레딧을 충전하고 나리와 \n 대화를 진행해보세요!'
        }
        renderLeftButton={() => (
          <Button
            className="w-[150px] bg-[#FF7500] rounded-4xl h-12 text-white"
            onClick={
              (userData?.data.currentCreditAmount ?? 0) >= 1000
                ? handleBuyDailyCounseling
                : () => setIsOpenCreditViewModal(true)
            }
          >
            {(userData?.data.currentCreditAmount ?? 0) >= 1000
              ? '이용권 구매하기'
              : '크레딧 충전하기'}
          </Button>
        )}
        renderBottomButton={() => (
          <Button
            className="underline text-white text-sm"
            onClick={() => {
              setIsOpenDialog(false);
            }}
          >
            메인화면으로
          </Button>
        )}
      />
      <CreditViewModal
        open={isOpenCreditViewModal}
        onOpenChange={setIsOpenCreditViewModal}
      />
      <TalkViewModal
        sessionStatus={sessionStatus}
        disconnectTalkSession={disconnectTalkSession}
        open={isOpenTalkViewModal}
        onOpenChange={setIsOpenTalkViewModal}
      />
    </div>
  );
};

export default Talk;
