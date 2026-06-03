import { authApi } from '@/services/axios';

export const LOG_MANAGEMENT_ENDPOINTS = {
  SYSLOGS: 'log-management/syslogs',
};

export const fetchSyslogsApi = async (params = {}) => {
  return authApi.get(LOG_MANAGEMENT_ENDPOINTS.SYSLOGS, { params });
};
