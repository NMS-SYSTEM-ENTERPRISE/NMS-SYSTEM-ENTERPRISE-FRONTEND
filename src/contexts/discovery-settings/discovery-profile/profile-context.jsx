'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  allDiscoveryProfilesApi,
  createDiscoveryProfileApi,
  deleteDiscoveryProfileApi,
  editDiscoveryProfileApi,
} from '@/networking/discovery-settings/discovery-profile/profile/profile-apis';

export const DiscoveryProfileContext = createContext(null);

/**
 * Safely extracts a human-readable error message from API error responses.
 * Handles FastAPI 422 validation errors ({ detail: [{ msg }] }), plain strings, etc.
 */
const extractErrorMessage = (error, fallback = 'An error occurred.') => {
  if (typeof error === 'string') return error;
  if (error?.detail) {
    if (typeof error.detail === 'string') return error.detail;
    if (Array.isArray(error.detail)) {
      const msgs = error.detail
        .map((e) => (typeof e === 'string' ? e : e?.msg))
        .filter(Boolean);
      return msgs.length > 0 ? msgs.join('; ') : fallback;
    }
  }
  if (typeof error?.message === 'string') return error.message;
  return fallback;
};

export const DiscoveryProfileProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const getAllDiscoveryProfiles = useCallback(
    async (params = {}) => {
      setIsLoading(true);
      try {
        const response = await allDiscoveryProfilesApi(params);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          return data;
        } else {
          showError(data?.message || 'Failed to fetch profiles list.');
          return null;
        }
      } catch (error) {
        showError(extractErrorMessage(error, 'Error fetching profiles.'));
        console.error('Get all discovery profiles error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const createDiscoveryProfile = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await createDiscoveryProfileApi(payload);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          showSuccess(data?.message || 'Profile created successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to create profile.');
          return null;
        }
      } catch (error) {
        showError(extractErrorMessage(error, 'Error creating profile.'));
        console.error('Create discovery profile error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const editDiscoveryProfile = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await editDiscoveryProfileApi(payload);
        const { status, data } = response;
        if (status === 200) {
          showSuccess(data?.message || 'Profile updated successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to update profile.');
          return null;
        }
      } catch (error) {
        showError(extractErrorMessage(error, 'Error updating profile.'));
        console.error('Edit discovery profile error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const deleteDiscoveryProfile = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const response = await deleteDiscoveryProfileApi(id);
        const { status, data } = response;
        if (status === 200 || status === 204) {
          showSuccess(data?.message || 'Profile deleted successfully.');
          return data || { success: true };
        } else {
          showError(data?.message || 'Failed to delete profile.');
          return null;
        }
      } catch (error) {
        showError(extractErrorMessage(error, 'Error deleting profile.'));
        console.error('Delete discovery profile error:', error);
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
      getAllDiscoveryProfiles,
      createDiscoveryProfile,
      editDiscoveryProfile,
      deleteDiscoveryProfile,
    }),
    [isLoading, getAllDiscoveryProfiles, createDiscoveryProfile, editDiscoveryProfile, deleteDiscoveryProfile]
  );

  return (
    <DiscoveryProfileContext.Provider value={memoizedValue}>
      {children}
    </DiscoveryProfileContext.Provider>
  );
};

