import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import myApi from '@/features/my/apis';
import { accessTokenStorage } from '@/shared/utils';

const useDeleteAccountMutation = () => {
  return useMutation({
    mutationFn: myApi.deleteWithdrawal,
    onSuccess: () => {
      accessTokenStorage.removeToken();
    },
    onError: ({ data }) => {
      toast.error(data.error.message);
    },
  });
};

export default useDeleteAccountMutation;
