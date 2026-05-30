'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  allCredentialGroupsApi,
  createCredentialGroupApi,
  deleteCredentialGroupApi,
  editCredentialGroupApi,
} from '@/networking/discovery-settings/credential-profile/groups/groups-apis';

export const CredentialGroupsContext = createContext(null);

export const CredentialGroupsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const getAllCredentialGroups = useCallback(
    async (params = {}) => {
      setIsLoading(true);
      try {
        const response = await allCredentialGroupsApi(params);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          return data;
        } else {
          showError(data?.message || 'Failed to fetch groups list.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error fetching groups.');
        console.error('Get all credential groups error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const createCredentialGroup = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await createCredentialGroupApi(payload);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          showSuccess(data?.message || 'Group created successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to create group.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error creating group.');
        console.error('Create credential group error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const editCredentialGroup = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await editCredentialGroupApi(payload);
        const { status, data } = response;
        if (status === 200) {
          showSuccess(data?.message || 'Group updated successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to update group.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error updating group.');
        console.error('Edit credential group error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const deleteCredentialGroup = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const response = await deleteCredentialGroupApi(id);
        const { status, data } = response;
        if (status === 200 || status === 204) {
          showSuccess(data?.message || 'Group deleted successfully.');
          return data || { success: true };
        } else {
          showError(data?.message || 'Failed to delete group.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error deleting group.');
        console.error('Delete credential group error:', error);
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
      getAllCredentialGroups,
      createCredentialGroup,
      editCredentialGroup,
      deleteCredentialGroup,
    }),
    [isLoading, getAllCredentialGroups, createCredentialGroup, editCredentialGroup, deleteCredentialGroup]
  );

  return (
    <CredentialGroupsContext.Provider value={memoizedValue}>
      {children}
    </CredentialGroupsContext.Provider>
  );
};
