import { ApiSuccessResponse } from '@/shared/types/api';

export type PostSignupRequest = {
  email: string;
  password: string;
  nickname?: string;
};

export type PostSigninRequest = {
  email: string;
  password: string;
};

export type PostSigninResponse = ApiSuccessResponse<{
  accessToken: string;
}>;

export type PostEmailVerificationCodeRequest = { email: string };

export type PostEmailVerificationCodeCheckRequest =
  PostEmailVerificationCodeRequest & { verificationCode: string };

export type GetMeResponse = ApiSuccessResponse<{
  id: number;
  nickname: string;
  email: string;
  currentCreditAmount: number;
}>;
