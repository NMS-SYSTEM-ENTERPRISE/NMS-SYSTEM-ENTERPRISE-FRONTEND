'use client';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { CreateTokenSidebar } from '@/components/features/settings/user/personal-access-token/CreateTokenSidebar';
import { renderTokenCell } from '@/components/features/settings/user/personal-access-token/renderTokenCell';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { TimelineModal } from '@/components/ui/timeline-modal';
import { MOCK_TOKENS } from '@/utils/dummy-data/settings/users';
import {
  TOKEN_COLUMNS as COLUMNS,
  EMPTY_TOKEN,
  TOKEN_TIMELINE_STEPS,
} from '@/utils/constants/settings/users';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';

// ─── Main Screen ──────────────────────────────────────────────

const PersonalAccessToken = () => {
  const [searchTags, setSearchTags] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [newToken, setNewToken] = useState(EMPTY_TOKEN);
  const [editingItem, setEditingItem] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredTokens = MOCK_TOKENS.filter((t) => {
    if (searchTags.length === 0) return true;
    return searchTags.every(tag => {
      const lowerTag = tag.toLowerCase();
      return t.name.toLowerCase().includes(lowerTag) ||
        t.description.toLowerCase().includes(lowerTag);
    });
  });

  const handleFieldChange = (key, value) =>
    setNewToken((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    console.log(editingItem ? 'Update Token:' : 'Create Token:', newToken);
    setShowCreate(false);
    setEditingItem(null);
  };

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

  const confirmDelete = () => {
    console.log('Deleted token:', itemToDelete);
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>

          {/* Page header with Breadcrumbs and Actions */}
          <div className={styles.contentHeader}>
            <div>
              <div className={styles.breadcrumbs}>
                Settings / User / <span>Personal Access Tokens</span>
              </div>
              <h2 className={styles.pageTitle}>Personal Access Tokens</h2>
              <p className={styles.pageDescription}>
                Manage programmatic access tokens for API integrations and scripts. For more information:{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setShowTimeline(true); }} className={styles.linkBlue}>
                  Personal Access Token <Icon icon="mdi:open-in-new" width={14} height={14} />
                </a>
              </p>
            </div>

            <div className={styles.headerActions}>
              <SearchInput
                tags={searchTags}
                onTagsChange={setSearchTags}
                placeholder="Search tokens..."
              />
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

          {/* Data Table */}
          <Table
            columns={COLUMNS}
            data={filteredTokens}
            keyExtractor={(t) => t.id}
            renderCell={(row, col) => renderTokenCell(row, col, handleEdit, handleDelete)}
            emptyMessage="No access tokens found."
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredTokens.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
          />
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
