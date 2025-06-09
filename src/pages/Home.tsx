import { useNavigate } from 'react-router';
import Button from '@/shared/components/Button';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <div className="max-w-[328px] max-h-[409px] w-full h-full bg-[url('public/images/nari-home.svg')] bg-no-repeat absolute bottom-0 left-0 bg-contain" />
      <div className="flex items-center grow-7">
        <h1 className="text-white text-center font-kbo text-4xl">
          나만의 리스너
          <span className="font-mochiy block">Nari</span>
        </h1>
      </div>
      <div className="flex flex-col items-center w-full grow-1 gap-5 z-99">
        <Button onClick={() => navigate('/signin')}>로그인</Button>
        <button
          className="text-white text-[14px] cursor-pointer"
          onClick={() => navigate('/signup')}
        >
          처음이신가요? →
        </button>
      </div>
    </div>
  );
};

export default Home;
