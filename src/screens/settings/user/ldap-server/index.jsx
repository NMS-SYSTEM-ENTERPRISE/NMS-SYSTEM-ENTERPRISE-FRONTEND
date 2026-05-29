'use client';
import { Button } from '@/components/ui/button';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const MOCK_LDAP_SERVERS = [
  {
    id: 1,
    ipHost: '172.16.8.57',
    fqdn: 'snr-edatasqa.local',
    ldapGroups: 'snr-edatas users',
    lastSyncAt: 'Last sync at Thu, Apr 17, 2025 08:01:56 AM',
  },
];
const LDAPServerSettings = () => {
  const [searchTags, setSearchTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newServer, setNewServer] = useState({
    primaryIpHost: '',
    secondaryIpHost: '',
    domainName: '',
    serverType: 'Microsoft AD',
    secureLdap: false,
    port: '389',
    userName: '',
    password: '',
    ldapAuthentication: false,
    autoSync: false,
    ldapGroups: '',
  });
  const handleToggle = (key) => {
    setNewServer((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredServers = useMemo(() => {
    if (searchTags.length === 0) return MOCK_LDAP_SERVERS;
    return MOCK_LDAP_SERVERS.filter((server) =>
      searchTags.every((tag) => {
        const lowerTag = tag.toLowerCase();
        return (
          server.ipHost.toLowerCase().includes(lowerTag) ||
          server.fqdn.toLowerCase().includes(lowerTag) ||
          server.ldapGroups.toLowerCase().includes(lowerTag)
        );
      })
    );
  }, [searchTags]);

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search LDAP servers..."
            />
            <div className={styles.headerActions}>
              <Button variant="cyan" onClick={() => setShowAddModal(true)}>
                <Icon icon="mdi:plus" width={18} height={18} />
                Add LDAP Server
              </Button>
            </div>
          </div>

          <div className={styles.listPageBody}>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>IP/HOST</th>
                    <th>FQDN</th>
                    <th>LDAP GROUPS</th>
                    <th>LAST SYNC AT</th>
                    <th>SYNC</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServers.map((server) => (
                    <tr key={server.id}>
                      <td>{server.ipHost}</td>
                      <td>{server.fqdn}</td>
                      <td>
                        <span className={styles.destinationBadge}>
                          {server.ldapGroups}
                        </span>
                      </td>
                      <td>{server.lastSyncAt}</td>
                      <td>
                        <button className={styles.actionBtn} type="button" title="Sync">
                          <Icon
                            icon="mdi:play-circle-outline"
                            width={20}
                            height={20}
                          />
                        </button>
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.actionBtn} type="button" title="More">
                            <Icon
                              icon="mdi:dots-vertical"
                              width={18}
                              height={18}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              className={styles.settingsListPagination}
              currentPage={currentPage}
              totalItems={filteredServers.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>
      {/* Add LDAP Server Sidebar */}
      <FilterSidebar
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add LDAP Server"
        filters={[]}
        onApply={() => {
          console.log('Add LDAP Server:', newServer);
          setShowAddModal(false);
        }}
        onReset={() =>
          setNewServer({
            primaryIpHost: '',
            secondaryIpHost: '',
            domainName: '',
            serverType: 'Microsoft AD',
            secureLdap: false,
            port: '389',
            userName: '',
            password: '',
            ldapAuthentication: false,
            autoSync: false,
            ldapGroups: '',
          })
        }
        applyButtonText="Add LDAP Server"
        resetButtonText="Reset"
      >
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>
            Primary IP/Host{' '}
            <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="e.g. 192.168.1.1 or fd00::1 or prod.snr-edatas.com"
            value={newServer.primaryIpHost}
            onChange={(e) =>
              setNewServer({ ...newServer, primaryIpHost: e.target.value })
            }
          />
        </div>
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>Secondary IP/Host</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="e.g. 192.168.1.1 or fd00::1 or prod.snr-edatas.com"
            value={newServer.secondaryIpHost}
            onChange={(e) =>
              setNewServer({ ...newServer, secondaryIpHost: e.target.value })
            }
          />
        </div>
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>
            Domain Name <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="e.g. prod.snr-edatas.com"
            value={newServer.domainName}
            onChange={(e) =>
              setNewServer({ ...newServer, domainName: e.target.value })
            }
          />
        </div>
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>
            Server Type <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <SelectComponent
            className={styles.formSelect}
            value={newServer.serverType}
            onChange={(e) =>
              setNewServer({ ...newServer, serverType: e.target.value })
            }
            options={[
              { value: 'Microsoft AD', label: 'Microsoft AD' },
              { value: 'OpenLDAP', label: 'OpenLDAP' },
            ]}
            placeholder="Select"
          />
        </div>
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>
            Secure LDAP <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <button
            className={`${styles.toggleBtn} ${newServer.secureLdap ? styles.toggleBtnOn : ''
              }`}
            onClick={() => handleToggle('secureLdap')}
          >
            <span className={styles.toggleSlider}></span>
            <span className={styles.toggleLabel}>
              {newServer.secureLdap ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>
            Port <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            type="text"
            className={styles.formInput}
            value={newServer.port}
            onChange={(e) =>
              setNewServer({ ...newServer, port: e.target.value })
            }
          />
        </div>
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>
            User Name <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="e.g. johndoe@domain.com or domain/johndoe"
            value={newServer.userName}
            onChange={(e) =>
              setNewServer({ ...newServer, userName: e.target.value })
            }
          />
        </div>
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>
            Password <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="password"
              className={styles.formInput}
              style={{ flex: 1 }}
              value={newServer.password}
              onChange={(e) =>
                setNewServer({ ...newServer, password: e.target.value })
              }
            />
            <button className={styles.btnPrimary} style={{ padding: '0 12px' }}>
              Test
            </button>
          </div>
        </div>
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>
            LDAP Authentication{' '}
            <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <button
            className={`${styles.toggleBtn} ${newServer.ldapAuthentication ? styles.toggleBtnOn : ''
              }`}
            onClick={() => handleToggle('ldapAuthentication')}
          >
            <span className={styles.toggleSlider}></span>
            <span className={styles.toggleLabel}>
              {newServer.ldapAuthentication ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>
            Auto Sync <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <button
            className={`${styles.toggleBtn} ${newServer.autoSync ? styles.toggleBtnOn : ''
              }`}
            onClick={() => handleToggle('autoSync')}
          >
            <span className={styles.toggleSlider}></span>
            <span className={styles.toggleLabel}>
              {newServer.autoSync ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
        <div
          className={styles.formGroup}
          style={{ marginBottom: 'var(--margin-lg)' }}
        >
          <label className={styles.formLabel}>
            LDAP Groups <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="ldap groups"
            value={newServer.ldapGroups}
            onChange={(e) =>
              setNewServer({ ...newServer, ldapGroups: e.target.value })
            }
          />
        </div>
        <p
          style={{
            fontSize: 'var(--font-xs)',
            color: 'var(--color-text-secondary)',
            marginTop: 'var(--margin-lg)',
          }}
        >
          For more information:{' '}
          <a href="#" className={styles.link}>
            LDAP Server
          </a>
        </p>
        <p
          style={{
            fontSize: 'var(--font-xs)',
            color: 'var(--color-text-muted)',
            marginTop: 'var(--margin-sm)',
          }}
        >
          * fields are mandatory
        </p>
      </FilterSidebar>
    </>
  );
};
export default LDAPServerSettings;
