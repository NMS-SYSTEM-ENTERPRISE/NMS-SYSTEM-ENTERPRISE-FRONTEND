'use client';
import { CreateProfileSidebar } from '@/components/features/settings/user/user-profiles/CreateProfileSidebar';
import { PreviewModal } from '@/components/features/settings/user/user-profiles/PreviewModal';
import { renderProfileCell } from '@/components/features/settings/user/user-profiles/renderProfileCell';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { TimelineModal } from '@/components/ui/timeline-modal';
import { Pagination } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import {
  EMPTY_PROFILE,
  GROUPS_COLUMNS as PROFILE_COLUMNS,
  GROUP_TIMELINE_STEPS,
} from '@/utils/constants/settings/users/user-profiles';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import styles from '../../shared-settings-styles.module.css';

import { useUserProfile } from '@/hooks/settings/user/user-profiles/useUserProfile';

// ─── Main Screen ──────────────────────────────────────────────

const UserProfiles = () => {
  const { getAllUserProfiles, createUserProfile, editUserProfile, deleteUserProfile } = useUserProfile();

  const [profilesList, setProfilesList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const [searchTags, setSearchTags] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [newProfile, setNewProfile] = useState(EMPTY_PROFILE);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchProfiles = async () => {
    const params = {
      page: currentPage,
      limit: pageSize,
    };
    if (searchTags.length > 0) {
      params.search = searchTags.join(' ');
    }
    const data = await getAllUserProfiles(params);
    if (data) {
      setProfilesList(data.items || []);
      setTotalRecords(data.total_records || 0);
    }
  };

  useEffect(() => {
    fetchProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, searchTags]);

  const handleFieldChange = (key, value) =>
    setNewProfile((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    // Basic mapping for dummy dropdown options to API IDs
    // In production, the options should use exact integer IDs
    const payload = {
      name: newProfile.name,
      description: newProfile.description,
      role_id: parseInt(newProfile.role) || 1, // Fallback to 1 for API compliance with string options
      group_ids: [parseInt(newProfile.groups) || 1],
      user_id: parseInt(newProfile.user) || 1,
    };

    if (editingItem) {
      payload.id = editingItem.id;
      const success = await editUserProfile(payload);
      if (success) {
        setShowCreate(false);
        setEditingItem(null);
        fetchProfiles();
      }
    } else {
      const success = await createUserProfile(payload);
      if (success) {
        setShowCreate(false);
        setNewProfile(EMPTY_PROFILE);
        fetchProfiles();
      }
    }
  };

  const mapProfileToFrontend = (profile) => {
    return {
      id: profile.id,
      name: profile.name || '',
      description: profile.description || '',
      scopeBy: profile.role?.name || profile.groups?.[0]?.name || 'Custom',
      user: profile.users?.[0]?.id || '',
      role: profile.role_id || '',
      groups: profile.groups?.[0]?.id || '',
    };
  };

  const handleReset = () => {
    setNewProfile(editingItem ? { ...EMPTY_PROFILE, ...editingItem } : EMPTY_PROFILE);
  };

  const handleEdit = (profile) => {
    setEditingItem(profile);
    setNewProfile({ ...EMPTY_PROFILE, ...profile });
    setShowCreate(true);
  };

  const handleDelete = (profile) => {
    setItemToDelete(profile);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      const success = await deleteUserProfile(itemToDelete.id);
      if (success) {
        setShowDeleteModal(false);
        setItemToDelete(null);
        fetchProfiles();
      }
    }
  };

  const tableData = profilesList.map(mapProfileToFrontend);

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          {/* Page header with Breadcrumbs and Actions */}
          <div className={styles.contentHeader}>
            <div>
              <div className={styles.breadcrumbs}>
                Settings / User / <span>User Profiles</span>
              </div>
              <h2 className={styles.pageTitle}>User Profiles</h2>
              <p className={styles.pageDescription}>
                Create and manage user profiles to bundle scopes. For more information:{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setShowTimeline(true); }} className={styles.linkBlue}>
                  User Profiles Overview <Icon icon="mdi:open-in-new" width={14} height={14} />
                </a>
              </p>
            </div>

            <div className={styles.headerActions}>
              <SearchInput
                tags={searchTags}
                onTagsChange={setSearchTags}
                placeholder="Search user profiles..."
              />
              <Button variant="cyan" onClick={() => {
                setEditingItem(null);
                setNewProfile(EMPTY_PROFILE);
                setShowCreate(true);
              }}>
                <Icon icon="mdi:plus" width={18} />
                Create Profile
              </Button>
            </div>
          </div>

          {/* Data Table */}
          <Table
            columns={PROFILE_COLUMNS}
            data={tableData}
            keyExtractor={(p) => p.id}
            renderCell={(row, col) => renderProfileCell(row, col, handleEdit, handleDelete)}
            emptyMessage="No user profiles found."
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={totalRecords}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
          />
        </div>
      </div>

      {/* Create Sidebar */}
      <CreateProfileSidebar
        isOpen={showCreate}
        onClose={() => {
          setShowCreate(false);
          setEditingItem(null);
        }}
        profile={newProfile}
        isEditing={!!editingItem}
        onChange={handleFieldChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onPreview={() => setShowPreview(true)}
        onInfoClick={() => setShowTimeline(true)}
      />

      {/* Creation Process Timeline Modal */}
      <TimelineModal
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        title="User Profile Creation Process"
        steps={GROUP_TIMELINE_STEPS}
      />

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.name || ''}
        itemType="User Profile"
      />
    </>
  );
};

export default UserProfiles;
