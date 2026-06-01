'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { useCredentialProfile } from '@/hooks/discovery-settings/credential-profile/profile/useCredentialProfile';
import { copyToClipboard } from '@/utils/copyToClipboard';

export const CredentialScreenContext = createContext(null);

export const CredentialScreenProvider = ({ children }) => {
  const { showSuccess, showError } = useToast();
  const {
    getAllCredentialProfiles,
    createCredentialProfile,
    editCredentialProfile,
    deleteCredentialProfile,
  } = useCredentialProfile();

  const [searchTags, setSearchTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const [credentialsList, setCredentialsList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchCredentials = useCallback(async () => {
    const params = { page: currentPage, limit: pageSize };
    if (searchTags.length > 0) params.search = searchTags.join(' ');
    const data = await getAllCredentialProfiles(params);
    if (data) {
      setCredentialsList(data.items || []);
      setTotalRecords(data.total_records || 0);
    }
  }, [currentPage, pageSize, searchTags, getAllCredentialProfiles]);

  useEffect(() => {
    fetchCredentials();
  }, [fetchCredentials]);

  const handleEdit = useCallback((credential) => {
    setSelectedCredential(credential);
    setShowCreateModal(true);
  }, []);

  const handleDelete = useCallback((credential) => {
    setSelectedCredential(credential);
    setShowDeleteConfirm(true);
  }, []);

  const handleCopy = useCallback(
    async (credential) => {
      const text = [
        `Credential: ${credential.name}`,
        `Type: ${credential.type}`,
        credential.protocol ? `Protocol: ${credential.protocol}` : null,
        credential.groups?.length ? `Groups: ${credential.groups.join(', ')}` : null,
      ]
        .filter(Boolean)
        .join('\n');

      const ok = await copyToClipboard(text);
      if (ok) showSuccess('Credential details copied to clipboard');
      else showError('Failed to copy to clipboard');
    },
    [showSuccess, showError]
  );

  const handleDuplicate = useCallback((credential) => {
    setSelectedCredential({ ...credential, name: `${credential.name} (Copy)`, id: null });
    setShowCreateModal(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (selectedCredential) {
      const res = await deleteCredentialProfile(selectedCredential.id);
      if (res) fetchCredentials();
    }
    setShowDeleteConfirm(false);
    setSelectedCredential(null);
  }, [selectedCredential, deleteCredentialProfile, fetchCredentials]);

  const closeDeleteConfirm = useCallback(() => {
    setShowDeleteConfirm(false);
    setSelectedCredential(null);
  }, []);

  const openCreate = useCallback(() => {
    setSelectedCredential(null);
    setShowCreateModal(true);
  }, []);

  const closeCreateModal = useCallback(() => {
    setShowCreateModal(false);
    setSelectedCredential(null);
  }, []);

  const handleSaveModal = useCallback(
    async (formData) => {
      let res;
      if (selectedCredential?.id) {
        res = await editCredentialProfile({ ...formData, id: selectedCredential.id });
      } else {
        res = await createCredentialProfile(formData);
      }
      if (res) {
        closeCreateModal();
        fetchCredentials();
      }
    },
    [
      selectedCredential,
      editCredentialProfile,
      createCredentialProfile,
      closeCreateModal,
      fetchCredentials,
    ]
  );

  const handlePageSizeChange = useCallback((size) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const value = useMemo(
    () => ({
      searchTags,
      setSearchTags,
      currentPage,
      setCurrentPage,
      pageSize,
      showCreateModal,
      selectedCredential,
      showDeleteConfirm,
      showActionsMenu,
      setShowActionsMenu,
      credentialsList,
      totalRecords,
      handleEdit,
      handleDelete,
      handleCopy,
      handleDuplicate,
      confirmDelete,
      closeDeleteConfirm,
      openCreate,
      closeCreateModal,
      handleSaveModal,
      handlePageSizeChange,
    }),
    [
      searchTags,
      currentPage,
      pageSize,
      showCreateModal,
      selectedCredential,
      showDeleteConfirm,
      showActionsMenu,
      credentialsList,
      totalRecords,
      handleEdit,
      handleDelete,
      handleCopy,
      handleDuplicate,
      confirmDelete,
      closeDeleteConfirm,
      openCreate,
      closeCreateModal,
      handleSaveModal,
      handlePageSizeChange,
    ]
  );

  return (
    <CredentialScreenContext.Provider value={value}>{children}</CredentialScreenContext.Provider>
  );
};
