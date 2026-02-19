import axios from 'axios';

export const storageKeys = {
  token: 'mm_token',
  user: 'mm_user',
};

let unauthorizedHandler;

export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler;
};

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(storageKeys.token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && unauthorizedHandler) {
      unauthorizedHandler();
    }

    return Promise.reject(error);
  }
);

export default apiClient;
