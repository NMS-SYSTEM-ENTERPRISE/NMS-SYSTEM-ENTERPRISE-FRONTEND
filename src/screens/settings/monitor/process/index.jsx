"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const MOCK_PROCESSES = [
  { id: 1, name: 'nginx', device: 'Linux-Server-01', status: 'Running', cpu: 12, memory: 256, pid: '1234', threshold: 'Normal' },
  { id: 2, name: 'mysql', device: 'Linux-Server-01', status: 'Running', cpu: 45, memory: 1024, pid: '5678', threshold: 'Warning' },
  { id: 3, name: 'apache2', device: 'Linux-Server-02', status: 'Stopped', cpu: 0, memory: 0, pid: '-', threshold: 'Critical' },
  { id: 4, name: 'redis', device: 'Linux-Server-01', status: 'Running', cpu: 8, memory: 128, pid: '9012', threshold: 'Normal' },
];
const ProcessMonitorSettings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProcesses = MOCK_PROCESSES.filter(proc =>
    proc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proc.device.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <Icon icon="mdi:magnify" width={18} height={18} />
              <input
                type="text"
                placeholder="Search processes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className={styles.btnPrimary}>
              <Icon icon="mdi:plus" width={18} height={18} />
              Add Process Monitor
            </button>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>PROCESS NAME</th>
                  <th>DEVICE</th>
                  <th>STATUS</th>
                  <th>CPU %</th>
                  <th>MEMORY (MB)</th>
                  <th>PID</th>
                  <th>THRESHOLD</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredProcesses.map((proc) => (
                  <tr key={proc.id}>
                    <td>
                      <a href="#" className={styles.linkBlue}>{proc.name}</a>
                    </td>
                    <td>{proc.device}</td>
                    <td>
                      <span className={proc.status === 'Running' ? styles.badgeSuccess : styles.badgeDanger}>
                        {proc.status}
                      </span>
                    </td>
                    <td>{proc.cpu}%</td>
                    <td>{proc.memory}</td>
                    <td>{proc.pid}</td>
                    <td>
                      <span className={
                        proc.threshold === 'Normal' ? styles.badgeSuccess :
                        proc.threshold === 'Warning' ? styles.badgeWarning :
                        styles.badgeDanger
                      }>
                        {proc.threshold}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="Edit">
                          <Icon icon="mdi:pencil" width={18} height={18} />
                        </button>
                        <button className={styles.actionBtn} title="Delete">
                          <Icon icon="mdi:delete" width={18} height={18} />
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
              options={[{ value: 50, label: '50' }]}
              placeholder="50"
              isSearchable={false}
            />
            <span className={styles.paginationInfo}>Items per page</span>
            <span className={styles.paginationTotal}>1 - {filteredProcesses.length} of {MOCK_PROCESSES.length} Items</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProcessMonitorSettings;
