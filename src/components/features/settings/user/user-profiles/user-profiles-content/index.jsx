'use client';

import { CreateProfileSidebar } from '@/components/features/settings/user/user-profiles/CreateProfileSidebar';
import { renderProfileCell } from '@/components/features/settings/user/user-profiles/renderProfileCell';
import { Button } from '@/components/ui/button';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { TimelineModal } from '@/components/ui/timeline-modal';
import { useUserProfilesScreen } from '@/hooks/settings/user/user-profiles/useUserProfilesScreen';
import {
  GROUPS_COLUMNS as PROFILE_COLUMNS,
  GROUP_TIMELINE_STEPS,
} from '@/utils/constants/settings/users/user-profiles';
import { Icon } from '@iconify/react';
import sharedStyles from '@/screens/settings/shared-settings-styles.module.css';

export const UserProfilesContent = () => {
  const {
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
  } = useUserProfilesScreen();

  return (
    <>
      <div className={sharedStyles.mainContent}>
        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.contentHeader}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search user profiles..."
            />
            <div className={sharedStyles.headerActions}>
              <Button variant="cyan" onClick={openCreate}>
                <Icon icon="mdi:plus" width={18} />
                Create Profile
              </Button>
            </div>
          </div>

          <div className={sharedStyles.listPageBody}>
            <Table
              className={sharedStyles.settingsListTable}
              columns={PROFILE_COLUMNS}
              data={tableData}
              keyExtractor={(p) => p.id}
              renderCell={(row, col) => renderProfileCell(row, col, handleEdit, handleDelete)}
              emptyTitle="No User Profiles Found"
              emptyMessage="There are currently no user profiles matching your criteria."
              emptyIcon="mdi:card-account-details-outline"
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

      <CreateProfileSidebar
        isOpen={showCreate}
        onClose={closeCreate}
        profile={newProfile}
        isEditing={!!editingItem}
        onChange={handleFieldChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onInfoClick={() => setShowTimeline(true)}
      />

      <TimelineModal
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        title="User Profile Creation Process"
        steps={GROUP_TIMELINE_STEPS}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.name || ''}
        itemType="User Profile"
      />
    </>
  );
};
