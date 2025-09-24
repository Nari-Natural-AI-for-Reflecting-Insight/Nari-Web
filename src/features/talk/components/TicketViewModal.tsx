import { Dispatch, SetStateAction, useState } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import Header from '@/shared/components/Header';
import BuyTicketViewModal from './BuyTicketViewModal';
import { userQueryOption } from '@/features/auth/apis/queryOption';
import { useQuery } from '@tanstack/react-query';

type TicketViewModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const TicketViewModal = ({ open, onOpenChange }: TicketViewModalProps) => {
  const { data: userData } = useQuery(userQueryOption.all());
  const [isOpenBuyTicketViewModal, setIsOpenBuyTicketViewModal] =
    useState<boolean>(false);
  return (
    <>
      <RadixDialog.Root modal open={open} onOpenChange={onOpenChange}>
        <RadixDialog.Portal>
          <RadixDialog.Content className="max-w-md bg-[#161820] fixed left-1/2 top-0 -translate-x-1/2 h-full w-full text-white flex flex-col items-center">
            <Header
              title="티켓 내역"
              onClick={() => {
                onOpenChange(false);
              }}
            />
            <div className="bg-[#22252E] h-[293px] font-light font-kbo rounded-2xl w-[calc(100%-2rem)] p-6 flex flex-col my-6">
              <div className="flex gap-4 items-center">
                <span>NARI 티켓 내역</span>
                <button
                  className="rounded-3xl bg-[#75768A] text-white
                w-[63px] h-9 "
                >
                  조회
                </button>
              </div>
              <div className="flex relative h-36">
                <p className="font-bagel text-7xl flex gap-3 items-end">
                  2<span className="font-kbo text-base text-[#8A8A8A]">장</span>
                </p>
                <img
                  src="public/images/subtract.png"
                  className="h-24 absolute z-10 right-17 bottom-0"
                />
                <img
                  src="public/images/nari-standard.svg"
                  className="h-36 absolute z-11 right-0 bottom-0"
                />
              </div>
              <hr className="border text-[#484C5C] my-6" />
              <div className="flex justify-between items-start">
                <span>내 크레딧</span>
                <p className="text-[#F1FAEE] text-4xl font-medium flex gap-2 items-end">
                  {userData?.data.currentCreditAmount}
                  <span className="text-[#8A8A8A] text-base font-light">
                    Credit
                  </span>
                </p>
              </div>
            </div>
            <div className="w-[calc(100%-4rem)]">
              <span className="">티켓 충전하기</span>
              <div className="flex gap-6 py-5">
                <button
                  className="bg-[#22252E] w-full h-32 rounded-2xl text-white text-sm flex flex-col items-center justify-center gap-1"
                  onClick={() => setIsOpenBuyTicketViewModal(true)}
                >
                  <img src="public/images/subtract.png" className="h-12" />
                  <span>충전하기</span>
                </button>
                <button className="bg-[#22252E] w-full h-32 rounded-2xl text-white text-sm flex flex-col items-center justify-center gap-1">
                  <img src="public/images/subtract.png" className="h-12" />
                  <span>자동충전</span>
                </button>
                <button className="bg-[#22252E] w-full h-32 rounded-2xl text-white text-sm flex flex-col items-center justify-center gap-1">
                  <img src="public/images/subtract.png" className="h-12" />
                  <span>환불하기</span>
                </button>
              </div>
            </div>
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
      <BuyTicketViewModal
        open={isOpenBuyTicketViewModal}
        onOpenChange={setIsOpenBuyTicketViewModal}
      />
    </>
  );
};

export default TicketViewModal;
