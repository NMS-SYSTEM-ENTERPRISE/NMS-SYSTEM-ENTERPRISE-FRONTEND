'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  getSsoConfigApi,
  updateSsoConfigApi,
  resetSsoConfigApi,
} from '@/networking/settings/user/single-sign-on/sso-apis';

export const SsoContext = createContext(null);

export const SsoProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const getSsoConfig = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getSsoConfigApi();
      const { status, data } = response;
      if (status === 200) {
        return data;
      } else {
        showError(data?.message || 'Failed to fetch SSO config.');
        return null;
      }
    } catch (error) {
      showError(error?.detail || error?.message || 'Error fetching SSO config.');
      console.error('Get SSO config error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  const updateSsoConfig = useCallback(async (payload) => {
    setIsLoading(true);
    try {
      const response = await updateSsoConfigApi(payload);
      const { status, data } = response;
      if (status === 200) {
        showSuccess(data?.message || 'SSO configuration updated successfully.');
        return data;
      } else {
        showError(data?.message || 'Failed to update SSO configuration.');
        return null;
      }
    } catch (error) {
      showError(error?.detail || error?.message || 'Error updating SSO configuration.');
      console.error('Update SSO config error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  const resetSsoConfig = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await resetSsoConfigApi();
      const { status, data } = response;
      if (status === 200) {
        showSuccess(data?.message || 'SSO configuration reset successfully.');
        return data;
      } else {
        showError(data?.message || 'Failed to reset SSO configuration.');
        return null;
      }
    } catch (error) {
      showError(error?.detail || error?.message || 'Error resetting SSO configuration.');
      console.error('Reset SSO config error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  const memoizedValue = useMemo(
    () => ({
      isLoading,
      getSsoConfig,
      updateSsoConfig,
      resetSsoConfig,
    }),
    [isLoading, getSsoConfig, updateSsoConfig, resetSsoConfig]
  );

  return (
    <SsoContext.Provider value={memoizedValue}>
      {children}
    </SsoContext.Provider>
  );
};
