"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import sharedStyles from '../../shared-settings-styles.module.css';

const MOCK_PARSERS = [
  { id: 1, name: 'Cisco Syslog Parser', description: 'Parses standard Cisco IOS syslog messages', type: 'Regex', version: '1.2.0' },
  { id: 2, name: 'Linux Audit Parser', description: 'Parses Linux auditd logs', type: 'Regex', version: '1.0.5' },
];

const LogParserLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className={sharedStyles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.contentHeader}>
            <div>
              <h2 className={sharedStyles.pageTitle}>Log Parser Library</h2>
              <p className={sharedStyles.pageDescription}>
                Manage log parsers, regex patterns, and field mappings for log processing.
              </p>
            </div>
            <button className={sharedStyles.btnPrimary}>Add New Parser</button>
          </div>

          <div className={sharedStyles.toolbar}>
            <div className={sharedStyles.searchBox}>
              <Icon icon="mdi:magnify" width={18} height={18} />
              <input
                type="text"
                placeholder="Search parsers"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className={sharedStyles.tableContainer}>
            <table className={sharedStyles.table}>
              <thead>
                <tr>
                  <th>PARSER NAME <Icon icon="mdi:arrow-up" width={14} height={14} /></th>
                  <th>DESCRIPTION</th>
                  <th>TYPE</th>
                  <th>VERSION</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PARSERS.map((parser) => (
                  <tr key={parser.id}>
                    <td><a href="#" className={sharedStyles.linkBlue}>{parser.name}</a></td>
                    <td>{parser.description}</td>
                    <td>{parser.type}</td>
                    <td><span className={sharedStyles.badgeInfo}>{parser.version}</span></td>
                    <td>
                      <div className={sharedStyles.actions}>
                        <button className={sharedStyles.actionBtn} title="Edit"><Icon icon="mdi:pencil" width={18} height={18} /></button>
                        <button className={sharedStyles.actionBtn} title="Duplicate"><Icon icon="mdi:content-copy" width={18} height={18} /></button>
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
            <span className={sharedStyles.paginationTotal}>1 - {MOCK_PARSERS.length} of {MOCK_PARSERS.length} Items</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogParserLibrary;
