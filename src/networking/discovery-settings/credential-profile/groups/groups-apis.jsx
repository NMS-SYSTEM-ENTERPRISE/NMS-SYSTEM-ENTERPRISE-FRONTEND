import { authApi } from '@/services/axios';
import { CREDENTIAL_GROUPS_ENDPOINTS } from './groups-endpoints';

export const allCredentialGroupsApi = async (params = {}) =>
  authApi.get(CREDENTIAL_GROUPS_ENDPOINTS.GET_ALL_GROUPS, { params });

export const createCredentialGroupApi = async (data) =>
  authApi.post(CREDENTIAL_GROUPS_ENDPOINTS.CREATE_GROUP, data);

export const editCredentialGroupApi = async (data) =>
  authApi.put(CREDENTIAL_GROUPS_ENDPOINTS.EDIT_GROUP, data);

export const deleteCredentialGroupApi = async (id) => {
  const endpoint = CREDENTIAL_GROUPS_ENDPOINTS.DELETE_GROUP.replace('{id}', id);
  return authApi.delete(endpoint);
};
