import { authApi } from '@/services/axios';

export const allManualDevicesApi = (params = {}) => {
  return authApi.get('/discovery-settings/manual-devices', { params });
};

export const createManualDeviceApi = (data) => {
  return authApi.post('/discovery-settings/manual-devices', data);
};

export const updateManualDeviceApi = (id, data) => {
  return authApi.put(`/discovery-settings/manual-devices/${id}`, data);
};

export const deleteManualDeviceApi = (id) => {
  return authApi.delete(`/discovery-settings/manual-devices/${id}`);
};

export const uploadManualDevicesXlsxApi = (formData) => {
  return authApi.post('/discovery-settings/manual-devices/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
