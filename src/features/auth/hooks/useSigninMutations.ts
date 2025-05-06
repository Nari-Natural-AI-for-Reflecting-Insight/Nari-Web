import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { accessTokenStorage } from '@/shared/utils';
import authApi from '@/features/auth/apis';
import { PostSigninResponse } from '@/features/auth/apis/types';
import { ErrorData } from '@/shared/types/error';


const useSigninMutation = () => {

  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.postSignin,
    onSuccess: (response:PostSigninResponse) => {
        const { accessToken } = response.data;
        accessTokenStorage.set(accessToken);     
        
        toast.success('로그인에 성공했습니다.');
        navigate('/');
    },
    onError: ({ data }: AxiosResponse<ErrorData>) => {
      toast.error(data.error.message);
    },
  });
};

export default useSigninMutation;
