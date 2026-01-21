"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import sharedStyles from '../../shared-settings-styles.module.css';

const MOCK_FORWARDERS = [
  { id: 1, name: 'SIEM-Forwarder', destination: '10.10.20.50', protocol: 'TCP/TLS', status: 'Connected', eventsSent: '4.5M' },
  { id: 2, name: 'Elasticsearch-Cloud', destination: 'cloud.elastic.co:9243', protocol: 'HTTPS', status: 'Connected', eventsSent: '12.8M' },
];

const LogForwarder = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className={sharedStyles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.contentHeader}>
            <div>
              <h2 className={sharedStyles.pageTitle}>Log Forwarder</h2>
              <p className={sharedStyles.pageDescription}>
                Forward processed logs to external SIEM, analytics, or storage platforms.
              </p>
            </div>
            <button className={sharedStyles.btnPrimary}>Add Forwarder</button>
          </div>

          <div className={sharedStyles.toolbar}>
            <div className={sharedStyles.searchBox}>
              <Icon icon="mdi:magnify" width={18} height={18} />
              <input
                type="text"
                placeholder="Search forwarders"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className={sharedStyles.tableContainer}>
            <table className={sharedStyles.table}>
              <thead>
                <tr>
                  <th>FORWARDER NAME <Icon icon="mdi:arrow-up" width={14} height={14} /></th>
                  <th>DESTINATION</th>
                  <th>PROTOCOL</th>
                  <th>STATUS</th>
                  <th>EVENTS SENT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_FORWARDERS.map((item) => (
                  <tr key={item.id}>
                    <td><a href="#" className={sharedStyles.linkBlue}>{item.name}</a></td>
                    <td>{item.destination}</td>
                    <td>{item.protocol}</td>
                    <td><span className={sharedStyles.badgeSuccess}>{item.status}</span></td>
                    <td>{item.eventsSent}</td>
                    <td>
                      <div className={sharedStyles.actions}>
                        <button className={sharedStyles.actionBtn} title="Test Connection"><Icon icon="mdi:transit-connection-variant" width={18} height={18} /></button>
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
            <span className={sharedStyles.paginationTotal}>1 - {MOCK_FORWARDERS.length} of {MOCK_FORWARDERS.length} Items</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogForwarder;
