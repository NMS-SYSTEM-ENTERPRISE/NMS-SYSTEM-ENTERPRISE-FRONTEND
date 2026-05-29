'use client';
import { CreateCredentialModal } from '@/components/features/discovery/create-credential-modal';
import { renderCredentialCell } from '@/components/features/settings/discovery/credential/renderCredentialCell';
import { Button } from '@/components/ui/button';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { CREDENTIAL_PROFILE_COLUMNS } from '@/utils/constants/settings/discovery/credential';
import { MOCK_CREDENTIAL_PROFILES } from '@/utils/dummy-data/settings/discovery';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import sharedStyles from '../../shared-settings-styles.module.css';
import styles from './styles.module.css';

export default function CredentialProfile() {
  const [searchTags, setSearchTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const filteredCredentials = useMemo(() => {
    return MOCK_CREDENTIAL_PROFILES.filter((cred) => {
      if (searchTags.length === 0) return true;
      return searchTags.every((tag) => {
        const lowerTag = tag.toLowerCase();
        return (
          cred.name.toLowerCase().includes(lowerTag) ||
          cred.type.toLowerCase().includes(lowerTag)
        );
      });
    });
  }, [searchTags]);

  const handleEdit = (credential) => {
    setSelectedCredential(credential);
    setShowCreateModal(true);
  };

  const handleDelete = (credential) => {
    setSelectedCredential(credential);
    setShowDeleteConfirm(true);
  };

  const handleDuplicate = (credential) => {
    setSelectedCredential({ ...credential, name: `${credential.name} (Copy)` });
    setShowCreateModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleting credential:', selectedCredential);
    setShowDeleteConfirm(false);
    setSelectedCredential(null);
  };

  return (
    <>
      <div className={sharedStyles.mainContent}>
        <div className={styles.mainContent_header}>
          <SearchInput
            tags={searchTags}
            onTagsChange={setSearchTags}
            placeholder="Search credentials..."
          />
          <Button
            variant="cyan"
            className={styles.createButton}
            onClick={() => {
              setSelectedCredential(null);
              setShowCreateModal(true);
            }}
          >
            <Icon icon="mdi:plus" width={18} height={18} />
            Create Credential Profile
          </Button>
        </div>

        <div className={styles.tableContainer}>
          <Table
            columns={CREDENTIAL_PROFILE_COLUMNS}
            data={filteredCredentials}
            keyExtractor={(cred) => cred.id}
            renderCell={(row, col) =>
              renderCredentialCell(
                row,
                col,
                handleEdit,
                handleDuplicate,
                handleDelete
              )
            }
            emptyMessage="No credential profiles found."
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredCredentials.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>

      {showCreateModal && (
        <CreateCredentialModal
          credential={selectedCredential}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedCredential(null);
          }}
          onSave={() => {
            setShowCreateModal(false);
            setSelectedCredential(null);
          }}
        />
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setSelectedCredential(null);
        }}
        onConfirm={confirmDelete}
        itemName={selectedCredential?.name || ''}
        itemType="Credential Profile"
      />
    </>
  );
}
