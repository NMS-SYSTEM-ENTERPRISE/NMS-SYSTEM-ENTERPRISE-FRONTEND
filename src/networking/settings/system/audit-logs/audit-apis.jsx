import { authApi } from '@/services/axios';

const BASE_URL = '/system-settings/audit-logs';

export const getAuditLogs = async ({ skip = 0, limit = 100 } = {}) => {
  const response = await authApi.get(`${BASE_URL}/`, {
    params: { skip, limit }
  });
  return response.data;
};
