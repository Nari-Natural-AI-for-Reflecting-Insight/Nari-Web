import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import myApi from '@/features/my/apis';

const useChangeNicknameMutation = () => {
  return useMutation({
    mutationFn: myApi.patchNickname,
    onError: ({ data }) => {
      toast.error(data.error.message);
    },
  });
};

export default useChangeNicknameMutation;
