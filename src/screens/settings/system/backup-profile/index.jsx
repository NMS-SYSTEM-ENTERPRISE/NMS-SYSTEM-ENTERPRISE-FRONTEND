"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../../shared-settings-styles.module.css';
const MOCK_BACKUP_PROFILES = [
  {
    id: 1,
    name: 'Config DB Backup',
    type: 'Config DB',
    destination: 'LOCAL',
    scheduleType: 'Daily',
    result: 'View Result',
    status: 'OFF',
  },
  {
    id: 2,
    name: 'Report DB Backup Profile',
    type: 'Report DB',
    destination: 'LOCAL',
    scheduleType: 'Daily',
    result: 'View Result',
    status: 'OFF',
  },
];
const BackupProfile = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState(MOCK_BACKUP_PROFILES);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <div>
              <h2 className={styles.pageTitle}>Backup Profile</h2>
              <p className={styles.pageDescription}>
                Setup and modify configurations to ensure secure and scheduled data backups. For more information:{' '}
                <a href="#" className={styles.link}>
                  Backup Profile
                  <Icon icon="mdi:open-in-new" width={16} height={16} />
                </a>
              </p>
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
            <button className={styles.btnSettings}>
              <Icon icon="mdi:eye" width={18} height={18} />
            </button>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>
                    BACKUP PROFILE NAME <Icon icon="mdi:arrow-up" width={14} height={14} />
                  </th>
                  <th>PROFILE TYPE</th>
                  <th>BACKUP DESTINATION</th>
                  <th>SCHEDULE TYPE</th>
                  <th>RESULT</th>
                  <th>BACKUP PROFILE STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((profile) => (
                  <tr key={profile.id}>
                    <td>{profile.name}</td>
                    <td>{profile.type}</td>
                    <td>
                      <div className={styles.destinationBadge}>
                        <Icon icon="mdi:database" width={16} height={16} />
                        {profile.destination}
                      </div>
                    </td>
                    <td>{profile.scheduleType}</td>
                    <td>
                      <Link href="/settings/system/backup-profile/restore" className={styles.linkBlue}>
                        {profile.result}
                      </Link>
                    </td>
                    <td>
                      <button className={`${styles.toggleBtn} ${profile.status === 'ON' ? styles.toggleBtnOn : ''}`}>
                        <span className={styles.toggleSlider}></span>
                        <span className={styles.toggleLabel}>{profile.status}</span>
                      </button>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="Play">
                          <Icon icon="mdi:play" width={18} height={18} />
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
          <div className={styles.pagination}>
            <button className={styles.paginationBtn} disabled={currentPage === 1}>
              <Icon icon="mdi:chevron-double-left" width={18} height={18} />
            </button>
            <button className={styles.paginationBtn} disabled={currentPage === 1}>
              <Icon icon="mdi:chevron-left" width={18} height={18} />
            </button>
            <span className={styles.pageNumber}>1</span>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-right" width={18} height={18} />
            </button>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-double-right" width={18} height={18} />
            </button>
            <SelectComponent
              className={styles.itemsPerPageSelect}
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              options={[
                { value: 50, label: '50' },
                { value: 100, label: '100' },
                { value: 200, label: '200' },
              ]}
              placeholder="50"
              isSearchable={false}
            />
            <span className={styles.paginationInfo}>Items per page</span>
            <span className={styles.paginationTotal}>1 - 2 of 2 Items</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default BackupProfile;
