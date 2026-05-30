import { authApi } from '@/services/axios';
import { CREDENTIAL_PROFILE_ENDPOINTS } from './profile-endpoints';

export const allCredentialProfilesApi = async (params = {}) =>
  authApi.get(CREDENTIAL_PROFILE_ENDPOINTS.GET_ALL_PROFILES, { params });

export const createCredentialProfileApi = async (data) =>
  authApi.post(CREDENTIAL_PROFILE_ENDPOINTS.CREATE_PROFILE, data);

export const editCredentialProfileApi = async (data) =>
  authApi.put(CREDENTIAL_PROFILE_ENDPOINTS.EDIT_PROFILE, data);

export const deleteCredentialProfileApi = async (id) => {
  const endpoint = CREDENTIAL_PROFILE_ENDPOINTS.DELETE_PROFILE.replace('{id}', id);
  return authApi.delete(endpoint);
};
