'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  allLdapApi,
  createLdapApi,
  deleteLdapApi,
  updateLdapApi,
  testLdapApi,
} from '@/networking/settings/user/ldap-server/ldap-apis';

export const LdapContext = createContext(null);

export const LdapProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const getAllLdaps = useCallback(
    async (params = {}) => {
      setIsLoading(true);
      try {
        const response = await allLdapApi(params);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          return data;
        } else {
          showError(data?.message || 'Failed to fetch LDAP settings list.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error fetching LDAP settings.');
        console.error('Get all LDAP error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const createLdap = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await createLdapApi(payload);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          showSuccess(data?.message || 'LDAP setting created successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to create LDAP setting.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error creating LDAP setting.');
        console.error('Create LDAP error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const editLdap = useCallback(
    async (id, payload) => {
      setIsLoading(true);
      try {
        const response = await updateLdapApi(id, payload);
        const { status, data } = response;
        if (status === 200) {
          showSuccess(data?.message || 'LDAP setting updated successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to update LDAP setting.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error updating LDAP setting.');
        console.error('Edit LDAP error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const deleteLdap = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const response = await deleteLdapApi(id);
        const { status, data } = response;
        if (status === 200 || status === 204) {
          showSuccess(data?.message || 'LDAP setting deleted successfully.');
          return data || { success: true };
        } else {
          showError(data?.message || 'Failed to delete LDAP setting.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error deleting LDAP setting.');
        console.error('Delete LDAP error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const testLdap = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await testLdapApi(payload);
        const { status, data } = response;
        if (status === 200) {
          showSuccess(data?.message || 'Successfully connected to LDAP server.');
          return data;
        } else {
          showError(data?.message || 'LDAP connection test failed.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'LDAP connection test failed.');
        console.error('Test LDAP error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const memoizedValue = useMemo(
    () => ({
      isLoading,
      getAllLdaps,
      createLdap,
      editLdap,
      deleteLdap,
      testLdap,
    }),
    [
      isLoading,
      getAllLdaps,
      createLdap,
      editLdap,
      deleteLdap,
      testLdap,
    ]
  );

  return (
    <LdapContext.Provider value={memoizedValue}>
      {children}
    </LdapContext.Provider>
  );
};
