'use client';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { CreateRoleSidebar } from '@/components/features/settings/user/roles/CreateRoleSidebar';
import { renderRoleCell } from '@/components/features/settings/user/roles/renderRoleCell';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { TimelineModal } from '@/components/ui/timeline-modal';
import { Pagination } from '@/components/ui/pagination';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import styles from '../../shared-settings-styles.module.css';

import { useRole } from '@/hooks/settings/user/roles/useRole';
import {
  ROLES_COLUMNS as COLUMNS,
  EMPTY_ROLE,
  ROLE_TIMELINE_STEPS,
} from '@/utils/constants/settings/users/roles';

// ─── Main Screen ──────────────────────────────────────────────

const Roles = () => {
  const { getAllRoles, createRole, editRole, deleteRole } = useRole();

  const [rolesList, setRolesList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const [searchTags, setSearchTags] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [newRole, setNewRole] = useState(EMPTY_ROLE);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchRoles = async () => {
    const params = {
      page: currentPage,
      limit: pageSize,
    };
    if (searchTags.length > 0) {
      params.search = searchTags.join(' ');
    }
    const data = await getAllRoles(params);
    if (data) {
      setRolesList(data.items || []);
      setTotalRecords(data.total_records || 0);
    }
  };

  useEffect(() => {
    fetchRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, searchTags]);

  const handleFieldChange = (key, value) =>
    setNewRole((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    const payload = {
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions || {},
    };

    if (editingItem) {
      payload.id = editingItem.id;
      const success = await editRole(payload);
      if (success) {
        setShowCreate(false);
        setEditingItem(null);
        fetchRoles();
      }
    } else {
      const success = await createRole(payload);
      if (success) {
        setShowCreate(false);
        setNewRole(EMPTY_ROLE);
        fetchRoles();
      }
    }
  };

  const mapRoleToFrontend = (role) => {
    return {
      id: role.id,
      name: role.name || '',
      description: role.description || '',
      type: role.type || 'Custom', // Using default Custom since type isn't always in payload
      permissions: role.permissions || {},
      userCount: role.user_count || 0,
      status: true, // Roles are active unless otherwise stated
    };
  };

  const handleReset = () => {
    setNewRole(editingItem ? { ...EMPTY_ROLE, ...editingItem } : EMPTY_ROLE);
  };

  const handleEdit = (role) => {
    setEditingItem(role);
    setNewRole({ ...EMPTY_ROLE, ...role });
    setShowCreate(true);
  };

  const handleDelete = (role) => {
    setItemToDelete(role);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      const success = await deleteRole(itemToDelete.id);
      if (success) {
        setShowDeleteModal(false);
        setItemToDelete(null);
        fetchRoles();
      }
    }
  };

  const tableData = rolesList.map(mapRoleToFrontend);

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          {/* Header Bar */}
          <div className={styles.contentHeader}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search roles..."
            />
            <div className={styles.headerActions}>
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

          <div className={styles.listPageBody}>
          <Table
            className={styles.settingsListTable}
            columns={COLUMNS}
            data={tableData}
            keyExtractor={(r) => r.id}
            renderCell={(row, col) => renderRoleCell(row, col, handleEdit, handleDelete)}
            emptyMessage="No roles found."
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
