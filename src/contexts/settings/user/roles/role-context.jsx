'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  allRolesApi,
  createRoleApi,
  deleteRoleApi,
  editRoleApi,
} from '@/networking/settings/user/roles/role-apis';

export const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const getAllRoles = useCallback(
    async (params = {}) => {
      setIsLoading(true);
      try {
        const response = await allRolesApi(params);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          return data;
        } else {
          showError(data?.message || 'Failed to fetch roles list.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error fetching roles.');
        console.error('Get all roles error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const createRole = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await createRoleApi(payload);
        const { status, data } = response;
        if (status === 200 || status === 201) {
          showSuccess(data?.message || 'Role created successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to create role.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error creating role.');
        console.error('Create role error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const editRole = useCallback(
    async (payload) => {
      setIsLoading(true);
      try {
        const response = await editRoleApi(payload);
        const { status, data } = response;
        if (status === 200) {
          showSuccess(data?.message || 'Role updated successfully.');
          return data;
        } else {
          showError(data?.message || 'Failed to update role.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error updating role.');
        console.error('Edit role error:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccess, showError]
  );

  const deleteRole = useCallback(
    async (roleId) => {
      setIsLoading(true);
      try {
        const response = await deleteRoleApi(roleId);
        const { status, data } = response;
        if (status === 200 || status === 204) {
          showSuccess(data?.message || 'Role deleted successfully.');
          return data || { success: true };
        } else {
          showError(data?.message || 'Failed to delete role.');
          return null;
        }
      } catch (error) {
        showError(error?.detail || error?.message || 'Error deleting role.');
        console.error('Delete role error:', error);
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
      getAllRoles,
      createRole,
      editRole,
      deleteRole,
    }),
    [isLoading, getAllRoles, createRole, editRole, deleteRole]
  );

  return (
    <RoleContext.Provider value={memoizedValue}>
      {children}
    </RoleContext.Provider>
  );
};
