import axios from 'axios';

const API_URL = '';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const httpClient = axiosInstance;
