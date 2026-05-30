import { authApi } from '@/services/axios';
import { DISCOVERY_GROUPS_ENDPOINTS } from './groups-endpoints';

export const allDiscoveryGroupsApi = async (params = {}) =>
  authApi.get(DISCOVERY_GROUPS_ENDPOINTS.GET_ALL_GROUPS, { params });

export const createDiscoveryGroupApi = async (data) =>
  authApi.post(DISCOVERY_GROUPS_ENDPOINTS.CREATE_GROUP, data);

export const editDiscoveryGroupApi = async (data) =>
  authApi.put(DISCOVERY_GROUPS_ENDPOINTS.EDIT_GROUP, data);

export const deleteDiscoveryGroupApi = async (id) => {
  const endpoint = DISCOVERY_GROUPS_ENDPOINTS.DELETE_GROUP.replace('{id}', id);
  return authApi.delete(endpoint);
};
