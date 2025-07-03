import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import BottomNavigation from '@/shared/components/BottomNavigation';

const Diary = () => {
  const defaultClassNames = getDefaultClassNames();
  return (
    <>
      <div className="flex flex-col gap-7">
        <h1 className="text-white pt-10 pl-10">2025</h1>
        <DayPicker
          mode="single"
          classNames={{
            root: `${defaultClassNames.root} text-white relative`,
            chevron: `${defaultClassNames.chevron} text-white bg-[#8A8A8A40] rounded-full fill-white w-8 h-8`,
            day: `${defaultClassNames.day} rounded-full bg-[#75768A] text-center  w-9 h-9 `,
            month_grid: 'border-separate border-spacing-6',
            caption_label: 'font-kbo pl-9 text-2xl font-medium',
            outside: `bg-[#242429] text-white`,
            nav: 'absolute right-0 pr-9 top-1 flex gap-10',
          }}
          formatters={{
            formatCaption: (date) =>
              date.toLocaleString('en-US', { month: 'long' }),
            formatWeekdayName: (weekday) =>
              weekday.toLocaleString('en-US', { weekday: 'narrow' }),
          }}
        />
      </div>
      <BottomNavigation />
    </>
  );
};

export default Diary;
