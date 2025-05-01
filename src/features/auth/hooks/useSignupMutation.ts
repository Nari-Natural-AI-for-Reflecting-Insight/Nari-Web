import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import authApi from '@/features/auth/apis';
import { ErrorData } from '@/shared/types/error';

const useSignupMutation = () => {
  return useMutation({
    mutationFn: authApi.postSignup,
    onError: ({ data }: AxiosResponse<ErrorData>) => {
      toast.error(data.error.message);
    },
  });
};

export default useSignupMutation;
