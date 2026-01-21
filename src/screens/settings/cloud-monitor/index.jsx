"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock data
const MOCK_CLOUD_MONITORS = [
  {
    id: 1,
    monitor: 'AWS Cloud (03857...)',
    resourceRegion: '',
    accountId: '038570670536',
    groups: ['Cloud', 'AWS CL...'],
    groupCount: 1,
    tags: [],
    type: 'cloud',
    status: 'Enable',
    scheduler: '',
    objectId: '248',
    cloudId: '62507114109',
    environment: '',
  },
  {
    id: 2,
    monitor: 'Base-Infr-Fallback-...',
    resourceRegion: 'af-south-1',
    accountId: '038570670536',
    groups: ['Cloud', 'AWS CL...'],
    groupCount: 3,
    tags: [],
    type: 'cloud-purple',
    status: 'Enable',
    scheduler: '',
    objectId: '247',
    cloudId: '57562458471',
    environment: '',
  },
];

const CloudMonitorSettings = () => {
  const [tableSearchTerm, setTableSearchTerm] = useState('');

  const filteredMonitors = MOCK_CLOUD_MONITORS.filter(
    (monitor) =>
      monitor.monitor.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
      monitor.accountId.toLowerCase().includes(tableSearchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
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
          <div className={styles.headerActions}>
            <button className={styles.iconBtn}>
              <Icon icon="mdi:content-copy" width={18} height={18} />
            </button>
            <button className={styles.iconBtn}>
              <Icon icon="mdi:file-document" width={18} height={18} />
            </button>
            <button className={styles.iconBtn}>
              <Icon icon="mdi:filter" width={18} height={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>
                  MONITOR <span className={styles.sortIcon}>↑</span>
                </th>
                <th>RESOURCE/REGION</th>
                <th>ACCOUNT ID</th>
                <th>GROUPS</th>
                <th>TAGS</th>
                <th>TYPE</th>
                <th>STATUS</th>
                <th>SCHEDULER</th>
                <th>OBJECT ID</th>
                <th>ID</th>
                <th>ENVIRONMENT</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredMonitors.map((monitor) => (
                <tr key={monitor.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className={styles.monitorCell}>{monitor.monitor}</td>
                  <td>{monitor.resourceRegion || '-'}</td>
                  <td>{monitor.accountId}</td>
                  <td>
                    <div className={styles.groupsCell}>
                      {monitor.groups.map((group, index) => (
                        <span key={index} className={styles.groupTag}>
                          {group}
                        </span>
                      ))}
                      <span className={styles.groupCount}>
                        +{monitor.groupCount}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.tagsCell}>
                      {monitor.tags.length > 0 ? monitor.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                          {tag}
                        </span>
                      )) : '-'}
                    </div>
                  </td>
                  <td>
                    {monitor.type === 'cloud' ? (
                      <Icon icon="mdi:cloud" width={20} height={20} />
                    ) : (
                      <Icon icon="mdi:cloud" width={20} height={20} style={{ color: '#a855f7' }} />
                    )}
                  </td>
                  <td>
                    <span className={styles.statusEnable}>
                      {monitor.status}
                    </span>
                  </td>
                  <td>{monitor.scheduler || '-'}</td>
                  <td>{monitor.objectId}</td>
                  <td>{monitor.id}</td>
                  <td>{monitor.environment || '-'}</td>
                  <td>
                    <button className={styles.actionsBtn}>
                      <Icon icon="mdi:dots-vertical" width={18} height={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button className={styles.paginationBtn}>«</button>
          <button className={styles.paginationBtn}>‹</button>
          <button className={`${styles.paginationBtn} ${styles.paginationBtnActive}`}>1</button>
          <button className={styles.paginationBtn}>›</button>
          <button className={styles.paginationBtn}>»</button>
          <SelectComponent
            className={styles.paginationSelect}
            value={50}
            onChange={() => {}}
            options={[
              { value: 50, label: '50' },
            ]}
            placeholder="50"
            isSearchable={false}
          />
          <span className={styles.paginationInfo}>items per page</span>
          <span className={styles.paginationCount}>
            1 - {filteredMonitors.length} of {filteredMonitors.length} items
          </span>
        </div>
      </div>
    </>
  );
};

export default CloudMonitorSettings;
