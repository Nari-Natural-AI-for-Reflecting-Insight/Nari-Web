import { MouseEventHandler } from 'react';

interface HeaderProps {
  onClick?: MouseEventHandler<HTMLImageElement>;
  title: string;
  hasBackIcon?: boolean;
}

const Header = ({ onClick, title, hasBackIcon = true }: HeaderProps) => {
  return (
    <header className="flex items-center h-16 w-full text-white font-kbo font-medium text-2xl pb-5 pt-7">
      <div className="w-1/3 flex justify-start pl-4">
        {hasBackIcon && (
          <img
            src="/icons/leftArrow.svg"
            alt="뒤로 가기"
            className="cursor-pointer w-4 h-auto"
            onClick={onClick}
          />
        )}
      </div>

      <div className="w-1/3 flex justify-center whitespace-nowrap">{title}</div>

      <div className="w-1/3 flex justify-end pr-4" />
    </header>
  );
};

export default Header;
