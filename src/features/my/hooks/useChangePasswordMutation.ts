import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import myApi from '@/features/my/apis';

const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: myApi.patchPassword,
    onError: ({ data }) => {
      toast.error(data.error.message);
    },
  });
};

export default useChangePasswordMutation;
