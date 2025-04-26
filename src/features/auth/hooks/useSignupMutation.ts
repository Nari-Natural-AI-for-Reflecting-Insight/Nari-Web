import { useMutation } from '@tanstack/react-query';
import authApi from '@/features/auth/apis';

const useSignupMutation = () => {
  return useMutation({
    mutationFn: authApi.postSignup,
  });
};

export default useSignupMutation;
