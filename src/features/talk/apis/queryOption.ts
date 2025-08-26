import { queryOptions } from '@tanstack/react-query';
import talkApi from '.';

const talkQueryKeys = {
  topActive: () => ['top-active'],
};

export const talkyQueryOption = {
  topActive: () =>
    queryOptions({
      queryKey: [...talkQueryKeys.topActive()],
      queryFn: () => talkApi.getTopActive(),
    }),
};
