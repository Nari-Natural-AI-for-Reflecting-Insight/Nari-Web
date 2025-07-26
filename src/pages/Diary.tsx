import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import BottomNavigation from '@/shared/components/BottomNavigation';
import BottomSheet from '@/shared/components/BottomSheet';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { diaryQueryOption } from '@/features/diary/apis/queryOption';
import DiaryQna from '@/features/diary/components/DiaryQna';

const Diary = () => {
  const defaultClassNames = getDefaultClassNames();
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;

  const { data } = useQuery({
    ...diaryQueryOption.all({ year, month }),
  });

  const diaryDates = data?.data.diaries
    ?.filter((v) => v.status === 'COMPLETED')
    .map((v) => new Date(v.diaryDate));

  return (
    <>
      <div className="flex flex-col gap-7">
        <h1 className="text-white pt-10 pl-10">2025</h1>
        <DayPicker
          modifiers={{
            hasDiary: diaryDates,
            today: [new Date()],
          }}
          modifiersClassNames={{
            today: '',
            hasDiary: 'bg-[#FF7500] text-white',
          }}
          onDayClick={(date) => {
            setSelectedDay(new Date(date).getDate());
            setIsOpenBottomSheet(true);
          }}
          onMonthChange={(date) => {
            setSelectedDate(date);
          }}
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
      <BottomSheet
        open={isOpenBottomSheet}
        onOpenChange={setIsOpenBottomSheet}
        renderContent={() => {
          const selectedDayOfDiary = data?.data.diaries?.find(
            (v) => new Date(v.diaryDate).getDate() === selectedDay,
          );

          if (!selectedDayOfDiary?.qnaList)
            return <p className="text-white p-4 ">작성된 일기가 없어요</p>;

          return selectedDayOfDiary.qnaList.map((qna) => (
            <DiaryQna key={qna.qnaId} {...qna} />
          ));
        }}
      />
      <BottomNavigation />
    </>
  );
};

export default Diary;
