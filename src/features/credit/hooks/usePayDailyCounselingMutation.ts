import { useMutation } from '@tanstack/react-query';
import creditApi from '../apis';

const usePayDailyCounselingMutation = () => {
  return useMutation({
    mutationFn: creditApi.postCreditPayDailyCounseling,
  });
};

export default usePayDailyCounselingMutation;
