'use client';

import { CreateUserSidebar } from '@/components/features/settings/user/users/CreateUserSidebar';
import { renderUserCell } from '@/components/features/settings/user/users/renderUserCell';
import { Button } from '@/components/ui/button';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { TimelineModal } from '@/components/ui/timeline-modal';
import { useUsersScreen } from '@/hooks/settings/user/users/useUsersScreen';
import {
  USERS_COLUMNS,
  USER_TIMELINE_STEPS,
} from '@/utils/constants/settings/users/users';
import { Icon } from '@iconify/react';
import sharedStyles from '@/screens/settings/shared-settings-styles.module.css';

export const UsersContent = () => {
  const {
    searchTags,
    setSearchTags,
    showCreate,
    currentPage,
    setCurrentPage,
    pageSize,
    newUser,
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
  } = useUsersScreen();

  return (
    <>
      <div className={sharedStyles.mainContent}>
        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.contentHeader}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search users..."
            />
            <div className={sharedStyles.headerActions}>
              <Button variant="cyan" onClick={openCreate}>
                <Icon icon="mdi:plus" width={18} />
                Create User
              </Button>
            </div>
          </div>

          <div className={sharedStyles.listPageBody}>
            <Table
              className={sharedStyles.settingsListTable}
              columns={USERS_COLUMNS}
              data={tableData}
              keyExtractor={(u) => u.id}
              renderCell={(row, col) => renderUserCell(row, col, handleEdit, handleDelete)}
              emptyTitle="No Users Found"
              emptyMessage="There are currently no users matching your criteria."
              emptyIcon="mdi:account-group-outline"
              isLoading={isLoading}
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

      <CreateUserSidebar
        isOpen={showCreate}
        onClose={closeCreate}
        user={newUser}
        isEditing={!!editingItem}
        onChange={handleFieldChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onInfoClick={() => setShowTimeline(true)}
      />

      <TimelineModal
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        title="User Creation Process"
        steps={USER_TIMELINE_STEPS}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.username || ''}
        itemType="User"
      />
    </>
  );
};
