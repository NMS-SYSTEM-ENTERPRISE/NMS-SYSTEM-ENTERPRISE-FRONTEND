'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useLdap } from '@/hooks/settings/user/ldap-server/useLdap';
import { EMPTY_LDAP_SERVER } from '@/utils/constants/settings/users/ldap-server';

export const LdapScreenContext = createContext(null);

export const LdapScreenProvider = ({ children }) => {
  const { getAllLdaps, createLdap, editLdap, deleteLdap, testLdap } = useLdap();
  const [searchTags, setSearchTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [ldapServers, setLdapServers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newServer, setNewServer] = useState(EMPTY_LDAP_SERVER);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchLdaps = useCallback(async () => {
    const params = {
      page: currentPage,
      records_per_page: pageSize,
      search: searchTags.join(' ') || undefined,
    };
    const res = await getAllLdaps(params);
    if (res) {
      setLdapServers(res.items || []);
      setTotalRecords(res.total_records || 0);
    }
  }, [currentPage, pageSize, searchTags, getAllLdaps]);

  useEffect(() => {
    fetchLdaps();
  }, [fetchLdaps]);

  const openCreate = useCallback(() => {
    setEditingItem(null);
    setNewServer(EMPTY_LDAP_SERVER);
    setShowAddModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowAddModal(false);
    setEditingItem(null);
  }, []);

  const handleEdit = useCallback((server) => {
    setEditingItem(server);
    setNewServer({ ...EMPTY_LDAP_SERVER, ...server, password: '' });
    setShowAddModal(true);
  }, []);

  const handleDelete = useCallback((server) => {
    setItemToDelete(server);
    setShowDeleteModal(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!itemToDelete) return;
    const res = await deleteLdap(itemToDelete.id);
    if (res) fetchLdaps();
    closeDeleteModal();
  }, [itemToDelete, deleteLdap, fetchLdaps, closeDeleteModal]);

  const handleApply = useCallback(async () => {
    let res;
    if (editingItem) {
      res = await editLdap(editingItem.id, newServer);
    } else {
      res = await createLdap(newServer);
    }
    if (res) {
      closeModal();
      setNewServer(EMPTY_LDAP_SERVER);
      fetchLdaps();
    }
  }, [editingItem, newServer, editLdap, createLdap, closeModal, fetchLdaps]);

  const handleReset = useCallback(() => {
    setNewServer(
      editingItem ? { ...EMPTY_LDAP_SERVER, ...editingItem, password: '' } : EMPTY_LDAP_SERVER
    );
  }, [editingItem]);

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
      totalRecords,
      ldapServers,
      showAddModal,
      newServer,
      setNewServer,
      editingItem,
      itemToDelete,
      showDeleteModal,
      openCreate,
      closeModal,
      handleEdit,
      handleDelete,
      closeDeleteModal,
      confirmDelete,
      handleApply,
      handleReset,
      handlePageSizeChange,
      testLdap,
    }),
    [
      searchTags,
      currentPage,
      pageSize,
      totalRecords,
      ldapServers,
      showAddModal,
      newServer,
      editingItem,
      itemToDelete,
      showDeleteModal,
      openCreate,
      closeModal,
      handleEdit,
      handleDelete,
      closeDeleteModal,
      confirmDelete,
      handleApply,
      handleReset,
      handlePageSizeChange,
      testLdap,
    ]
  );

  return <LdapScreenContext.Provider value={value}>{children}</LdapScreenContext.Provider>;
};
