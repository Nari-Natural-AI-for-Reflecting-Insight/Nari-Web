import * as RadioGroup from '@radix-ui/react-radio-group';

export type CreditBoxType = {
  quantity: number;
  price: number;
  value: string;
};

const CreditBox = ({ quantity, price, value }: CreditBoxType) => {
  return (
    <RadioGroup.Item
      value={value}
      className="w-full rounded-2xl h-[83px] p-6 bg-[#22252E] flex items-center justify-between cursor-pointer data-[state=checked]:ring-2 data-[state=checked]:ring-[#FF7500] data-[state=checked]:bg-[#824427]"
    >
      <p className="flex items-end gap-1">
        <span className="font-bagel text-5xl">{quantity}</span>
        <span className="text-lg text-[#8A8A8A]">Credit</span>
      </p>
      <p className="flex items-end gap-1 pt-2">
        <span className="text-2xl">{price.toLocaleString()}</span>
        <span className="text-sm">KRW</span>
      </p>
    </RadioGroup.Item>
  );
};

export default CreditBox;
