import { authApi } from '@/services/axios';
import { AUTH_ENDPOINTS } from './auth-endpoints';

export const loginApi = async (data) =>
  authApi.post(AUTH_ENDPOINTS.LOGIN, data);
