"use client";
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const MOCK_POLICIES = [
  {
    id: 1,
    name: 'CIS - PMG',
    description: '',
    createdTime: 'Wed, Feb 19, 2025 04:18:05 PM',
    usedCount: 7,
    tags: [],
    schedule: 'Daily',
  },
  {
    id: 2,
    name: 'CIS Compliance Policy --- test',
    description: 'test pmg',
    createdTime: 'Fri, Jan 10, 2025 07:08:36 PM',
    usedCount: 3,
    tags: [
      { label: 'cis', color: 'var(--color-warning)' },
      { label: '+3', color: 'var(--color-warning)' }
    ],
    schedule: 'Daily',
  },
];
const CompliancePolicy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [policies, setPolicies] = useState(MOCK_POLICIES);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPolicy, setNewPolicy] = useState({
    name: '',
    description: '',
    tags: 'Add Tags',
    configFileType: 'Startup',
    benchmarkFilter: 'Select',
    benchmark: 'Select',
    deviceFilter: 'Everywhere',
    selectDevice: '',
    notifyTeam: '',
  });
  const filteredPolicies = policies.filter((policy) =>
    policy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <div>
              {/* Title area */}
            </div>
            <button className={styles.btnPrimary} onClick={() => setShowCreateModal(true)}>
              Create Compliance Policy
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
                  <th>POLICY NAME <Icon icon="mdi:arrow-up" width={14} height={14} /></th>
                  <th>DESCRIPTION</th>
                  <th>CREATED TIME</th>
                  <th>USED COUNT</th>
                  <th>TAG</th>
                  <th>SCHEDULE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredPolicies.map((policy) => (
                  <tr key={policy.id}>
                    <td>
                      <a href="#" className={styles.linkBlue}>
                        {policy.name}
                      </a>
                    </td>
                    <td>{policy.description}</td>
                    <td>{policy.createdTime}</td>
                    <td>
                      <span className={styles.badgeInfo} style={{borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0}}>
                        {policy.usedCount}
                      </span>
                    </td>
                    <td>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        {policy.tags.map((tag, index) => (
                          <span key={index} className={styles.badge} style={{backgroundColor: 'rgba(255, 159, 28, 0.2)', color: tag.color}}>
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Icon icon="mdi:calendar-clock" width={20} height={20} style={{color: 'var(--color-text-secondary)'}} />
                      </div>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="Run">
                          <Icon icon="mdi:play-circle-outline" width={20} height={20} />
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
            <span className={styles.paginationTotal}>1 - 2 of 2 Items</span>
          </div>
        </div>
      </div>
      {/* Create Compliance Policy Sidebar */}
      <FilterSidebar
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Compliance Policy"
        filters={[]}
        onApply={() => {
          console.log('Create Policy:', newPolicy);
          setShowCreateModal(false);
        }}
        onReset={() => setNewPolicy({
          name: '',
          description: '',
          tags: 'Add Tags',
          configFileType: 'Startup',
          benchmarkFilter: 'Select',
          benchmark: 'Select',
          deviceFilter: 'Everywhere',
          selectDevice: '',
          notifyTeam: '',
        })}
        applyButtonText="Create Compliance Policy"
        resetButtonText="Reset"
      >
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Policy Name <span style={{color: 'var(--color-danger)'}}>*</span></label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Must be unique"
            value={newPolicy.name}
            onChange={(e) => setNewPolicy({...newPolicy, name: e.target.value})}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Description</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Write Description here"
            value={newPolicy.description}
            onChange={(e) => setNewPolicy({...newPolicy, description: e.target.value})}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tags</label>
          <SelectComponent
            className={styles.formSelect}
            value={newPolicy.tags}
            onChange={(e) => setNewPolicy({...newPolicy, tags: e.target.value})}
            options={[{ value: 'Add Tags', label: 'Add Tags' }]}
            placeholder="Add Tags"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Config File Type <span style={{color: 'var(--color-danger)'}}>*</span></label>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.modeBtn} ${newPolicy.configFileType === 'Startup' ? styles.modeBtnActive : ''}`}
              onClick={() => setNewPolicy({...newPolicy, configFileType: 'Startup'})}
            >
              Startup
            </button>
            <button
              className={`${styles.modeBtn} ${newPolicy.configFileType === 'Running' ? styles.modeBtnActive : ''}`}
              onClick={() => setNewPolicy({...newPolicy, configFileType: 'Running'})}
            >
              Running
            </button>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Benchmark Filter by Tags</label>
          <SelectComponent
            className={styles.formSelect}
            value={newPolicy.benchmarkFilter}
            onChange={(e) => setNewPolicy({...newPolicy, benchmarkFilter: e.target.value})}
            options={[{ value: 'Select', label: 'Select' }]}
            placeholder="Select"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Benchmark <span style={{color: 'var(--color-danger)'}}>*</span></label>
          <SelectComponent
            className={styles.formSelect}
            value={newPolicy.benchmark}
            onChange={(e) => setNewPolicy({...newPolicy, benchmark: e.target.value})}
            options={[{ value: 'Select', label: 'Select' }]}
            placeholder="Select"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Device Filter <span style={{color: 'var(--color-danger)'}}>*</span></label>
          <SelectComponent
            className={styles.formSelect}
            value={newPolicy.deviceFilter}
            onChange={(e) => setNewPolicy({...newPolicy, deviceFilter: e.target.value})}
            options={[{ value: 'Everywhere', label: 'Everywhere' }]}
            placeholder="Everywhere"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Select Device <span style={{color: 'var(--color-danger)'}}>*</span></label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Select Device"
            value={newPolicy.selectDevice}
            onChange={(e) => setNewPolicy({...newPolicy, selectDevice: e.target.value})}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Notify Team</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="@User or Email or /Handle or Mobile Number"
            value={newPolicy.notifyTeam}
            onChange={(e) => setNewPolicy({...newPolicy, notifyTeam: e.target.value})}
          />
        </div>
        <div className={styles.formGroup} style={{marginTop: 'var(--margin-lg)'}}>
          <p style={{fontSize: 'var(--font-sm)', color: 'var(--color-text-secondary)'}}>
            For more information: <a href="#" className={styles.linkBlue}>Compliance Policy <Icon icon="mdi:open-in-new" width={14} height={14} /></a>
          </p>
        </div>
        <p style={{fontSize: 'var(--font-xs)', color: 'var(--color-danger)', marginTop: 'var(--margin-lg)'}}>
          * fields are mandatory
        </p>
      </FilterSidebar>
  </>
  );
};
export default CompliancePolicy;
