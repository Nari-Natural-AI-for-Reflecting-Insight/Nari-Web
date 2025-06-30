import { Dispatch, SetStateAction } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import useDeleteAccountMutation from '@/features/my/hooks/useDeleteAccountMutation';

type DeleteAccountModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const DeleteAccountModal = ({
  open,
  onOpenChange,
}: DeleteAccountModalProps) => {
  const { mutate: deleteAccountMutate } = useDeleteAccountMutation();

  return (
    <RadixDialog.Root modal open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Content className="max-w-md bg-[#161820] fixed left-1/2 top-0 -translate-x-1/2 h-full w-full">
          <header className="flex text-white font-kbo text-2xl items-center h-15 justify-center">
            <h1 className="">회원 탈퇴</h1>
          </header>
          <div className="text-white flex flex-col items-center h-full ">
            <div className="grow-1 flex flex-col justify-end gap-5">
              <img
                className="w-[250px] h-[250px]"
                src="public/images/nari-sad.svg"
                alt="talk"
              />
              <p className="font-kbo text-2xl">탈퇴하기 전에 확인하세요!</p>
              <p className="font-kbo text-center text-sm">
                탈퇴를 하게되면 기존 기록이 다 사라져요.
                <br /> 정말로 탈퇴 하시겠습니까?
              </p>
            </div>

            <div className="flex flex-col grow-2 justify-center gap-12">
              <button
                className="text-2xl cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                유지하기
              </button>
              <button
                className="underline text-xs cursor-pointer"
                onClick={() => {
                  deleteAccountMutate();
                }}
              >
                회원 탈퇴하기
              </button>
            </div>
          </div>
        </RadixDialog.Content>
        <RadixDialog.Close />
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default DeleteAccountModal;
