import { ErrorData } from '@/shared/types/error';

export interface ApiSuccessResponse<T> {
  result: 'SUCCESS';
  data: T;
  error: null;
}

export interface ApiErrorResponse {
  result: 'ERROR';
  data: null;
  error: ErrorData;
}
