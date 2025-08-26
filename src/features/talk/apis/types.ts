import { ApiSuccessResponse } from '@/shared/types/api';

export type talkActiveResponse = ApiSuccessResponse<{
  existsActiveTalk: boolean;
  maxSessionCountPerPay: number;
  topActiveTalkInfo: {};
}>;
