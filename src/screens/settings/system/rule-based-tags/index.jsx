"use client";
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const MOCK_RULES = [
  {
    id: 1,
    name: 'Report tag check',
    description: '',
    operation: 'Assign',
    qualifiedCount: 105,
    tag: 'vm.[object:Ip]',
    lastRanAt: 'Wed, Mar 19, 2025 11:58:43 AM',
  },
  {
    id: 2,
    name: 'term_service',
    description: '',
    operation: 'Assign',
    qualifiedCount: 17,
    tag: 'service:prod',
    lastRanAt: 'Wed, Mar 19, 2025 12:57:27 PM',
  },
  {
    id: 3,
    name: 'Report monitor check',
    description: '',
    operation: 'Assign',
    qualifiedCount: 73,
    tag: 'monitor:[object.name]',
    lastRanAt: 'Wed, Mar 19, 2025 01:14:54 PM',
  },
];
const RuleBasedTags = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    appliesTo: '',
    tagOperation: 'Assign Tag',
    key: '',
    value: '',
    conditionGroup: 'Select',
    counter: 'Select Counter',
    operator: 'Select Operator',
    conditionValue: '',
  });
  const filteredRules = MOCK_RULES.filter((rule) =>
    rule.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <div>
              <h2 className={styles.pageTitle}>Rule Based Tags</h2>
              <p className={styles.pageDescription}>
                Automate monitor tagging with smart, rule-driven filters. For more information:{' '}
                <a href="#" className={styles.link}>
                  Rule based tags
                  <Icon icon="mdi:open-in-new" width={16} height={16} />
                </a>
              </p>
            </div>
            <button className={styles.btnPrimary} onClick={() => setShowCreateModal(true)}>
              Create Rule
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
                  <th>RULE NAME</th>
                  <th>DESCRIPTION</th>
                  <th>OPERATION</th>
                  <th>QUALIFIED COUNT</th>
                  <th>TAG</th>
                  <th>LAST RAN AT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredRules.map((rule) => (
                  <tr key={rule.id}>
                    <td>
                      <a href="#" className={styles.linkBlue}>
                        {rule.name}
                      </a>
                    </td>
                    <td>{rule.description || '-'}</td>
                    <td>
                      <span className={styles.badgeSuccess}>{rule.operation}</span>
                    </td>
                    <td>
                      <span className={styles.badgeInfo}>{rule.qualifiedCount}</span>
                    </td>
                    <td>
                      <span className={styles.badge} style={{backgroundColor: 'rgba(255, 159, 28, 0.2)', color: 'var(--color-warning)'}}>
                        {rule.tag}
                      </span>
                    </td>
                    <td>{rule.lastRanAt}</td>
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
              options={[
                { value: 50, label: '50' },
              ]}
              placeholder="50"
              isSearchable={false}
            />
            <span className={styles.paginationInfo}>Items per page</span>
            <span className={styles.paginationTotal}>1 - 3 of 3 Items</span>
          </div>
        </div>
      </div>
      {/* Create Rule Sidebar */}
      <FilterSidebar
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Rule"
        filters={[]}
        onApply={() => {
          console.log('Create rule:', newRule);
          setShowCreateModal(false);
        }}
        onReset={() => setNewRule({
          name: '',
          description: '',
          appliesTo: '',
          tagOperation: 'Assign Tag',
          key: '',
          value: '',
          conditionGroup: 'Select',
          counter: 'Select Counter',
          operator: 'Select Operator',
          conditionValue: '',
        })}
        applyButtonText="Create Rule"
        resetButtonText="Reset"
        customFooterButtons={
          <button className={styles.btnSecondary} style={{marginRight: '10px'}}>Preview</button>
        }
      >
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Rule Name <span style={{color: 'var(--color-danger)'}}>*</span></label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Write rule name"
            value={newRule.name}
            onChange={(e) => setNewRule({...newRule, name: e.target.value})}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Description</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Write description here"
            value={newRule.description}
            onChange={(e) => setNewRule({...newRule, description: e.target.value})}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Rule applies to <span style={{color: 'var(--color-danger)'}}>*</span></label>
          <SelectComponent
            className={styles.formSelect}
            value={newRule.appliesTo}
            onChange={(e) => setNewRule({...newRule, appliesTo: e.target.value})}
            options={[
              { value: '', label: 'Select' },
              { value: 'monitor', label: 'Monitor' },
              { value: 'device', label: 'Device' },
            ]}
            placeholder="Select"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tag Operation <span style={{color: 'var(--color-danger)'}}>*</span></label>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.modeBtn} ${newRule.tagOperation === 'Assign Tag' ? styles.modeBtnActive : ''}`}
              onClick={() => setNewRule({...newRule, tagOperation: 'Assign Tag'})}
            >
              Assign Tag
            </button>
            <button
              className={`${styles.modeBtn} ${newRule.tagOperation === 'Remove Tag' ? styles.modeBtnActive : ''}`}
              onClick={() => setNewRule({...newRule, tagOperation: 'Remove Tag'})}
            >
              Remove Tag
            </button>
          </div>
        </div>
        <div style={{display: 'flex', gap: 'var(--gap-md)'}}>
          <div className={styles.formGroup} style={{flex: 1}}>
            <label className={styles.formLabel}>Key <span style={{color: 'var(--color-danger)'}}>*</span> <Icon icon="mdi:information-outline" width={14} height={14} /></label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="Write tag key"
              value={newRule.key}
              onChange={(e) => setNewRule({...newRule, key: e.target.value})}
            />
          </div>
          <div className={styles.formGroup} style={{flex: 1}}>
            <label className={styles.formLabel}>Value <Icon icon="mdi:information-outline" width={14} height={14} /></label>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Write tag value"
                value={newRule.value}
                onChange={(e) => setNewRule({...newRule, value: e.target.value})}
              />
              <Icon icon="mdi:plus-circle-outline" width={20} height={20} style={{color: 'var(--color-primary)', cursor: 'pointer'}} />
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Conditions <span style={{color: 'var(--color-danger)'}}>*</span></label>
          <div style={{display: 'flex', alignItems: 'center', gap: 'var(--gap-sm)', marginBottom: 'var(--margin-sm)'}}>
            <SelectComponent
              className={styles.formSelect}
              style={{width: '120px'}}
              value={newRule.conditionGroup}
              onChange={(e) => setNewRule({...newRule, conditionGroup: e.target.value})}
              options={[
                { value: 'Select', label: 'Select' },
                { value: 'All', label: 'All' },
                { value: 'Any', label: 'Any' },
              ]}
              placeholder="Select"
            />
            <span style={{fontSize: 'var(--font-sm)', color: 'var(--color-text-secondary)'}}>Group matching</span>
          </div>
          
          <div style={{display: 'flex', gap: 'var(--gap-sm)', alignItems: 'flex-end'}}>
            <div style={{flex: 1}}>
              <label className={styles.formLabel} style={{fontSize: 'var(--font-xs)', marginBottom: '4px'}}>Counter <span style={{color: 'var(--color-danger)'}}>*</span></label>
              <SelectComponent
                className={styles.formSelect}
                value={newRule.counter}
                onChange={(e) => setNewRule({...newRule, counter: e.target.value})}
                options={[
                  { value: 'Select Counter', label: 'Select Counter' },
                ]}
                placeholder="Select Counter"
              />
            </div>
            <div style={{flex: 1}}>
              <label className={styles.formLabel} style={{fontSize: 'var(--font-xs)', marginBottom: '4px'}}>Operator <span style={{color: 'var(--color-danger)'}}>*</span></label>
              <SelectComponent
                className={styles.formSelect}
                value={newRule.operator}
                onChange={(e) => setNewRule({...newRule, operator: e.target.value})}
                options={[
                  { value: 'Select Operator', label: 'Select Operator' },
                ]}
                placeholder="Select Operator"
              />
            </div>
            <div style={{flex: 1}}>
              <label className={styles.formLabel} style={{fontSize: 'var(--font-xs)', marginBottom: '4px'}}>Value <span style={{color: 'var(--color-danger)'}}>*</span></label>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Value"
                  value={newRule.conditionValue}
                  onChange={(e) => setNewRule({...newRule, conditionValue: e.target.value})}
                />
                <Icon icon="mdi:plus-circle-outline" width={20} height={20} style={{color: 'var(--color-primary)', cursor: 'pointer'}} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formGroup} style={{marginTop: 'var(--margin-lg)'}}>
          <label className={styles.formLabel}>Rule Criteria</label>
          <p style={{fontSize: 'var(--font-sm)', color: 'var(--color-text-secondary)'}}>
            For more information: <a href="#" className={styles.linkBlue}>Rule based tags <Icon icon="mdi:open-in-new" width={14} height={14} /></a>
          </p>
        </div>
        <p style={{fontSize: 'var(--font-xs)', color: 'var(--color-danger)', marginTop: 'var(--margin-lg)'}}>
          * fields are mandatory
        </p>
      </FilterSidebar>
  </>
  );
};
export default RuleBasedTags;
