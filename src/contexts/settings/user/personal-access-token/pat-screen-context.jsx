'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { usePat } from '@/hooks/settings/user/personal-access-token/usePat';
import { EMPTY_TOKEN } from '@/utils/constants/settings/users/personal-access-token';

export const PatScreenContext = createContext(null);

export const PatScreenProvider = ({ children }) => {
  const { getAllPats, generatePat, createPat, editPat, deletePat } = usePat();
  const [searchTags, setSearchTags] = useState([]);
  const [tokensList, setTokensList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [newToken, setNewToken] = useState(EMPTY_TOKEN);
  const [editingItem, setEditingItem] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTokens = useCallback(async () => {
    setIsLoading(true);
    const params = { page: currentPage, limit: pageSize };
    if (searchTags.length > 0) params.search = searchTags.join(' ');
    const data = await getAllPats(params);
    if (data) {
      setTokensList(data.items || []);
      setTotalRecords(data.total_records || 0);
    }
    setIsLoading(false);
  }, [currentPage, pageSize, searchTags, getAllPats]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  const mapTokenToFrontend = useCallback(
    (t) => ({
      id: t.id,
      name: t.name || '',
      description: t.description || '',
      user: t.user_id || '',
      userName: t.user?.username || `User ID: ${t.user_id}`,
      createdBy: t.created_by?.username || 'System Admin',
      validity: t.validity_days || '',
      token: t.token || '',
      createdTime: t.created_at ? new Date(t.created_at).toLocaleString() : '',
      expiresAt: t.expires_at ? new Date(t.expires_at).toLocaleString() : '',
      status: t.status ? 'Active' : 'Inactive',
    }),
    []
  );

  const tableData = useMemo(
    () => tokensList.map(mapTokenToFrontend),
    [tokensList, mapTokenToFrontend]
  );

  const handleFieldChange = useCallback((key, value) => {
    setNewToken((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    const payload = {
      name: newToken.name,
      description: newToken.description,
      token: newToken.token,
      user_id: parseInt(newToken.user, 10) || 9,
      validity_days: parseInt(newToken.validity, 10) || 30,
      status: true,
    };
    if (editingItem) {
      payload.id = editingItem.id;
      const success = await editPat(payload);
      if (success) {
        setShowCreate(false);
        setEditingItem(null);
        fetchTokens();
      }
    } else {
      const success = await createPat(payload);
      if (success) {
        setShowCreate(false);
        setNewToken(EMPTY_TOKEN);
        fetchTokens();
      }
    }
  }, [newToken, editingItem, editPat, createPat, fetchTokens]);

  const handleGenerateToken = useCallback(async () => {
    const data = await generatePat();
    if (data?.token) handleFieldChange('token', data.token);
  }, [generatePat, handleFieldChange]);

  const handleReset = useCallback(() => {
    setNewToken(editingItem || EMPTY_TOKEN);
  }, [editingItem]);

  const openCreate = useCallback(() => {
    setEditingItem(null);
    setNewToken(EMPTY_TOKEN);
    setShowCreate(true);
  }, []);

  const closeCreate = useCallback(() => {
    setShowCreate(false);
    setEditingItem(null);
  }, []);

  const handleEdit = useCallback((token) => {
    setEditingItem(token);
    setNewToken(token);
    setShowCreate(true);
  }, []);

  const handleDelete = useCallback((token) => {
    setItemToDelete(token);
    setShowDeleteModal(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!itemToDelete) return;
    const success = await deletePat(itemToDelete.id);
    if (success) {
      closeDeleteModal();
      fetchTokens();
    }
  }, [itemToDelete, deletePat, closeDeleteModal, fetchTokens]);

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
      newToken,
      editingItem,
      showTimeline,
      setShowTimeline,
      itemToDelete,
      showDeleteModal,
      tableData,
      totalRecords,
      handleFieldChange,
      handleSubmit,
      handleGenerateToken,
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
      newToken,
      editingItem,
      showTimeline,
      itemToDelete,
      showDeleteModal,
      tableData,
      totalRecords,
      handleFieldChange,
      handleSubmit,
      handleGenerateToken,
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

  return <PatScreenContext.Provider value={value}>{children}</PatScreenContext.Provider>;
};
