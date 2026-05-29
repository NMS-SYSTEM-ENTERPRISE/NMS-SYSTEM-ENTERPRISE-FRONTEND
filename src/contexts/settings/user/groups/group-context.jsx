'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  allGroupsApi,
  createGroupApi,
  deleteGroupApi,
  editGroupApi,
} from '@/networking/settings/user/groups/group-apis';

export const GroupContext = createContext(null);

export const GroupProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const getAllGroups = useCallback(
    async (params = {}) => {
      setIsLoading(true);
      try {
        const response = await allGroupsApi(params);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          return data;
        } else {
          showError(data?.message || 'Failed to fetch groups list.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error fetching groups.');
        console.error('Get all groups error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const createGroup = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await createGroupApi(payload);
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
        console.error('Create group error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const editGroup = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await editGroupApi(payload);
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
        console.error('Edit group error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const deleteGroup = useCallback(
    async (groupId) => {
      setIsLoading(true);
      try {
        const response = await deleteGroupApi(groupId);
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
        console.error('Delete group error:', error);
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
      getAllGroups,
      createGroup,
      editGroup,
      deleteGroup,
    }),
    [isLoading, getAllGroups, createGroup, editGroup, deleteGroup]
  );

  return (
    <GroupContext.Provider value={memoizedValue}>
      {children}
    </GroupContext.Provider>
  );
};
