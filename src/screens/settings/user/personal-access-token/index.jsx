"use client";
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const MOCK_TOKENS = [
  {
    id: 1,
    name: 'api',
    description: 'for API test in postman',
    userName: 'admin',
    token: '****************',
    createdBy: 'admin',
    createdTime: '2024-01-15 10:30:00',
    expiresAt: '2025-01-15 10:30:00',
    status: 'Active',
  },
  {
    id: 2,
    name: 'server-token',
    description: 'token is used in server\'s postman collection',
    userName: 'admin',
    token: '****************',
    createdBy: 'admin',
    createdTime: '2024-02-20 14:15:00',
    expiresAt: '2025-02-20 14:15:00',
    status: 'Active',
  },
  {
    id: 3,
    name: 'LDAP User Token',
    description: 'This token is for Ronak user',
    userName: 'ronak',
    token: '****************',
    createdBy: 'admin',
    createdTime: '2024-03-10 09:45:00',
    expiresAt: '2025-03-10 09:45:00',
    status: 'Active',
  },
];
const PersonalAccessToken = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newToken, setNewToken] = useState({
    name: '',
    description: '',
    user: '',
    validity: '',
    token: '',
  });
  const filteredTokens = MOCK_TOKENS.filter((token) =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
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
            <button className={styles.btnPrimary} onClick={() => setShowCreateModal(true)}>
              <Icon icon="mdi:plus" width={18} height={18} />
              Create Personal Access Token
            </button>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>DESCRIPTION</th>
                  <th>USER NAME</th>
                  <th>TOKEN</th>
                  <th>CREATED BY</th>
                  <th>CREATED TIME</th>
                  <th>EXPIRES AT</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredTokens.map((token) => (
                  <tr key={token.id}>
                    <td>
                      <a href="#" className={styles.linkBlue}>{token.name}</a>
                    </td>
                    <td>{token.description}</td>
                    <td>
                      <span className={styles.destinationBadge}>{token.userName}</span>
                    </td>
                    <td>{token.token}</td>
                    <td>{token.createdBy}</td>
                    <td>{token.createdTime}</td>
                    <td>{token.expiresAt}</td>
                    <td>
                      <span className={styles.badgeSuccess}>{token.status}</span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="Edit">
                          <Icon icon="mdi:pencil" width={18} height={18} />
                        </button>
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
              options={[{ value: 50, label: '50' }]}
              placeholder="50"
              isSearchable={false}
            />
            <span className={styles.paginationInfo}>Items per page</span>
            <span className={styles.paginationTotal}>1 - 3 of 3 Items</span>
          </div>
        </div>
      </div>
      {/* Create Personal Access Token Sidebar */}
      <FilterSidebar
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Personal Access Token"
        filters={[]}
        onApply={() => {
          console.log('Create Token:', newToken);
          setShowCreateModal(false);
        }}
        onReset={() => setNewToken({
          name: '',
          description: '',
          user: '',
          validity: '',
          token: '',
        })}
        applyButtonText="Create Token"
        resetButtonText="Reset"
      >
        <div className={styles.formGroup} style={{marginBottom: 'var(--margin-lg)'}}>
          <label className={styles.formLabel}>Token Name <span style={{color: 'var(--color-danger)'}}>*</span></label>
          <input
            type="text"
            className={styles.formInput}
            value={newToken.name}
            onChange={(e) => setNewToken({...newToken, name: e.target.value})}
          />
        </div>
        <div className={styles.formGroup} style={{marginBottom: 'var(--margin-lg)'}}>
          <label className={styles.formLabel}>Description</label>
          <input
            type="text"
            className={styles.formInput}
            value={newToken.description}
            onChange={(e) => setNewToken({...newToken, description: e.target.value})}
          />
        </div>
        <div className={styles.formGroup} style={{marginBottom: 'var(--margin-lg)'}}>
          <label className={styles.formLabel}>User <span style={{color: 'var(--color-danger)'}}>*</span></label>
          <SelectComponent
            className={styles.formSelect}
            value={newToken.user}
            onChange={(e) => setNewToken({...newToken, user: e.target.value})}
            options={[
              { value: 'admin', label: 'admin' },
              { value: 'ronak', label: 'ronak' },
            ]}
            placeholder="Select"
          />
        </div>
        <div className={styles.formGroup} style={{marginBottom: 'var(--margin-lg)'}}>
          <label className={styles.formLabel}>Validity <span style={{color: 'var(--color-danger)'}}>*</span></label>
          <SelectComponent
            className={styles.formSelect}
            value={newToken.validity}
            onChange={(e) => setNewToken({...newToken, validity: e.target.value})}
            options={[
              { value: '30', label: '30 Days' },
              { value: '60', label: '60 Days' },
              { value: '90', label: '90 Days' },
              { value: '365', label: '1 Year' },
            ]}
            placeholder="Select"
          />
        </div>
        <div className={styles.formGroup} style={{marginBottom: 'var(--margin-lg)'}}>
          <label className={styles.formLabel}>Personal Access token</label>
          <div style={{display: 'flex', gap: '8px'}}>
            <input
              type="text"
              className={styles.formInput}
              style={{flex: 1}}
              value={newToken.token}
              readOnly
            />
            <button className={styles.btnSecondary} style={{padding: '0 10px'}}>
              <Icon icon="mdi:eye" width={18} height={18} />
            </button>
            <button className={styles.btnSecondary} style={{padding: '0 10px'}}>
              <Icon icon="mdi:content-copy" width={18} height={18} />
            </button>
            <button 
              className={styles.btnPrimary} 
              style={{padding: '0 12px'}}
              onClick={() => setNewToken({...newToken, token: 'generated-token-123'})}
            >
              Generate
            </button>
          </div>
        </div>
        <p style={{fontSize: 'var(--font-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--margin-lg)'}}>
          For more information: <a href="#" className={styles.link}>Personal Access Token</a>
        </p>
        <p style={{fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--margin-sm)'}}>
          * fields are mandatory
        </p>
      </FilterSidebar>
  </>
  );
};
export default PersonalAccessToken;
