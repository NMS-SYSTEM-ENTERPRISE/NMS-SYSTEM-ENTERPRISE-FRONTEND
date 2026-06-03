'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useGroup } from '@/hooks/settings/user/groups/useGroup';
import { EMPTY_GROUP } from '@/utils/constants/settings/users/groups';

export const GroupsScreenContext = createContext(null);

export const GroupsScreenProvider = ({ children }) => {
  const { getAllGroups, createGroup, editGroup, deleteGroup } = useGroup();
  const [groupsList, setGroupsList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTags, setSearchTags] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [newGroup, setNewGroup] = useState(EMPTY_GROUP);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGroups = useCallback(async () => {
    setIsLoading(true);
    const params = { page: currentPage, limit: pageSize };
    if (searchTags.length > 0) params.search = searchTags.join(' ');
    const data = await getAllGroups(params);
    if (data) {
      setGroupsList(data.items || []);
      setTotalRecords(data.total_records || 0);
    }
    setIsLoading(false);
  }, [currentPage, pageSize, searchTags, getAllGroups]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const tableData = useMemo(
    () =>
      groupsList.map((group) => ({
        id: group.id,
        name: group.name || '',
        description: group.description || '',
        userCount: group.user_count || 0,
      })),
    [groupsList]
  );

  const handleFieldChange = useCallback((key, value) => {
    setNewGroup((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    const payload = { name: newGroup.name, description: newGroup.description };
    if (editingItem) {
      payload.id = editingItem.id;
      const success = await editGroup(payload);
      if (success) {
        setShowCreate(false);
        setEditingItem(null);
        fetchGroups();
      }
    } else {
      const success = await createGroup(payload);
      if (success) {
        setShowCreate(false);
        setNewGroup(EMPTY_GROUP);
        fetchGroups();
      }
    }
  }, [newGroup, editingItem, editGroup, createGroup, fetchGroups]);

  const handleReset = useCallback(() => {
    setNewGroup(editingItem ? { ...EMPTY_GROUP, ...editingItem } : EMPTY_GROUP);
  }, [editingItem]);

  const openCreate = useCallback(() => {
    setEditingItem(null);
    setNewGroup(EMPTY_GROUP);
    setShowCreate(true);
  }, []);

  const closeCreate = useCallback(() => {
    setShowCreate(false);
    setEditingItem(null);
  }, []);

  const handleEdit = useCallback((group) => {
    setEditingItem(group);
    setNewGroup({ ...EMPTY_GROUP, ...group });
    setShowCreate(true);
  }, []);

  const handleDelete = useCallback((group) => {
    setItemToDelete(group);
    setShowDeleteModal(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!itemToDelete) return;
    const success = await deleteGroup(itemToDelete.id);
    if (success) {
      closeDeleteModal();
      fetchGroups();
    }
  }, [itemToDelete, deleteGroup, closeDeleteModal, fetchGroups]);

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
      newGroup,
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
      newGroup,
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

  return <GroupsScreenContext.Provider value={value}>{children}</GroupsScreenContext.Provider>;
};
