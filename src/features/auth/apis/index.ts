import { PostSignupRequest,PostSigninRequest, PostSigninResponse } from '@/features/auth/apis/types';
import { httpClient } from '@/shared/libs/httpClient';

const BASE_URL = 'auth';

const authApi = {
  postLogin: async () => {
    const url = ``;
    const body = '';

    return await httpClient.post(url, body);
  },
  postCheckEmail: () => {},
  postSignup: async ({ email, password, nickname }: PostSignupRequest) => {
    const url = `${BASE_URL}/sign-up`;
    const body = {
      newUserEmail: email,
      newPassword: password,
      newNickname: nickname,
    };
    return await httpClient.post(url, body);
  },
  postSignin: async ({ email, password }: PostSigninRequest): Promise<PostSigninResponse> => {
    const url = `${BASE_URL}/sign-in/access-token`;
    const body = {
      email,
      password,
    };
    return await httpClient.post(url, body);
  }
};

export default authApi;
