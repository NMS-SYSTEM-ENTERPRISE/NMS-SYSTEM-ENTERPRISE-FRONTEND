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
import { useState, useEffect } from 'react';
import { useLdap } from '@/hooks/settings/user/ldap-server/useLdap';
import styles from '../../shared-settings-styles.module.css';

// ─── Main Screen ──────────────────────────────────────────────

const LDAPServerSettings = () => {
  const { getLdapConfigs, createLdapConfig, updateLdapConfig, deleteLdapConfig } = useLdap();

  const [servers, setServers] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

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

  const mapConfigToFrontend = (config) => ({
    id: config.id,
    ipHost: config.primary_host,
    fqdn: config.domain_name,
    ldapGroups: config.ldap_groups || '-',
    lastSyncAt: config.updated_at ? new Date(config.updated_at).toLocaleString() : '-',
    
    // Additional fields for the form
    primaryIpHost: config.primary_host || '',
    secondaryIpHost: config.secondary_host || '',
    domainName: config.domain_name || '',
    serverType: config.server_type || 'Microsoft AD',
    secureLdap: config.secure_ldap || false,
    port: config.port || 389,
    userName: config.user_name || '',
    password: config.password || '',
    ldapAuthentication: config.ldap_auth || false,
    autoSync: config.auto_sync || false,
  });

  const fetchServers = async () => {
    const data = await getLdapConfigs({
      page: currentPage,
      limit: pageSize,
      search: searchTags.join(',') || undefined,
    });
    if (data) {
      setServers(data.items.map(mapConfigToFrontend));
      setTotalRecords(data.total_records);
    }
  };

  useEffect(() => {
    fetchServers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, searchTags]);

  const handleFieldChange = (key, value) =>
    setNewServer((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    const payload = {
      primary_host: newServer.primaryIpHost,
      secondary_host: newServer.secondaryIpHost,
      domain_name: newServer.domainName,
      server_type: newServer.serverType,
      secure_ldap: newServer.secureLdap,
      port: Number(newServer.port) || 389,
      user_name: newServer.userName,
      password: newServer.password,
      ldap_auth: newServer.ldapAuthentication,
      auto_sync: newServer.autoSync,
      ldap_groups: newServer.ldapGroups || '',
    };

    let result;
    if (editingItem) {
      result = await updateLdapConfig(editingItem.id, payload);
    } else {
      result = await createLdapConfig(payload);
    }

    if (result) {
      setShowAdd(false);
      setEditingItem(null);
      fetchServers();
    }
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

  const confirmDelete = async () => {
    const result = await deleteLdapConfig(itemToDelete.id);
    if (result) {
      setShowDeleteModal(false);
      setItemToDelete(null);
      fetchServers();
    }
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
            data={servers}
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
            totalItems={totalRecords}
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
