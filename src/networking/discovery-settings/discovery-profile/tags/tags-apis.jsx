import { authApi } from '@/services/axios';
import { DISCOVERY_TAGS_ENDPOINTS } from './tags-endpoints';

export const allDiscoveryTagsApi = async (params = {}) =>
  authApi.get(DISCOVERY_TAGS_ENDPOINTS.GET_ALL_TAGS, { params });

export const createDiscoveryTagApi = async (data) =>
  authApi.post(DISCOVERY_TAGS_ENDPOINTS.CREATE_TAG, data);

export const editDiscoveryTagApi = async (data) =>
  authApi.put(DISCOVERY_TAGS_ENDPOINTS.EDIT_TAG, data);

export const deleteDiscoveryTagApi = async (id) => {
  const endpoint = DISCOVERY_TAGS_ENDPOINTS.DELETE_TAG.replace('{id}', id);
  return authApi.delete(endpoint);
};
