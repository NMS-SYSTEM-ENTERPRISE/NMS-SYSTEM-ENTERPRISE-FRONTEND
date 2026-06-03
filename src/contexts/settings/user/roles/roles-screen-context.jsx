'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useRole } from '@/hooks/settings/user/roles/useRole';
import { EMPTY_ROLE } from '@/utils/constants/settings/users/roles';

export const RolesScreenContext = createContext(null);

export const RolesScreenProvider = ({ children }) => {
  const { getAllRoles, createRole, editRole, deleteRole } = useRole();
  const [rolesList, setRolesList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTags, setSearchTags] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [newRole, setNewRole] = useState(EMPTY_ROLE);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoles = useCallback(async () => {
    setIsLoading(true);
    const params = { page: currentPage, limit: pageSize };
    if (searchTags.length > 0) params.search = searchTags.join(' ');
    const data = await getAllRoles(params);
    if (data) {
      setRolesList(data.items || []);
      setTotalRecords(data.total_records || 0);
    }
    setIsLoading(false);
  }, [currentPage, pageSize, searchTags, getAllRoles]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const mapRoleToFrontend = useCallback(
    (role) => ({
      id: role.id,
      name: role.name || '',
      description: role.description || '',
      type: role.type || 'Custom',
      permissions: role.permissions || {},
      userCount: role.user_count || 0,
      status: true,
    }),
    []
  );

  const tableData = useMemo(
    () => rolesList.map(mapRoleToFrontend),
    [rolesList, mapRoleToFrontend]
  );

  const handleFieldChange = useCallback((key, value) => {
    setNewRole((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    const payload = {
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions || {},
    };
    if (editingItem) {
      payload.id = editingItem.id;
      const success = await editRole(payload);
      if (success) {
        setShowCreate(false);
        setEditingItem(null);
        fetchRoles();
      }
    } else {
      const success = await createRole(payload);
      if (success) {
        setShowCreate(false);
        setNewRole(EMPTY_ROLE);
        fetchRoles();
      }
    }
  }, [newRole, editingItem, editRole, createRole, fetchRoles]);

  const handleReset = useCallback(() => {
    setNewRole(editingItem ? { ...EMPTY_ROLE, ...editingItem } : EMPTY_ROLE);
  }, [editingItem]);

  const openCreate = useCallback(() => {
    setEditingItem(null);
    setNewRole(EMPTY_ROLE);
    setShowCreate(true);
  }, []);

  const closeCreate = useCallback(() => {
    setShowCreate(false);
    setEditingItem(null);
  }, []);

  const handleEdit = useCallback((role) => {
    setEditingItem(role);
    setNewRole({ ...EMPTY_ROLE, ...role });
    setShowCreate(true);
  }, []);

  const handleDelete = useCallback((role) => {
    setItemToDelete(role);
    setShowDeleteModal(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!itemToDelete) return;
    const success = await deleteRole(itemToDelete.id);
    if (success) {
      closeDeleteModal();
      fetchRoles();
    }
  }, [itemToDelete, deleteRole, closeDeleteModal, fetchRoles]);

  const handlePageSizeChange = useCallback((size) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const value = useMemo(
    () => ({
      searchTags,
      setSearchTags,
      showCreate,
      currentPage,
      setCurrentPage,
      pageSize,
      newRole,
      editingItem,
      showTimeline,
      setShowTimeline,
      itemToDelete,
      showDeleteModal,
      tableData,
      totalRecords,
      handleFieldChange,
      handleSubmit,
      handleReset,
      openCreate,
      closeCreate,
      handleEdit,
      handleDelete,
      closeDeleteModal,
      confirmDelete,
      handlePageSizeChange,
      isLoading,
    }),
    [
      searchTags,
      showCreate,
      currentPage,
      pageSize,
      newRole,
      editingItem,
      showTimeline,
      itemToDelete,
      showDeleteModal,
      tableData,
      totalRecords,
      handleFieldChange,
      handleSubmit,
      handleReset,
      openCreate,
      closeCreate,
      handleEdit,
      handleDelete,
      closeDeleteModal,
      confirmDelete,
      handlePageSizeChange,
      isLoading,
    ]
  );

  return <RolesScreenContext.Provider value={value}>{children}</RolesScreenContext.Provider>;
};
