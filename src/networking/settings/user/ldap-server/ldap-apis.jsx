import { authApi } from '@/services/axios';
import { LDAP_ENDPOINTS } from './ldap-endpoints';

export const allLdapApi = async (params = {}) =>
  authApi.get(LDAP_ENDPOINTS.GET_ALL_LDAP, { params });

export const createLdapApi = async (data) =>
  authApi.post(LDAP_ENDPOINTS.CREATE_LDAP, data);

export const getLdapByIdApi = async (id) =>
  authApi.get(LDAP_ENDPOINTS.GET_LDAP_BY_ID.replace('{id}', id));

export const updateLdapApi = async (id, data) =>
  authApi.put(LDAP_ENDPOINTS.UPDATE_LDAP.replace('{id}', id), data);

export const deleteLdapApi = async (id) =>
  authApi.delete(LDAP_ENDPOINTS.DELETE_LDAP.replace('{id}', id));

export const testLdapApi = async (data) =>
  authApi.post(LDAP_ENDPOINTS.TEST_LDAP, data);
