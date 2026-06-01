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
import { useToast } from '@/hooks/useToast';
import { DISCOVERY_PROFILE_COLUMNS } from '@/utils/constants/settings/discovery/profile';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import styles from '../../shared-settings-styles.module.css';

import { useDiscoveryProfile } from '@/hooks/discovery-settings/discovery-profile/profile/useDiscoveryProfile';

export default function DiscoveryProfile() {
  const { showSuccess, showError } = useToast();
  const {
    getAllDiscoveryProfiles,
    createDiscoveryProfile,
    editDiscoveryProfile,
    deleteDiscoveryProfile,
    scheduleProfile,
    isLoading,
  } = useDiscoveryProfile();

  const [searchTags, setSearchTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDevicesModal, setShowDevicesModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);

  const [profilesList, setProfilesList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchProfiles = async () => {
    const params = {
      page: currentPage,
      limit: pageSize,
    };
    if (searchTags.length > 0) {
      params.search = searchTags.join(' ');
    }
    const data = await getAllDiscoveryProfiles(params);
    if (data) {
      setProfilesList(data.items || []);
      setTotalRecords(data.total_records || 0);
    }
  };

  useEffect(() => {
    fetchProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, searchTags]);

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

  const handleViewDevices = (profile) => {
    setSelectedProfile(profile);
    setShowDevicesModal(true);
  };

  const handleDuplicate = (profile) => {
    setSelectedProfile({
      ...profile,
      name: `${profile.name} (Copy)`,
      id: null,
    });
    setShowCreateModal(true);
    setShowActionsMenu(null);
  };

  const handleDelete = (profile) => {
    setSelectedProfile(profile);
    setShowDeleteConfirm(true);
    setShowActionsMenu(null);
  };

  const confirmDelete = async () => {
    if (selectedProfile) {
      const res = await deleteDiscoveryProfile(selectedProfile.id);
      if (res) {
        fetchProfiles();
      }
    }
    setShowDeleteConfirm(false);
    setSelectedProfile(null);
  };

  const handleSaveModal = async (formData) => {
    let res;
    if (selectedProfile && selectedProfile.id) {
      res = await editDiscoveryProfile({ ...formData, id: selectedProfile.id });
    } else {
      res = await createDiscoveryProfile(formData);
    }
    if (res) {
      setShowCreateModal(false);
      setSelectedProfile(null);
      fetchProfiles();
    }
  };

  const handleSaveSchedule = async (scheduleData) => {
    if (!selectedProfile) return;

    let schedule_type = 'Once';
    let schedule_interval = 0;

    if (scheduleData.enabled) {
      schedule_type =
        scheduleData.frequency.charAt(0).toUpperCase() +
        scheduleData.frequency.slice(1);

      if (scheduleData.frequency === 'hourly') {
        schedule_interval = parseInt(scheduleData.interval) * 60;
      } else if (scheduleData.frequency === 'daily') {
        schedule_interval = 24 * 60;
      } else if (scheduleData.frequency === 'weekly') {
        schedule_interval = 7 * 24 * 60;
      } else if (scheduleData.frequency === 'monthly') {
        schedule_interval = 30 * 24 * 60; // Approximate
      }
    }

    const payload = {
      id: selectedProfile.id,
      schedule_type: schedule_type,
      schedule_interval: schedule_interval,
      schedule_time: scheduleData.time || '00:00',
      start_date: scheduleData.startDate
        ? new Date(scheduleData.startDate).toISOString()
        : null,
      end_date: scheduleData.endDate
        ? new Date(scheduleData.endDate).toISOString()
        : null,
      run_immediately: scheduleData.runImmediately || false,
    };

    const res = await scheduleProfile(payload);
    if (res) {
      setShowScheduleModal(false);
      setSelectedProfile(null);
      fetchProfiles();
    }
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
              className={styles.settingsListPagination}
              currentPage={currentPage}
              totalItems={totalRecords}
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
          onSave={handleSaveModal}
        />
      )}

      {showAssignModal && (
        <AssignCredentialModal
          profile={selectedProfile}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedProfile(null);
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
          onSave={handleSaveSchedule}
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

      {showDevicesModal && (
        <DiscoveredDevicesModal
          profile={selectedProfile}
          onClose={() => {
            setShowDevicesModal(false);
            setSelectedProfile(null);
          }}
        />
      )}
    </>
  );
}
