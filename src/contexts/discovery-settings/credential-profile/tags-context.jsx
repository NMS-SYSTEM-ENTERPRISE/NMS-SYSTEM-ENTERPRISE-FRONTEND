'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  allCredentialTagsApi,
  createCredentialTagApi,
  deleteCredentialTagApi,
  editCredentialTagApi,
} from '@/networking/discovery-settings/credential-profile/tags/tags-apis';

export const CredentialTagsContext = createContext(null);

export const CredentialTagsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const getAllCredentialTags = useCallback(
    async (params = {}) => {
      setIsLoading(true);
      try {
        const response = await allCredentialTagsApi(params);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          return data;
        } else {
          showError(data?.message || 'Failed to fetch tags list.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error fetching tags.');
        console.error('Get all credential tags error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const createCredentialTag = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await createCredentialTagApi(payload);
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
        console.error('Create credential tag error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const editCredentialTag = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await editCredentialTagApi(payload);
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
        console.error('Edit credential tag error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const deleteCredentialTag = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const response = await deleteCredentialTagApi(id);
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
        console.error('Delete credential tag error:', error);
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
      getAllCredentialTags,
      createCredentialTag,
      editCredentialTag,
      deleteCredentialTag,
    }),
    [isLoading, getAllCredentialTags, createCredentialTag, editCredentialTag, deleteCredentialTag]
  );

  return (
    <CredentialTagsContext.Provider value={memoizedValue}>
      {children}
    </CredentialTagsContext.Provider>
  );
};
