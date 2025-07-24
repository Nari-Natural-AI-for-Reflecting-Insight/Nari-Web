import { queryOptions } from '@tanstack/react-query';
import authApi from '.';

const userQueryKeys = {
  all: () => ['user'],
};

export const userQueryOption = {
  all: () =>
    queryOptions({
      queryKey: [...userQueryKeys.all()],
      queryFn: authApi.getMe,
    }),
};
