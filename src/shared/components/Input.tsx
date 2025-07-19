import { ComponentProps } from 'react';
import { cn } from '../libs/cn';

const Input = ({ className, type, ...props }: ComponentProps<'input'>) => {
  return (
    <input
      className={cn(
        'bg-[#22252E] max-w-[371px] w-full h-14 text-[#AAAAAA] rounded-4xl px-6 py-3 outline-none focus:border-[#FF7500] border border-[#22252E] focus:bg-[#824427] focus:text-white',
        className,
      )}
      inputMode="text"
      type={type}
      {...props}
    />
  );
};

export default Input;
