'use client';
import { Modal } from '@/components/ui/modal';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../../shared-settings-styles.module.css';
const MOCK_BACKUPS = [
  {
    id: 1,
    fileName: 'ConfigDB-backup-8.0.11-1733034800001.zip',
    size: '1812 MB',
    profileName: 'Config DB Backup',
    location: 'LOCAL',
    timestamp: '2024/12/01 12:00:00',
  },
  {
    id: 2,
    fileName: 'ConfigDB-backup-8.0.11-1733121200010.zip',
    size: '1812 MB',
    profileName: 'Config DB Backup',
    location: 'LOCAL',
    timestamp: '2024/12/02 12:00:00',
  },
  {
    id: 3,
    fileName: 'ConfigDB-backup-8.0.11-1733164200001.zip',
    size: '1812 MB',
    profileName: 'Config DB Backup',
    location: 'LOCAL',
    timestamp: '2024/12/03 00:00:00',
  },
  {
    id: 4,
    fileName: 'ConfigDB-backup-8.0.12-1733892084121.zip',
    size: '1828 MB',
    profileName: 'Config DB Backup',
    location: 'LOCAL',
    timestamp: '2024/12/11 10:11:04',
  },
  {
    id: 5,
    fileName: 'ConfigDB-backup-8.0.13-1735888325919.zip',
    size: '1855 MB',
    profileName: 'Config DB Backup',
    location: 'LOCAL',
    timestamp: '2025/01/03 12:42:05',
  },
  {
    id: 6,
    fileName: 'ConfigDB-backup-8.0.16-1740182400468.zip',
    size: '1770 MB',
    profileName: 'Config DB Backup',
    location: 'LOCAL',
    timestamp: '2025/02/22 00:00:00',
  },
  {
    id: 7,
    fileName: 'ConfigDB-backup-8.0.16-1740421800025.zip',
    size: '1770 MB',
    profileName: 'Config DB Backup',
    location: 'LOCAL',
    timestamp: '2025/02/25 00:00:00',
  },
];
const RestoreBackup = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [backups, setBackups] = useState(MOCK_BACKUPS);
  const [showImportModal, setShowImportModal] = useState(false);
  const filteredBackups = backups.filter((backup) =>
    backup.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <React.Fragment>
      <div
        className={styles.mainContent}
        style={{ marginLeft: 0, width: '100%' }}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <button
              onClick={() => router.push(-1)}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Icon icon="mdi:arrow-left" width={20} height={20} />
            </button>
            <Icon icon="mdi:pulse" width={24} height={24} />
            <h1>snr-edatas Health</h1>
          </div>
          <div className={styles.headerRight}>
            <span
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                padding: '4px 8px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '4px',
              }}
            >
              snr-edatas AIOps Version: 8.0.23
            </span>
          </div>
        </div>
        <div className={styles.contentArea}>
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid var(--color-border)',
              marginBottom: 'var(--margin-md)',
            }}
          >
            {[
              'Health Overview',
              'Application',
              'Database',
              'Live Session',
              'Alert',
              'Upgrade',
            ].map((tab) => (
              <div
                key={tab}
                style={{
                  padding: '10px 20px',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--font-sm)',
                }}
              >
                {tab}
              </div>
            ))}
            <div
              style={{
                padding: '10px 20px',
                cursor: 'pointer',
                color: 'var(--color-primary)',
                borderBottom: '2px solid var(--color-primary)',
                fontSize: 'var(--font-sm)',
                fontWeight: '500',
              }}
            >
              Restore
            </div>
          </div>
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
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className={styles.btnSettings}
                onClick={() => setShowImportModal(true)}
              >
                <Icon icon="mdi:upload" width={18} height={18} />
              </button>
              <button className={styles.btnSettings}>
                <Icon icon="mdi:cog" width={18} height={18} />
              </button>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>
                    BACKUP FILE NAME{' '}
                    <Icon icon="mdi:arrow-up" width={14} height={14} />
                  </th>
                  <th>BACKUP SIZE</th>
                  <th>BACKUP PROFILE NAME</th>
                  <th>BACKUP LOCATION</th>
                  <th>TIMESTAMP</th>
                </tr>
              </thead>
              <tbody>
                {filteredBackups.map((backup) => (
                  <tr key={backup.id}>
                    <td>{backup.fileName}</td>
                    <td>{backup.size}</td>
                    <td>{backup.profileName}</td>
                    <td>
                      <div className={styles.destinationBadge}>
                        <Icon icon="mdi:lock-outline" width={16} height={16} />
                        {backup.location}
                      </div>
                    </td>
                    <td>{backup.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.pagination}>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-double-left" width={18} height={18} />
            </button>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-left" width={18} height={18} />
            </button>
            <span
              className={styles.pageNumber}
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                color: 'var(--color-text-primary)',
              }}
            >
              1
            </span>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-right" width={18} height={18} />
            </button>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-double-right" width={18} height={18} />
            </button>
            <SelectComponent
              className={styles.itemsPerPageSelect}
              value={50}
              onChange={() => {}}
              options={[{ value: 50, label: '50' }]}
              placeholder="50"
              isSearchable={false}
            />
            <span className={styles.paginationInfo}>Items per page</span>
            <span className={styles.paginationTotal}>1 - 7 of 7 Items</span>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        title="Import Backup File"
        className={styles.modalSmall}
      >
        <div
          style={{
            border: '1px dashed var(--color-border)',
            borderRadius: '4px',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginBottom: '20px',
            backgroundColor: 'var(--color-bg-secondary)',
          }}
        >
          <Icon
            icon="mdi:tray-arrow-up"
            width={48}
            height={48}
            style={{ color: 'var(--color-primary)', marginBottom: '10px' }}
          />
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Click or drag file to this area to upload
          </p>
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          <button
            className={styles.btnPrimary}
            onClick={() => setShowImportModal(false)}
          >
            Restore
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
};
export default RestoreBackup;
