import { httpClient } from '@/shared/libs/httpClient';
import { creditChargeRequest, creditPayDailyCounselingResponse } from './type';

const BASE_URL = 'credit';

const creditApi = {
  postCreditChargeForOps: ({
    email,
    creditAmount,
    creditOperationReason,
  }: creditChargeRequest) => {
    const url = `ops/${BASE_URL}/charge`;
    const body = { email, creditAmount, creditOperationReason };
    return httpClient.post(url, body);
  },
  postCreditPayDailyCounseling:
    (): Promise<creditPayDailyCounselingResponse> => {
      const url = `${BASE_URL}/pay/daily-counseling`;
      const body = { idempotencyKey: crypto.randomUUID() };

      return httpClient.post(url, body);
    },
};

export default creditApi;
