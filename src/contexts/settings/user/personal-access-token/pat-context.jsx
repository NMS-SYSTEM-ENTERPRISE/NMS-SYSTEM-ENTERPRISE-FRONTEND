'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  allPatsApi,
  generatePatApi,
  createPatApi,
  deletePatApi,
  editPatApi,
} from '@/networking/settings/user/personal-access-token/pat-apis';

export const PatContext = createContext(null);

export const PatProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const getAllPats = useCallback(
    async (params = {}) => {
      setIsLoading(true);
      try {
        const response = await allPatsApi(params);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          return data;
        } else {
          showError(data?.message || 'Failed to fetch personal access tokens.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error fetching personal access tokens.');
        console.error('Get all PATs error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const generatePat = useCallback(
    async () => {
      setIsLoading(true);
      try {
        const response = await generatePatApi();
        const { status, data } = response;
        if (status === 200) {
          return data;
        } else {
          showError(data?.message || 'Failed to generate token.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error generating token.');
        console.error('Generate PAT error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const createPat = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await createPatApi(payload);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          showSuccess(data?.message || 'Personal access token created successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to create personal access token.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error creating personal access token.');
        console.error('Create PAT error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const editPat = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await editPatApi(payload);
        const { status, data } = response;
        if (status === 200) {
          showSuccess(data?.message || 'Personal access token updated successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to update personal access token.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error updating personal access token.');
        console.error('Edit PAT error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const deletePat = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const response = await deletePatApi(id);
        const { status, data } = response;
        if (status === 200 || status === 204) {
          showSuccess(data?.message || 'Personal access token deleted successfully.');
          return data || { success: true };
        } else {
          showError(data?.message || 'Failed to delete personal access token.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error deleting personal access token.');
        console.error('Delete PAT error:', error);
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
      getAllPats,
      generatePat,
      createPat,
      editPat,
      deletePat,
    }),
    [isLoading, getAllPats, generatePat, createPat, editPat, deletePat]
  );

  return (
    <PatContext.Provider value={memoizedValue}>
      {children}
    </PatContext.Provider>
  );
};
