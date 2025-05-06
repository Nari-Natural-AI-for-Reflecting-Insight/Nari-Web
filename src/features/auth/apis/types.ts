export type PostSignupRequest = {
  email: string;
  password: string;
  nickname: string;
};

export type PostSigninRequest = {
  email: string;
  password: string;
};

interface ErrorResponse {
  code: string;
  message: string;
}

interface ApiResponse<T> {
  result: 'SUCCESS' | 'ERROR';
  data: T;
  error: ErrorResponse | null;
}

export type PostSigninResponse = ApiResponse<{
  accessToken: string;
}>;