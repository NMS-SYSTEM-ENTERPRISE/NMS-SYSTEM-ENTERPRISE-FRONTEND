'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useUser } from '@/hooks/settings/user/users/useUser';
import { EMPTY_USER } from '@/utils/constants/settings/users/users';

export const UsersScreenContext = createContext(null);

export const UsersScreenProvider = ({ children }) => {
  const { getAllUsers, createUser, editUser, deleteUser } = useUser();

  const [usersList, setUsersList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTags, setSearchTags] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [newUser, setNewUser] = useState(EMPTY_USER);
  const [editingItem, setEditingItem] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchUsers = useCallback(async () => {
    const params = { page: currentPage, limit: pageSize };
    if (searchTags.length > 0) {
      params.search = searchTags.join(' ');
    }
    const data = await getAllUsers(params);
    if (data) {
      setUsersList(data.items || []);
      setTotalRecords(data.total_records || 0);
    }
  }, [currentPage, pageSize, searchTags, getAllUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const mapUserToFrontend = useCallback((user) => ({
    id: user.id,
    firstName: user.first_name || '',
    lastName: user.last_name || '',
    email: user.email || '',
    username: user.username || '',
    mobile: user.mobile_number || '',
    status: user.status,
    groups: user.groups?.length > 0 ? user.groups[0].name : '',
    role: user.role ? user.role.name : '',
    groupId: user.groups?.length > 0 ? user.groups[0].id : '',
    roleId: user.role ? user.role.id : '',
  }), []);

  const tableData = useMemo(
    () => usersList.map(mapUserToFrontend),
    [usersList, mapUserToFrontend]
  );

  const handleFieldChange = useCallback((key, value) => {
    setNewUser((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    const payload = {
      first_name: newUser.firstName,
      last_name: newUser.lastName,
      email: newUser.email,
      username: newUser.username,
      mobile_number: newUser.mobile || null,
      status: newUser.status,
      role_id: newUser.roleId ? Number(newUser.roleId) : 1,
      user_profile_id: 1,
      timezone: 'UTC',
      date_format: 'MM/DD/YYYY',
      time_format: '24-hour',
      group_ids: newUser.groupId ? [Number(newUser.groupId)] : [1],
    };

    if (newUser.password) {
      payload.password = newUser.password;
    }

    if (editingItem) {
      payload.id = editingItem.id;
      const success = await editUser(payload);
      if (success) {
        setShowCreate(false);
        setEditingItem(null);
        fetchUsers();
      }
    } else {
      const success = await createUser(payload);
      if (success) {
        setShowCreate(false);
        setNewUser(EMPTY_USER);
        fetchUsers();
      }
    }
  }, [newUser, editingItem, editUser, createUser, fetchUsers]);

  const handleReset = useCallback(() => {
    setNewUser(
      editingItem
        ? { ...EMPTY_USER, ...editingItem, password: '', confirmPassword: '' }
        : EMPTY_USER
    );
  }, [editingItem]);

  const openCreate = useCallback(() => {
    setEditingItem(null);
    setNewUser(EMPTY_USER);
    setShowCreate(true);
  }, []);

  const closeCreate = useCallback(() => {
    setShowCreate(false);
    setEditingItem(null);
  }, []);

  const handleEdit = useCallback((user) => {
    setEditingItem(user);
    setNewUser({ ...EMPTY_USER, ...user, password: '', confirmPassword: '' });
    setShowCreate(true);
  }, []);

  const handleDelete = useCallback((user) => {
    setItemToDelete(user);
    setShowDeleteModal(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!itemToDelete) return;
    const success = await deleteUser(itemToDelete.id);
    if (success) {
      closeDeleteModal();
      fetchUsers();
    }
  }, [itemToDelete, deleteUser, closeDeleteModal, fetchUsers]);

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
      newUser,
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
    }),
    [
      searchTags,
      showCreate,
      currentPage,
      pageSize,
      newUser,
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
    ]
  );

  return (
    <UsersScreenContext.Provider value={value}>{children}</UsersScreenContext.Provider>
  );
};
