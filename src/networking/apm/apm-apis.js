import { authApi } from '@/services/axios';

const BASE_URL = '/apm';

export const getApmServices = async () => {
  const response = await authApi.get(`${BASE_URL}/services`);
  return response.data;
};

export const getApmTraces = async () => {
  const response = await authApi.get(`${BASE_URL}/traces`);
  return response.data;
};

export const getApmAnalytics = async () => {
  const response = await authApi.get(`${BASE_URL}/analytics`);
  return response.data;
};

export const getApmTraceDetail = async (traceId) => {
  const response = await authApi.get(`${BASE_URL}/traces/${traceId}`);
  return response.data;
};
