import { authApi } from '@/services/axios';
import { CREDENTIAL_TAGS_ENDPOINTS } from './tags-endpoints';

export const allCredentialTagsApi = async (params = {}) =>
  authApi.get(CREDENTIAL_TAGS_ENDPOINTS.GET_ALL_TAGS, { params });

export const createCredentialTagApi = async (data) =>
  authApi.post(CREDENTIAL_TAGS_ENDPOINTS.CREATE_TAG, data);

export const editCredentialTagApi = async (data) =>
  authApi.put(CREDENTIAL_TAGS_ENDPOINTS.EDIT_TAG, data);

export const deleteCredentialTagApi = async (id) => {
  const endpoint = CREDENTIAL_TAGS_ENDPOINTS.DELETE_TAG.replace('{id}', id);
  return authApi.delete(endpoint);
};
