"use client";
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Modal } from '@/components/ui/modal';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';

const MOCK_RUNBOOKS = [
  { id: 1, name: 'ansible_fake_test', description: '', usedCount: 2, type: 'SSH Script', category: 'Ansible Playbook', scheduler: null, lastRunResult: null },
  { id: 2, name: 'Ansible_Real_Test', description: '', usedCount: 2, type: 'SSH Script', category: 'Ansible Playbook', scheduler: null, lastRunResult: 'View Result' },
];

const MOCK_MONITORS = [
  { id: 1, name: 'xen71master(64920314715)', ip: '172.16.10.231', type: 'linux', groups: ['Server > Linux', '+1'] },
];

const RunbookPlugin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [runbooks, setRunbooks] = useState(MOCK_RUNBOOKS);
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const [showAssignMonitorModal, setShowAssignMonitorModal] = useState(false);
  const [showScheduleSidebar, setShowScheduleSidebar] = useState(false);
  const [selectedRunbook, setSelectedRunbook] = useState(null);
  const [scheduleData, setScheduleData] = useState({ type: 'Once', startDate: '2023-10-10', hours: '00:30', email: 'john.doe@snr-edatas.com', sms: '' });

  const filteredRunbooks = runbooks.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleActionClick = (id) => {
    setActiveActionMenu(activeActionMenu === id ? null : id);
  };

  const handleMenuAction = (action, runbook) => {
    setActiveActionMenu(null);
    setSelectedRunbook(runbook);
    if (action === 'Assign Monitor') {
      setShowAssignMonitorModal(true);
    } else if (action === 'Schedule Runbook') {
      setShowScheduleSidebar(true);
    }
  };

  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        <div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <div>
              <h2 className={styles.pageTitle}>Runbook</h2>
              <p className={styles.pageDescription}>
                Automate IT tasks to enhance efficiency and reduce manual efforts using Runbooks.
              </p>
            </div>
            <button className={styles.btnPrimary}>Create Runbook Plugin</button>
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
                  <th>RUNBOOK NAME <Icon icon="mdi:arrow-up" width={14} height={14} /></th>
                  <th>DESCRIPTION</th>
                  <th>USED COUNT</th>
                  <th>RUNBOOK TYPE</th>
                  <th>RUNBOOK CATEGORY</th>
                  <th>SCHEDULER</th>
                  <th>LAST RUN RESULT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredRunbooks.map((item) => (
                  <tr key={item.id}>
                    <td><a href="#" className={styles.linkBlue}>{item.name}</a></td>
                    <td>{item.description}</td>
                    <td><span className={styles.badgeInfo}>{item.usedCount}</span></td>
                    <td>{item.type}</td>
                    <td>{item.category}</td>
                    <td>{item.scheduler && <Icon icon="mdi:calendar-clock" width={20} height={20} />}</td>
                    <td>{item.lastRunResult && <a href="#" className={styles.linkBlue}>{item.lastRunResult}</a>}</td>
                    <td>
                      <div className={styles.actions} style={{ position: 'relative' }}>
                        <button className={styles.actionBtn} title="Run"><Icon icon="mdi:play-circle-outline" width={20} height={20} /></button>
                        <button className={styles.actionBtn} title="More" onClick={() => handleActionClick(item.id)}><Icon icon="mdi:dots-vertical" width={18} height={18} /></button>
                        {activeActionMenu === item.id && (
                          <div className={styles.dropdownMenu}>
                            <div className={styles.dropdownItem} onClick={() => handleMenuAction('Assign Monitor', item)}><Icon icon="mdi:link-variant" width={16} height={16} /> Assign Monitor</div>
                            <div className={styles.dropdownItem} onClick={() => handleMenuAction('Schedule Runbook', item)}><Icon icon="mdi:calendar-clock" width={16} height={16} /> Schedule Runbook</div>
                            <div className={styles.dropdownItem} onClick={() => alert('Editing...')}><Icon icon="mdi:pencil" width={16} height={16} /> Edit Runbook</div>
                            <div className={styles.dropdownItem} style={{ color: 'var(--color-danger)' }} onClick={() => alert('Deleting...')}><Icon icon="mdi:trash-can-outline" width={16} height={16} /> Delete Runbook</div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <button className={styles.paginationBtn}><Icon icon="mdi:chevron-double-left" width={18} height={18} /></button>
            <button className={styles.paginationBtn}><Icon icon="mdi:chevron-left" width={18} height={18} /></button>
            <span className={styles.pageNumber}>1</span>
            <button className={styles.paginationBtn}><Icon icon="mdi:chevron-right" width={18} height={18} /></button>
            <button className={styles.paginationBtn}><Icon icon="mdi:chevron-double-right" width={18} height={18} /></button>
            <SelectComponent
              className={styles.itemsPerPageSelect}
              value={50}
              onChange={() => {}}
              options={[{ value: 50, label: '50' }]}
              placeholder="50"
              isSearchable={false}
            />
            <span className={styles.paginationInfo}>Items per page</span>
            <span className={styles.paginationTotal}>1 - {filteredRunbooks.length} of {filteredRunbooks.length} Items</span>
          </div>
        </div>
      </div>

      <Modal isOpen={showAssignMonitorModal} onClose={() => setShowAssignMonitorModal(false)} title="Assign Monitor">
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '40px' }}><input type="checkbox" /></th>
                <th>MONITOR <Icon icon="mdi:arrow-down" width={14} height={14} /></th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_MONITORS.map((monitor) => (
                <tr key={monitor.id}>
                  <td><input type="checkbox" /></td>
                  <td>{monitor.name}</td>
                  <td>{monitor.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button className={styles.btnSecondary} onClick={() => setShowAssignMonitorModal(false)}>Cancel</button>
          <button className={styles.btnPrimary} onClick={() => setShowAssignMonitorModal(false)}>Assign</button>
        </div>
      </Modal>

      <FilterSidebar
        isOpen={showScheduleSidebar}
        onClose={() => setShowScheduleSidebar(false)}
        title={`${selectedRunbook?.name || ''} Schedule Runbook`}
        filters={[]}
        onApply={() => setShowScheduleSidebar(false)}
        onReset={() => {}}
        applyButtonText="Schedule"
        resetButtonText="Reset"
      >
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Scheduler Type</label>
          <input type="text" className={styles.formInput} value={scheduleData.type} readOnly />
        </div>
      </FilterSidebar>
    </>
  );
};

export default RunbookPlugin;
