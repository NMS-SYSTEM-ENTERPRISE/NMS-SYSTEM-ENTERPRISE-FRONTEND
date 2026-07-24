import { authApi } from '@/services/axios';

const BASE_URL = '/apm';

export const getApmServices = async (params = {}) => {
  const response = await authApi.get(`${BASE_URL}/services`, { params });
  return response.data;
};

export const getApmTraces = async (params = {}) => {
  const response = await authApi.get(`${BASE_URL}/traces`, { params });
  return response.data;
};

export const getApmAnalytics = async (params = {}) => {
  const response = await authApi.get(`${BASE_URL}/analytics`, { params });
  return response.data;
};

export const getApmFilterOptions = async () => {
  const response = await authApi.get(`${BASE_URL}/filter-options`);
  return response.data;
};

export const getApmTraceDetail = async (traceId) => {
  const response = await authApi.get(`${BASE_URL}/traces/${traceId}`);
  return response.data;
};
