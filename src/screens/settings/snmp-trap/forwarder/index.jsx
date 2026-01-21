"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock data
const MOCK_FORWARDERS = [
  {
    id: '1',
    name: 'test',
    profiles: '',
    destination: '1.1.1.1',
  },
];

const SNMPTrapForwarder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Form state
  const [forwarderName, setForwarderName] = useState('');
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [destinationIP, setDestinationIP] = useState('');
  const [port, setPort] = useState('162');

  const filteredForwarders = MOCK_FORWARDERS.filter((forwarder) =>
    forwarder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReset = () => {
    setForwarderName('');
    setSelectedProfiles([]);
    setDestinationIP('');
    setPort('162');
  };

  const handleCreate = () => {
    if (!forwarderName || !destinationIP || !port) {
      alert('Please fill in required fields');
      return;
    }
    alert('SNMP Trap Forwarder created successfully!');
    handleReset();
    setShowCreateModal(false);
  };

  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        <div className={styles.toolbar}>
          <div className={styles.searchBar}>
            <Icon icon="mdi:magnify" className={styles.searchIcon} width={18} height={18} />
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className={styles.createBtn}
            onClick={() => setShowCreateModal(true)}
          >
            Create SNMP Trap Forwarder
          </button>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  SNMP TRAP FORWARDER NAME{' '}
                  <span className={styles.sortIcon}>↑</span>
                </th>
                <th>SNMP TRAP PROFILES</th>
                <th>DESTINATION IP/HOST</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredForwarders.map((forwarder) => (
                <tr key={forwarder.id}>
                  <td>{forwarder.name}</td>
                  <td>{forwarder.profiles || '-'}</td>
                  <td>{forwarder.destination}</td>
                  <td>
                    <button className={styles.actionBtn}>⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.pagination}>
          <div className={styles.paginationControls}>
            <button className={styles.pageBtn}>«</button>
            <button className={styles.pageBtn}>‹</button>
            <button className={styles.pageBtn}>1</button>
            <button className={styles.pageBtn}>›</button>
            <button className={styles.pageBtn}>»</button>
            <SelectComponent
              className={styles.itemsSelect}
              value={50}
              onChange={() => {}}
              options={[
                { value: 50, label: '50' },
              ]}
              placeholder="50"
              isSearchable={false}
            />
            <span className={styles.paginationText}>Items per page</span>
          </div>
          <div className={styles.paginationInfo}>1 - 1 of 1 Items</div>
        </div>
        
        {showCreateModal && (
          <div
            className={styles.modalOverlay}
            onClick={() => setShowCreateModal(false)}
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>
                  Create SNMP Trap Forwarder
                </h3>
                <button
                  className={styles.closeBtn}
                  onClick={() => setShowCreateModal(false)}
                >
                  <Icon icon="mdi:close" width={20} height={20} />
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    SNMP Trap Forwarder Name{' '}
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Must be unique"
                    value={forwarderName}
                    onChange={(e) => setForwarderName(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    SNMP Trap Profiles{' '}
                    <span className={styles.required}>*</span>
                  </label>
                  <SelectComponent
                    className={styles.select}
                    value=""
                    onChange={() => {}}
                    options={[
                      { value: '', label: 'Select' },
                      { value: 'profile1', label: 'Profile 1' },
                      { value: 'profile2', label: 'Profile 2' },
                    ]}
                    placeholder="Select"
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Destination IP/Host{' '}
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="e.g. 192.168.1.1 or localhost"
                      value={destinationIP}
                      onChange={(e) => setDestinationIP(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Port <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      className={styles.input}
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.helpText}>
                  For more information:{' '}
                  <a href="#" className={styles.link}>
                    Create SNMP Trap Forwarder ↗
                  </a>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.resetBtn} onClick={handleReset}>
                  Reset
                </button>
                <button
                  className={styles.createBtnPrimary}
                  onClick={handleCreate}
                >
                  Create SNMP Trap Forwarder
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SNMPTrapForwarder;
