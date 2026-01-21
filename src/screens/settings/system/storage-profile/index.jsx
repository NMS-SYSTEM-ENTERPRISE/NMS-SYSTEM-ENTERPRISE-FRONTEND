"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const MOCK_STORAGE_PROFILES = [
  {
    id: 1,
    name: '10.20.40.45',
    usedCount: 3,
    destination: 'TFTP',
  },
  {
    id: 2,
    name: 'Report DB Backup Storage Profile',
    usedCount: 1,
    destination: 'LOCAL',
  },
  {
    id: 3,
    name: 'Config DB Backup Storage Profile',
    usedCount: 1,
    destination: 'LOCAL',
  },
  {
    id: 4,
    name: 'tftp - arnav',
    usedCount: 0,
    destination: 'TFTP',
  },
];
const StorageProfile = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProfiles = MOCK_STORAGE_PROFILES.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <div>
              <h2 className={styles.pageTitle}>Storage Profile</h2>
              <p className={styles.pageDescription}>
                Configure and manage external storage locations for secure and redundant data backups. For more information:{' '}
                <a href="#" className={styles.link}>
                  Storage Profile
                  <Icon icon="mdi:open-in-new" width={16} height={16} />
                </a>
              </p>
            </div>
            <button className={styles.btnPrimary}>
              Create Storage Profile
            </button>
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
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>STORAGE PROFILE NAME</th>
                  <th>USED COUNT</th>
                  <th>STORAGE DESTINATION</th>
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
                    <td>
                      <span className={styles.badgeInfo}>{profile.usedCount}</span>
                    </td>
                    <td>
                      <div className={styles.destinationBadge}>
                        <Icon icon={profile.destination === 'LOCAL' ? 'mdi:database' : 'mdi:folder-network'} width={16} height={16} />
                        {profile.destination}
                      </div>
                    </td>
                    <td>
                      <div className={styles.actions}>
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
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-double-left" width={18} height={18} />
            </button>
            <button className={styles.paginationBtn}>
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
              value={50}
              onChange={() => {}}
              options={[
                { value: 50, label: '50' },
              ]}
              placeholder="50"
              isSearchable={false}
            />
            <span className={styles.paginationInfo}>Items per page</span>
            <span className={styles.paginationTotal}>1 - 4 of 4 Items</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default StorageProfile;
