import { httpClient } from '@/shared/libs/httpClient';

const authApi = {
  postLogin: async () => {
    const url = ``;
    const body = '';

    return await httpClient.post(url, body);
  },
  postCheckEmail: () => {},
  postSignUp: () => {},
};

export default authApi;
