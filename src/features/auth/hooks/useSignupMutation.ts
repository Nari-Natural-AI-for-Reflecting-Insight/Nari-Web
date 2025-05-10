import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import authApi from '@/features/auth/apis';

const useSignupMutation = () => {
  return useMutation({
    mutationFn: authApi.postSignup,
    onError: ({ data }) => {
      toast.error(data.error.message);
    },
  });
};

export default useSignupMutation;
