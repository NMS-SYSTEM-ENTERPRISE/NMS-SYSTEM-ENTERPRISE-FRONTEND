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

export const getNetworkTopology = async (hours = 24) => {
  const response = await authApi.get(`${BASE_URL}/topology`, {
    params: { hours }
  });
  return response.data;
};

export const getMetricExplorerBootstrap = async () => {
  const response = await authApi.get(`${BASE_URL}/metric-explorer`);
  return response.data;
};

export const getMetricExplorerSeries = async ({ deviceIp, metric, timeRange = '6h' }) => {
  const response = await authApi.get(`${BASE_URL}/metric-explorer/series`, {
    params: {
      device_ip: deviceIp,
      metric,
      time_range: timeRange,
    },
  });
  return response.data;
};

export const createMetricExplorerWorkspace = async (payload) => {
  const response = await authApi.post(`${BASE_URL}/metric-explorer/workspaces`, payload);
  return response.data;
};

export const updateMetricExplorerWorkspace = async (workspaceId, payload) => {
  const response = await authApi.put(`${BASE_URL}/metric-explorer/workspaces/${workspaceId}`, payload);
  return response.data;
};

export const deleteMetricExplorerWorkspace = async (workspaceId) => {
  const response = await authApi.delete(`${BASE_URL}/metric-explorer/workspaces/${workspaceId}`);
  return response.data;
};

export const getNetPaths = async () => {
  const response = await authApi.get(`${BASE_URL}/netpath/paths`);
  return response.data;
};

export const getNetPathDetail = async (pathId) => {
  const response = await authApi.get(`${BASE_URL}/netpath/paths/${pathId}`);
  return response.data;
};
