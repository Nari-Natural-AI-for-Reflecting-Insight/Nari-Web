import { useNavigate } from 'react-router';
import Button from '@/shared/components/Button';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate('/signin')}>로그인</Button>
      <Button onClick={() => navigate('/signup')}>처음이신가요?</Button>
    </>
  );
};

export default Home;
