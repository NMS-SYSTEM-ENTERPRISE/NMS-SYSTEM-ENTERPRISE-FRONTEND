'use client';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { CreateUserSidebar } from '@/components/features/settings/user/users/CreateUserSidebar';
import { renderUserCell } from '@/components/features/settings/user/users/renderUserCell';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { TimelineModal } from '@/components/ui/timeline-modal';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';

import { MOCK_USERS } from '@/utils/dummy-data/settings/users';
import {
  USERS_COLUMNS as COLUMNS,
  GROUP_OPTIONS,
  ROLE_OPTIONS,
  EMPTY_USER,
  USER_TIMELINE_STEPS,
} from '@/utils/constants/settings/users';

// ─── Main Screen ──────────────────────────────────────────────

const Users = () => {
  const [searchTags, setSearchTags] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [newUser, setNewUser] = useState(EMPTY_USER);
  const [editingItem, setEditingItem] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredUsers = MOCK_USERS.filter((u) => {
    if (searchTags.length === 0) return true;
    return searchTags.every(tag => {
      const lowerTag = tag.toLowerCase();
      return u.username.toLowerCase().includes(lowerTag) ||
        u.email.toLowerCase().includes(lowerTag) ||
        u.firstName.toLowerCase().includes(lowerTag) ||
        u.lastName.toLowerCase().includes(lowerTag);
    });
  });

  const handleFieldChange = (key, value) =>
    setNewUser((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    console.log(editingItem ? 'Update user:' : 'Create user:', newUser);
    setShowCreate(false);
    setEditingItem(null);
  };

  const handleReset = () => {
    setNewUser(editingItem || EMPTY_USER);
  };

  const handleEdit = (user) => {
    setEditingItem(user);
    setNewUser(user);
    setShowCreate(true);
  };

  const handleDelete = (user) => {
    setItemToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleted user:', itemToDelete);
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
                Settings / User / <span>Users</span>
              </div>
              <h2 className={styles.pageTitle}>User Management</h2>
              <p className={styles.pageDescription}>
                Manage internal access, assign operational roles, and enforce security policies globally. For more information:{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setShowTimeline(true); }} className={styles.linkBlue}>
                  Enterprise User Settings <Icon icon="mdi:open-in-new" width={14} height={14} />
                </a>
              </p>
            </div>

            <div className={styles.headerActions}>
              <SearchInput
                tags={searchTags}
                onTagsChange={setSearchTags}
                placeholder="Search users..."
              />
              <Button variant="cyan" onClick={() => {
                setEditingItem(null);
                setNewUser(EMPTY_USER);
                setShowCreate(true);
              }}>
                <Icon icon="mdi:plus" width={18} />
                Create User
              </Button>
            </div>
          </div>

          {/* Data Table */}
          <Table
            columns={COLUMNS}
            data={filteredUsers}
            keyExtractor={(u) => u.id}
            renderCell={(row, col) => renderUserCell(row, col, handleEdit, handleDelete)}
            emptyMessage="No users found."
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredUsers.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
          />
        </div>
      </div>

      {/* Create User Sidebar */}
      <CreateUserSidebar
        isOpen={showCreate}
        onClose={() => {
          setShowCreate(false);
          setEditingItem(null);
        }}
        user={newUser}
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
        title="User Creation Process"
        steps={USER_TIMELINE_STEPS}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.username || ''}
        itemType="User"
      />
    </>
  );
};

export default Users;
