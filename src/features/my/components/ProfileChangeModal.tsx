import { Dispatch, SetStateAction } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import Header from '@/shared/components/Header';
import { userQueryOption } from '@/features/auth/apis/queryOption';
import { useQuery } from '@tanstack/react-query';

type ProfileChangeModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const ProfileChangeModal = ({
  open,
  onOpenChange,
}: ProfileChangeModalProps) => {
  const { data } = useQuery(userQueryOption.all());

  return (
    <RadixDialog.Root modal open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Content className="max-w-md bg-[#161820] fixed left-1/2 top-0 -translate-x-1/2 h-full w-full text-white px-3">
          <Header onClick={() => onOpenChange(false)} title="프로필 설정" />
          <div className="w-full h-screen flex flex-col items-center">
            <section className="flex flex-col grow-1 justify-center items-center w-full gap-6">
              <p className="pr-50">프로필 설정하기</p>
              <div className="flex flex-col gap-5">
                <div className="flex items-center w-full">
                  <div className="w-[96px] h-[96px] rounded-full bg-amber-200" />
                  <p className="pl-8 text-2xl font-medium">
                    {data?.data.nickname}
                  </p>
                </div>
                <form className="flex relative w-[280px] h-[34px]">
                  <input
                    placeholder="닉네임 변경하기"
                    className="border-b focus:outline-none w-full border-[#60554F]"
                  />
                  <button
                    type="submit"
                    className="text-xs underline text-[#AAAAAA]/[0.6] absolute right-0 bottom-2"
                  >
                    변경하기
                  </button>
                </form>
              </div>
            </section>

            <section className="grow-2">
              <p>나리 캐릭터 고르기</p>
              <div className="flex items-center justify-around gap-6">
                <p>&lt;</p>
                <img
                  className="w-[250px] h-[250px]"
                  src="public/images/nari-standard.svg"
                />
                <p>&gt;</p>
              </div>
            </section>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default ProfileChangeModal;
