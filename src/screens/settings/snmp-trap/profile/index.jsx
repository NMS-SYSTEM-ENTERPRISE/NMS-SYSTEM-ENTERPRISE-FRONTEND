"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock data for the table
const MOCK_PROFILES = [
  {
    id: '1',
    name: 'a2dSensorAvailCLEAR',
    trapOid: '1.3.6.1.4.1.21239.5.2.32767.0.21104',
    usedCount: 0,
  },
  {
    id: '2',
    name: 'a2dSensorAvailCLEAR',
    trapOid: '1.3.6.1.4.1.21239.5.1.32767.0.21104',
    usedCount: 0,
  },
];

const SNMPTrapProfile = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Form state
  const [profileName, setProfileName] = useState('');
  const [trapOid, setTrapOid] = useState('');
  const [filter, setFilter] = useState('no');
  const [translator, setTranslator] = useState('');

  const filteredProfiles = MOCK_PROFILES.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReset = () => {
    setProfileName('');
    setTrapOid('');
    setFilter('no');
    setTranslator('');
  };

  const handleCreate = () => {
    if (!profileName || !trapOid) {
      alert('Please fill in required fields');
      return;
    }
    alert('SNMP Trap Profile created successfully!');
    setShowCreateForm(false);
  };

  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        {!showCreateForm ? (
          <>
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
                onClick={() => setShowCreateForm(true)}
              >
                Create SNMP Trap Profile
              </button>
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>
                      SNMP TRAP PROFILE NAME{' '}
                      <span className={styles.sortIcon}>↑</span>
                    </th>
                    <th>TRAP OID</th>
                    <th>USED COUNT</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProfiles.map((profile) => (
                    <tr key={profile.id}>
                      <td className={styles.nameCell}>{profile.name}</td>
                      <td>{profile.trapOid}</td>
                      <td>
                        <span className={styles.usedCount}>
                          {profile.usedCount}
                        </span>
                      </td>
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
                <button className={styles.pageBtn}>2</button>
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
                <span className={styles.paginationText}>
                  Items per page
                </span>
              </div>
              <div className={styles.paginationInfo}>
                1 - 50 of 2 Items
              </div>
            </div>
          </>
        ) : (
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <button
                className={styles.backBtn}
                onClick={() => setShowCreateForm(false)}
              >
                <Icon icon="mdi:chevron-left" width={20} height={20} />
              </button>
              <h2 className={styles.formTitle}>Create SNMP Trap Profile</h2>
            </div>
            <div className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  SNMP Trap Profile Name{' '}
                  <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Must be unique"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Trap OID <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="e.g. 1.3.6.1.6.3.1.1.5.3 ( Must be unique )"
                  value={trapOid}
                  onChange={(e) => setTrapOid(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Filter{' '}
                  <Icon icon="mdi:help-circle" width={14} height={14} className={styles.helpIcon} />
                </label>
                <div className={styles.toggleGroup}>
                  <button
                    className={`${styles.toggleBtn} ${
                      filter === 'yes' ? styles.toggleBtnActive : ''
                    }`}
                    onClick={() => setFilter('yes')}
                  >
                    Yes
                  </button>
                  <button
                    className={`${styles.toggleBtn} ${
                      filter === 'no' ? styles.toggleBtnActive : ''
                    }`}
                    onClick={() => setFilter('no')}
                  >
                    No
                  </button>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>SNMP Trap Translator</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Provide the message you want to format a trap message using variable bindings. Variable binding index starts from 1 ($1 and so forth)."
                  rows={6}
                  value={translator}
                  onChange={(e) => setTranslator(e.target.value)}
                />
              </div>
              <div className={styles.formActions}>
                <button className={styles.resetBtn} onClick={handleReset}>
                  Reset
                </button>
                <button
                  className={styles.createBtnPrimary}
                  onClick={handleCreate}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SNMPTrapProfile;
