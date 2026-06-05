import { authApi } from '@/services/axios';

export const LOG_MANAGEMENT_ENDPOINTS = {
  SYSLOGS: 'log-management/syslogs',
  NETWORK_LOGS: 'log-management/syslogs/network-logs',
};

export const fetchSyslogsApi = async (params = {}) => {
  return authApi.get(LOG_MANAGEMENT_ENDPOINTS.SYSLOGS, { params });
};

export const fetchNetworkLogsApi = async (params = {}) => {
  return authApi.get(LOG_MANAGEMENT_ENDPOINTS.NETWORK_LOGS, { params });
};
