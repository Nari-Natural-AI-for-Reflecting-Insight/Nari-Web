import { MouseEventHandler } from 'react';

interface HeaderProps {
  onClick: MouseEventHandler<HTMLImageElement>;
  title: string;
}

const Header = ({ onClick, title }: HeaderProps) => {
  return (
    <header className="flex items-center h-16 w-full text-white font-kbo text-2xl">
      <div className="w-1/3 flex justify-start pl-4">
        <img
          src="/icons/leftArrow.svg"
          alt="뒤로 가기"
          className="cursor-pointer w-3 h-auto"
          onClick={onClick}
        />
      </div>

      <div className="w-1/3 flex justify-center">{title}</div>

      <div className="w-1/3 flex justify-end pr-4" />
    </header>
  );
};

export default Header;
