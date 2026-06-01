'use client';

import { CreateTokenSidebar } from '@/components/features/settings/user/personal-access-token/CreateTokenSidebar';
import { renderTokenCell } from '@/components/features/settings/user/personal-access-token/renderTokenCell';
import { Button } from '@/components/ui/button';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { TimelineModal } from '@/components/ui/timeline-modal';
import { usePatScreen } from '@/hooks/settings/user/personal-access-token/usePatScreen';
import {
  TOKEN_COLUMNS,
  TOKEN_TIMELINE_STEPS,
} from '@/utils/constants/settings/users/personal-access-token';
import { Icon } from '@iconify/react';
import sharedStyles from '@/screens/settings/shared-settings-styles.module.css';

export const PatContent = () => {
  const {
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
  } = usePatScreen();

  return (
    <>
      <div className={sharedStyles.mainContent}>
        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.contentHeader}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search tokens..."
            />
            <div className={sharedStyles.headerActions}>
              <Button variant="cyan" onClick={openCreate}>
                <Icon icon="mdi:plus" width={18} />
                Create Token
              </Button>
            </div>
          </div>

          <div className={sharedStyles.listPageBody}>
            <Table
              className={sharedStyles.settingsListTable}
              columns={TOKEN_COLUMNS}
              data={tableData}
              keyExtractor={(t) => t.id}
              renderCell={(row, col) => renderTokenCell(row, col, handleEdit, handleDelete)}
              emptyMessage="No access tokens found."
            />
            <Pagination
              className={sharedStyles.settingsListPagination}
              currentPage={currentPage}
              totalItems={totalRecords}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>
      </div>

      <CreateTokenSidebar
        isOpen={showCreate}
        onClose={closeCreate}
        token={newToken}
        isEditing={!!editingItem}
        onChange={handleFieldChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onInfoClick={() => setShowTimeline(true)}
        onGenerate={handleGenerateToken}
      />

      <TimelineModal
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        title="Personal Access Token Creation"
        steps={TOKEN_TIMELINE_STEPS}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.name || ''}
        itemType="Token"
      />
    </>
  );
};
