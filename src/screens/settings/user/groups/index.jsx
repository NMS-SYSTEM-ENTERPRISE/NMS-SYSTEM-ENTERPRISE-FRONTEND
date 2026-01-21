"use client";
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Modal } from '@/components/ui/modal';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const MOCK_PROFILES = [
  {
    id: 1,
    name: 'ENGINEERING-Read-only',
    description:
      'THIS IS USER PROFILE FOR ENGINEERING TEAM WITH READ ONLY ACCESS',
    scopeBy: 'Group',
  },
  {
    id: 2,
    name: 'Test-Admin',
    description: 'THIS IS USER PROFILE FOR THE TEST TEAM',
    scopeBy: 'Group',
  },
];
const MOCK_PREVIEW_RESULTS = [
  {
    id: 1,
    monitor: 'cisco2960.snr-edatas.local',
    ip: '172.16.10.43',
    host: 'cisco2960.snr-edatas.local',
    type: 'mdi:server-network',
    groups: ['Network'],
  },
  {
    id: 2,
    monitor: 'Zenil-Kapadia',
    ip: '10.20.41.174',
    host: 'zenil-kapadia',
    type: 'mdi:microsoft-windows',
    groups: ['Server > Windows'],
  },
  {
    id: 3,
    monitor: 'sql-node-2',
    ip: '172.16.9.259',
    host: 'sqlnode2.sqlcluster.local',
    type: 'mdi:microsoft-windows',
    groups: ['Server > Windows'],
  },
  {
    id: 4,
    monitor: 'win-node1-hyperv-node',
    ip: '172.16.8.98',
    host: 'win-node1exchange19.local',
    type: 'mdi:virtualization',
    groups: ['Virtualization'],
  },
  {
    id: 5,
    monitor: 'win-ec2-01-c6234',
    ip: '172.16.8.57',
    host: 'win-ec2-01-c6234',
    type: 'mdi:microsoft-windows',
    groups: ['Server > Windows'],
  },
  {
    id: 6,
    monitor: 'snr-edatas-231',
    ip: '172.16.15.231',
    host: 'snr-edatas-231',
    type: 'mdi:linux',
    groups: ['Server > Linux'],
  },
];
const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: '',
    description: '',
    user: '',
    role: '',
    groups: '',
  });
  const filteredProfiles = MOCK_PROFILES.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handlePreview = () => {
    setShowPreviewModal(true);
  };
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
            <button
              className={styles.btnPrimary}
              onClick={() => setShowCreateModal(true)}
            >
              <Icon icon="mdi:plus" width={18} height={18} />
              Create User Profile
            </button>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>USER PROFILE NAME</th>
                  <th>DESCRIPTION</th>
                  <th>SCOPE BY</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((profile) => (
                  <tr key={profile.id}>
                    <td>
                      <a href="#" className={styles.linkBlue}>
                        {profile.name}
                      </a>
                    </td>
                    <td>{profile.description}</td>
                    <td>{profile.scopeBy}</td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="Edit">
                          <Icon icon="mdi:pencil" width={18} height={18} />
                        </button>
                        <button className={styles.actionBtn} title="More">
                          <Icon
                            icon="mdi:dots-vertical"
                            width={18}
                            height={18}
                          />
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
      {/* Create User Profile Sidebar */}
      <FilterSidebar
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create User Profile"
        filters={[]}
        onApply={() => {
          console.log('Create user profile:', newProfile);
          setShowCreateModal(false);
        }}
        onReset={() =>
          setNewProfile({
            name: '',
            description: '',
            user: '',
            role: '',
            groups: '',
          })
        }
        applyButtonText="Create User Profile"
        resetButtonText="Reset"
        customFooterButtons={
          <button
            className={styles.btnSecondary}
            onClick={handlePreview}
            style={{ marginRight: 'auto' }}
          >
            Preview
          </button>
        }
      >
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>
            User Profile Name{' '}
            <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="e.g. <Department-Role>"
            value={newProfile.name}
            onChange={(e) =>
              setNewProfile({ ...newProfile, name: e.target.value })
            }
          />
        </div>
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>Description</label>
          <input
            type="text"
            className={styles.formInput}
            value={newProfile.description}
            onChange={(e) =>
              setNewProfile({ ...newProfile, description: e.target.value })
            }
          />
        </div>
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>
            User <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <SelectComponent
            className={styles.formSelect}
            value={newProfile.user}
            onChange={(e) =>
              setNewProfile({ ...newProfile, user: e.target.value })
            }
            options={[
              { value: 'Admin', label: 'Admin' },
              { value: 'John Doe', label: 'John Doe' },
            ]}
            placeholder="Select User"
          />
          <a
            href="#"
            className={styles.link}
            style={{ fontSize: 'var(--font-xs)', marginTop: '4px' }}
          >
            Create User
          </a>
        </div>
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>
            Role <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <SelectComponent
            className={styles.formSelect}
            value={newProfile.role}
            onChange={(e) =>
              setNewProfile({ ...newProfile, role: e.target.value })
            }
            options={[
              { value: 'Admin', label: 'Admin' },
              { value: 'Operator', label: 'Operator' },
            ]}
            placeholder="Select"
          />
          <a
            href="#"
            className={styles.link}
            style={{ fontSize: 'var(--font-xs)', marginTop: '4px' }}
          >
            Create Role
          </a>
        </div>
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>
            Groups <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <SelectComponent
            className={styles.formSelect}
            value={newProfile.groups}
            onChange={(e) =>
              setNewProfile({ ...newProfile, groups: e.target.value })
            }
            options={[
              { value: 'Network', label: 'Network' },
              { value: 'Server', label: 'Server' },
            ]}
            placeholder="Select"
          />
          <a
            href="#"
            className={styles.link}
            style={{ fontSize: 'var(--font-xs)', marginTop: '4px' }}
          >
            Create Group
          </a>
        </div>
        <p
          style={{
            fontSize: 'var(--font-xs)',
            color: 'var(--color-text-secondary)',
            marginTop: 'var(--margin-lg)',
          }}
        >
          For more information:{' '}
          <a href="#" className={styles.link}>
            Create User Profile
          </a>
        </p>
        <p
          style={{
            fontSize: 'var(--font-xs)',
            color: 'var(--color-text-muted)',
            marginTop: 'var(--margin-sm)',
          }}
        >
          * fields are mandatory
        </p>
      </FilterSidebar>
      {/* Preview Results Modal */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Preview Results"
        className={styles.previewModal}
      >
        <div
          className={styles.searchBox}
          style={{
            marginBottom: 'var(--margin-md)',
            width: '100%',
            maxWidth: 'none',
          }}
        >
          <Icon icon="mdi:magnify" width={18} height={18} />
          <input type="text" placeholder="Search" />
        </div>
        <div
          className={styles.tableContainer}
          style={{ maxHeight: '400px', overflowY: 'auto' }}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th>MONITOR</th>
                <th>IP</th>
                <th>HOST</th>
                <th>TYPE</th>
                <th>GROUPS</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PREVIEW_RESULTS.map((result) => (
                <tr key={result.id}>
                  <td>{result.monitor}</td>
                  <td>{result.ip}</td>
                  <td>{result.host}</td>
                  <td>
                    <Icon icon={result.type} width={20} height={20} />
                  </td>
                  <td>
                    <div
                      style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}
                    >
                      {result.groups.map((group, idx) => (
                        <span key={idx} className={styles.destinationBadge}>
                          {group}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className={styles.pagination}
          style={{
            justifyContent: 'flex-end',
            border: 'none',
            padding: 'var(--padding-md) 0 0 0',
          }}
        >
          <span className={styles.paginationInfo}>1 - 100 of 165 items</span>
        </div>
      </Modal>
    </>
  );
};
export default Groups;
