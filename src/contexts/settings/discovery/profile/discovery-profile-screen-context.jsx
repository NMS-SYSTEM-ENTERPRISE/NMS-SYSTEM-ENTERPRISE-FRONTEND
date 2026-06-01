'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useDiscoveryProfile } from '@/hooks/discovery-settings/discovery-profile/profile/useDiscoveryProfile';

export const DiscoveryProfileScreenContext = createContext(null);

export const DiscoveryProfileScreenProvider = ({ children }) => {
  const {
    getAllDiscoveryProfiles,
    createDiscoveryProfile,
    editDiscoveryProfile,
    deleteDiscoveryProfile,
    scheduleProfile,
    reDiscoverProfile,
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
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const [profilesList, setProfilesList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchProfiles = useCallback(async () => {
    const params = { page: currentPage, limit: pageSize };
    if (searchTags.length > 0) params.search = searchTags.join(' ');
    const data = await getAllDiscoveryProfiles(params);
    if (data) {
      setProfilesList(data.items || []);
      setTotalRecords(data.total_records || 0);
    }
  }, [currentPage, pageSize, searchTags, getAllDiscoveryProfiles]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleAssignCredential = useCallback((profile) => {
    setSelectedProfile(profile);
    setShowAssignModal(true);
    setShowActionsMenu(null);
  }, []);

  const handleEdit = useCallback((profile) => {
    setSelectedProfile(profile);
    setShowCreateModal(true);
    setShowActionsMenu(null);
  }, []);

  const handleRun = useCallback((profile) => {
    console.log('Running discovery:', profile);
    setShowActionsMenu(null);
  }, []);

  const handleSchedule = useCallback((profile) => {
    setSelectedProfile(profile);
    setShowScheduleModal(true);
    setShowActionsMenu(null);
  }, []);

  const handleViewDevices = useCallback((profile) => {
    setSelectedProfile(profile);
    setShowDevicesModal(true);
  }, []);

  const handleDuplicate = useCallback((profile) => {
    setSelectedProfile({ ...profile, name: `${profile.name} (Copy)`, id: null });
    setShowCreateModal(true);
    setShowActionsMenu(null);
  }, []);

  const handleDelete = useCallback((profile) => {
    setSelectedProfile(profile);
    setShowDeleteConfirm(true);
    setShowActionsMenu(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (selectedProfile) {
      const res = await deleteDiscoveryProfile(selectedProfile.id);
      if (res) fetchProfiles();
    }
    setShowDeleteConfirm(false);
    setSelectedProfile(null);
  }, [selectedProfile, deleteDiscoveryProfile, fetchProfiles]);

  const closeDeleteConfirm = useCallback(() => {
    setShowDeleteConfirm(false);
    setSelectedProfile(null);
  }, []);

  const openCreate = useCallback(() => {
    setSelectedProfile(null);
    setShowCreateModal(true);
  }, []);

  const closeCreateModal = useCallback(() => {
    setShowCreateModal(false);
    setSelectedProfile(null);
  }, []);

  const closeAssignModal = useCallback(() => {
    setShowAssignModal(false);
    setSelectedProfile(null);
  }, []);

  const closeScheduleModal = useCallback(() => {
    setShowScheduleModal(false);
    setSelectedProfile(null);
  }, []);

  const closeDevicesModal = useCallback(() => {
    setShowDevicesModal(false);
    setSelectedProfile(null);
  }, []);

  const handleViewLogs = useCallback((profile) => {
    setSelectedProfile(profile);
    setShowLogsModal(true);
    setShowActionsMenu(null);
  }, []);

  const closeLogsModal = useCallback(() => {
    setShowLogsModal(false);
    setSelectedProfile(null);
  }, []);

  const handleReDiscover = useCallback(
    async (profile) => {
      if (profile?.id) {
        const res = await reDiscoverProfile(profile.id);
        if (res) fetchProfiles();
      }
      setShowActionsMenu(null);
    },
    [reDiscoverProfile, fetchProfiles]
  );

  const handleSaveModal = useCallback(
    async (formData) => {
      let res;
      if (selectedProfile?.id) {
        res = await editDiscoveryProfile({ ...formData, id: selectedProfile.id });
      } else {
        res = await createDiscoveryProfile(formData);
      }
      if (res) {
        closeCreateModal();
        fetchProfiles();
      }
    },
    [selectedProfile, editDiscoveryProfile, createDiscoveryProfile, closeCreateModal, fetchProfiles]
  );

  const handleSaveSchedule = useCallback(
    async (scheduleData) => {
      if (!selectedProfile) return;

      let schedule_type = 'Once';
      let schedule_interval = 0;

      if (scheduleData.enabled) {
        schedule_type =
          scheduleData.frequency.charAt(0).toUpperCase() + scheduleData.frequency.slice(1);

        if (scheduleData.frequency === 'hourly') {
          schedule_interval = parseInt(scheduleData.interval, 10) * 60;
        } else if (scheduleData.frequency === 'daily') {
          schedule_interval = 24 * 60;
        } else if (scheduleData.frequency === 'weekly') {
          schedule_interval = 7 * 24 * 60;
        } else if (scheduleData.frequency === 'monthly') {
          schedule_interval = 30 * 24 * 60;
        }
      }

      const res = await scheduleProfile({
        id: selectedProfile.id,
        schedule_type,
        schedule_interval,
        schedule_time: scheduleData.time || '00:00',
        start_date: scheduleData.startDate
          ? new Date(scheduleData.startDate).toISOString()
          : null,
        end_date: scheduleData.endDate ? new Date(scheduleData.endDate).toISOString() : null,
        run_immediately: scheduleData.runImmediately || false,
      });

      if (res) {
        closeScheduleModal();
        fetchProfiles();
      }
    },
    [selectedProfile, scheduleProfile, closeScheduleModal, fetchProfiles]
  );

  const handlePageSizeChange = useCallback((size) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const value = useMemo(
    () => ({
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
      showLogsModal,
      handleViewLogs,
      closeLogsModal,
      handleReDiscover,
    }),
    [
      searchTags,
      currentPage,
      pageSize,
      selectedProfile,
      showAssignModal,
      showCreateModal,
      showScheduleModal,
      showDeleteConfirm,
      showDevicesModal,
      showActionsMenu,
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
      showLogsModal,
      handleViewLogs,
      closeLogsModal,
      handleReDiscover,
    ]
  );

  return (
    <DiscoveryProfileScreenContext.Provider value={value}>
      {children}
    </DiscoveryProfileScreenContext.Provider>
  );
};
