"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock service data
const MOCK_SERVICES = [
  { id: 1, name: 'ADWS', applicationType: 'windows', osType: 'windows' },
  { id: 2, name: 'Amsp', applicationType: 'windows', osType: 'windows' },
  { id: 3, name: 'AppInfo', applicationType: 'docker', osType: 'windows' },
  { id: 4, name: 'AVP', applicationType: 'windows', osType: 'windows' },
  { id: 5, name: 'DB2', applicationType: 'db', osType: 'windows' },
];

const ServiceMonitorSettings = () => {
  const [tableSearchTerm, setTableSearchTerm] = useState('');
  
  const filteredServices = MOCK_SERVICES.filter((service) =>
    service.name.toLowerCase().includes(tableSearchTerm.toLowerCase())
  );

  const renderAppIcon = (type) => {
    const iconMap = {
      windows: <Icon icon="mdi:microsoft-windows" width={20} height={20} />,
      docker: <Icon icon="mdi:docker" width={20} height={20} />,
      db: <Icon icon="mdi:database" width={20} height={20} style={{ color: '#22c55e' }} />,
      ibm: <Icon icon="mdi:server-network" width={20} height={20} />,
      iis: <Icon icon="mdi:server-network" width={20} height={20} />,
      mq: <Icon icon="mdi:web" width={20} height={20} />,
      exchange: <Icon icon="mdi:email" width={20} height={20} />,
      msmq: <Icon icon="mdi:email-outline" width={20} height={20} />,
    };
    return iconMap[type] || <Icon icon="mdi:microsoft-windows" width={20} height={20} />;
  };

  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Service Monitor Settings</h1>
          <p className={styles.pageDescription}>
            Easily monitor services with snr-edatas AIOps and discover corresponding applications seamlessly.
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
          <button className={styles.createBtn}>Create Service</button>
        </div>

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>SERVICE <span className={styles.sortIcon}>↑</span></th>
                <th>APPLICATION TYPE</th>
                <th>OS TYPE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id}>
                  <td className={styles.serviceCell}>{service.name}</td>
                  <td>
                    <div className={styles.iconCell}>
                      <span className={styles.appIcon}>
                        {renderAppIcon(service.applicationType)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.iconCell}>
                      <Icon icon="mdi:microsoft-windows" width={20} height={20} style={{ color: '#0078D4' }} />
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
            1 - {filteredServices.length} of {filteredServices.length} items
          </span>
        </div>
      </div>
    </>
  );
};

export default ServiceMonitorSettings;
