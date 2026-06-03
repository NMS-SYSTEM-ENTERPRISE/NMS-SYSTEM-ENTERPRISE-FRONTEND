'use client';

import { CreateLdapSidebar } from '@/components/features/settings/user/ldap-server/create-ldap-sidebar';
import { renderLdapCell } from '@/components/features/settings/user/ldap-server/renderLdapCell';
import { Button } from '@/components/ui/button';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { useLdapScreen } from '@/hooks/settings/user/ldap-server/useLdapScreen';
import { LDAP_COLUMNS } from '@/utils/constants/settings/users/ldap-server';
import { Icon } from '@iconify/react';
import sharedStyles from '@/screens/settings/shared-settings-styles.module.css';

export const LdapContent = () => {
  const {
    searchTags,
    setSearchTags,
    currentPage,
    setCurrentPage,
    pageSize,
    totalRecords,
    ldapServers,
    showAddModal,
    newServer,
    setNewServer,
    editingItem,
    itemToDelete,
    showDeleteModal,
    openCreate,
    closeModal,
    handleEdit,
    handleDelete,
    closeDeleteModal,
    confirmDelete,
    handleApply,
    handleReset,
    handlePageSizeChange,
    testLdap,
    isLoading,
  } = useLdapScreen();

  return (
    <>
      <div className={sharedStyles.mainContent}>
        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.contentHeader}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search LDAP servers..."
            />
            <div className={sharedStyles.headerActions}>
              <Button variant="cyan" onClick={openCreate}>
                <Icon icon="mdi:plus" width={18} height={18} />
                Add LDAP Server
              </Button>
            </div>
          </div>

          <div className={sharedStyles.listPageBody}>
            <Table
              className={sharedStyles.settingsListTable}
              columns={LDAP_COLUMNS}
              data={ldapServers}
              keyExtractor={(s) => s.id}
              renderCell={(row, col) => renderLdapCell(row, col, handleEdit, handleDelete)}
              emptyTitle="No LDAP Servers"
              emptyMessage="There are currently no LDAP servers configured or matching your criteria."
              emptyIcon="mdi:server-network"
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

      <CreateLdapSidebar
        isOpen={showAddModal}
        onClose={closeModal}
        server={newServer}
        setServer={setNewServer}
        onApply={handleApply}
        onReset={handleReset}
        isEditing={!!editingItem}
        onTest={testLdap}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.primary_host || ''}
        itemType="LDAP Server"
      />
    </>
  );
};
