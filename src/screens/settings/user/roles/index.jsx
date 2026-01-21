"use client";
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import styles from '../../shared-settings-styles.module.css';
import roleStyles from './styles.module.css';
const MOCK_ROLES = [
  { id: 1, name: 'Admin', description: 'Full access', userCount: 5 },
  { id: 2, name: 'Operator', description: 'Limited access', userCount: 12 },
  { id: 3, name: 'Viewer', description: 'Read-only access', userCount: 8 },
];
const PERMISSION_MODULES = [
  {
    name: 'General Settings',
    icon: 'mdi:folder-cog',
    permissions: [
      { name: 'User Settings', read: true, write: true, delete: false },
      { name: 'System Settings', read: true, write: false, delete: false },
      { name: 'Group Settings', read: true, write: true, delete: false },
      { name: 'My Account', read: true, write: true, delete: true },
    ],
  },
  {
    name: 'Monitoring',
    icon: 'mdi:folder-monitor',
    permissions: [
      { name: 'Policy Settings', read: true, write: true, delete: true },
    ],
  },
  {
    name: 'Visualization',
    icon: 'mdi:folder-eye',
    permissions: [
      { name: 'Dashboard', read: true, write: false, delete: false },
      { name: 'Template', read: false, write: false, delete: false },
      { name: 'Widget', read: true, write: false, delete: false },
      { name: 'Inventory', read: false, write: false, delete: false },
      { name: 'Metric Explorer', read: false, write: false, delete: false },
      { name: 'Log Explorer', read: false, write: false, delete: false },
      { name: 'Flow Explorer', read: false, write: false, delete: false },
      { name: 'NetRoute', read: false, write: false, delete: false },
      { name: 'Trap Explorer', read: false, write: false, delete: false },
      { name: 'Topology', read: false, write: false, delete: false },
    ],
  },
];
const Roles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: {},
  });
  const [expandedModules, setExpandedModules] = useState({});
  const toggleModule = (moduleName) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };
  const filteredRoles = MOCK_ROLES.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <Icon icon="mdi:magnify" width={18} height={18} />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className={styles.btnPrimary} onClick={() => setShowCreateModal(true)}>
              <Icon icon="mdi:plus" width={18} height={18} />
              Create Role
            </button>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ROLE NAME</th>
                  <th>ROLE DESCRIPTION</th>
                  <th>USER COUNT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role) => (
                  <tr key={role.id}>
                    <td>
                      <a href="#" className={styles.linkBlue}>{role.name}</a>
                    </td>
                    <td>{role.description}</td>
                    <td>
                      <span className={styles.badgeInfo}>{role.userCount}</span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="Edit">
                          <Icon icon="mdi:pencil" width={18} height={18} />
                        </button>
                        <button className={styles.actionBtn} title="More">
                          <Icon icon="mdi:dots-vertical" width={18} height={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Create Role Sidebar */}
      <FilterSidebar
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Role"
        filters={[]}
        onApply={() => {
          console.log('Create role:', newRole);
          setShowCreateModal(false);
        }}
        onReset={() => setNewRole({name: '', description: '', permissions: {}})}
        applyButtonText="Create Role"
        resetButtonText="Reset"
      >
        <div className={styles.formGroup} style={{marginBottom: 'var(--margin-lg)'}}>
          <label className={styles.formLabel}>Role Name <span style={{color: 'var(--color-danger)'}}>*</span></label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Must be unique"
            value={newRole.name}
            onChange={(e) => setNewRole({...newRole, name: e.target.value})}
          />
        </div>
        <div className={styles.formGroup} style={{marginBottom: 'var(--margin-lg)'}}>
          <label className={styles.formLabel}>Role Description</label>
          <input
            type="text"
            className={styles.formInput}
            value={newRole.description}
            onChange={(e) => setNewRole({...newRole, description: e.target.value})}
          />
        </div>
        {/* Permissions Matrix */}
        <div className={roleStyles.permissionsHeader}>
          <div className={roleStyles.permissionsHeaderLeft}>
            <input type="checkbox" />
            <span>All Module</span>
          </div>
          <div className={roleStyles.permissionsHeaderRight}>
            <input type="checkbox" />
            <span>Read</span>
            <input type="checkbox" />
            <span>Read & Write</span>
            <input type="checkbox" />
            <span>Delete</span>
          </div>
        </div>
        {PERMISSION_MODULES.map((module) => (
          <div key={module.name} className={roleStyles.permissionModule}>
            <div className={roleStyles.moduleHeader} onClick={() => toggleModule(module.name)}>
              <div className={roleStyles.moduleHeaderLeft}>
                <Icon 
                  icon={expandedModules[module.name] ? 'mdi:chevron-down' : 'mdi:chevron-right'} 
                  width={20} 
                  height={20} 
                />
                <Icon icon={module.icon} width={20} height={20} />
                <input type="checkbox" />
                <span>{module.name}</span>
              </div>
              <div className={roleStyles.moduleHeaderRight}>
                <input type="checkbox" />
                <input type="checkbox" />
                <input type="checkbox" />
              </div>
            </div>
            {expandedModules[module.name] && (
              <div className={roleStyles.permissionsList}>
                {module.permissions.map((perm) => (
                  <div key={perm.name} className={roleStyles.permissionItem}>
                    <div className={roleStyles.permissionName}>
                      <input type="checkbox" />
                      <span>{perm.name}</span>
                    </div>
                    <div className={roleStyles.permissionChecks}>
                      <input type="checkbox" checked={perm.read} readOnly />
                      <input type="checkbox" checked={perm.write} readOnly />
                      <input type="checkbox" checked={perm.delete} readOnly />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <p style={{fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--margin-lg)'}}>
          * fields are mandatory
        </p>
      </FilterSidebar>
  </>
  );
};
export default Roles;
