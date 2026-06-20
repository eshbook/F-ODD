import axios from 'axios';
import { authStore } from '@/store/authStore';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add token to headers
apiClient.interceptors.request.use((config) => {
  // Using getState() to access the state outside of components
  const token = authStore.getState().accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle 401 & refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await authStore.getState().refreshAccessToken();
      // Retry the original request
      return apiClient.request(error.config);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
