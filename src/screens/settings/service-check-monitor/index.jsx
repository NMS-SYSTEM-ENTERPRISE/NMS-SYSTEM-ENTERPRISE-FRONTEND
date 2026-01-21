"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock data
const MOCK_SERVICE_CHECKS = [
  {
    id: 1,
    monitor: '10.20.40.143',
    agent: '',
    type: 'Ping',
    host: 'Shranik-Dalal',
    groups: ['Service Check', 'Ping'],
    groupCount: 1,
    target: '10.20.40.143',
    status: 'Enable',
  },
];

const ServiceCheckMonitorSettings = () => {
  const [tableSearchTerm, setTableSearchTerm] = useState('');

  const filteredChecks = MOCK_SERVICE_CHECKS.filter(
    (check) =>
      check.monitor.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
      check.host.toLowerCase().includes(tableSearchTerm.toLowerCase())
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
                <th>MONITOR</th>
                <th>AGENT</th>
                <th>TYPE</th>
                <th>HOST</th>
                <th>GROUPS</th>
                <th>TARGET</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredChecks.map((check) => (
                <tr key={check.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className={styles.monitorCell}>{check.monitor}</td>
                  <td>{check.agent || '-'}</td>
                  <td>
                    <span className={styles.typeTag}>{check.type}</span>
                  </td>
                  <td>{check.host}</td>
                  <td>
                    <div className={styles.groupsCell}>
                      {check.groups.map((group, index) => (
                        <span key={index} className={styles.groupTag}>
                          {group}
                        </span>
                      ))}
                      <span className={styles.groupCount}>
                        +{check.groupCount}
                      </span>
                    </div>
                  </td>
                  <td>{check.target}</td>
                  <td>
                    <span className={styles.statusEnable}>
                      {check.status}
                    </span>
                  </td>
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
            1 - {filteredChecks.length} of {filteredChecks.length} items
          </span>
        </div>
      </div>
    </>
  );
};

export default ServiceCheckMonitorSettings;
