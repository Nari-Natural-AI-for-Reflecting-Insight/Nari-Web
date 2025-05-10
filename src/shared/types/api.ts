import { ErrorData } from "./error";

export interface ApiResponse<T> {
  result: 'SUCCESS' | 'ERROR';
  data: T;
  error: ErrorData | null;
}