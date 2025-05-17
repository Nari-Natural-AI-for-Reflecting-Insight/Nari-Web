import { ComponentPropsWithRef, MouseEventHandler, ReactNode } from 'react';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="border rounded-md border-gray-200 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
