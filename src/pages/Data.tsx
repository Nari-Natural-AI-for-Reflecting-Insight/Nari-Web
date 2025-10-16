import BottomNavigation from '@/shared/components/BottomNavigation';
import * as Tabs from '@radix-ui/react-tabs';

const Data = () => {
  return (
    <div className="text-white font-kbo">
      <Tabs.Root className="px-3 py-5">
        <Tabs.List className="w-full rounded-4xl bg-[#22252E] px-2 py-2">
          <Tabs.Trigger
            value="tab1"
            className="data-[state=active]:bg-[#06D6A0] data-[state=active]:text-white w-1/3 rounded-4xl h-11"
          >
            WEEK
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab2"
            className="data-[state=active]:bg-[#06D6A0] data-[state=active]:text-white w-1/3 rounded-4xl h-11"
          >
            MONTH
          </Tabs.Trigger>
          <Tabs.Trigger
            className="data-[state=active]:bg-[#06D6A0] data-[state=active]:text-white w-1/3 rounded-4xl h-11"
            value="tab3"
          >
            YEAR
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <div className="px-6 space-y-2.5 py-8 relative">
            <div className="font-medium pb-3">이런 말을 자주 사용하셨어요</div>
            <div className="relative">
              <span className="font-medium absolute top-6 left-5">
                뿌듯하다
              </span>
              <span className="absolute text-xs top-7 right-25">30회</span>
              <img src="public/images/talk.png" className="" />
            </div>
            <div className="relative">
              <span className="font-medium absolute top-6 left-5">
                뿌듯하다
              </span>
              <span className="absolute text-xs top-7 right-25">30회</span>
              <img src="public/images/talk.png" className="" />
            </div>
            <div className="relative">
              <span className="font-medium absolute top-6 left-5">
                뿌듯하다
              </span>
              <span className="absolute text-xs top-7 left-35">30회</span>
              <img src="public/images/short_talk.png" className="" />
            </div>
            <img
              src="public/images/nari_data.png"
              className="h-60 w-auto absolute -bottom-25 right-2"
            />
          </div>
          <div className="h-30"></div>
          <div className="px-6 space-y-2.5 py-8 relative">
            <div className="font-medium pb-3">하루 만족도</div>
            <div className="w-full bg-[#22252E] h-[273px] rounded-4xl"></div>
          </div>
        </Tabs.Content>
        <Tabs.Content value="tab2">Tab two content</Tabs.Content>
        <Tabs.Content value="tab3">Tab three content</Tabs.Content>
      </Tabs.Root>
      <BottomNavigation />
    </div>
  );
};

export default Data;
