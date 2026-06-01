'use client';

import { AssignCredentialModal } from '@/components/features/discovery/assignment-credentials';
import { CreateDiscoveryModal } from '@/components/features/discovery/create-discovery-modal';
import { DiscoveredDevicesModal } from '@/components/features/discovery/discovered-devices-modal';
import { ScheduleModal } from '@/components/features/discovery/schdule-modal';
import { renderProfileCell } from '@/components/features/settings/discovery/profile/renderProfileCell';
import { Button } from '@/components/ui/button';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { useDiscoveryProfileScreen } from '@/hooks/settings/discovery/profile/useDiscoveryProfileScreen';
import { DISCOVERY_PROFILE_COLUMNS } from '@/utils/constants/settings/discovery/profile/columns';
import { Icon } from '@iconify/react';
import sharedStyles from '@/screens/settings/shared-settings-styles.module.css';

export const DiscoveryProfileContent = () => {
  const {
    searchTags,
    setSearchTags,
    currentPage,
    setCurrentPage,
    pageSize,
    selectedProfile,
    showAssignModal,
    showCreateModal,
    showScheduleModal,
    showDeleteConfirm,
    showDevicesModal,
    showActionsMenu,
    setShowActionsMenu,
    profilesList,
    totalRecords,
    handleAssignCredential,
    handleEdit,
    handleRun,
    handleSchedule,
    handleViewDevices,
    handleDuplicate,
    handleDelete,
    confirmDelete,
    closeDeleteConfirm,
    openCreate,
    closeCreateModal,
    closeAssignModal,
    closeScheduleModal,
    closeDevicesModal,
    handleSaveModal,
    handleSaveSchedule,
    handlePageSizeChange,
  } = useDiscoveryProfileScreen();

  return (
    <>
      <div className={sharedStyles.mainContent}>
        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.contentHeader}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search discovery profiles..."
            />
            <div className={sharedStyles.headerActions}>
              <Button variant="cyan" onClick={openCreate}>
                <Icon icon="mdi:plus" width={18} height={18} />
                Create Discovery Profile
              </Button>
            </div>
          </div>

          <div className={sharedStyles.listPageBody}>
            <Table
              className={sharedStyles.settingsListTable}
              columns={DISCOVERY_PROFILE_COLUMNS}
              data={profilesList}
              keyExtractor={(profile) => profile.id}
              renderCell={(row, col) =>
                renderProfileCell(
                  row,
                  col,
                  handleRun,
                  handleAssignCredential,
                  handleSchedule,
                  handleEdit,
                  handleDuplicate,
                  handleDelete,
                  handleViewDevices,
                  showActionsMenu,
                  setShowActionsMenu
                )
              }
              emptyMessage="No discovery profiles found."
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

      {showCreateModal && (
        <CreateDiscoveryModal
          profile={selectedProfile}
          onClose={closeCreateModal}
          onSave={handleSaveModal}
        />
      )}

      {showAssignModal && (
        <AssignCredentialModal profile={selectedProfile} onClose={closeAssignModal} />
      )}

      {showScheduleModal && (
        <ScheduleModal
          profileName={selectedProfile?.name}
          onClose={closeScheduleModal}
          onSave={handleSaveSchedule}
        />
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={closeDeleteConfirm}
        onConfirm={confirmDelete}
        itemName={selectedProfile?.name || ''}
        itemType="Discovery Profile"
      />

      {showDevicesModal && (
        <DiscoveredDevicesModal profile={selectedProfile} onClose={closeDevicesModal} />
      )}
    </>
  );
};
