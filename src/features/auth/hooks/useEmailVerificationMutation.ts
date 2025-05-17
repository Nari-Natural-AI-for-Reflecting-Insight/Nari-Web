import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import authApi from '@/features/auth/apis';

const useEmailVerificationMutation = () => {
  return useMutation({
    mutationFn: authApi.PostEmailVerificationCode,
    onError: ({ data }) => {
      toast.error(data.error.message);
    },
  });
};

export default useEmailVerificationMutation;
