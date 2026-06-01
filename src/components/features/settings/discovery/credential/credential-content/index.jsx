'use client';

import { CreateCredentialModal } from '@/components/features/discovery/create-credential-modal';
import { renderCredentialCell } from '@/components/features/settings/discovery/credential/renderCredentialCell';
import { Button } from '@/components/ui/button';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { useCredentialScreen } from '@/hooks/settings/discovery/credential/useCredentialScreen';
import { CREDENTIAL_PROFILE_COLUMNS } from '@/utils/constants/settings/discovery/credential/columns';
import { Icon } from '@iconify/react';
import sharedStyles from '@/screens/settings/shared-settings-styles.module.css';

export const CredentialContent = () => {
  const {
    searchTags,
    setSearchTags,
    currentPage,
    setCurrentPage,
    pageSize,
    showCreateModal,
    selectedCredential,
    showDeleteConfirm,
    showActionsMenu,
    setShowActionsMenu,
    credentialsList,
    totalRecords,
    handleEdit,
    handleCopy,
    handleDuplicate,
    handleDelete,
    confirmDelete,
    closeDeleteConfirm,
    openCreate,
    closeCreateModal,
    handleSaveModal,
    handlePageSizeChange,
  } = useCredentialScreen();

  return (
    <>
      <div className={sharedStyles.mainContent}>
        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.contentHeader}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search credentials..."
            />
            <div className={sharedStyles.headerActions}>
              <Button variant="cyan" onClick={openCreate}>
                <Icon icon="mdi:plus" width={18} height={18} />
                Create Credential Profile
              </Button>
            </div>
          </div>

          <div className={sharedStyles.listPageBody}>
            <Table
              className={sharedStyles.settingsListTable}
              columns={CREDENTIAL_PROFILE_COLUMNS}
              data={credentialsList}
              keyExtractor={(cred) => cred.id}
              renderCell={(row, col) =>
                renderCredentialCell(
                  row,
                  col,
                  handleEdit,
                  handleCopy,
                  handleDuplicate,
                  handleDelete,
                  showActionsMenu,
                  setShowActionsMenu
                )
              }
              emptyMessage="No credential profiles found."
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
        <CreateCredentialModal
          credential={selectedCredential}
          onClose={closeCreateModal}
          onSave={handleSaveModal}
        />
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={closeDeleteConfirm}
        onConfirm={confirmDelete}
        itemName={selectedCredential?.name || ''}
        itemType="Credential Profile"
      />
    </>
  );
};
