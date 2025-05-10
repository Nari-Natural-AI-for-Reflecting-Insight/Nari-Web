import { AxiosResponse } from 'axios';
import { ApiErrorResponse } from '@/shared/types/api';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosResponse<ApiErrorResponse>;
  }
}
