import { Route } from '@/routes/__root';
import axios from 'axios';

if (import.meta.env.MODE === 'development') {
  axios.defaults.baseURL = 'http://localhost:8080/api';
} else {
  axios.defaults.baseURL = 'https://cv.bykowski.dev/api';
}

axios.defaults.maxRedirects = 0;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('error', error);

    const originalRequest = error.config;

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      if (!originalRequest.retry) {
        originalRequest.retry = true;
      } else {
        console.debug('redirecting to login');
        localStorage.removeItem('user');
        Route.router?.navigate({
          to: '/login',
          params: { reason: 'session-expired' }
        });
      }
    }
    return Promise.reject(error);
  }
);

export const Axios = axios;
