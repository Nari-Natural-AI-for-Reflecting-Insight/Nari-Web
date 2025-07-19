import { ReactNode } from 'react';

interface BottomFixedLayoutProps {
  children: ReactNode;
  renderBottom: () => ReactNode;
}

const BottomFixedLayout = ({
  children,
  renderBottom,
}: BottomFixedLayoutProps) => {
  return (
    <div className="w-full h-dvh flex flex-col relative">
      <div className="flex flex-col justify-center grow-2 px-8">{children}</div>
      <footer className="flex w-full flex-col items-center justify-center grow-1 z-99">
        {renderBottom()}
      </footer>
    </div>
  );
};

export default BottomFixedLayout;
