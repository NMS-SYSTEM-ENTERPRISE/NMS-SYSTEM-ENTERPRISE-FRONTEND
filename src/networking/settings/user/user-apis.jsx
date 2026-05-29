import { authApi } from '@/services/axios';
import { USER_ENDPOINTS } from './user-endpoints';

export const allUsersApi = async (params = {}) =>
  authApi.get(USER_ENDPOINTS.GET_ALL_USERS, { params });

export const createUserApi = async (data) =>
  authApi.post(USER_ENDPOINTS.CREATE_USER, data);

export const editUserApi = async (data) =>
  authApi.put(USER_ENDPOINTS.EDIT_USER, data);

export const deleteUserApi = async (user_id) => {
  const endpoint = USER_ENDPOINTS.DELETE_USER.replace('{user_id}', user_id);
  return authApi.delete(endpoint);
};

export const getUserMeApi = async () =>
  authApi.get(USER_ENDPOINTS.GET_USER_ME);

export const updateUserMeApi = async (data) =>
  authApi.put(USER_ENDPOINTS.UPDATE_USER_ME, data);
