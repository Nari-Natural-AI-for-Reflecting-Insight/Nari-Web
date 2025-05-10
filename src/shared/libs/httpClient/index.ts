import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const httpClient = axiosInstance;

httpClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    return Promise.reject(error.response);
  },
);
