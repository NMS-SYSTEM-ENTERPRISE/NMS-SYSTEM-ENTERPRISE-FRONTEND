import { authApi } from '@/services/axios';
import { GROUP_ENDPOINTS } from './group-endpoints';

export const allGroupsApi = async (params = {}) =>
  authApi.get(GROUP_ENDPOINTS.GET_ALL_GROUPS, { params });

export const createGroupApi = async (data) =>
  authApi.post(GROUP_ENDPOINTS.CREATE_GROUP, data);

export const editGroupApi = async (data) =>
  authApi.put(GROUP_ENDPOINTS.EDIT_GROUP, data);

export const deleteGroupApi = async (group_id) => {
  const endpoint = GROUP_ENDPOINTS.DELETE_GROUP.replace('{group_id}', group_id);
  return authApi.delete(endpoint);
};
