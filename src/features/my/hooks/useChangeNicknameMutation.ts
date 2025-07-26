import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import myApi from '@/features/my/apis';
import { userQueryKeys } from '@/features/auth/apis/queryOption';

const useChangeNicknameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: myApi.patchNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: { ...userQueryKeys.all() } });
    },
    onError: ({ data }) => {
      toast.error(data.error.message);
    },
  });
};

export default useChangeNicknameMutation;
