import { authApi } from '@/services/axios';
import { SSO_ENDPOINTS } from './sso-endpoints';

export const getSsoConfigApi = async () =>
  authApi.get(SSO_ENDPOINTS.GET_CONFIG);

export const updateSsoConfigApi = async (data) =>
  authApi.put(SSO_ENDPOINTS.UPDATE_CONFIG, data);

export const resetSsoConfigApi = async () =>
  authApi.post(SSO_ENDPOINTS.RESET_CONFIG);
