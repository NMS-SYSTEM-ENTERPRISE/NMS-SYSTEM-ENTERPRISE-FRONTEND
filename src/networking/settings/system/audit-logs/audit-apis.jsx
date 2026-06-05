import { authApi } from '@/services/axios';

const BASE_URL = '/system-settings/audit-logs';

export const getAuditLogs = async (params = {}) => {
  const response = await authApi.get(`${BASE_URL}/`, {
    params
  });
  return response.data;
};

export const getAuditAnalytics = async (params = {}) => {
  const response = await authApi.get(`${BASE_URL}/analytics`, {
    params
  });
  return response.data;
};
