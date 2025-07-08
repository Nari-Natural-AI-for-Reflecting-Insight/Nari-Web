import { useLocation, useNavigate } from 'react-router';
import DataIcon from '@/shared/icons/DataIcon';
import DiaryIcon from '@/shared/icons/DiaryIcon';
import MyIcon from '@/shared/icons/MyIcon';
import TalkIcon from '@/shared/icons/TalkIcon';

const BottomNavigation = () => {
  const navigation = useNavigate();
  const { pathname } = useLocation();

  const isData = pathname === '/data';
  const isDiary = pathname === '/diary';
  const isTalk = pathname === '/talk';
  const isMy = pathname === '/my';

  return (
    <div className="w-full max-w-md h-[108px] flex justify-around absolute bottom-0">
      <button
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={() => navigation('/data')}
      >
        <DataIcon className={isData ? 'text-white' : 'text-[#60554F]'} />
        <span className={isData ? 'text-white' : 'text-[#60554F]'}>DATA</span>
      </button>
      <button
        className="cursor-pointer flex flex-col justify-center items-center"
        onClick={() => navigation('/diary')}
      >
        <DiaryIcon className={isDiary ? 'text-white' : 'text-[#60554F]'} />
        <span className={isDiary ? 'text-white' : 'text-[#60554F]'}>DIARY</span>
      </button>
      <button
        className="cursor-pointer flex flex-col justify-center items-center"
        onClick={() => navigation('/talk')}
      >
        <TalkIcon className={isTalk ? 'text-white' : 'text-[#60554F]'} />
        <span className={isTalk ? 'text-white' : 'text-[#60554F]'}>TALK</span>
      </button>
      <button
        className="flex flex-col cursor-pointer justify-center items-center"
        onClick={() => navigation('/my')}
      >
        <MyIcon className={isMy ? 'text-white' : 'text-[#60554F]'} />
        <span className={isMy ? 'text-white' : 'text-[#60554F]'}>MY</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
