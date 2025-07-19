import { ComponentProps, useState } from 'react';
import Input from './Input';

const PasswordInput = ({
  className,
  type,
  ...props
}: ComponentProps<'input'>) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full flex justify-center">
      <Input
        type={visible ? 'text' : 'password'}
        className={className}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-9 top-4.5"
      >
        {visible ? (
          <img className="w-5 h-5" src="public/icons/show.svg" />
        ) : (
          <img className="w-5 h-5" src="public/icons/hide.svg" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
