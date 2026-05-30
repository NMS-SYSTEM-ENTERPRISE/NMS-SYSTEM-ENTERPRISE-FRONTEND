'use client';
import { CreateGroupSidebar } from '@/components/features/settings/user/groups/CreateGroupSidebar';
import { renderGroupCell } from '@/components/features/settings/user/groups/renderGroupCell';
import { Button } from '@/components/ui/button';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { TimelineModal } from '@/components/ui/timeline-modal';
import {
  GROUPS_COLUMNS as COLUMNS,
  EMPTY_GROUP,
  GROUP_TIMELINE_STEPS,
} from '@/utils/constants/settings/users/groups';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import styles from '../../shared-settings-styles.module.css';

import { useGroup } from '@/hooks/settings/user/groups/useGroup';

// ─── Main Screen ──────────────────────────────────────────────

const Groups = () => {
  const { getAllGroups, createGroup, editGroup, deleteGroup } = useGroup();

  const [groupsList, setGroupsList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const [searchTags, setSearchTags] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [newGroup, setNewGroup] = useState(EMPTY_GROUP);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchGroups = async () => {
    const params = {
      page: currentPage,
      limit: pageSize,
    };
    if (searchTags.length > 0) {
      params.search = searchTags.join(' ');
    }
    const data = await getAllGroups(params);
    if (data) {
      setGroupsList(data.items || []);
      setTotalRecords(data.total_records || 0);
    }
  };

  useEffect(() => {
    fetchGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, searchTags]);

  const handleFieldChange = (key, value) =>
    setNewGroup((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    const payload = {
      name: newGroup.name,
      description: newGroup.description,
    };

    if (editingItem) {
      payload.id = editingItem.id;
      const success = await editGroup(payload);
      if (success) {
        setShowCreate(false);
        setEditingItem(null);
        fetchGroups();
      }
    } else {
      const success = await createGroup(payload);
      if (success) {
        setShowCreate(false);
        setNewGroup(EMPTY_GROUP);
        fetchGroups();
      }
    }
  };

  const mapGroupToFrontend = (group) => {
    return {
      id: group.id,
      name: group.name || '',
      description: group.description || '',
      userCount: group.user_count || 0,
    };
  };

  const handleReset = () => {
    setNewGroup(editingItem ? { ...EMPTY_GROUP, ...editingItem } : EMPTY_GROUP);
  };

  const handleEdit = (group) => {
    setEditingItem(group);
    setNewGroup({ ...EMPTY_GROUP, ...group });
    setShowCreate(true);
  };

  const handleDelete = (group) => {
    setItemToDelete(group);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      const success = await deleteGroup(itemToDelete.id);
      if (success) {
        setShowDeleteModal(false);
        setItemToDelete(null);
        fetchGroups();
      }
    }
  };

  const tableData = groupsList.map(mapGroupToFrontend);

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          {/* Header Bar */}
          <div className={styles.contentHeader}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search groups..."
            />
            <div className={styles.headerActions}>
              <Button
                variant="cyan"
                onClick={() => {
                  setEditingItem(null);
                  setNewGroup(EMPTY_GROUP);
                  setShowCreate(true);
                }}
              >
                <Icon icon="mdi:plus" width={18} />
                Create Group
              </Button>
            </div>
          </div>

          <div className={styles.listPageBody}>
            <Table
              className={styles.settingsListTable}
              columns={COLUMNS}
              data={tableData}
              keyExtractor={(p) => p.id}
              renderCell={(row, col) =>
                renderGroupCell(row, col, handleEdit, handleDelete)
              }
              emptyMessage="No groups found."
            />

            {/* Pagination */}
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

      {/* Create Sidebar */}
      <CreateGroupSidebar
        isOpen={showCreate}
        onClose={() => {
          setShowCreate(false);
          setEditingItem(null);
        }}
        group={newGroup}
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
        title="Group Creation Process"
        steps={GROUP_TIMELINE_STEPS}
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
