"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock SNMP Device Catalog data
const MOCK_SNMP_CATALOGS = [
  {
    id: 1,
    name: '<SUMIOBLENERGQ> PJSC',
    vendor: '<SUMIOBLENERGQ> PJSC',
    type: 'SNMP',
    usedCount: 0,
    systemOid: '1.3.6.1.4.14614',
    createdBy: 'System',
  },
  {
    id: 2,
    name: '0x0f',
    vendor: '0x0f',
    type: 'SNMP',
    usedCount: 0,
    systemOid: '1.3.6.1.4.148303',
    createdBy: 'System',
  },
];

const SNMPDeviceCatalog = () => {
  const [tableSearchTerm, setTableSearchTerm] = useState('');

  const filteredCatalogs = MOCK_SNMP_CATALOGS.filter(
    (catalog) =>
      catalog.name.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
      catalog.vendor.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
      catalog.systemOid.toLowerCase().includes(tableSearchTerm.toLowerCase())
  );

  const handleCreateNew = () => {
    alert('Creating new SNMP Device Catalog');
  };

  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
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
            {tableSearchTerm && (
              <button
                className={styles.clearSearch}
                onClick={() => setTableSearchTerm('')}
              >
                <Icon icon="mdi:close" width={16} height={16} />
              </button>
            )}
          </div>
          <div className={styles.headerActions}>
            <button className={styles.filterBtn}>
              <Icon icon="mdi:filter" width={18} height={18} />
            </button>
            <button className={styles.createBtn} onClick={handleCreateNew}>
              Create SNMP Device Catalog
            </button>
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  SNMP DEVICE CATALOG NAME{' '}
                  <span className={styles.sortIcon}>↑</span>
                </th>
                <th>VENDOR</th>
                <th>TYPE</th>
                <th>USED COUNT</th>
                <th>SYSTEM OID</th>
                <th>CREATED BY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredCatalogs.map((catalog) => (
                <tr key={catalog.id}>
                  <td className={styles.nameCell}>{catalog.name}</td>
                  <td>{catalog.vendor}</td>
                  <td>
                    <span className={styles.typeIcon}>📋</span>
                  </td>
                  <td>
                    <span className={styles.countBadge}>
                      {catalog.usedCount}
                    </span>
                  </td>
                  <td>{catalog.systemOid}</td>
                  <td>{catalog.createdBy}</td>
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
            1 - {filteredCatalogs.length} of {filteredCatalogs.length} items
          </span>
        </div>
      </div>
    </>
  );
};

export default SNMPDeviceCatalog;
