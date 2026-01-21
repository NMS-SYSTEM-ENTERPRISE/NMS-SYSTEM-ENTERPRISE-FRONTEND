"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

const MOCK_TOPOLOGY_SCANS = [
  { id: 1, entryPoint: 'fg_firewall.mindarrauy.com', schedulerType: 'Daily', startDate: '01-10-2021', triggers: '12:00', totalRuntime: '-', status: 'scheduled' },
  { id: 2, entryPoint: 'cisco_core.snr-edatas.local', schedulerType: 'Daily', startDate: '23-08-2024', triggers: '00:00', totalRuntime: '38 seconds', status: 'completed' },
];

const TopologyScanner = () => {
  const [tableSearchTerm, setTableSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [selectedScans, setSelectedScans] = useState([]);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const filteredScans = MOCK_TOPOLOGY_SCANS.filter(
    (scan) =>
      scan.entryPoint.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
      scan.schedulerType.toLowerCase().includes(tableSearchTerm.toLowerCase())
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedScans(filteredScans.map(scan => scan.id));
    } else {
      setSelectedScans([]);
    }
  };

  const handleSelectScan = (id) => {
    setSelectedScans((prev) =>
      prev.includes(id) ? prev.filter((scanId) => scanId !== id) : [...prev, id]
    );
  };

  const getStatusBadgeClass = (status) => {
    if (status === 'completed') return styles.badgeCompleted;
    if (status === 'scheduled') return styles.badgeScheduled;
    return styles.badgeDefault;
  };

  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        <div className={styles.mainHeader}>
          <h1 className={styles.pageTitle}>Topology Scanner</h1>
          <p className={styles.pageDescription}>
            Standardize your network discovery process by scheduling topology scans.
          </p>
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <div className={styles.searchBar}>
              <Icon icon="mdi:magnify" className={styles.searchIcon} width={18} height={18} />
              <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
                value={tableSearchTerm}
                onChange={(e) => setTableSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.toolbarRight}>
            <button className={styles.actionBtn} title="Settings">
              <Icon icon="mdi:cog" width={18} height={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={selectedScans.length === filteredScans.length && filteredScans.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>ENTRY POINTS</th>
                <th>SCHEDULER TYPE</th>
                <th>START DATE</th>
                <th>TRIGGERS</th>
                <th>TOTAL RUNTIME</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredScans.map((scan) => (
                <tr key={scan.id}>
                  <td className={styles.checkboxCell}>
                    <input
                      type="checkbox"
                      checked={selectedScans.includes(scan.id)}
                      onChange={() => handleSelectScan(scan.id)}
                    />
                  </td>
                  <td>{scan.entryPoint}</td>
                  <td>
                    <span className={getStatusBadgeClass(scan.status)}>
                      {scan.schedulerType}
                    </span>
                  </td>
                  <td>{scan.startDate}</td>
                  <td>{scan.triggers}</td>
                  <td>{scan.totalRuntime}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button className={styles.iconBtn} title="Enable/Disable"><Icon icon="mdi:check-circle" width={18} height={18} /></button>
                      <button className={styles.iconBtn} title="Play"><Icon icon="mdi:play-circle" width={18} height={18} /></button>
                      <button className={styles.iconBtn} title="More"><Icon icon="mdi:dots-vertical" width={18} height={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.paginationLeft}>
            <button className={styles.paginationBtn}><Icon icon="mdi:chevron-double-left" width={18} height={18} /></button>
            <button className={styles.paginationBtn}><Icon icon="mdi:chevron-left" width={18} height={18} /></button>
            <span className={styles.pageInfo}>1</span>
            <button className={styles.paginationBtn}><Icon icon="mdi:chevron-right" width={18} height={18} /></button>
            <button className={styles.paginationBtn}><Icon icon="mdi:chevron-double-right" width={18} height={18} /></button>
          </div>
          <div className={styles.paginationRight}>
            <SelectComponent
              className={styles.itemsPerPageSelect}
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              options={[{ value: 50, label: '50' }]}
              placeholder="50"
              isSearchable={false}
            />
            <span className={styles.itemsInfo}>items per page</span>
            <span className={styles.totalInfo}>1 - {filteredScans.length} of {filteredScans.length} items</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopologyScanner;
