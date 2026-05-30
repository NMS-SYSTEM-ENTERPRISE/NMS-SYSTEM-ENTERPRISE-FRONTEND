'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  allDiscoveryGroupsApi,
  createDiscoveryGroupApi,
  deleteDiscoveryGroupApi,
  editDiscoveryGroupApi,
} from '@/networking/discovery-settings/discovery-profile/groups/groups-apis';

export const DiscoveryGroupsContext = createContext(null);

export const DiscoveryGroupsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const getAllDiscoveryGroups = useCallback(
    async (params = {}) => {
      setIsLoading(true);
      try {
        const response = await allDiscoveryGroupsApi(params);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          return data;
        } else {
          showError(data?.message || 'Failed to fetch groups list.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error fetching groups.');
        console.error('Get all discovery groups error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const createDiscoveryGroup = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await createDiscoveryGroupApi(payload);
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
        console.error('Create discovery group error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const editDiscoveryGroup = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await editDiscoveryGroupApi(payload);
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
        console.error('Edit discovery group error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const deleteDiscoveryGroup = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const response = await deleteDiscoveryGroupApi(id);
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
        console.error('Delete discovery group error:', error);
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
      getAllDiscoveryGroups,
      createDiscoveryGroup,
      editDiscoveryGroup,
      deleteDiscoveryGroup,
    }),
    [isLoading, getAllDiscoveryGroups, createDiscoveryGroup, editDiscoveryGroup, deleteDiscoveryGroup]
  );

  return (
    <DiscoveryGroupsContext.Provider value={memoizedValue}>
      {children}
    </DiscoveryGroupsContext.Provider>
  );
};
