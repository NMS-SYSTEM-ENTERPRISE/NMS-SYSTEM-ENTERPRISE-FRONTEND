import { authApi } from '@/services/axios';
import { PAT_ENDPOINTS } from './pat-endpoints';

export const allPatsApi = async (params = {}) =>
  authApi.get(PAT_ENDPOINTS.GET_ALL_PATS, { params });

export const generatePatApi = async () =>
  authApi.get(PAT_ENDPOINTS.GENERATE_PAT);

export const createPatApi = async (data) =>
  authApi.post(PAT_ENDPOINTS.CREATE_PAT, data);

export const editPatApi = async (data) =>
  authApi.put(PAT_ENDPOINTS.EDIT_PAT, data);

export const deletePatApi = async (id) => {
  const endpoint = PAT_ENDPOINTS.DELETE_PAT.replace('{id}', id);
  return authApi.delete(endpoint);
};
