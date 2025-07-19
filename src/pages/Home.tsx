import { useNavigate } from 'react-router';
import Button from '@/shared/components/Button';
import BottomFixedLayout from '@/shared/layout/BottomFixedLayout';

const Home = () => {
  const navigate = useNavigate();
  return (
    <main>
      <BottomFixedLayout
        renderBottom={() => (
          <>
            <Button onClick={() => navigate('/login')}>로그인</Button>
            <nav className="mt-4 flex justify-center">
              <button
                className="text-white text-[14px]"
                onClick={() => navigate('/signup')}
                type="button"
              >
                처음이신가요? →
              </button>
            </nav>
          </>
        )}
      >
        <section
          className="max-w-[328px] max-h-[409px] w-full h-full bg-[url('public/images/nari-home.svg')] bg-no-repeat absolute bottom-0 left-0 bg-contain"
          aria-label="나리 홈 일러스트"
        />
        <header>
          <h1 className="text-white text-center font-kbo text-4xl">
            나만의 리스너
            <span className="font-mochiy block">Nari</span>
          </h1>
        </header>
      </BottomFixedLayout>
    </main>
  );
};

export default Home;
