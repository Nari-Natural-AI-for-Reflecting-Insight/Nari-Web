import { Dispatch, SetStateAction, useState } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';
import Header from '@/shared/components/Header';
import CreditBox from './CreditBox';
import BottomFixedLayout from '@/shared/layout/BottomFixedLayout';
import useChargeCreditForOpsMutation from '../hooks/useChargeCreditForOpsMutation';
import { useQuery } from '@tanstack/react-query';
import { userQueryOption } from '@/features/auth/apis/queryOption';

type CreditViewModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const CreditViewModal = ({ open, onOpenChange }: CreditViewModalProps) => {
  const [selected, setSelected] = useState<string>('');
  const { mutate: chargeCreditForOpsMutate } = useChargeCreditForOpsMutation();
  const { data: userData } = useQuery(userQueryOption.all());

  const creditPrices = [
    { quantity: 100, price: 5000 },
    { quantity: 300, price: 15000 },
    { quantity: 600, price: 25000 },
    { quantity: 1200, price: 40000 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;

    chargeCreditForOpsMutate({
      email: userData?.data.email ?? '',
      creditAmount: Number(selected),
      creditOperationReason: 'OPS_CREDIT_FOR_TEST',
    });
  };

  return (
    <RadixDialog.Root modal open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Content className="max-w-md bg-[#161820] fixed left-1/2 top-0 -translate-x-1/2 h-full w-full text-white">
          <Header title="크레딧 조회" onClick={() => onOpenChange(false)} />
          <form onSubmit={handleSubmit}>
            <BottomFixedLayout
              renderBottom={() => {
                return (
                  <button className="text-white rounded-4xl bg-[#FF7500] w-64 text-2xl h-14">
                    결제하기
                  </button>
                );
              }}
            >
              <div className="grow-1">
                <p className="font-kbo pb-3">NARI크레딧</p>
                <div className="w-full rounded-2xl h-[83px] p-6 bg-[#22252E] flex items-center justify-between">
                  <p className="flex items-end gap-1">
                    <span className="font-bagel text-5xl">
                      {userData?.data.currentCreditAmount}
                    </span>
                    <span className="text-lg text-[#8A8A8A]">Credit</span>
                  </p>
                  <button className="bg-[#75768A] text-lg h-9 w-[93px] rounded-2xl">
                    내역 조회
                  </button>
                </div>
              </div>
              <div className="grow-10">
                <p className="font-kbo pb-3">크레딧 충전하기</p>
                <RadioGroup.Root
                  className="flex flex-col gap-3"
                  value={selected}
                  onValueChange={setSelected}
                >
                  {creditPrices.map(({ quantity, price }) => (
                    <CreditBox
                      key={quantity}
                      quantity={quantity}
                      price={price}
                      value={String(quantity)}
                    />
                  ))}
                </RadioGroup.Root>
              </div>
            </BottomFixedLayout>
          </form>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default CreditViewModal;
