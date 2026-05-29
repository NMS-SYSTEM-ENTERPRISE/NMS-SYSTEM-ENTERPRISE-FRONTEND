'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  getLdapConfigsApi,
  createLdapConfigApi,
  updateLdapConfigApi,
  deleteLdapConfigApi,
  testLdapConnectionApi,
} from '@/networking/settings/user/ldap-server/ldap-apis';

export const LdapContext = createContext(null);

export const LdapProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const getLdapConfigs = useCallback(async (params = {}) => {
    setIsLoading(true);
    try {
      const response = await getLdapConfigsApi(params);
      const { status, data } = response;
      if (status === 200) {
        return data;
      } else {
        showError(data?.message || 'Failed to fetch LDAP configurations.');
        return null;
      }
    } catch (error) {
      showError(error?.detail || error?.message || 'Error fetching LDAP configurations.');
      console.error('Get LDAP configs error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  const createLdapConfig = useCallback(async (payload) => {
    setIsLoading(true);
    try {
      const response = await createLdapConfigApi(payload);
      const { status, data } = response;
      if (status === 200 || status === 201) {
        showSuccess(data?.message || 'LDAP configuration created successfully.');
        return data;
      } else {
        showError(data?.message || 'Failed to create LDAP configuration.');
        return null;
      }
    } catch (error) {
      showError(error?.detail || error?.message || 'Error creating LDAP configuration.');
      console.error('Create LDAP config error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  const updateLdapConfig = useCallback(async (id, payload) => {
    setIsLoading(true);
    try {
      const response = await updateLdapConfigApi(id, payload);
      const { status, data } = response;
      if (status === 200) {
        showSuccess(data?.message || 'LDAP configuration updated successfully.');
        return data;
      } else {
        showError(data?.message || 'Failed to update LDAP configuration.');
        return null;
      }
    } catch (error) {
      showError(error?.detail || error?.message || 'Error updating LDAP configuration.');
      console.error('Update LDAP config error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  const deleteLdapConfig = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const response = await deleteLdapConfigApi(id);
      const { status, data } = response;
      if (status === 200 || status === 204) {
        showSuccess(data?.message || 'LDAP configuration deleted successfully.');
        return data || { success: true };
      } else {
        showError(data?.message || 'Failed to delete LDAP configuration.');
        return null;
      }
    } catch (error) {
      showError(error?.detail || error?.message || 'Error deleting LDAP configuration.');
      console.error('Delete LDAP config error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  const testLdapConnection = useCallback(async (payload) => {
    setIsLoading(true);
    try {
      const response = await testLdapConnectionApi(payload);
      const { status, data } = response;
      if (status === 200) {
        showSuccess(data?.message || data?.status === 'success' ? 'Connection successful!' : 'Connection tested.');
        return data;
      } else {
        showError(data?.detail || data?.message || 'Failed to connect to LDAP server.');
        return null;
      }
    } catch (error) {
      showError(error?.detail || error?.message || 'Error testing LDAP connection.');
      console.error('Test LDAP connection error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  const memoizedValue = useMemo(
    () => ({
      isLoading,
      getLdapConfigs,
      createLdapConfig,
      updateLdapConfig,
      deleteLdapConfig,
      testLdapConnection,
    }),
    [isLoading, getLdapConfigs, createLdapConfig, updateLdapConfig, deleteLdapConfig, testLdapConnection]
  );

  return (
    <LdapContext.Provider value={memoizedValue}>
      {children}
    </LdapContext.Provider>
  );
};
