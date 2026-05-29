'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  allUserProfilesApi,
  createUserProfileApi,
  deleteUserProfileApi,
  editUserProfileApi,
} from '@/networking/settings/user/user-profiles/user-profile-apis';

export const UserProfileContext = createContext(null);

export const UserProfileProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const getAllUserProfiles = useCallback(
    async (params = {}) => {
      setIsLoading(true);
      try {
        const response = await allUserProfilesApi(params);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          return data;
        } else {
          showError(data?.message || 'Failed to fetch user profiles list.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error fetching user profiles.');
        console.error('Get all user profiles error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const createUserProfile = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await createUserProfileApi(payload);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          showSuccess(data?.message || 'User profile created successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to create user profile.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error creating user profile.');
        console.error('Create user profile error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const editUserProfile = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await editUserProfileApi(payload);
        const { status, data } = response;
        if (status === 200) {
          showSuccess(data?.message || 'User profile updated successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to update user profile.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error updating user profile.');
        console.error('Edit user profile error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const deleteUserProfile = useCallback(
    async (profileId) => {
      setIsLoading(true);
      try {
        const response = await deleteUserProfileApi(profileId);
        const { status, data } = response;
        if (status === 200 || status === 204) {
          showSuccess(data?.message || 'User profile deleted successfully.');
          return data || { success: true };
        } else {
          showError(data?.message || 'Failed to delete user profile.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error deleting user profile.');
        console.error('Delete user profile error:', error);
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
      getAllUserProfiles,
      createUserProfile,
      editUserProfile,
      deleteUserProfile,
    }),
    [isLoading, getAllUserProfiles, createUserProfile, editUserProfile, deleteUserProfile]
  );

  return (
    <UserProfileContext.Provider value={memoizedValue}>
      {children}
    </UserProfileContext.Provider>
  );
};
