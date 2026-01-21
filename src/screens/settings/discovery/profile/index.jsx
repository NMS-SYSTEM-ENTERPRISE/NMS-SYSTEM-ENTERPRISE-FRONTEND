"use client";
import { AssignCredentialModal } from '@/components/features/discovery/assignment-credentials';
import { CreateDiscoveryModal } from '@/components/features/discovery/create-discovery-modal';
import { ScheduleModal } from '@/components/features/discovery/schdule-modal';
import { Button } from '@/components/ui/button';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import sharedStyles from '../../shared-settings-styles.module.css';
import styles from './styles.module.css';

const discoveryProfiles = [
  {
    id: 1,
    name: 'csv',
    host: 'discovery-sample (4).csv',
    type: 'network',
    discovered: 1,
    status: 'Last ran at 2025/03/08 11:11:14',
    scheduler: null,
    groups: 'Network',
  },
  {
    id: 2,
    name: '10.1',
    host: '172.16.8.15',
    type: 'network',
    discovered: 0,
    status: 'Last ran failed at 2025/01/08 15:50:17',
    scheduler: null,
    groups: 'Network',
  },
  {
    id: 3,
    name: '10.100.21.41',
    host: '10.100.21.41',
    type: 'network',
    discovered: 0,
    status: 'Last ran failed at 2025/01/27 16:35:14',
    scheduler: null,
    groups: 'Network',
  },
  {
    id: 4,
    name: '10.100.21.42',
    host: '10.100.21.42',
    type: 'network',
    discovered: 1,
    status: 'Last ran at 2024/10/01 18:33:57',
    scheduler: null,
    groups: 'Network',
  },
  {
    id: 5,
    name: '10.100.59.10',
    host: '10.100.59.10',
    type: 'network',
    discovered: 1,
    status: 'Last ran at 2024/12/24 16:44:51',
    scheduler: 'scheduled',
    groups: 'Network',
  },
  {
    id: 6,
    name: '10.20.40.91',
    host: '10.20.40.91',
    type: 'server',
    discovered: 1,
    status: 'Last ran at 2025/04/01 18:04:37',
    scheduler: null,
    groups: 'Server',
  },
  {
    id: 7,
    name: '10.20.41.85',
    host: '10.20.41.85',
    type: 'server',
    discovered: 1,
    status: 'Last ran at 2025/04/01 18:26:05',
    scheduler: null,
    groups: 'Server',
  },
  {
    id: 8,
    name: '10.20.141.153',
    host: '10.20.41.35',
    type: 'server',
    discovered: 0,
    status: 'Last ran at 2025/01/13 17:29:49',
    scheduler: null,
    groups: 'Server',
  },
  {
    id: 9,
    name: '12.3',
    host: '172.16.12.3',
    type: 'network',
    discovered: 1,
    status: 'Last ran at 2025/01/02 18:46:36',
    scheduler: null,
    groups: 'Network',
  },
  {
    id: 10,
    name: '12.5',
    host: '172.16.12.5',
    type: 'network',
    discovered: 1,
    status: 'Last ran at 2024/09/20 17:55:25',
    scheduler: null,
    groups: 'Network',
  },
  {
    id: 11,
    name: '123456',
    host: '172.16.9.1/24',
    type: 'network',
    discovered: 5,
    status: 'Last ran at 2025/01/28 18:47:47',
    scheduler: null,
    groups: 'Network',
  },
  {
    id: 12,
    name: '123ds',
    host: 'discovery-sample.csv',
    type: 'network',
    discovered: 0,
    status: 'Last ran failed at 2025/03/08 11:09:53',
    scheduler: null,
    groups: 'Network',
  },
  {
    id: 13,
    name: '14.19',
    host: '172.16.14.19',
    type: 'network',
    discovered: 0,
    status: 'Last ran failed at 2025/02/04 17:39:40',
    scheduler: null,
    groups: 'Network',
  },
  {
    id: 14,
    name: '172.16.10.10',
    host: '172.16.10.10',
    type: 'virtualization',
    discovered: 1,
    status: 'Last ran at 2025/01/29 16:01:10',
    scheduler: null,
    groups: 'Virtualization',
  },
  {
    id: 15,
    name: '172.16.10.14-30',
    host: '172.16.10.14-30',
    type: 'virtualization',
    discovered: 0,
    status: 'Last ran at 2025/02/25 14:16:40',
    scheduler: null,
    groups: 'Virtualization',
  },
];

export default function DiscoveryProfile() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableSearchTerm, setTableSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);

  const filteredProfiles = discoveryProfiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
      profile.host.toLowerCase().includes(tableSearchTerm.toLowerCase())
  );

  const handleAssignCredential = (profile) => {
    setSelectedProfile(profile);
    setShowAssignModal(true);
    setShowActionsMenu(null);
  };

  const handleEdit = (profile) => {
    setSelectedProfile(profile);
    setShowCreateModal(true);
    setShowActionsMenu(null);
  };

  const handleRun = (profile) => {
    console.log('Running discovery:', profile);
    setShowActionsMenu(null);
  };

  const handleSchedule = (profile) => {
    setSelectedProfile(profile);
    setShowScheduleModal(true);
    setShowActionsMenu(null);
  };

  const handleDuplicate = (profile) => {
    setSelectedProfile({ ...profile, name: `${profile.name} (Copy)` });
    setShowCreateModal(true);
    setShowActionsMenu(null);
  };

  const handleDelete = (profile) => {
    setSelectedProfile(profile);
    setShowDeleteConfirm(true);
    setShowActionsMenu(null);
  };

  const confirmDelete = () => {
    console.log('Deleting profile:', selectedProfile);
    setShowDeleteConfirm(false);
    setSelectedProfile(null);
  };

  return (
    <>
      <div className={sharedStyles.mainContent}>
        <div className={styles.mainContent_header}>
          <div className={styles.searchBar}>
            <Icon icon="mdi:magnify" width={18} height={18} />
            <input
              type="text"
              placeholder="Search"
              value={tableSearchTerm}
              onChange={(e) => setTableSearchTerm(e.target.value)}
            />
          </div>
          <Button
            className={styles.createButton}
            onClick={() => {
              setSelectedProfile(null);
              setShowCreateModal(true);
            }}
          >
            <Icon icon="mdi:plus" width={18} height={18} />
            Create Discovery Profile
          </Button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>DISCOVERY PROFILE NAME ↕</th>
                <th>IP/HOST/IP RANGE/CIDR/CSV</th>
                <th>TYPE</th>
                <th>DISCOVERED OBJECTS</th>
                <th>STATUS</th>
                <th>SCHEDULER</th>
                <th>GROUPS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.map((profile) => (
                <tr key={profile.id}>
                  <td className={styles.table_name}>{profile.name}</td>
                  <td>{profile.host}</td>
                  <td>
                    <div className={styles.table_icon}>
                      {profile.type === 'network' && (
                        <Icon icon="mdi:wifi" width={20} height={20} style={{ color: "var(--color-chart-cyan)" }} />
                      )}
                      {profile.type === 'server' && (
                        <Icon icon="mdi:database" width={20} height={20} style={{ color: "var(--color-chart-orange)" }} />
                      )}
                      {profile.type === 'virtualization' && (
                        <Icon icon="mdi:package-variant" width={20} height={20} style={{ color: "var(--color-chart-purple)" }} />
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={styles.table_badge}>
                      {profile.discovered}
                    </span>
                  </td>
                  <td className={styles.table_status}>{profile.status}</td>
                  <td>
                    {profile.scheduler && (
                      <Icon icon="mdi:activity" width={18} height={18} style={{ color: "var(--color-text-muted)" }} />
                    )}
                  </td>
                  <td>
                    <span className={styles.table_group}>
                      {profile.groups}
                    </span>
                  </td>
                  <td>
                    <div className={styles.table_actions}>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleRun(profile)}
                        title="Run Now"
                      >
                        <Icon icon="mdi:play" width={18} height={18} />
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleAssignCredential(profile)}
                        title="Assign Credentials"
                      >
                        <Icon icon="mdi:refresh" width={18} height={18} />
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleSchedule(profile)}
                        title="Schedule"
                      >
                        <Icon icon="mdi:clock-outline" width={18} height={18} />
                      </button>
                      <div style={{ position: 'relative' }}>
                        <button
                          className={styles.actionButton}
                          onClick={() =>
                            setShowActionsMenu(
                              showActionsMenu === profile.id
                                ? null
                                : profile.id
                            )
                          }
                          title="More Actions"
                        >
                          <Icon icon="mdi:dots-vertical" width={18} height={18} />
                        </button>
                        {showActionsMenu === profile.id && (
                          <div className={styles.actionsMenu}>
                            <button onClick={() => handleEdit(profile)}>
                              <Icon icon="mdi:pencil" width={16} height={16} /> Edit
                            </button>
                            <button
                              onClick={() => handleDuplicate(profile)}
                            >
                              <Icon icon="mdi:content-copy" width={16} height={16} /> Duplicate
                            </button>
                            <button
                              onClick={() => handleDelete(profile)}
                              style={{ color: 'var(--color-chart-red)' }}
                            >
                              <Icon icon="mdi:trash-can" width={16} height={16} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button className={styles.pagination_button}>«</button>
          <button className={styles.pagination_button}>‹</button>
          <button
            className={`${styles.pagination_button} ${styles.pagination_button_active}`}
          >
            1
          </button>
          <button className={styles.pagination_button}>2</button>
          <button className={styles.pagination_button}>›</button>
          <button className={styles.pagination_button}>»</button>
          <SelectComponent
            className={styles.pagination_select}
            value={50}
            onChange={() => {}}
            options={[
              { value: 50, label: '50' },
              { value: 100, label: '100' },
              { value: 200, label: '200' },
            ]}
            placeholder="50"
          />
          <span className={styles.pagination_info}>Items per page</span>
          <span className={styles.pagination_count}>
            1 - 50 of 99 items
          </span>
        </div>
      </div>

      {showCreateModal && (
        <CreateDiscoveryModal
          profile={selectedProfile}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedProfile(null);
          }}
          onSave={() => {
            setShowCreateModal(false);
            setSelectedProfile(null);
          }}
        />
      )}

      {showAssignModal && (
        <AssignCredentialModal
          profileName={selectedProfile?.host}
          onClose={() => setShowAssignModal(false)}
          onAssign={() => {
            setShowAssignModal(false);
          }}
        />
      )}

      {showScheduleModal && (
        <ScheduleModal
          profileName={selectedProfile?.name}
          onClose={() => {
            setShowScheduleModal(false);
            setSelectedProfile(null);
          }}
          onSave={() => {
            setShowScheduleModal(false);
            setSelectedProfile(null);
          }}
        />
      )}

      {showDeleteConfirm && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            className={styles.deleteModal}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete discovery profile "
              {selectedProfile?.name}"?
            </p>
            <p
              style={{
                color: 'var(--color-text-muted)',
                fontSize: 'var(--font-sm)',
                marginTop: 'var(--margin-sm)',
              }}
            >
              This will also remove all discovered devices (
              {selectedProfile?.discovered}) associated with this profile.
            </p>
            <div className={styles.deleteModal_actions}>
              <Button onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                style={{ backgroundColor: 'var(--color-chart-red)' }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
