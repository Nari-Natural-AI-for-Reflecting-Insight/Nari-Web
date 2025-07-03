import { Dispatch, SetStateAction } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import Header from '@/shared/components/Header';

type PersonalInfoModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const PersonalInfoModal = ({ open, onOpenChange }: PersonalInfoModalProps) => {
  return (
    <RadixDialog.Root modal open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Content className="max-w-md bg-[#161820] fixed left-1/2 top-0 -translate-x-1/2 h-full w-full text-white px-3 flex flex-col gap-15">
          <Header title="개인 정보" onClick={() => onOpenChange(false)} />
          <div className="flex flex-col gap-7 relative h-full items-center">
            <div className="flex flex-col gap-2 w-full">
              <p className="pl-2">로그인 정보</p>
              <div className=" bg-[#22252E] rounded-2xl">
                <p className="flex items-center h-14 gap-14 px-6">
                  <span>이메일</span>
                  <span>nari-00@gmail.com</span>
                </p>
                <hr className="mx-4 border-[#484C5C]" />
                <p className="flex items-center h-14 gap-10 px-6">
                  <span>비밀번호</span>
                  <span>a********</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <p className="pl-2">개인 추가 정보</p>
              <div className=" bg-[#22252E] rounded-2xl">
                <p className="flex items-center h-14 gap-14 px-6">
                  <span>성</span>
                  <span>김</span>
                </p>
                <hr className="mx-4 border-[#484C5C]" />
                <p className="flex items-center h-14 gap-10 px-6">
                  <span>이름</span>
                  <span>나리</span>
                </p>
                <hr className="mx-4 border-[#484C5C]" />
                <p className="flex items-center h-14 gap-10 px-6">
                  <span>생년월일</span>
                  <span>1999/09/09</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <p className="pl-2">언어 설정</p>
              <div className=" bg-[#22252E] rounded-2xl">
                <p className="flex items-center h-14 justify-between px-6">
                  <span>한국어</span>
                  <span>&gt;</span>
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="text-white rounded-4xl bg-amber-500 w-64 text-2xl cursor-pointer h-14 mt-13"
            >
              저장 하기
            </button>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default PersonalInfoModal;
