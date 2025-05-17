import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import authApi from '@/features/auth/apis';

const useEmailVerificationCodeCheckMutation = () => {
  return useMutation({
    mutationFn: authApi.PostEmailVerificationCodeCheck,
    onError: ({ data }) => {
      toast.error(data.error.message);
    },
  });
};

export default useEmailVerificationCodeCheckMutation;
