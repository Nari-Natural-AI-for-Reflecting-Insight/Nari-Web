import {
  PatchNicknameRequest,
  PatchPasswordRequest,
} from '@/features/my/apis/types';
import { httpClient } from '@/shared/libs/httpClient';

const BASE_URL = 'user/me';

const myApi = {
  patchPassword: async ({ oldPassword, newPassword }: PatchPasswordRequest) => {
    const url = `${BASE_URL}/password`;
    const body = {
      oldPassword,
      newPassword,
    };
    return await httpClient.patch(url, body);
  },
  patchNickname: async ({ newNickname }: PatchNicknameRequest) => {
    const url = `${BASE_URL}/nickname`;
    const body = {
      newNickname,
    };
    return await httpClient.patch(url, body);
  },
  deleteWithdrawal: async () => {
    const url = `${BASE_URL}/withdrawal`;
    return await httpClient.delete(url);
  },
};

export default myApi;
