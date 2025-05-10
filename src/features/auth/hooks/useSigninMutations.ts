import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import authApi from '@/features/auth/apis';
import { accessTokenStorage } from '@/shared/utils';

const useSigninMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.postSignin,
    onSuccess: (response) => {
      const { accessToken } = response.data;
      accessTokenStorage.setToken(accessToken);

      toast.success('로그인에 성공했습니다.');
      navigate('/');
    },
    onError: ({ data }) => {
      toast.error(data.error.message);
    },
  });
};

export default useSigninMutation;
