import axios from 'axios';

export const api = axios.create({
  headers: { 'cache-control': 'no-cache , no-store, must-revalidate' },
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);
