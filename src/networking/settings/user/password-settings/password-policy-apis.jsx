import { authApi } from '@/services/axios';
import { PASSWORD_POLICY_ENDPOINTS } from './password-policy-endpoints';

export const getPasswordPolicyApi = async () =>
  authApi.get(PASSWORD_POLICY_ENDPOINTS.GET_POLICY);

export const updatePasswordPolicyApi = async (data) =>
  authApi.put(PASSWORD_POLICY_ENDPOINTS.UPDATE_POLICY, data);

export const resetPasswordPolicyApi = async () =>
  authApi.post(PASSWORD_POLICY_ENDPOINTS.RESET_POLICY);
