import { ReactNode } from 'react';

interface SignupLayoutProps {
  children: ReactNode;
  title: string;
  index: number;
}

const SignupLayout = ({ children, title, index }: SignupLayoutProps) => {
  return (
    <div>
      <div className="flex gap-1 pb-9">
        <div
          className={`w-3 h-3 rounded-full ${index >= 0 && 'bg-[#FF7500]'}`}
        />
        <div
          className={`w-3 h-3 rounded-full ${index >= 1 ? 'bg-[#FF7500]' : 'bg-[#FF7500]/30'}`}
        />
      </div>
      <h1 className="font-kbo text-white text-2xl whitespace-pre-line">
        {title}
      </h1>
      <div className="pt-9 w-full flex flex-col items-center">{children}</div>
    </div>
  );
};

export default SignupLayout;
