import { PostSignupRequest } from '@/features/auth/apis/types';
import { httpClient } from '@/shared/libs/httpClient';

const authApi = {
  postLogin: async () => {
    const url = ``;
    const body = '';

    return await httpClient.post(url, body);
  },
  postCheckEmail: () => {},
  postSignup: async ({ email, password, nickname }: PostSignupRequest) => {
    const url = 'auth/sign-up';
    const body = {
      newUserEmail: email,
      newPassword: password,
      newNickname: nickname,
    };
    return await httpClient.post(url, body);
  },
};

export default authApi;
