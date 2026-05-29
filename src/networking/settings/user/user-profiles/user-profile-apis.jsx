import { authApi } from '@/services/axios';
import { USER_PROFILE_ENDPOINTS } from './user-profile-endpoints';

export const allUserProfilesApi = async (params = {}) =>
  authApi.get(USER_PROFILE_ENDPOINTS.GET_ALL_USER_PROFILES, { params });

export const createUserProfileApi = async (data) =>
  authApi.post(USER_PROFILE_ENDPOINTS.CREATE_USER_PROFILE, data);

export const editUserProfileApi = async (data) =>
  authApi.put(USER_PROFILE_ENDPOINTS.EDIT_USER_PROFILE, data);

export const deleteUserProfileApi = async (profile_id) => {
  const endpoint = USER_PROFILE_ENDPOINTS.DELETE_USER_PROFILE.replace('{profile_id}', profile_id);
  return authApi.delete(endpoint);
};
