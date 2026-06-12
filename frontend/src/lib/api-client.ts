import axios from 'axios';
import { API_URL } from './constants';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('access_token')
      : null;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // TODO: Implement silent refresh on 401
    return Promise.reject(error);
  },
);
