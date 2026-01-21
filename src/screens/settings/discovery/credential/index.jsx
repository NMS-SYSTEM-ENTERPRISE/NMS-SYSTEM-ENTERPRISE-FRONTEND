"use client";
import { CreateCredentialModal } from '@/components/features/discovery/create-credential-modal';
import { Button } from '@/components/ui/button';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import sharedStyles from '../../shared-settings-styles.module.css';
import styles from './styles.module.css';

const credentialProfiles = [
  {
    id: 1,
    name: 'Network-SNMP-v2',
    type: 'SNMP v2',
    protocol: 'SNMP',
    devices: 45,
    groups: ['Network', 'Switches'],
  },
  {
    id: 2,
    name: 'Network-SNMP-v3',
    type: 'SNMP v3',
    protocol: 'SNMP',
    devices: 32,
    groups: ['Network'],
  },
  {
    id: 3,
    name: 'Linux-SSH',
    type: 'SSH',
    protocol: 'SSH',
    devices: 18,
    groups: ['Server', 'Linux'],
  },
  {
    id: 4,
    name: 'Windows-WMI',
    type: 'WMI',
    protocol: 'WMI',
    devices: 25,
    groups: ['Server', 'Windows'],
  },
  {
    id: 5,
    name: 'VMware-API',
    type: 'VMware',
    protocol: 'API',
    devices: 12,
    groups: ['Virtualization'],
  },
  {
    id: 6,
    name: 'Cisco-Telnet',
    type: 'Telnet',
    protocol: 'Telnet',
    devices: 8,
    groups: ['Network', 'Cisco'],
  },
  {
    id: 7,
    name: 'HP-SNMP',
    type: 'SNMP v2',
    protocol: 'SNMP',
    devices: 15,
    groups: ['Network', 'HP'],
  },
  {
    id: 8,
    name: 'Dell-iDRAC',
    type: 'IPMI',
    protocol: 'IPMI',
    devices: 10,
    groups: ['Server', 'Dell'],
  },
];

export default function CredentialProfile() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableSearchTerm, setTableSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const filteredCredentials = credentialProfiles.filter(
    (cred) =>
      cred.name.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
      cred.type.toLowerCase().includes(tableSearchTerm.toLowerCase())
  );

  const handleEdit = (credential) => {
    setSelectedCredential(credential);
    setShowCreateModal(true);
  };

  const handleDelete = (credential) => {
    setSelectedCredential(credential);
    setShowDeleteConfirm(true);
  };

  const handleDuplicate = (credential) => {
    setSelectedCredential({ ...credential, name: `${credential.name} (Copy)` });
    setShowCreateModal(true);
  };

  const confirmDelete = () => {
    // Handle delete logic
    setShowDeleteConfirm(false);
    setSelectedCredential(null);
  };

  return (
    <>
      <div className={sharedStyles.mainContent}>
        <div className={styles.mainContent_header}>
          <div className={styles.searchBar}>
            <Icon icon="mdi:magnify" width={18} height={18} />
            <input
              type="text"
              placeholder="Search credentials"
              value={tableSearchTerm}
              onChange={(e) => setTableSearchTerm(e.target.value)}
            />
          </div>
          <Button
            className={styles.createButton}
            onClick={() => {
              setSelectedCredential(null);
              setShowCreateModal(true);
            }}
          >
            <Icon icon="mdi:plus" width={18} height={18} />
            Create Credential Profile
          </Button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>CREDENTIAL NAME ↕</th>
                <th>TYPE</th>
                <th>PROTOCOL</th>
                <th>DEVICES USING</th>
                <th>GROUPS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredCredentials.map((credential) => (
                <tr key={credential.id}>
                  <td className={styles.table_name}>{credential.name}</td>
                  <td>{credential.type}</td>
                  <td>{credential.protocol}</td>
                  <td>
                    <span className={styles.table_badge}>
                      {credential.devices}
                    </span>
                  </td>
                  <td>
                    <div
                      className={styles.table_actions}
                      style={{ gap: 'var(--gap-xs)' }}
                    >
                      {credential.groups.map((group, idx) => (
                        <span key={idx} className={styles.table_group}>
                          {group}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className={styles.table_actions}>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleEdit(credential)}
                        title="Edit"
                      >
                        <Icon icon="mdi:pencil" width={18} height={18} />
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleDuplicate(credential)}
                        title="Duplicate"
                      >
                        <Icon icon="mdi:content-copy" width={18} height={18} />
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleDelete(credential)}
                        title="Delete"
                      >
                        <Icon icon="mdi:trash-can" width={18} height={18} />
                      </button>
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
          <span className={styles.pagination_count}>1 - 8 of 8 items</span>
        </div>
      </div>

      {showCreateModal && (
        <CreateCredentialModal
          credential={selectedCredential}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedCredential(null);
          }}
          onSave={() => {
            setShowCreateModal(false);
            setSelectedCredential(null);
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
              Are you sure you want to delete credential profile "
              {selectedCredential?.name}"?
            </p>
            <p
              style={{
                color: 'var(--color-text-muted)',
                fontSize: 'var(--font-sm)',
                marginTop: 'var(--margin-sm)',
              }}
            >
              This credential is currently used by {selectedCredential?.devices}{' '}
              device(s).
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
