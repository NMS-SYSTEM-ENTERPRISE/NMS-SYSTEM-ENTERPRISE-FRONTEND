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
import { useState, useEffect } from 'react';
import styles from '../../shared-settings-styles.module.css';

import { useUser } from '@/hooks/settings/user/users/useUser';
import {
  USERS_COLUMNS as COLUMNS,
  EMPTY_USER,
  USER_TIMELINE_STEPS,
} from '@/utils/constants/settings/users/users';

const Users = () => {
  const { getAllUsers, createUser, editUser, deleteUser } = useUser();

  const [usersList, setUsersList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const [searchTags, setSearchTags] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [newUser, setNewUser] = useState(EMPTY_USER);
  const [editingItem, setEditingItem] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchUsers = async () => {
    const params = {
      page: currentPage,
      limit: pageSize, // API docs show pagination support
    };
    if (searchTags.length > 0) {
      params.search = searchTags.join(' ');
    }
    const data = await getAllUsers(params);
    if (data) {
      setUsersList(data.items || []);
      setTotalRecords(data.total_records || 0);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, searchTags]);

  const handleFieldChange = (key, value) =>
    setNewUser((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    // Mapping frontend model to backend schema requirements
    const payload = {
      first_name: newUser.firstName,
      last_name: newUser.lastName,
      email: newUser.email,
      username: newUser.username,
      mobile_number: newUser.mobile || null,
      status: newUser.status,
      // Dynamic role and groups from form selection
      role_id: newUser.roleId ? Number(newUser.roleId) : 1,
      user_profile_id: 1,
      timezone: 'UTC',
      date_format: 'MM/DD/YYYY',
      time_format: '24-hour',
      group_ids: newUser.groupId ? [Number(newUser.groupId)] : [1],
    };

    if (newUser.password) {
      payload.password = newUser.password;
    }

    if (editingItem) {
      payload.id = editingItem.id;
      const success = await editUser(payload);
      if (success) {
        setShowCreate(false);
        setEditingItem(null);
        fetchUsers();
      }
    } else {
      const success = await createUser(payload);
      if (success) {
        setShowCreate(false);
        setNewUser(EMPTY_USER);
        fetchUsers();
      }
    }
  };

  const handleReset = () => {
    setNewUser(editingItem ? { ...EMPTY_USER, ...editingItem, password: '', confirmPassword: '' } : EMPTY_USER);
  };

  const mapUserToFrontend = (user) => {
    return {
      id: user.id,
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      email: user.email || '',
      username: user.username || '',
      mobile: user.mobile_number || '',
      status: user.status,
      groups: user.groups && user.groups.length > 0 ? user.groups[0].name : '',
      role: user.role ? user.role.name : '',
      groupId: user.groups && user.groups.length > 0 ? user.groups[0].id : '',
      roleId: user.role ? user.role.id : '',
    };
  };

  const handleEdit = (user) => {
    setEditingItem(user);
    setNewUser({ ...EMPTY_USER, ...user, password: '', confirmPassword: '' });
    setShowCreate(true);
  };

  const handleDelete = (user) => {
    setItemToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      const success = await deleteUser(itemToDelete.id);
      if (success) {
        setShowDeleteModal(false);
        setItemToDelete(null);
        fetchUsers();
      }
    }
  };

  // Map backend users to table render format
  const tableData = usersList.map(mapUserToFrontend);

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>

          {/* Header Bar */}
          <div className={styles.contentHeader}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search users..."
            />
            <div className={styles.headerActions}>
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

          <div className={styles.listPageBody}>
          <Table
            className={styles.settingsListTable}
            columns={COLUMNS}
            data={tableData}
            keyExtractor={(u) => u.id}
            renderCell={(row, col) => renderUserCell(row, col, handleEdit, handleDelete)}
            emptyMessage="No users found."
          />

          {/* Pagination */}
          <Pagination
            className={styles.settingsListPagination}
            currentPage={currentPage}
            totalItems={totalRecords}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
          />
          </div>
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
