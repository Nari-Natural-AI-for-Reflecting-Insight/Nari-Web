import { Dispatch, ReactNode, SetStateAction } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';

interface DialogProps {
  title?: string;
  description?: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  renderRightButton?: () => ReactNode;
  renderLeftButton?: () => ReactNode;
  renderBottomButton?: () => ReactNode;
  isPriority?: boolean;
}

const Dialog = ({
  title,
  description,
  open,
  onOpenChange,
  renderRightButton,
  renderLeftButton,
  renderBottomButton,
  isPriority,
}: DialogProps) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/40" />
        <RadixDialog.Content className="fixed left-1/2 top-1/2 max-h-[276vh] w-full max-w-[345px] -translate-x-1/2 -translate-y-1/2 rounded-4xl p-[25px] bg-[rgba(64,65,70,0.5)] backdrop-blur-[10px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col items-center gap-4">
          <RadixDialog.Title className="text-xl font-kbo text-white flex gap-2.5">
            {isPriority && (
              <img src="public/icons/priority.svg" className="w-8 h-auto" />
            )}
            {title}
          </RadixDialog.Title>
          <RadixDialog.Description className="text-white text-sm whitespace-pre-line text-center">
            {description}
          </RadixDialog.Description>
          <div className="flex justify-evenly gap-4 w-full">
            {renderLeftButton && renderLeftButton()}
            {renderRightButton && renderRightButton()}
          </div>
          <div>{renderBottomButton && renderBottomButton()}</div>
        </RadixDialog.Content>
        <RadixDialog.Close />
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Dialog;
