import { Dispatch, SetStateAction, useState } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import Dialog from '@/shared/components/Dialog';
import Button from '@/shared/components/Button';
import { TalkSessionStatus } from '../hooks/constants';
import { toast } from 'sonner';

type talkViewModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  sessionStatus: TalkSessionStatus;
  disconnectTalkSession: () => Promise<void>;
};

const TalkViewModal = ({
  open,
  onOpenChange,
  sessionStatus,
  disconnectTalkSession,
}: talkViewModalProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}.${month}.${day}`;

  const endTalk = async () => {
    if (sessionStatus !== TalkSessionStatus.Connected) {
      return;
    }

    disconnectTalkSession();
    toast.success('대화가 종료되었습니다.');
  };

  return (
    <>
      <RadixDialog.Root modal open={open} onOpenChange={onOpenChange}>
        <RadixDialog.Portal>
          <RadixDialog.Content className="max-w-md bg-[#161820] fixed left-1/2 top-0 -translate-x-1/2 h-full w-full text-white flex flex-col items-center">
            <RadixDialog.Title className="text-2xl py-3 grow-1">
              {formattedDate}
            </RadixDialog.Title>
            <div className="grow-2">
              <img src="public/images/nari_talk.svg" />
            </div>
            <div className="bg-gray-200 rounded-full mb-20 transition-all duration-300 ease-out" />
            <footer className="absolute bottom-5 right-5">
              <button
                className="w-14 h-14 rounded-full bg-[#22252E] flex justify-center items-center"
                onClick={() => setIsOpenDialog(true)}
              >
                X
              </button>
            </footer>
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
      <Dialog
        open={isOpenDialog}
        onOpenChange={setIsOpenDialog}
        title="앗! 아직 대화가 끝나지 않았어요!"
        description={
          '나리와 대화를 중간에 종료하시려면 \n 하단 버튼을 눌러주세요.'
        }
        renderLeftButton={() => (
          <Button className="w-full bg-[#FF7500] rounded-4xl h-12 text-white">
            대화 저장하기
          </Button>
        )}
        renderRightButton={() => (
          <Button
            onClick={() => {
              endTalk();
              onOpenChange(false);
              setIsOpenDialog(false);
            }}
            className="w-full bg-[#75768A] rounded-4xl h-12 text-white"
          >
            나가기
          </Button>
        )}
        renderBottomButton={() => (
          <p className="text-sm text-white">
            [나가기]버튼을 누르면 대화내용은 저장되지 않습니다.
          </p>
        )}
      />
    </>
  );
};

export default TalkViewModal;
