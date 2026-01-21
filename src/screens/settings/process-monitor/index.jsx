"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock process data
const MOCK_PROCESSES = [
  { id: 1, name: 'amqpeclava', applicationType: 'windows', osType: 'windows' },
  { id: 2, name: 'apache', applicationType: 'apache', osType: 'linux' },
  { id: 3, name: 'avp.exe', applicationType: 'windows', osType: 'windows' },
  { id: 4, name: 'coreServiceShell.exe', applicationType: 'windows', osType: 'windows' },
  { id: 5, name: 'dataserver', applicationType: 'database', osType: 'linux' },
];

const ProcessMonitorSettings = () => {
  const [tableSearchTerm, setTableSearchTerm] = useState('');
  
  const filteredProcesses = MOCK_PROCESSES.filter((process) =>
    process.name.toLowerCase().includes(tableSearchTerm.toLowerCase())
  );

  const renderAppIcon = (type) => {
    const iconMap = {
      windows: <Icon icon="mdi:microsoft-windows" width={20} height={20} />,
      apache: <Icon icon="mdi:apache" width={20} height={20} />,
      database: <Icon icon="mdi:database" width={20} height={20} />,
      db2: <Icon icon="mdi:database" width={20} height={20} style={{ color: '#22c55e' }} />,
      network: <Icon icon="mdi:network" width={20} height={20} />,
      erlang: <Icon icon="mdi:language-erlang" width={20} height={20} />,
      haproxy: <Icon icon="mdi:server-network" width={20} height={20} />,
      iis: <Icon icon="mdi:server-network" width={20} height={20} />,
      nginx: <span className={styles.nginxIcon}>N</span>,
      java: <Icon icon="mdi:language-java" width={20} height={20} />,
    };
    return iconMap[type] || <Icon icon="mdi:microsoft-windows" width={20} height={20} />;
  };

  const renderOSIcon = (osType) => {
    if (osType === 'linux') {
      return <Icon icon="mdi:linux" width={20} height={20} style={{ color: '#FCC624' }} />;
    }
    return <Icon icon="mdi:microsoft-windows" width={20} height={20} style={{ color: '#0078D4' }} />;
  };

  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Process Monitor Settings</h1>
          <p className={styles.pageDescription}>
            Easily monitor server processes with snr-edatas AIOps and discover corresponding applications seamlessly.
          </p>
        </div>

        {/* Toolbar */}
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
          <button className={styles.createBtn}>Create Process</button>
        </div>

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>PROCESS <span className={styles.sortIcon}>↑</span></th>
                <th>APPLICATION TYPE</th>
                <th>OS TYPE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredProcesses.map((process) => (
                <tr key={process.id}>
                  <td className={styles.processCell}>{process.name}</td>
                  <td>
                    <div className={styles.iconCell}>
                      <span className={`${styles.appIcon} ${process.applicationType === 'nginx' ? styles.nginxIcon : ''}`}>
                        {renderAppIcon(process.applicationType)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.iconCell}>
                      {renderOSIcon(process.osType)}
                    </div>
                  </td>
                  <td>
                    <button className={styles.actionBtn}>
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
            options={[{ value: 50, label: '50' }]}
            placeholder="50"
            isSearchable={false}
          />
          <span className={styles.paginationInfo}>items per page</span>
          <span className={styles.paginationCount}>
            1 - {filteredProcesses.length} of {filteredProcesses.length} items
          </span>
        </div>
      </div>
    </>
  );
};

export default ProcessMonitorSettings;
