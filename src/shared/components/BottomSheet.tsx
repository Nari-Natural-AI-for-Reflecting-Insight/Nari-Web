import { Dispatch, SetStateAction } from 'react';
import { Sheet } from 'react-modal-sheet';

interface BottomSheetProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  title?: string;
}

const BottomSheet = ({ open, onOpenChange }: BottomSheetProps) => {
  return (
    <Sheet
      isOpen={open}
      onClose={() => onOpenChange(false)}
      snapPoints={[800, 400, 0]} // 원하는 위치로 조절
      initialSnap={1}
    >
      <Sheet.Container className="rounded-t-2xl bg-white shadow-xl z-50 !max-w-md !left-1/2 -translate-x-1/2 ">
        <Sheet.Header />
        <Sheet.Content>
          <div className="p-4">
            <h2 className="text-lg font-bold">바텀시트</h2>
            <p>🎉</p>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default BottomSheet;
