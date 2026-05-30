'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  allDiscoveryTagsApi,
  createDiscoveryTagApi,
  deleteDiscoveryTagApi,
  editDiscoveryTagApi,
} from '@/networking/discovery-settings/discovery-profile/tags/tags-apis';

export const DiscoveryTagsContext = createContext(null);

export const DiscoveryTagsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const getAllDiscoveryTags = useCallback(
    async (params = {}) => {
      setIsLoading(true);
      try {
        const response = await allDiscoveryTagsApi(params);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          return data;
        } else {
          showError(data?.message || 'Failed to fetch tags list.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error fetching tags.');
        console.error('Get all discovery tags error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const createDiscoveryTag = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await createDiscoveryTagApi(payload);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          showSuccess(data?.message || 'Tag created successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to create tag.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error creating tag.');
        console.error('Create discovery tag error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const editDiscoveryTag = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await editDiscoveryTagApi(payload);
        const { status, data } = response;
        if (status === 200) {
          showSuccess(data?.message || 'Tag updated successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to update tag.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error updating tag.');
        console.error('Edit discovery tag error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const deleteDiscoveryTag = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const response = await deleteDiscoveryTagApi(id);
        const { status, data } = response;
        if (status === 200 || status === 204) {
          showSuccess(data?.message || 'Tag deleted successfully.');
          return data || { success: true };
        } else {
          showError(data?.message || 'Failed to delete tag.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error deleting tag.');
        console.error('Delete discovery tag error:', error);
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
      getAllDiscoveryTags,
      createDiscoveryTag,
      editDiscoveryTag,
      deleteDiscoveryTag,
    }),
    [isLoading, getAllDiscoveryTags, createDiscoveryTag, editDiscoveryTag, deleteDiscoveryTag]
  );

  return (
    <DiscoveryTagsContext.Provider value={memoizedValue}>
      {children}
    </DiscoveryTagsContext.Provider>
  );
};
