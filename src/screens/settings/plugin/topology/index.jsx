"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';

const MOCK_TOPOLOGIES = [
  { id: 1, name: 'SSH CDP Topology', protocolType: 'Custom', usedCount: 0 },
  { id: 2, name: 'SSH Cisco BGP Topology', protocolType: 'Custom', usedCount: 0 },
];

const TopologyPlugin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [topologies, setTopologies] = useState(MOCK_TOPOLOGIES);

  const filteredTopologies = topologies.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        <div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <h2 className={styles.pageTitle}>Topology Plugin</h2>
            <button className={styles.btnPrimary}>Create Topology Plugin</button>
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
                  <th>Name <Icon icon="mdi:arrow-up" width={14} height={14} /></th>
                  <th>Protocol Type</th>
                  <th>Used Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTopologies.map((item) => (
                  <tr key={item.id}>
                    <td><a href="#" className={styles.linkBlue}>{item.name}</a></td>
                    <td>{item.protocolType}</td>
                    <td><span className={styles.badgeInfo}>{item.usedCount}</span></td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="More"><Icon icon="mdi:dots-vertical" width={18} height={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <button className={styles.paginationBtn}><Icon icon="mdi:chevron-double-left" width={18} height={18} /></button>
            <button className={styles.paginationBtn}><Icon icon="mdi:chevron-left" width={18} height={18} /></button>
            <span className={styles.pageNumber}>1</span>
            <button className={styles.paginationBtn}><Icon icon="mdi:chevron-right" width={18} height={18} /></button>
            <button className={styles.paginationBtn}><Icon icon="mdi:chevron-double-right" width={18} height={18} /></button>
            <SelectComponent
              className={styles.itemsPerPageSelect}
              value={50}
              onChange={() => {}}
              options={[{ value: 50, label: '50' }]}
              placeholder="50"
              isSearchable={false}
            />
            <span className={styles.paginationInfo}>Items per page</span>
            <span className={styles.paginationTotal}>1 - {filteredTopologies.length} of {filteredTopologies.length} Items</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopologyPlugin;
