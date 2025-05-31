import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const httpClient = axiosInstance;

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    return Promise.reject(error.response);
  },
);
