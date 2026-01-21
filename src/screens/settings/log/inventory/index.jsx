"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import sharedStyles from '../../shared-settings-styles.module.css';

const MOCK_INVENTORY = [
  { id: 1, name: 'Cisco-Router-Edge', ip: '172.16.10.1', type: 'Syslog', status: 'Active', logsCount: '1.2M' },
  { id: 2, name: 'Linux-Server-App', ip: '172.16.10.25', type: 'Agent', status: 'Active', logsCount: '450K' },
];

const LogInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className={sharedStyles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.contentHeader}>
            <div>
              <h2 className={sharedStyles.pageTitle}>Log Inventory</h2>
              <p className={sharedStyles.pageDescription}>
                View and manage all log sources and their collection status.
              </p>
            </div>
            <button className={sharedStyles.btnPrimary}>Add Log Source</button>
          </div>

          <div className={sharedStyles.toolbar}>
            <div className={sharedStyles.searchBox}>
              <Icon icon="mdi:magnify" width={18} height={18} />
              <input
                type="text"
                placeholder="Search inventory"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className={sharedStyles.tableContainer}>
            <table className={sharedStyles.table}>
              <thead>
                <tr>
                  <th>SOURCE NAME <Icon icon="mdi:arrow-up" width={14} height={14} /></th>
                  <th>IP ADDRESS</th>
                  <th>COLLECTION TYPE</th>
                  <th>STATUS</th>
                  <th>LOGS (24H)</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_INVENTORY.map((item) => (
                  <tr key={item.id}>
                    <td><a href="#" className={sharedStyles.linkBlue}>{item.name}</a></td>
                    <td>{item.ip}</td>
                    <td>{item.type}</td>
                    <td><span className={sharedStyles.badgeSuccess}>{item.status}</span></td>
                    <td>{item.logsCount}</td>
                    <td>
                      <div className={sharedStyles.actions}>
                        <button className={sharedStyles.actionBtn} title="View Logs"><Icon icon="mdi:eye-outline" width={18} height={18} /></button>
                        <button className={sharedStyles.actionBtn} title="Settings"><Icon icon="mdi:cog" width={18} height={18} /></button>
                        <button className={sharedStyles.actionBtn} title="Delete"><Icon icon="mdi:trash-can-outline" width={18} height={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={sharedStyles.pagination}>
            <button className={sharedStyles.paginationBtn} disabled><Icon icon="mdi:chevron-double-left" width={18} height={18} /></button>
            <button className={sharedStyles.paginationBtn} disabled><Icon icon="mdi:chevron-left" width={18} height={18} /></button>
            <span className={sharedStyles.pageNumber}>1</span>
            <button className={sharedStyles.paginationBtn} disabled><Icon icon="mdi:chevron-right" width={18} height={18} /></button>
            <button className={sharedStyles.paginationBtn} disabled><Icon icon="mdi:chevron-double-right" width={18} height={18} /></button>
            <SelectComponent
              className={sharedStyles.itemsPerPageSelect}
              value={50}
              onChange={() => {}}
              options={[{ value: 50, label: '50' }]}
              placeholder="50"
              isSearchable={false}
            />
            <span className={sharedStyles.paginationInfo}>Items per page</span>
            <span className={sharedStyles.paginationTotal}>1 - {MOCK_INVENTORY.length} of {MOCK_INVENTORY.length} Items</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInventory;
