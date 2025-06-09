import {
  PostSignupRequest,
  PostSigninRequest,
  PostSigninResponse,
  PostEmailVerificationCodeRequest,
  PostEmailVerificationCodeCheckRequest,
} from '@/features/auth/apis/types';
import { httpClient } from '@/shared/libs/httpClient';

const BASE_URL = 'auth';

const authApi = {
  postLogin: async () => {
    const url = ``;
    const body = '';

    return await httpClient.post(url, body);
  },
  postCheckEmail: () => {},
  postSignup: async ({ email, password }: PostSignupRequest) => {
    const url = `${BASE_URL}/sign-up`;
    const body = {
      newUserEmail: email,
      newPassword: password,
    };
    return await httpClient.post(url, body);
  },
  postSignin: async ({
    email,
    password,
  }: PostSigninRequest): Promise<PostSigninResponse> => {
    const url = `${BASE_URL}/sign-in/access-token`;
    const body = {
      email,
      password,
    };
    return await httpClient.post(url, body);
  },
  PostEmailVerificationCode: async ({
    email,
  }: PostEmailVerificationCodeRequest) => {
    const url = `${BASE_URL}/email-verification-code`;
    const body = {
      toEmail: email,
    };
    return await httpClient.post(url, body);
  },
  PostEmailVerificationCodeCheck: async ({
    email,
    verificationCode,
  }: PostEmailVerificationCodeCheckRequest) => {
    const url = `${BASE_URL}/email-verification-code/check`;
    const body = {
      targetEmail: email,
      verificationCode,
    };
    return await httpClient.post(url, body);
  },
};

export default authApi;
