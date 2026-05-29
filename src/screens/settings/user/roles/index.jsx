'use client';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { CreateRoleSidebar } from '@/components/features/settings/user/roles/CreateRoleSidebar';
import { renderRoleCell } from '@/components/features/settings/user/roles/renderRoleCell';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { TimelineModal } from '@/components/ui/timeline-modal';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';

import { MOCK_ROLES } from '@/utils/dummy-data/settings/users';
import {
  ROLES_COLUMNS as COLUMNS,
  PERMISSION_MODULES,
  EMPTY_ROLE,
  ROLE_TIMELINE_STEPS,
} from '@/utils/constants/settings/users';

// ─── Sub-components ───────────────────────────────────────────

/** Renders each cell of the Roles table */

// ─── Main Screen ──────────────────────────────────────────────

const Roles = () => {
  const [searchTags, setSearchTags] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [newRole, setNewRole]       = useState(EMPTY_ROLE);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredRoles = MOCK_ROLES.filter((r) => {
    if (searchTags.length === 0) return true;
    return searchTags.every(tag => {
      const lowerTag = tag.toLowerCase();
      return r.name.toLowerCase().includes(lowerTag) ||
             r.description.toLowerCase().includes(lowerTag) ||
             r.type.toLowerCase().includes(lowerTag);
    });
  });

  const handleFieldChange = (key, value) =>
    setNewRole((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    console.log(editingItem ? 'Update role:' : 'Create role:', newRole);
    setShowCreate(false);
    setEditingItem(null);
  };

  const handleReset = () => {
    setNewRole(editingItem || EMPTY_ROLE);
  };

  const handleEdit = (role) => {
    setEditingItem(role);
    setNewRole(role);
    setShowCreate(true);
  };

  const handleDelete = (role) => {
    setItemToDelete(role);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleted role:', itemToDelete);
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
              Settings / User / <span>Roles</span>
            </div>
            <h2 className={styles.pageTitle}>Role Management</h2>
            <p className={styles.pageDescription}>
              Define access levels and granular permissions for internal team members. For more information:{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setShowTimeline(true); }} className={styles.linkBlue}>
                Roles Overview <Icon icon="mdi:open-in-new" width={14} height={14} />
              </a>
            </p>
          </div>
          
          <div className={styles.headerActions}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search roles..."
            />
            <Button variant="cyan" onClick={() => {
              setEditingItem(null);
              setNewRole(EMPTY_ROLE);
              setShowCreate(true);
            }}>
              <Icon icon="mdi:plus" width={18} />
              Create Role
            </Button>
          </div>
        </div>

          {/* Data Table */}
          <Table
            columns={COLUMNS}
            data={filteredRoles}
            keyExtractor={(r) => r.id}
            renderCell={(row, col) => renderRoleCell(row, col, handleEdit, handleDelete)}
            emptyMessage="No roles found."
          />
        </div>
      </div>

      {/* Create Role Sidebar */}
      <CreateRoleSidebar
        isOpen={showCreate}
        onClose={() => {
          setShowCreate(false);
          setEditingItem(null);
        }}
        role={newRole}
        isEditing={!!editingItem}
        onChange={handleFieldChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onInfoClick={() => setShowTimeline(true)}
      />

      {/* Creation Process Timeline Modal */}
      <TimelineModal
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        title="Role Creation Process"
        steps={ROLE_TIMELINE_STEPS}
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
        itemType="Role"
      />
    </>
  );
};

export default Roles;
