'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  getPasswordPolicyApi,
  updatePasswordPolicyApi,
  resetPasswordPolicyApi,
} from '@/networking/settings/user/password-settings/password-policy-apis';

export const PasswordPolicyContext = createContext(null);

export const PasswordPolicyProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const getPasswordPolicy = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getPasswordPolicyApi();
      const { status, data } = response;
      if (status === 200) {
        return data;
      } else {
        showError(data?.message || 'Failed to fetch password policy.');
        return null;
      }
    } catch (error) {
      showError(error?.detail || error?.message || 'Error fetching password policy.');
      console.error('Get password policy error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  const updatePasswordPolicy = useCallback(async (payload) => {
    setIsLoading(true);
    try {
      const response = await updatePasswordPolicyApi(payload);
      const { status, data } = response;
      if (status === 200) {
        showSuccess(data?.message || 'Password policy updated successfully.');
        return data;
      } else {
        showError(data?.message || 'Failed to update password policy.');
        return null;
      }
    } catch (error) {
      showError(error?.detail || error?.message || 'Error updating password policy.');
      console.error('Update password policy error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  const resetPasswordPolicy = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await resetPasswordPolicyApi();
      const { status, data } = response;
      if (status === 200) {
        showSuccess(data?.message || 'Password policy reset to default successfully.');
        return data;
      } else {
        showError(data?.message || 'Failed to reset password policy.');
        return null;
      }
    } catch (error) {
      showError(error?.detail || error?.message || 'Error resetting password policy.');
      console.error('Reset password policy error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  const memoizedValue = useMemo(
    () => ({
      isLoading,
      getPasswordPolicy,
      updatePasswordPolicy,
      resetPasswordPolicy,
    }),
    [isLoading, getPasswordPolicy, updatePasswordPolicy, resetPasswordPolicy]
  );

  return (
    <PasswordPolicyContext.Provider value={memoizedValue}>
      {children}
    </PasswordPolicyContext.Provider>
  );
};
