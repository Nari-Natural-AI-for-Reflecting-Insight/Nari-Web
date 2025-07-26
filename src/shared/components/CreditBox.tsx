import { ComponentProps } from 'react';
import { cn } from '../libs/cn';

interface CreditBoxProps extends ComponentProps<'div'> {
  credit: number;
}

const CreditBox = ({ credit, className }: CreditBoxProps) => {
  return (
    <div
      className={cn(
        'text-white max-w-[88px] w-full h-9 rounded-4xl bg-[#22252E] flex justify-around items-center',
        className,
      )}
    >
      <img src="public/icons/dollar.svg" className="w-6 h-auto" />
      <span>{credit}</span>
    </div>
  );
};

export default CreditBox;
