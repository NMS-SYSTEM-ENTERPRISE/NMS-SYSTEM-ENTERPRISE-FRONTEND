'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  allCredentialProfilesApi,
  createCredentialProfileApi,
  deleteCredentialProfileApi,
  editCredentialProfileApi,
} from '@/networking/discovery-settings/credential-profile/profile/profile-apis';

export const CredentialProfileContext = createContext(null);

export const CredentialProfileProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const getAllCredentialProfiles = useCallback(
    async (params = {}) => {
      setIsLoading(true);
      try {
        const response = await allCredentialProfilesApi(params);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          return data;
        } else {
          showError(data?.message || 'Failed to fetch profiles list.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error fetching profiles.');
        console.error('Get all credential profiles error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const createCredentialProfile = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await createCredentialProfileApi(payload);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          showSuccess(data?.message || 'Profile created successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to create profile.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error creating profile.');
        console.error('Create credential profile error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const editCredentialProfile = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await editCredentialProfileApi(payload);
        const { status, data } = response;
        if (status === 200) {
          showSuccess(data?.message || 'Profile updated successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to update profile.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error updating profile.');
        console.error('Edit credential profile error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const deleteCredentialProfile = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const response = await deleteCredentialProfileApi(id);
        const { status, data } = response;
        if (status === 200 || status === 204) {
          showSuccess(data?.message || 'Profile deleted successfully.');
          return data || { success: true };
        } else {
          showError(data?.message || 'Failed to delete profile.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error deleting profile.');
        console.error('Delete credential profile error:', error);
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
      getAllCredentialProfiles,
      createCredentialProfile,
      editCredentialProfile,
      deleteCredentialProfile,
    }),
    [isLoading, getAllCredentialProfiles, createCredentialProfile, editCredentialProfile, deleteCredentialProfile]
  );

  return (
    <CredentialProfileContext.Provider value={memoizedValue}>
      {children}
    </CredentialProfileContext.Provider>
  );
};
