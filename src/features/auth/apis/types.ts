import { ApiSuccessResponse } from '@/shared/types/api';

export type PostSignupRequest = {
  email: string;
  password: string;
  nickname: string;
};

export type PostSigninRequest = {
  email: string;
  password: string;
};

export type PostSigninResponse = ApiSuccessResponse<{
  accessToken: string;
}>;
