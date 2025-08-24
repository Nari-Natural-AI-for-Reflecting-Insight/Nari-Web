import { useMutation, useQueryClient } from '@tanstack/react-query';
import creditApi from '../apis';
import { userQueryKeys } from '@/features/auth/apis/queryOption';

const useChargeCreditForOpsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: creditApi.postCreditChargeForOps,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: { ...userQueryKeys.all() } });
    },
  });
};

export default useChargeCreditForOpsMutation;
