import { authApi } from '@/services/axios';
import { DISCOVERY_PROFILE_ENDPOINTS } from './profile-endpoints';

export const allDiscoveryProfilesApi = async (params = {}) =>
  authApi.get(DISCOVERY_PROFILE_ENDPOINTS.GET_ALL_PROFILES, { params });

export const createDiscoveryProfileApi = async (data) =>
  authApi.post(DISCOVERY_PROFILE_ENDPOINTS.CREATE_PROFILE, data);

export const editDiscoveryProfileApi = async (data) =>
  authApi.put(DISCOVERY_PROFILE_ENDPOINTS.EDIT_PROFILE, data);

export const deleteDiscoveryProfileApi = async (id) => {
  const endpoint = DISCOVERY_PROFILE_ENDPOINTS.DELETE_PROFILE.replace('{id}', id);
  return authApi.delete(endpoint);
};

export const profileDevicesApi = async (id, params = {}) => {
  const endpoint = DISCOVERY_PROFILE_ENDPOINTS.GET_DEVICES.replace('{id}', id);
  return authApi.get(endpoint, { params });
};

export const scheduleDiscoveryProfileApi = async (data) =>
  authApi.post(DISCOVERY_PROFILE_ENDPOINTS.SCHEDULE_PROFILE, data);

export const commissionDevicesApi = async (data) =>
  authApi.post(DISCOVERY_PROFILE_ENDPOINTS.COMMISSION_DEVICES, data);

export const getDiscoveryLogsApi = async (id) => {
  const endpoint = DISCOVERY_PROFILE_ENDPOINTS.GET_LOGS.replace('{id}', id);
  return authApi.get(endpoint);
};

export const reDiscoverProfileApi = async (id) => {
  const endpoint = DISCOVERY_PROFILE_ENDPOINTS.REDISCOVER_PROFILE.replace('{id}', id);
  return authApi.post(endpoint);
};

export const uploadCsvApi = async (formData) => {
  return authApi.post('/discovery-settings/discovery-profile/upload-csv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
