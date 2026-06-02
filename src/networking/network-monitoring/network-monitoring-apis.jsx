import { authApi } from '@/services/axios';

const BASE_URL = '/network-monitoring';

export const getNetworkDashboard = async () => {
  const response = await authApi.get(`${BASE_URL}/dashboard`);
  return response.data;
};

export const getAllDevices = async () => {
  const response = await authApi.get(`${BASE_URL}/devices`);
  return response.data;
};

export const getDeviceById = async (deviceIp) => {
  const response = await authApi.get(`${BASE_URL}/devices/${deviceIp}`);
  return response.data;
};

export const getDeviceHistory = async (deviceIp, hours = 24) => {
  const response = await authApi.get(`${BASE_URL}/devices/${deviceIp}/history`, {
    params: { hours }
  });
  return response.data;
};
