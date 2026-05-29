'use client';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { AddLdapServerSidebar } from '@/components/features/settings/user/ldap-server/AddLdapServerSidebar';
import { renderServerCell } from '@/components/features/settings/user/ldap-server/renderServerCell';
import { SyncModal } from '@/components/features/settings/user/ldap-server/SyncModal';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { TimelineModal } from '@/components/ui/timeline-modal';
import { MOCK_LDAP_SERVERS } from '@/utils/dummy-data/settings/users';
import {
  LDAP_COLUMNS as COLUMNS,
  EMPTY_LDAP_SERVER as EMPTY_SERVER,
  LDAP_TIMELINE_STEPS,
} from '@/utils/constants/settings/users';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';

// ─── Main Screen ──────────────────────────────────────────────

const LDAPServerSettings = () => {
  const [searchTags, setSearchTags] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [newServer, setNewServer] = useState(EMPTY_SERVER);
  const [editingItem, setEditingItem] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [itemToSync, setItemToSync] = useState(null);
  const [showSyncModal, setShowSyncModal] = useState(false);

  const filteredServers = MOCK_LDAP_SERVERS.filter((s) => {
    if (searchTags.length === 0) return true;
    return searchTags.every(tag => {
      const lowerTag = tag.toLowerCase();
      return s.ipHost.toLowerCase().includes(lowerTag) ||
        (s.fqdn && s.fqdn.toLowerCase().includes(lowerTag));
    });
  });

  const handleFieldChange = (key, value) =>
    setNewServer((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    console.log(editingItem ? 'Update LDAP Server:' : 'Add LDAP Server:', newServer);
    setShowAdd(false);
    setEditingItem(null);
  };

  const handleReset = () => {
    setNewServer(editingItem || EMPTY_SERVER);
  };

  const handleEdit = (server) => {
    setEditingItem(server);
    setNewServer(server);
    setShowAdd(true);
  };

  const handleDelete = (server) => {
    setItemToDelete(server);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleted server:', itemToDelete);
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleSync = (server) => {
    setItemToSync(server);
    setShowSyncModal(true);
  };

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          {/* Page header with Breadcrumbs and Actions */}
          <div className={styles.contentHeader}>
            <div>
              <div className={styles.breadcrumbs}>
                Settings / User / <span>LDAP Servers</span>
              </div>
              <h2 className={styles.pageTitle}>LDAP Directory Sync</h2>
              <p className={styles.pageDescription}>
                Configure LDAP endpoints to synchronize users and roles from external directories. For more information:{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setShowTimeline(true); }} className={styles.linkBlue}>
                  LDAP Documentation <Icon icon="mdi:open-in-new" width={14} height={14} />
                </a>
              </p>
            </div>

            <div className={styles.headerActions}>
              <SearchInput
                tags={searchTags}
                onTagsChange={setSearchTags}
                placeholder="Search LDAP servers..."
              />
              <Button variant="cyan" onClick={() => {
                setEditingItem(null);
                setNewServer(EMPTY_SERVER);
                setShowAdd(true);
              }}>
                <Icon icon="mdi:plus" width={18} />
                Add LDAP Server
              </Button>
            </div>
          </div>

          {/* Data Table */}
          <Table
            columns={COLUMNS}
            data={filteredServers}
            keyExtractor={(s) => s.id}
            renderCell={(row, col) => {
              if (col.key === 'sync') {
                return (
                  <div className={styles.actions} style={{ justifyContent: 'center' }}>
                    <button type="button" className={styles.actionBtn} onClick={() => handleSync(row)} title="Sync Now">
                      <Icon icon="mdi:play-circle-outline" width={20} style={{ color: 'var(--color-chart-cyan)' }} />
                    </button>
                  </div>
                );
              }
              return renderServerCell(row, col, handleEdit, handleDelete);
            }}
            emptyMessage="No LDAP servers configured."
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredServers.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
          />
        </div>
      </div>

      {/* Add LDAP Server Sidebar */}
      <AddLdapServerSidebar
        isOpen={showAdd}
        onClose={() => {
          setShowAdd(false);
          setEditingItem(null);
        }}
        server={newServer}
        isEditing={!!editingItem}
        onChange={handleFieldChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onInfoClick={() => setShowTimeline(true)}
      />

      {/* Configuration Process Timeline Modal */}
      <TimelineModal
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        title="LDAP Server Setup"
        steps={LDAP_TIMELINE_STEPS}
      />

      {/* Sync Status Modal */}
      <SyncModal
        isOpen={showSyncModal}
        onClose={() => setShowSyncModal(false)}
        server={itemToSync}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.ipHost || ''}
        itemType="LDAP Server"
      />
    </>
  );
};

export default LDAPServerSettings;
