import { httpClient } from '@/shared/libs/httpClient';
import { talkActiveResponse } from './types';

const BASE_URL = 'talk';

const talkApi = {
  getTopActive: (): Promise<talkActiveResponse> => {
    const url = `${BASE_URL}/top-active`;
    return httpClient.get(url);
  },
};

export default talkApi;
