import axios from 'axios';

const API_PREFIX = '/api';
const API_TIMEOUT_MS = 10_000;

const getApiBaseUrl = () => {
  if (import.meta.env.DEV) {
    return API_PREFIX;
  }

  const apiOrigin = import.meta.env.VITE_API_BASE_URL?.trim();

  if (!apiOrigin) {
    throw new Error('운영 환경에는 VITE_API_BASE_URL 설정이 필요합니다.');
  }

  return `${apiOrigin.replace(/\/+$/, '')}${API_PREFIX}`;
};

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: API_TIMEOUT_MS,
  headers: {
    Accept: 'application/json',
  },
});

export default apiClient;
