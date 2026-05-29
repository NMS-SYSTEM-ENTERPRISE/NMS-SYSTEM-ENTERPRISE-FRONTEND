'use client';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { CreateTokenSidebar } from '@/components/features/settings/user/personal-access-token/CreateTokenSidebar';
import { renderTokenCell } from '@/components/features/settings/user/personal-access-token/renderTokenCell';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { TimelineModal } from '@/components/ui/timeline-modal';

import {
  TOKEN_COLUMNS as COLUMNS,
  EMPTY_TOKEN,
  TOKEN_TIMELINE_STEPS,
} from '@/utils/constants/settings/users';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import styles from '../../shared-settings-styles.module.css';
import { usePat } from '@/hooks/settings/user/personal-access-token/usePat';

// ─── Main Screen ──────────────────────────────────────────────

const PersonalAccessToken = () => {
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

  const fetchTokens = async () => {
    const params = {
      page: currentPage,
      limit: pageSize,
    };
    if (searchTags.length > 0) {
      params.search = searchTags.join(' ');
    }
    const data = await getAllPats(params);
    if (data) {
      setTokensList(data.items || []);
      setTotalRecords(data.total_records || 0);
    }
  };

  useEffect(() => {
    fetchTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, searchTags]);

  const handleFieldChange = (key, value) =>
    setNewToken((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    const payload = {
      name: newToken.name,
      description: newToken.description,
      token: newToken.token,
      user_id: parseInt(newToken.user) || 9,
      validity_days: parseInt(newToken.validity) || 30,
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
  };

  const handleGenerateToken = async () => {
    const data = await generatePat();
    if (data?.token) {
      handleFieldChange('token', data.token);
    }
  };

  const mapTokenToFrontend = (t) => ({
    id: t.id,
    name: t.name || '',
    description: t.description || '',
    user: t.user_id || '',
    userName: t.user?.username || `User ID: ${t.user_id}`,
    createdBy: 'System Admin',
    validity: t.validity_days || '',
    token: t.token || '',
    createdTime: t.created_at ? new Date(t.created_at).toLocaleString() : '',
    expiresAt: t.expires_at ? new Date(t.expires_at).toLocaleString() : '',
    status: t.status ? 'Active' : 'Inactive',
  });

  const handleReset = () => {
    setNewToken(editingItem || EMPTY_TOKEN);
  };

  const handleEdit = (token) => {
    setEditingItem(token);
    setNewToken(token);
    setShowCreate(true);
  };

  const handleDelete = (token) => {
    setItemToDelete(token);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      const success = await deletePat(itemToDelete.id);
      if (success) {
        setShowDeleteModal(false);
        setItemToDelete(null);
        fetchTokens();
      }
    }
  };

  const tableData = tokensList.map(mapTokenToFrontend);

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>

          {/* Header Bar */}
          <div className={styles.contentHeader}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search tokens..."
            />
            <div className={styles.headerActions}>
              <Button variant="cyan" onClick={() => {
                setEditingItem(null);
                setNewToken(EMPTY_TOKEN);
                setShowCreate(true);
              }}>
                <Icon icon="mdi:plus" width={18} />
                Create Token
              </Button>
            </div>
          </div>

          <div className={styles.listPageBody}>
          <Table
            className={styles.settingsListTable}
            columns={COLUMNS}
            data={tableData}
            keyExtractor={(t) => t.id}
            renderCell={(row, col) => renderTokenCell(row, col, handleEdit, handleDelete)}
            emptyMessage="No access tokens found."
          />

          {/* Pagination */}
          <Pagination
            className={styles.settingsListPagination}
            currentPage={currentPage}
            totalItems={totalRecords}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
          />
          </div>
        </div>
      </div>

      {/* Create Token Sidebar */}
      <CreateTokenSidebar
        isOpen={showCreate}
        onClose={() => {
          setShowCreate(false);
          setEditingItem(null);
        }}
        token={newToken}
        isEditing={!!editingItem}
        onChange={handleFieldChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onInfoClick={() => setShowTimeline(true)}
        onGenerate={handleGenerateToken}
      />

      {/* Creation Process Timeline Modal */}
      <TimelineModal
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        title="Personal Access Token Creation"
        steps={TOKEN_TIMELINE_STEPS}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.name || ''}
        itemType="Token"
      />
    </>
  );
};

export default PersonalAccessToken;
