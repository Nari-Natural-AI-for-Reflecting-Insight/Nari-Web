import { httpClient } from '@/shared/libs/httpClient';
import { GetDiariesRequest, GetDiariesResponse } from './types';

const BASE_URL = 'diaries';

const diaryApi = {
  getDiaries: ({
    year,
    month,
  }: GetDiariesRequest): Promise<GetDiariesResponse> => {
    const url = `${BASE_URL}?year=${year}&month=${month}`;
    return httpClient.get(url);
  },
};

export default diaryApi;
