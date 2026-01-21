"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../../shared-settings-styles.module.css';
const MOCK_RULES = [
  {
    id: 1,
    rule: "Set 'http Secure-server limit'",
    description: "Device management includes the ability to control the nu...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
  {
    id: 2,
    rule: "Set 'exec-timeout' to less than or equal to 10 min on 'ip htt...",
    description: "If no input is detected during the interval, the EXEC facility r...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
  {
    id: 3,
    rule: "Set the 'banner-text' for 'banner exec'",
    description: "This command specifies a message to be displayed when ...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
  {
    id: 4,
    rule: "Set the 'banner-text' for 'banner login'",
    description: "Follow the banner login command with one or more blank ...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
  {
    id: 5,
    rule: "Set 'exec-timeout' to less than or equal to 10 minutes for T...",
    description: "If no input is detected during the interval, the EXEC facility r...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
  {
    id: 6,
    rule: "Set 'exec-timeout' to less than or equal to 10 minutes 'line ...",
    description: "If no input is detected during the interval, the EXEC facility r...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
  {
    id: 7,
    rule: "Set 'exec-timeout' to less than or equal to 10 minutes 'line ...",
    description: "If no input is detected during the interval, the EXEC facility r...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
  {
    id: 8,
    rule: "Set 'transport input none' for 'line aux 0'",
    description: "When you want to allow only an outgoing connection on a l...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
  {
    id: 9,
    rule: "Set 'username secret' for all local users",
    description: "Username secret password type 5 and enable secret pass...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
  {
    id: 10,
    rule: "Set 'no snmp-server to disable SNMP when unused",
    description: "If not in use, disable simple network management protocol ...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
  {
    id: 11,
    rule: "Unset 'private' for 'snmp-server community'",
    description: "An SNMP community string permits read-only access to all ...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
  {
    id: 12,
    rule: "Unset 'public' for 'snmp-server community'",
    description: "An SNMP community string permits read-only access to all ...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
  {
    id: 13,
    rule: "Set the 'banner-text' for 'banner motd'",
    description: "This MOTD banner is displayed to all terminals connected a...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
  {
    id: 14,
    rule: "Set the 'banner-text' for 'webauth banner'",
    description: "This banner is displayed to all terminals connected and is u...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
  {
    id: 15,
    rule: "Set 'password' for 'enable secret'",
    description: "Enable secret password type 5 and enable secret passwor...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
  {
    id: 16,
    rule: "Enable 'service password-encryption'",
    description: "When password encryption is enabled, the encrypted form ...",
    tag: "Profile Applicability:Level 1",
    tagCount: "+4",
    ruleType: "Default",
  },
];
const ComplianceRules = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rules, setRules] = useState(MOCK_RULES);
  const filteredRules = rules.filter((rule) =>
    rule.rule.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <div>
              {/* Breadcrumb-like or just title? Image shows just search and create button in header line, but sidebar is active. */}
            </div>
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
            <Link href="/settings/compliance/rules/create" className={styles.btnPrimary}>
              Create Rule
            </Link>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>RULE</th>
                  <th>DESCRIPTION</th>
                  <th>TAG</th>
                  <th>RULE TYPE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredRules.map((rule) => (
                  <tr key={rule.id}>
                    <td>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <div style={{width: '4px', height: '20px', backgroundColor: 'var(--color-danger)'}}></div>
                        <a href="#" className={styles.linkBlue}>
                          {rule.rule}
                        </a>
                      </div>
                    </td>
                    <td>{rule.description}</td>
                    <td>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span className={styles.badge} style={{backgroundColor: 'rgba(255, 159, 28, 0.2)', color: 'var(--color-warning)'}}>
                          {rule.tag}
                        </span>
                        <span className={styles.badge} style={{backgroundColor: 'rgba(255, 159, 28, 0.2)', color: 'var(--color-warning)'}}>
                          {rule.tagCount}
                        </span>
                      </div>
                    </td>
                    <td>{rule.ruleType}</td>
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
            <span className={styles.paginationBtn}>2</span>
            <span style={{margin: '0 8px'}}>...</span>
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
            <span className={styles.paginationTotal}>1 - 50 of 86 Items</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ComplianceRules;
