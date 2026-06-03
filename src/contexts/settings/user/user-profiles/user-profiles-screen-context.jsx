'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useUserProfile } from '@/hooks/settings/user/user-profiles/useUserProfile';
import { EMPTY_PROFILE } from '@/utils/constants/settings/users/user-profiles';

export const UserProfilesScreenContext = createContext(null);

export const UserProfilesScreenProvider = ({ children }) => {
  const { getAllUserProfiles, createUserProfile, editUserProfile, deleteUserProfile } =
    useUserProfile();
  const [profilesList, setProfilesList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTags, setSearchTags] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [newProfile, setNewProfile] = useState(EMPTY_PROFILE);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfiles = useCallback(async () => {
    setIsLoading(true);
    const params = { page: currentPage, limit: pageSize };
    if (searchTags.length > 0) params.search = searchTags.join(' ');
    const data = await getAllUserProfiles(params);
    if (data) {
      setProfilesList(data.items || []);
      setTotalRecords(data.total_records || 0);
    }
    setIsLoading(false);
  }, [currentPage, pageSize, searchTags, getAllUserProfiles]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const tableData = useMemo(
    () =>
      profilesList.map((profile) => ({
        id: profile.id,
        name: profile.name || '',
        description: profile.description || '',
        scopeBy: profile.role?.name || profile.groups?.[0]?.name || 'Custom',
        user: profile.users?.[0]?.id || '',
        role: profile.role_id || '',
        groups: profile.groups?.[0]?.id || '',
      })),
    [profilesList]
  );

  const handleFieldChange = useCallback((key, value) => {
    setNewProfile((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    const payload = {
      name: newProfile.name,
      description: newProfile.description,
      role_id: parseInt(newProfile.role, 10) || 1,
      group_ids: [parseInt(newProfile.groups, 10) || 1],
      user_id: parseInt(newProfile.user, 10) || 1,
    };
    if (editingItem) {
      payload.id = editingItem.id;
      const success = await editUserProfile(payload);
      if (success) {
        setShowCreate(false);
        setEditingItem(null);
        fetchProfiles();
      }
    } else {
      const success = await createUserProfile(payload);
      if (success) {
        setShowCreate(false);
        setNewProfile(EMPTY_PROFILE);
        fetchProfiles();
      }
    }
  }, [newProfile, editingItem, editUserProfile, createUserProfile, fetchProfiles]);

  const handleReset = useCallback(() => {
    setNewProfile(editingItem ? { ...EMPTY_PROFILE, ...editingItem } : EMPTY_PROFILE);
  }, [editingItem]);

  const openCreate = useCallback(() => {
    setEditingItem(null);
    setNewProfile(EMPTY_PROFILE);
    setShowCreate(true);
  }, []);

  const closeCreate = useCallback(() => {
    setShowCreate(false);
    setEditingItem(null);
  }, []);

  const handleEdit = useCallback((profile) => {
    setEditingItem(profile);
    setNewProfile({ ...EMPTY_PROFILE, ...profile });
    setShowCreate(true);
  }, []);

  const handleDelete = useCallback((profile) => {
    setItemToDelete(profile);
    setShowDeleteModal(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!itemToDelete) return;
    const success = await deleteUserProfile(itemToDelete.id);
    if (success) {
      closeDeleteModal();
      fetchProfiles();
    }
  }, [itemToDelete, deleteUserProfile, closeDeleteModal, fetchProfiles]);

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
      newProfile,
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
      newProfile,
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

  return (
    <UserProfilesScreenContext.Provider value={value}>{children}</UserProfilesScreenContext.Provider>
  );
};
