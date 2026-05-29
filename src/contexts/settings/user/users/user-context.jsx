'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  allUsersApi,
  createUserApi,
  deleteUserApi,
  editUserApi,
  getUserMeApi,
  updateUserMeApi,
} from '@/networking/settings/user/users/user-apis';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserMe, setCurrentUserMe] = useState(null);
  const { showSuccess, showError } = useToast();

  const getAllUsers = useCallback(
    async (params = {}) => {
      setIsLoading(true);
      try {
        const response = await allUsersApi(params);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          return data;
        } else {
          showError(data?.message || 'Failed to fetch users list.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error fetching users.');
        console.error('Get all users error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const createUser = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await createUserApi(payload);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          showSuccess(data?.message || 'User created successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to create user.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error creating user.');
        console.error('Create user error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const editUser = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await editUserApi(payload);
        const { status, data } = response;
        if (status === 200) {
          showSuccess(data?.message || 'User updated successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to update user.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error updating user.');
        console.error('Edit user error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const deleteUser = useCallback(
    async (userId) => {
      setIsLoading(true);
      try {
        const response = await deleteUserApi(userId);
        const { status, data } = response;
        if (status === 200 || status === 204) {
          showSuccess(data?.message || 'User deleted successfully.');
          return data || { success: true };
        } else {
          showError(data?.message || 'Failed to delete user.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error deleting user.');
        console.error('Delete user error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const getUserMe = useCallback(
    async () => {
      setIsLoading(true);
      try {
        const response = await getUserMeApi();
        const { status, data } = response;
        if (status === 200) {
          setCurrentUserMe(data);
          return data;
        } else {
          showError(data?.message || 'Failed to fetch personal account data.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error fetching personal account.');
        console.error('Get User Me error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const updateUserMe = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await updateUserMeApi(payload);
        const { status, data } = response;
        if (status === 200) {
          showSuccess(data?.message || 'Account settings updated successfully.');
          setCurrentUserMe(data);
          return data;
        } else {
          showError(data?.message || 'Failed to update personal account data.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error updating personal account.');
        console.error('Update User Me error:', error);
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
      currentUserMe,
      getAllUsers,
      createUser,
      editUser,
      deleteUser,
      getUserMe,
      updateUserMe,
    }),
    [
      isLoading,
      currentUserMe,
      getAllUsers,
      createUser,
      editUser,
      deleteUser,
      getUserMe,
      updateUserMe,
    ]
  );

  return (
    <UserContext.Provider value={memoizedValue}>
      {children}
    </UserContext.Provider>
  );
};
