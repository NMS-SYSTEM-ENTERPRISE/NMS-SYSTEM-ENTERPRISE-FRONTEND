"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import sharedStyles from '../../shared-settings-styles.module.css';

const MOCK_PROFILES = [
  { id: 1, name: 'Default Syslog Profile', description: 'Standard syslog collection on port 514', type: 'UDP', port: 514, sources: 12 },
  { id: 2, name: 'Secure Log Profile', description: 'Encrypted log collection via TLS', type: 'TCP/TLS', port: 6514, sources: 5 },
];

const CollectionProfile = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className={sharedStyles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.contentHeader}>
            <div>
              <h2 className={sharedStyles.pageTitle}>Collection Profile</h2>
              <p className={sharedStyles.pageDescription}>
                Define how logs are collected from different sources including protocols and ports.
              </p>
            </div>
            <button className={sharedStyles.btnPrimary}>Create Profile</button>
          </div>

          <div className={sharedStyles.toolbar}>
            <div className={sharedStyles.searchBox}>
              <Icon icon="mdi:magnify" width={18} height={18} />
              <input
                type="text"
                placeholder="Search profiles"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className={sharedStyles.tableContainer}>
            <table className={sharedStyles.table}>
              <thead>
                <tr>
                  <th>PROFILE NAME <Icon icon="mdi:arrow-up" width={14} height={14} /></th>
                  <th>DESCRIPTION</th>
                  <th>TYPE</th>
                  <th>PORT</th>
                  <th>SOURCES</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PROFILES.map((profile) => (
                  <tr key={profile.id}>
                    <td><a href="#" className={sharedStyles.linkBlue}>{profile.name}</a></td>
                    <td>{profile.description}</td>
                    <td>{profile.type}</td>
                    <td>{profile.port}</td>
                    <td><span className={sharedStyles.badgeInfo}>{profile.sources}</span></td>
                    <td>
                      <div className={sharedStyles.actions}>
                        <button className={sharedStyles.actionBtn} title="Edit"><Icon icon="mdi:pencil" width={18} height={18} /></button>
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
            <span className={sharedStyles.paginationTotal}>1 - {MOCK_PROFILES.length} of {MOCK_PROFILES.length} Items</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionProfile;
