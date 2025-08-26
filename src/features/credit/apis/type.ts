import { ApiSuccessResponse } from '@/shared/types/api';

export type creditChargeRequest = {
  email: string;
  creditAmount: number;
  creditOperationReason: 'OPS_CREDIT_FOR_TEST';
};

export type creditPayDailyCounselingResponse = ApiSuccessResponse<{
  paidUserCreditHistoryId: number;
  talkId: number;
}>;
