import {
  userQueryKeys,
  userQueryOption,
} from '@/features/auth/apis/queryOption';
import { creditPayDailyCounselingResponse } from '@/features/credit/apis/type';
import usePayDailyCounselingMutation from '@/features/credit/hooks/usePayDailyCounselingMutation';
import Button from '@/shared/components/Button';
import Header from '@/shared/components/Header';
import BottomFixedLayout from '@/shared/layout/BottomFixedLayout';
import * as RadixDialog from '@radix-ui/react-dialog';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

type BuyTicketViewModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const BuyTicketViewModal = ({
  open,
  onOpenChange,
}: BuyTicketViewModalProps) => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(1);
  const { data: userData } = useQuery(userQueryOption.all());
  const { mutateAsync: payDailyCounselingMutateAsync } =
    usePayDailyCounselingMutation();

  const handleBuyDailyCounseling = async () => {
    try {
      const data: creditPayDailyCounselingResponse =
        await payDailyCounselingMutateAsync();
      toast.success('이용권이 정상적으로 구매되었습니다.');
      queryClient.invalidateQueries({ queryKey: { ...userQueryKeys.all() } });
      localStorage.setItem('talk_id', String(data.data.talkId));
    } catch {
      toast.error('문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <>
      <RadixDialog.Root modal open={open} onOpenChange={onOpenChange}>
        <RadixDialog.Portal>
          <RadixDialog.Content className="max-w-md bg-[#161820] fixed left-1/2 top-0 -translate-x-1/2 h-full w-full text-white flex flex-col items-center">
            <Header
              title="충전하기"
              onClick={() => {
                onOpenChange(false);
              }}
            />
            <BottomFixedLayout
              renderBottom={() => {
                return (
                  <Button onClick={() => handleBuyDailyCounseling()}>
                    충전하기
                  </Button>
                );
              }}
            >
              <>
                <div className="grow-1 pt-5">
                  <div className="flex items-center justify-between w-full rounded-2xl bg-[#22252E] px-8 py-6">
                    <p className="text-base">
                      NARI티켓
                      <span className="text-sm text-[#F1FAEE]">(장)</span>
                    </p>
                    <div className="flex items-center">
                      <button
                        className="rounded-full text-[#FF7500] bg-[#484C5C] w-6 h-auto"
                        onClick={() => setValue(Math.max(1, value - 1))}
                      >
                        -
                      </button>
                      <div className="text-5xl font-bagel text-[#F1FAEE] w-20 text-center">
                        {value}
                      </div>
                      <button
                        className="rounded-full text-[#FF7500] bg-[#484C5C] w-6 h-auto"
                        onClick={() => setValue(value + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="font-kbo">
                  <p className="flex items-center text-[#F1FAEE] justify-between py-3">
                    차감 크레딧
                    <span className="text-5xl">
                      {value * 1000}
                      <span className="text-xl text-[#8A8A8A]">
                        /{userData?.data.currentCreditAmount} Credit
                      </span>
                    </span>
                  </p>
                  <hr className="text-[#FF7500] border-1" />
                  <span className="text-xs flex justify-end py-5 text-[#D9D9D9]">
                    *티켓1장당 1000크레딧이 차감됩니다.
                  </span>
                </div>
              </>
            </BottomFixedLayout>
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    </>
  );
};

export default BuyTicketViewModal;
