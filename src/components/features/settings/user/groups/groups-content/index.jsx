'use client';

import { CreateGroupSidebar } from '@/components/features/settings/user/groups/CreateGroupSidebar';
import { renderGroupCell } from '@/components/features/settings/user/groups/renderGroupCell';
import { Button } from '@/components/ui/button';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { TimelineModal } from '@/components/ui/timeline-modal';
import { useGroupsScreen } from '@/hooks/settings/user/groups/useGroupsScreen';
import { GROUPS_COLUMNS, GROUP_TIMELINE_STEPS } from '@/utils/constants/settings/users/groups';
import { Icon } from '@iconify/react';
import sharedStyles from '@/screens/settings/shared-settings-styles.module.css';

export const GroupsContent = () => {
  const {
    searchTags,
    setSearchTags,
    showCreate,
    currentPage,
    setCurrentPage,
    pageSize,
    newGroup,
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
  } = useGroupsScreen();

  return (
    <>
      <div className={sharedStyles.mainContent}>
        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.contentHeader}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search groups..."
            />
            <div className={sharedStyles.headerActions}>
              <Button variant="cyan" onClick={openCreate}>
                <Icon icon="mdi:plus" width={18} />
                Create Group
              </Button>
            </div>
          </div>

          <div className={sharedStyles.listPageBody}>
            <Table
              className={sharedStyles.settingsListTable}
              columns={GROUPS_COLUMNS}
              data={tableData}
              keyExtractor={(p) => p.id}
              renderCell={(row, col) => renderGroupCell(row, col, handleEdit, handleDelete)}
              emptyTitle="No Groups Found"
              emptyMessage="There are currently no groups matching your criteria."
              emptyIcon="mdi:account-multiple-outline"
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

      <CreateGroupSidebar
        isOpen={showCreate}
        onClose={closeCreate}
        group={newGroup}
        isEditing={!!editingItem}
        onChange={handleFieldChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onInfoClick={() => setShowTimeline(true)}
      />

      <TimelineModal
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        title="Group Creation Process"
        steps={GROUP_TIMELINE_STEPS}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.name || ''}
        itemType="Group"
      />
    </>
  );
};
