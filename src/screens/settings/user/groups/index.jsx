'use client';
import { CreateProfileSidebar } from '@/components/features/settings/user/groups/CreateProfileSidebar';
import { PreviewModal } from '@/components/features/settings/user/groups/PreviewModal';
import { renderProfileCell } from '@/components/features/settings/user/groups/renderProfileCell';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { TimelineModal } from '@/components/ui/timeline-modal';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import {
  EMPTY_PROFILE,
  GROUPS_COLUMNS as PROFILE_COLUMNS,
  GROUP_TIMELINE_STEPS,
} from '@/utils/constants/settings/users';
import { MOCK_PROFILES } from '@/utils/dummy-data/settings/users';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';

// ─── Main Screen ──────────────────────────────────────────────

const Groups = () => {
  const [searchTags, setSearchTags] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [newProfile, setNewProfile] = useState(EMPTY_PROFILE);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredProfiles = MOCK_PROFILES.filter((p) => {
    if (searchTags.length === 0) return true;
    return searchTags.every(tag => {
      const lowerTag = tag.toLowerCase();
      return p.name.toLowerCase().includes(lowerTag) ||
             p.description.toLowerCase().includes(lowerTag);
    });
  });

  const handleFieldChange = (key, value) =>
    setNewProfile((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    console.log(editingItem ? 'Update user profile:' : 'Create user profile:', newProfile);
    setShowCreate(false);
    setEditingItem(null);
  };

  const handleReset = () => {
    setNewProfile(editingItem || EMPTY_PROFILE);
  };

  const handleEdit = (profile) => {
    setEditingItem(profile);
    setNewProfile(profile);
    setShowCreate(true);
  };

  const handleDelete = (profile) => {
    setItemToDelete(profile);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleted group:', itemToDelete);
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
        {/* Page header with Breadcrumbs and Actions */}
        <div className={styles.contentHeader}>
          <div>
            <div className={styles.breadcrumbs}>
              Settings / User / <span>Groups</span>
            </div>
            <h2 className={styles.pageTitle}>Group Profiles</h2>
            <p className={styles.pageDescription}>
              Create and manage profile groups to bundle permissions. For more information:{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setShowTimeline(true); }} className={styles.linkBlue}>
                Groups Overview <Icon icon="mdi:open-in-new" width={14} height={14} />
              </a>
            </p>
          </div>
          
          <div className={styles.headerActions}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search groups..."
            />
            <Button variant="cyan" onClick={() => {
              setEditingItem(null);
              setNewProfile(EMPTY_PROFILE);
              setShowCreate(true);
            }}>
              <Icon icon="mdi:plus" width={18} />
              Create Group
            </Button>
          </div>
        </div>

          {/* Data Table */}
          <Table
            columns={PROFILE_COLUMNS}
            data={filteredProfiles}
            keyExtractor={(p) => p.id}
            renderCell={(row, col) => renderProfileCell(row, col, handleEdit, handleDelete)}
            emptyMessage="No user profiles found."
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
        itemType="Group"
      />
    </>
  );
};

export default Groups;
