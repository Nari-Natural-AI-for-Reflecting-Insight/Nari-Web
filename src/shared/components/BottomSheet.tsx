import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Sheet } from 'react-modal-sheet';

interface BottomSheetProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  renderContent: () => ReactNode;
}

const BottomSheet = ({
  open,
  onOpenChange,
  renderContent,
}: BottomSheetProps) => {
  return (
    <Sheet
      isOpen={open}
      onClose={() => onOpenChange(false)}
      snapPoints={[800, 400, 0]} // 원하는 위치로 조절
      initialSnap={1}
    >
      <Sheet.Container className="!rounded-t-[36px] !bg-transparent bg-[linear-gradient(180deg,_rgba(112,_97,_255,_0.5)_0%,_rgba(22,_23,_28,_0)_297.21%)] backdrop-blur-md shadow-xl !max-w-md !left-1/2 -translate-x-1/2 ">
        <Sheet.Header />

        <Sheet.Content>{renderContent()}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={() => onOpenChange(false)} />
    </Sheet>
  );
};

export default BottomSheet;
