import { authApi } from '@/services/axios';
import { LDAP_ENDPOINTS } from './ldap-endpoints';

export const getLdapConfigsApi = async (params = {}) =>
  authApi.get(LDAP_ENDPOINTS.GET_ALL, { params });

export const createLdapConfigApi = async (data) =>
  authApi.post(LDAP_ENDPOINTS.CREATE, data);

export const updateLdapConfigApi = async (id, data) => {
  const endpoint = LDAP_ENDPOINTS.UPDATE.replace('{id}', id);
  return authApi.put(endpoint, data);
};

export const deleteLdapConfigApi = async (id) => {
  const endpoint = LDAP_ENDPOINTS.DELETE.replace('{id}', id);
  return authApi.delete(endpoint);
};

export const testLdapConnectionApi = async (data) =>
  authApi.post(LDAP_ENDPOINTS.TEST_CONNECTION, data);
