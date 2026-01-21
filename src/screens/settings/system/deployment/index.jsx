"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const MOCK_DEPLOYMENTS = [
  {
    id: 1,
    hostname: 'AIOps',
    type: 'DATASTORE',
    deployment: 'STANDALONE',
    ip: '172.16.14.71',
    state: 'Running',
    usedCount: 0,
    duration: '3 days 50 minutes 19 seconds',
    version: '8.0.23',
  },
  {
    id: 2,
    hostname: 'AIOps',
    type: 'APP',
    deployment: 'STANDALONE',
    ip: '172.16.14.71',
    state: 'Running',
    usedCount: 3,
    duration: '3 days 50 minutes 24 seconds',
    version: '8.0.23',
  },
];
const DeploymentSettings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredDeployments = MOCK_DEPLOYMENTS.filter((deployment) =>
    deployment.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deployment.ip.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <div>
              <h2 className={styles.pageTitle}>Deployment Settings</h2>
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
              <Icon icon="mdi:cog" width={18} height={18} />
            </button>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>
                    HOSTNAME <Icon icon="mdi:arrow-up" width={14} height={14} />
                  </th>
                  <th>TYPE</th>
                  <th>DEPLOYMENT</th>
                  <th>IP</th>
                  <th>STATE</th>
                  <th>USED COUNT</th>
                  <th>DURATION</th>
                  <th>VERSION</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeployments.map((deployment) => (
                  <tr key={deployment.id}>
                    <td>
                      <div style={{display: 'flex', alignItems: 'center', gap: 'var(--gap-sm)'}}>
                        <Icon icon="mdi:arrow-up" width={14} height={14} style={{color: 'var(--color-success)'}} />
                        {deployment.hostname}
                      </div>
                    </td>
                    <td>
                      <span className={styles.badgeInfo}>{deployment.type}</span>
                    </td>
                    <td>
                      <span className={styles.badgeInfo}>{deployment.deployment}</span>
                    </td>
                    <td>{deployment.ip}</td>
                    <td>
                      <span className={styles.badgeSuccess}>{deployment.state}</span>
                    </td>
                    <td>
                      <span className={styles.badgeInfo} style={{borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0}}>{deployment.usedCount}</span>
                    </td>
                    <td>
                      <div style={{display: 'flex', alignItems: 'center', gap: 'var(--gap-xs)'}}>
                        <Icon icon="mdi:clock-outline" width={14} height={14} />
                        {deployment.duration}
                      </div>
                    </td>
                    <td>{deployment.version}</td>
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
            <span className={styles.paginationTotal}>1 - 2 of 2 Items</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeploymentSettings;
