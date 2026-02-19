import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'mm_token';
const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || 'https://micro-marketplace-1-52ut.onrender.com/api';

let onUnauthorized;

export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 12000,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && typeof onUnauthorized === 'function') {
      await AsyncStorage.removeItem(TOKEN_KEY);
      onUnauthorized();
    }

    return Promise.reject(error);
  }
);

export { api as default, TOKEN_KEY };
