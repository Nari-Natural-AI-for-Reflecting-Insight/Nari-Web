import { ComponentProps, ReactNode } from 'react';
import { cn } from '../libs/cn';

interface BottomFixedLayoutProps extends ComponentProps<'div'> {
  children: ReactNode;
  renderBottom: () => ReactNode;
}

const BottomFixedLayout = ({
  children,
  renderBottom,
  className,
}: BottomFixedLayoutProps) => {
  return (
    <div className="w-full h-dvh flex flex-col relative">
      <div
        className={cn('flex flex-col justify-center grow-2 px-8', className)}
      >
        {children}
      </div>
      <footer className="flex w-full flex-col items-center justify-center grow-2 z-99">
        {renderBottom()}
      </footer>
    </div>
  );
};

export default BottomFixedLayout;
