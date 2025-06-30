import { useNavigate } from 'react-router';

const BottomNavigation = () => {
  const navigation = useNavigate();
  return (
    <div className="w-full max-w-md h-[108px] flex justify-around absolute bottom-0">
      <button
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={() => navigation('/data')}
      >
        <img
          className="w-[29px] h-[33px]"
          src="public/icons/data.svg"
          alt="data"
        />
        <span className="text-[#60554F]">DATA</span>
      </button>
      <button
        className="cursor-pointer flex flex-col justify-center items-center"
        onClick={() => navigation('/diary')}
      >
        <img
          className="w-[29px] h-[33px]"
          src="public/icons/diary.svg"
          alt="diary"
        />
        <span className="text-[#60554F]">DIARY</span>
      </button>
      <button
        className="cursor-pointer flex flex-col justify-center items-center"
        onClick={() => navigation('/talk')}
      >
        <img
          className="w-[29px] h-[33px]"
          src="public/icons/talk.svg"
          alt="talk"
        />
        <span className="text-[#60554F]">TALK</span>
      </button>
      <button
        className="flex flex-col cursor-pointer justify-center items-center"
        onClick={() => navigation('/my')}
      >
        <img className="w-[29px] h-[33px]" src="public/icons/my.svg" alt="my" />
        <span className="text-[#60554F]">MY</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
