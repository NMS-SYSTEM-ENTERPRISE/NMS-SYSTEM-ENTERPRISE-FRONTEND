'use client';
import { AssignCredentialModal } from '@/components/features/discovery/assignment-credentials';
import { CreateDiscoveryModal } from '@/components/features/discovery/create-discovery-modal';
import { ScheduleModal } from '@/components/features/discovery/schdule-modal';
import { renderProfileCell } from '@/components/features/settings/discovery/profile/renderProfileCell';
import { Button } from '@/components/ui/button';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { DISCOVERY_PROFILE_COLUMNS } from '@/utils/constants/settings/discovery/profile';
import { MOCK_DISCOVERY_PROFILES } from '@/utils/dummy-data/settings/discovery';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import styles from '../../shared-settings-styles.module.css';

export default function DiscoveryProfile() {
  const [searchTags, setSearchTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);

  const filteredProfiles = useMemo(() => {
    return MOCK_DISCOVERY_PROFILES.filter((profile) => {
      if (searchTags.length === 0) return true;
      return searchTags.every((tag) => {
        const lowerTag = tag.toLowerCase();
        return (
          profile.name.toLowerCase().includes(lowerTag) ||
          profile.host.toLowerCase().includes(lowerTag)
        );
      });
    });
  }, [searchTags]);

  const handleAssignCredential = (profile) => {
    setSelectedProfile(profile);
    setShowAssignModal(true);
    setShowActionsMenu(null);
  };

  const handleEdit = (profile) => {
    setSelectedProfile(profile);
    setShowCreateModal(true);
    setShowActionsMenu(null);
  };

  const handleRun = (profile) => {
    console.log('Running discovery:', profile);
    setShowActionsMenu(null);
  };

  const handleSchedule = (profile) => {
    setSelectedProfile(profile);
    setShowScheduleModal(true);
    setShowActionsMenu(null);
  };

  const handleDuplicate = (profile) => {
    setSelectedProfile({ ...profile, name: `${profile.name} (Copy)` });
    setShowCreateModal(true);
    setShowActionsMenu(null);
  };

  const handleDelete = (profile) => {
    setSelectedProfile(profile);
    setShowDeleteConfirm(true);
    setShowActionsMenu(null);
  };

  const confirmDelete = () => {
    console.log('Deleting profile:', selectedProfile);
    setShowDeleteConfirm(false);
    setSelectedProfile(null);
  };

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search discovery profiles..."
            />
            <div className={styles.headerActions}>
              <Button
                variant="cyan"
                onClick={() => {
                  setSelectedProfile(null);
                  setShowCreateModal(true);
                }}
              >
                <Icon icon="mdi:plus" width={18} height={18} />
                Create Discovery Profile
              </Button>
            </div>
          </div>

          <div className={styles.listPageBody}>
            <Table
              className={styles.settingsListTable}
              columns={DISCOVERY_PROFILE_COLUMNS}
              data={filteredProfiles}
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
                  showActionsMenu,
                  setShowActionsMenu
                )
              }
              emptyMessage="No discovery profiles found."
            />

            <Pagination
              className={styles.settingsListPagination}
              currentPage={currentPage}
              totalItems={filteredProfiles.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateDiscoveryModal
          profile={selectedProfile}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedProfile(null);
          }}
          onSave={() => {
            setShowCreateModal(false);
            setSelectedProfile(null);
          }}
        />
      )}

      {showAssignModal && (
        <AssignCredentialModal
          profileName={selectedProfile?.host}
          onClose={() => setShowAssignModal(false)}
          onAssign={() => {
            setShowAssignModal(false);
          }}
        />
      )}

      {showScheduleModal && (
        <ScheduleModal
          profileName={selectedProfile?.name}
          onClose={() => {
            setShowScheduleModal(false);
            setSelectedProfile(null);
          }}
          onSave={() => {
            setShowScheduleModal(false);
            setSelectedProfile(null);
          }}
        />
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setSelectedProfile(null);
        }}
        onConfirm={confirmDelete}
        itemName={selectedProfile?.name || ''}
        itemType="Discovery Profile"
      />
    </>
  );
}
