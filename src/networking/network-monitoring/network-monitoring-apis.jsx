import { authApi } from '@/services/axios';

const BASE_URL = '/network-monitoring';

export const getNetworkDashboard = async () => {
  const response = await authApi.get(`${BASE_URL}/dashboard`);
  return response.data;
};

export const getAllDevices = async (params = {}) => {
  const response = await authApi.get(`${BASE_URL}/devices`, { params });
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

export const getSloPortfolio = async () => {
  const response = await authApi.get(`${BASE_URL}/slo`);
  return response.data;
};

export const getSloDetail = async (sloId) => {
  const response = await authApi.get(`${BASE_URL}/slo/${sloId}`);
  return response.data;
};

export const getSlaReport = async (params = {}) => {
  const response = await authApi.get(`${BASE_URL}/sla/report`, { params });
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

export const shareMetricExplorerWidget = async (payload) => {
  const response = await authApi.post(`${BASE_URL}/metric-explorer/share`, payload);
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

export const getOverallNetFlow = async () => {
  const response = await authApi.get(`${BASE_URL}/netpath/overall-flow`);
  return response.data;
};

export const getOverallFlowAnalysis = async () => {
  const response = await authApi.get(`${BASE_URL}/flow/overall-analysis`);
  return response.data;
};

// ==========================================
// ALERTS (FAULT MANAGEMENT) APIS
// ==========================================

export const getAlerts = async ({ activeOnly = false, severity = null } = {}) => {
  const params = {};
  if (activeOnly) params.active_only = true;
  if (severity) params.severity = severity;
  const response = await authApi.get(`${BASE_URL}/alerts`, { params });
  return response.data;
};

export const getAlertById = async (alertId) => {
  const response = await authApi.get(`${BASE_URL}/alerts/${alertId}`);
  return response.data;
};

export const acknowledgeAlert = async (alertId, { acknowledged, incidentRef = null, notes = null } = {}) => {
  const response = await authApi.put(`${BASE_URL}/alerts/${alertId}/acknowledge`, {
    acknowledged,
    incident_ref: incidentRef,
    notes,
  });
  return response.data;
};

export const ALERTS_WEBSOCKET_URL =
  typeof window !== 'undefined'
    ? `ws://${window.location.hostname}:8000/api/v1/network-monitoring/alerts/stream`
    : '';

// ==========================================
// TRAPS (SNMP) APIS
// ==========================================

export const getTraps = async ({ skip = 0, limit = 100, severity = null, source = null, search = null, trapOid = null, vendor = null, acknowledged = null, countMin = null, countMax = null } = {}) => {
  const params = { skip, limit };
  if (severity) params.severity = severity;
  if (source) params.source = source;
  if (search) params.search = search;
  if (trapOid) params.trapOid = trapOid;
  if (vendor) params.vendor = vendor;
  if (acknowledged !== null && acknowledged !== '') params.acknowledged = acknowledged;
  if (countMin) params.countMin = countMin;
  if (countMax) params.countMax = countMax;
  const response = await authApi.get(`${BASE_URL}/traps`, { params });
  return response.data;
};

export const getTrapDashboard = async () => {
  const response = await authApi.get(`${BASE_URL}/traps/dashboard`);
  return response.data;
};

export const acknowledgeTrap = async (trapId, acknowledged) => {
  const response = await authApi.put(`${BASE_URL}/traps/${trapId}/acknowledge`, { acknowledged });
  return response.data;
};

export const TRAPS_WEBSOCKET_URL =
  typeof window !== 'undefined'
    ? `ws://${window.location.hostname}:8000/api/v1/network-monitoring/traps/stream`
    : '';

// ==========================================
// FLOW (TRAFFIC ANALYSIS) APIS
// ==========================================

export const getFlowDashboard = async (params = {}) => {
  const response = await authApi.get(`${BASE_URL}/flow/dashboard`, { params });
  return response.data;
};

export const getFlowAnalytics = async (params = {}) => {
  const response = await authApi.get(`${BASE_URL}/flow/analytics`, { params });
  return response.data;
};

export const getFlowExplorer = async (params = {}) => {
  const response = await authApi.get(`${BASE_URL}/flow/explorer`, { params });
  return response.data;
};

export const getFlowFilters = async () => {
  const response = await authApi.get(`${BASE_URL}/flow/filters`);
  return response.data;
};

export const getFlowExplorerData = async (params) => {
  const response = await authApi.get(`${BASE_URL}/flow/explorer`, { params });
  return response.data;
};

// ==========================================
// REPORTS APIS
// ==========================================

export const getReports = async (tab) => {
  const response = await authApi.get(`${BASE_URL}/reports/`, { params: { tab } });
  return response.data;
};

export const getReportCategories = async (tab) => {
  const response = await authApi.get(`${BASE_URL}/reports/categories`, { params: { tab } });
  return response.data;
};

export const getReportCreateOptions = async () => {
  const response = await authApi.get(`${BASE_URL}/reports/create-options`);
  return response.data;
};

export const createCustomReport = async (payload) => {
  const response = await authApi.post(`${BASE_URL}/reports/create`, payload);
  return response.data;
};

export const getReportDetail = async (reportId) => {
  const response = await authApi.get(`${BASE_URL}/reports/${reportId}`);
  return response.data;
};
