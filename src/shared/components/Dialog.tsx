import { Dispatch, SetStateAction } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import Button from '@/shared/components/Button';

interface DialogProps {
  title?: string;
  description?: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onLeftButtonClick?: () => void;
}

const Dialog = ({
  title,
  description,
  open,
  onOpenChange,
  onLeftButtonClick,
}: DialogProps) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/40" />
        <RadixDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px]">
          <RadixDialog.Title>{title}</RadixDialog.Title>
          <RadixDialog.Description>{description}</RadixDialog.Description>
          <Button onClick={onLeftButtonClick}>확인</Button>
          <Button
            onClick={() => {
              onOpenChange(false);
            }}
          >
            취소
          </Button>
        </RadixDialog.Content>
        <RadixDialog.Close />
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Dialog;
