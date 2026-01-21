"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock data
const MOCK_MONITORS = [
  {
    id: 1,
    monitor: 'AIOps',
    ip: '172.16.14.71',
    host: 'AIOps',
    instancesCount: 102,
    groups: ['Server', 'Linux'],
    groupCount: 1,
    tags: ['monitor:AIOps'],
    type: 'Linux',
    health: ['critical', 'down'],
    status: 'Running',
    duration: '1 week 1 day 23 hours 39 minutes',
  },
  {
    id: 9,
    monitor: 'serviceops(172.16.11.31)',
    ip: '172.16.11.31',
    host: 'serviceops',
    instancesCount: 563,
    groups: ['Server', 'Linux'],
    groupCount: 1,
    tags: ['monitor:serviceops(172.16.11.31)'],
    type: 'Linux',
    health: ['critical', 'down'],
    status: 'Running',
    duration: '3 weeks 4 days',
  },
];

const DeviceMonitorSettings = () => {
  const [tableSearchTerm, setTableSearchTerm] = useState('');

  const filteredMonitors = MOCK_MONITORS.filter(
    (monitor) =>
      monitor.monitor.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
      monitor.ip.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
      monitor.host.toLowerCase().includes(tableSearchTerm.toLowerCase())
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
                <th>IP</th>
                <th>HOST</th>
                <th>INSTANCES COUNT</th>
                <th>GROUPS</th>
                <th>TAGS</th>
                <th>TYPE</th>
                <th>HEALTH</th>
                <th>STATUS</th>
                <th>DURATION</th>
              </tr>
            </thead>
            <tbody>
              {filteredMonitors.map((monitor) => (
                <tr key={monitor.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className={styles.monitorCell}>{monitor.monitor}</td>
                  <td>{monitor.ip}</td>
                  <td>{monitor.host}</td>
                  <td>
                    <span className={styles.instanceBadge}>
                      {monitor.instancesCount}
                    </span>
                  </td>
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
                      {monitor.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className={styles.typeIcon}>
                      {monitor.type === 'Windows' ? (
                        <Icon
                          icon="mdi:microsoft-windows"
                          width={20}
                          height={20}
                          style={{ color: '#0078D4' }}
                        />
                      ) : (
                        <Icon
                          icon="mdi:linux"
                          width={20}
                          height={20}
                          style={{ color: '#FCC624' }}
                        />
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles.healthCell}>
                      {monitor.health.map((status, index) => (
                        <span
                          key={index}
                          className={`${styles.healthBadge} ${
                            styles[
                              `health${
                                status.charAt(0).toUpperCase() +
                                status.slice(1)
                              }`
                            ]
                          }`}
                        >
                          {status === 'critical' && (
                            <Icon icon="mdi:circle" width={12} height={12} style={{ color: '#ef4444' }} />
                          )}
                          {status === 'down' && (
                            <Icon icon="mdi:arrow-down" width={12} height={12} style={{ color: '#ef4444' }} />
                          )}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        monitor.status === 'Running'
                          ? styles.statusRunning
                          : styles.statusNotReachable
                      }`}
                    >
                      {monitor.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.durationCell}>
                      <span className={styles.clockIcon}>🕒</span>
                      {monitor.duration}
                    </div>
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

        {/* Status Footer */}
        <div className={styles.statusFooter}>
          <span className={styles.statusItem}><span className={styles.statusDotRed}></span> Down</span>
          <span className={styles.statusItem}><span className={styles.statusDotRed}></span> Critical</span>
          <span className={styles.statusItem}><span className={styles.statusDotOrange}></span> Major</span>
          <span className={styles.statusItem}><span className={styles.statusDotYellow}></span> Warning</span>
          <span className={styles.statusItem}><span className={styles.statusDotGreen}></span> Forcefully Stop</span>
          <span className={styles.statusItem}><span className={styles.statusDotGreen}></span> Clear</span>
        </div>
      </div>
    </>
  );
};

export default DeviceMonitorSettings;
