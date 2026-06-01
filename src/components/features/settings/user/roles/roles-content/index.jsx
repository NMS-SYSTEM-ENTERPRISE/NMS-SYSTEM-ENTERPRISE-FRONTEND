'use client';

import { CreateRoleSidebar } from '@/components/features/settings/user/roles/CreateRoleSidebar';
import { renderRoleCell } from '@/components/features/settings/user/roles/renderRoleCell';
import { Button } from '@/components/ui/button';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { TimelineModal } from '@/components/ui/timeline-modal';
import { useRolesScreen } from '@/hooks/settings/user/roles/useRolesScreen';
import { ROLES_COLUMNS, ROLE_TIMELINE_STEPS } from '@/utils/constants/settings/users/roles';
import { Icon } from '@iconify/react';
import sharedStyles from '@/screens/settings/shared-settings-styles.module.css';

export const RolesContent = () => {
  const {
    searchTags,
    setSearchTags,
    showCreate,
    currentPage,
    setCurrentPage,
    pageSize,
    newRole,
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
  } = useRolesScreen();

  return (
    <>
      <div className={sharedStyles.mainContent}>
        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.contentHeader}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search roles..."
            />
            <div className={sharedStyles.headerActions}>
              <Button variant="cyan" onClick={openCreate}>
                <Icon icon="mdi:plus" width={18} />
                Create Role
              </Button>
            </div>
          </div>

          <div className={sharedStyles.listPageBody}>
            <Table
              className={sharedStyles.settingsListTable}
              columns={ROLES_COLUMNS}
              data={tableData}
              keyExtractor={(r) => r.id}
              renderCell={(row, col) => renderRoleCell(row, col, handleEdit, handleDelete)}
              emptyMessage="No roles found."
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

      <CreateRoleSidebar
        isOpen={showCreate}
        onClose={closeCreate}
        role={newRole}
        isEditing={!!editingItem}
        onChange={handleFieldChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onInfoClick={() => setShowTimeline(true)}
      />

      <TimelineModal
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        title="Role Creation Process"
        steps={ROLE_TIMELINE_STEPS}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.name || ''}
        itemType="Role"
      />
    </>
  );
};
