"use client";
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const MOCK_DNS_SERVERS = [
  {
    id: 1,
    name: '8.8.8.8',
    description: '-',
    ip: '8.8.8.8',
    port: '53',
    type: 'Auto',
    usedCount: 0,
    lastSyncAt: '-',
  },
  {
    id: 2,
    name: '4.2.2.2',
    description: '-',
    ip: '4.2.2.2',
    port: '53',
    type: 'Auto',
    usedCount: 0,
    lastSyncAt: '-',
  },
];
const DNSServerProfile = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [servers, setServers] = useState(MOCK_DNS_SERVERS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: '',
    description: '',
    ip: '',
    port: '53',
    timeout: '0',
  });
  const filteredServers = servers.filter((server) =>
    server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    server.ip.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <div>
              <h2 className={styles.pageTitle}>DNS Server Profile</h2>
              <p className={styles.pageDescription}>
                Configure DNS servers to enable IP-to-FQDN resolution for logs, flows and discovery.{' '}
                <a href="#" className={styles.link}>
                  DNS Server Profile
                  <Icon icon="mdi:open-in-new" width={16} height={16} />
                </a>
              </p>
            </div>
            <button className={styles.btnPrimary} onClick={() => setShowCreateModal(true)}>
              Create DNS Server Profile
            </button>
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
                  <th>DNS SERVER PROFILE NAME</th>
                  <th>DESCRIPTION</th>
                  <th>DNS SERVER IP</th>
                  <th>PORT</th>
                  <th>TYPE</th>
                  <th>USED COUNT</th>
                  <th>LAST SYNC AT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredServers.map((server) => (
                  <tr key={server.id}>
                    <td>
                      <a href="#" className={styles.linkBlue}>
                        {server.name}
                      </a>
                    </td>
                    <td>{server.description}</td>
                    <td>{server.ip}</td>
                    <td>{server.port}</td>
                    <td>{server.type}</td>
                    <td>
                      <span className={styles.badgeInfo} style={{borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0}}>{server.usedCount}</span>
                    </td>
                    <td>{server.lastSyncAt}</td>
                    <td>
                      <div className={styles.actions}>
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
              options={[
                { value: 50, label: '50' },
                { value: 100, label: '100' },
              ]}
              placeholder="50"
              isSearchable={false}
            />
            <span className={styles.paginationInfo}>Items per page</span>
            <span className={styles.paginationTotal}>1 - 2 of 2 Items</span>
          </div>
        </div>
      </div>
      {/* Create DNS Server Profile Sidebar */}
      <FilterSidebar
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create DNS Server Profile"
        filters={[]}
        onApply={() => {
          console.log('Create DNS Profile:', newProfile);
          setShowCreateModal(false);
        }}
        onReset={() => setNewProfile({
          name: '',
          description: '',
          ip: '',
          port: '53',
          timeout: '0',
        })}
        applyButtonText="Add DNS Server"
        resetButtonText="Reset"
      >
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>DNS Server Profile Name <span style={{color: 'var(--color-danger)'}}>*</span></label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Write DNS Server Profile Name"
            value={newProfile.name}
            onChange={(e) => setNewProfile({...newProfile, name: e.target.value})}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Description</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Write Description"
            value={newProfile.description}
            onChange={(e) => setNewProfile({...newProfile, description: e.target.value})}
          />
        </div>
        <div style={{display: 'flex', gap: 'var(--gap-md)'}}>
          <div className={styles.formGroup} style={{flex: 1}}>
            <label className={styles.formLabel}>DNS Server IP <span style={{color: 'var(--color-danger)'}}>*</span></label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="Write DNS Server IP"
              value={newProfile.ip}
              onChange={(e) => setNewProfile({...newProfile, ip: e.target.value})}
            />
          </div>
          <div className={styles.formGroup} style={{flex: 1}}>
            <label className={styles.formLabel}>Port <span style={{color: 'var(--color-danger)'}}>*</span></label>
            <input
              type="text"
              className={styles.formInput}
              value={newProfile.port}
              onChange={(e) => setNewProfile({...newProfile, port: e.target.value})}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Timeout (in sec) <span style={{color: 'var(--color-danger)'}}>*</span></label>
          <input
            type="text"
            className={styles.formInput}
            value={newProfile.timeout}
            onChange={(e) => setNewProfile({...newProfile, timeout: e.target.value})}
          />
        </div>
        <div className={styles.formGroup} style={{marginTop: 'var(--margin-lg)'}}>
          <p style={{fontSize: 'var(--font-sm)', color: 'var(--color-text-secondary)'}}>
            For more information: <a href="#" className={styles.linkBlue}>DNS Server Profile <Icon icon="mdi:open-in-new" width={14} height={14} /></a>
          </p>
        </div>
        <p style={{fontSize: 'var(--font-xs)', color: 'var(--color-danger)', marginTop: 'var(--margin-lg)'}}>
          * fields are mandatory
        </p>
      </FilterSidebar>
  </>
  );
};
export default DNSServerProfile;
