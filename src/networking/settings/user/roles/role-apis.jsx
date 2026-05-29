import { authApi } from '@/services/axios';
import { ROLE_ENDPOINTS } from './role-endpoints';

export const allRolesApi = async (params = {}) =>
  authApi.get(ROLE_ENDPOINTS.GET_ALL_ROLES, { params });

export const createRoleApi = async (data) =>
  authApi.post(ROLE_ENDPOINTS.CREATE_ROLE, data);

export const editRoleApi = async (data) =>
  authApi.put(ROLE_ENDPOINTS.EDIT_ROLE, data);

export const deleteRoleApi = async (role_id) => {
  const endpoint = ROLE_ENDPOINTS.DELETE_ROLE.replace('{role_id}', role_id);
  return authApi.delete(endpoint);
};
