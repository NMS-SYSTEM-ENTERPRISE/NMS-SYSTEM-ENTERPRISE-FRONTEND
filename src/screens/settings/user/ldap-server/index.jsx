'use client';

import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { Icon } from '@iconify/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from '../../shared-settings-styles.module.css';

import { LdapProvider } from '@/contexts/settings/user/ldap-server/ldap-context';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { useLdap } from '@/hooks/settings/user/ldap-server/useLdap';
import { CreateLdapSidebar } from '@/components/features/settings/user/ldap-server/create-ldap-sidebar';
import { renderLdapCell } from '@/components/features/settings/user/ldap-server/renderLdapCell';

const COLUMNS = [
  { key: 'primary_host', label: 'IP/HOST' },
  { key: 'domain_name', label: 'DOMAIN' },
  { key: 'server_type', label: 'SERVER TYPE' },
  { key: 'ldap_groups', label: 'LDAP GROUPS' },
  { key: 'actions', label: 'ACTIONS' },
];

const EMPTY_SERVER = {
  primary_host: '',
  secondary_host: '',
  domain_name: '',
  server_type: 'Microsoft AD',
  secure_ldap: false,
  port: '389',
  user_name: '',
  password: '',
  ldap_auth: false,
  auto_sync: false,
  ldap_groups: '',
};

const LdapServerContent = () => {
  const { isLoading, getAllLdaps, createLdap, editLdap, deleteLdap, testLdap } = useLdap();

  const [searchTags, setSearchTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const [ldapServers, setLdapServers] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newServer, setNewServer] = useState(EMPTY_SERVER);

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

  const handleEdit = (server) => {
    setEditingItem(server);
    setNewServer({ ...EMPTY_SERVER, ...server, password: '' }); // Don't prefill password
    setShowAddModal(true);
  };

  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (server) => {
    setItemToDelete(server);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      const res = await deleteLdap(itemToDelete.id);
      if (res) {
        fetchLdaps();
      }
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const handleApply = async () => {
    let res;
    if (editingItem) {
      res = await editLdap(editingItem.id, newServer);
    } else {
      res = await createLdap(newServer);
    }

    if (res) {
      setShowAddModal(false);
      setEditingItem(null);
      setNewServer(EMPTY_SERVER);
      fetchLdaps();
    }
  };

  const handleReset = () => {
    setNewServer(editingItem ? { ...EMPTY_SERVER, ...editingItem, password: '' } : EMPTY_SERVER);
  };

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search LDAP servers..."
            />
            <div className={styles.headerActions}>
              <Button
                variant="cyan"
                onClick={() => {
                  setEditingItem(null);
                  setNewServer(EMPTY_SERVER);
                  setShowAddModal(true);
                }}
              >
                <Icon icon="mdi:plus" width={18} height={18} />
                Add LDAP Server
              </Button>
            </div>
          </div>

          <div className={styles.listPageBody}>
            <Table
              className={styles.settingsListTable}
              columns={COLUMNS}
              data={ldapServers}
              keyExtractor={(s) => s.id}
              renderCell={(row, col) => renderLdapCell(row, col, handleEdit, handleDelete)}
              emptyMessage="No LDAP servers found."
            />

            <Pagination
              className={styles.settingsListPagination}
              currentPage={currentPage}
              totalItems={totalRecords}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      <CreateLdapSidebar
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingItem(null);
        }}
        server={newServer}
        setServer={setNewServer}
        onApply={handleApply}
        onReset={handleReset}
        isEditing={!!editingItem}
        onTest={testLdap}
      />
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.primary_host || ''}
        itemType="LDAP Server"
      />
    </>
  );
};

const LDAPServerSettings = () => {
  return (
    <LdapProvider>
      <LdapServerContent />
    </LdapProvider>
  );
};

export default LDAPServerSettings;
