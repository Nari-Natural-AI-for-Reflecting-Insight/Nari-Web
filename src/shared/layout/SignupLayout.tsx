import { ReactNode } from 'react';

interface SignupLayoutProps {
  children: ReactNode;
  title: string;
  index: number;
}

const SignupLayout = ({ children, title, index }: SignupLayoutProps) => {
  return (
    <div className="w-full h-screen flex flex-col px-6 gap-11">
      <h1 className="font-kbo text-white text-2xl flex flex-col grow-2 whitespace-pre-line justify-end">
        <div className="flex gap-1 pb-9">
          <div
            className={`w-3 h-3 rounded-full ${index >= 0 && 'bg-[#FF7500]'}`}
          />
          <div
            className={`w-3 h-3 rounded-full ${index >= 1 ? 'bg-[#FF7500]' : 'bg-[#FF7500]/30'}`}
          />
        </div>
        {title}
      </h1>
      <div className="flex flex-col items-center grow-3 ">{children}</div>
    </div>
  );
};

export default SignupLayout;
