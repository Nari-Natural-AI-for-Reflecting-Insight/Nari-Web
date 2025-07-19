import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import authApi from '@/features/auth/apis';
import { useNavigate } from 'react-router';

const useSignupMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authApi.postSignup,
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다.');
      navigate('/login');
    },
    onError: ({ data }) => {
      toast.error(data.error.message);
    },
  });
};

export default useSignupMutation;
