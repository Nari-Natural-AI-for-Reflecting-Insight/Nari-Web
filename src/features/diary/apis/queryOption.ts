import { queryOptions } from '@tanstack/react-query';
import diaryApi from '.';
import { GetDiariesRequest } from './types';

export const diaryQueryOption = {
  all: ({ year, month }: GetDiariesRequest) =>
    queryOptions({
      queryKey: ['diaries', year, month],
      queryFn: () => diaryApi.getDiaries({ year, month }),
    }),
};
