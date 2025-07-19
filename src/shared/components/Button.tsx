import { ComponentPropsWithRef, MouseEventHandler, ReactNode } from 'react';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, onClick, ...restProps }: ButtonProps) => {
  return (
    <button
      className="rounded-4xl max-w-60 h-14 w-full text-2xl text-white bg-gradient-to-r from-[#FFA62B] to-[#FF7500]"
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
