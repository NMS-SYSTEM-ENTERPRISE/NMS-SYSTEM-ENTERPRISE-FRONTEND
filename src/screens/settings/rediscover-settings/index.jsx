"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock rediscover schedule data
const MOCK_REDISCOVER_SCHEDULES = [
  { id: 1, name: 'Daily Device Rediscovery', scheduleType: 'Daily', time: '02:00 AM', monitors: 152, status: 'Active', lastRun: '2024-11-29 02:00:15', nextRun: '2024-11-30 02:00:00' },
  { id: 2, name: 'Weekly Network Scan', scheduleType: 'Weekly', time: 'Monday 03:00 AM', monitors: 85, status: 'Active', lastRun: '2024-11-25 03:00:22', nextRun: '2024-12-02 03:00:00' },
];

const RediscoverSettings = () => {
  const [tableSearchTerm, setTableSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    scheduleType: 'Daily',
    time: '02:00',
    monitors: [],
  });

  const filteredSchedules = MOCK_REDISCOVER_SCHEDULES.filter(
    (schedule) =>
      schedule.name.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
      schedule.scheduleType.toLowerCase().includes(tableSearchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    alert('Rediscover schedule created successfully!');
    setShowCreateModal(false);
    setFormData({ name: '', scheduleType: 'Daily', time: '02:00', monitors: [] });
  };

  const getScheduleTypeBadge = (type) => {
    const badgeColors = {
      Daily: styles.badgeDaily,
      Weekly: styles.badgeWeekly,
      Hourly: styles.badgeHourly,
      Monthly: styles.badgeMonthly,
    };
    return badgeColors[type] || styles.badgeDaily;
  };

  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        {/* Toolbar */}
        <div className={styles.mainContent_header}>
          <div className={styles.searchBar}>
            <Icon icon="mdi:magnify" width={18} height={18} />
            <input
              type="text"
              placeholder="Search"
              value={tableSearchTerm}
              onChange={(e) => setTableSearchTerm(e.target.value)}
            />
          </div>
          <button
            className={styles.createBtn}
            onClick={() => setShowCreateModal(true)}
          >
            <Icon icon="mdi:refresh" width={16} height={16} />
            Create Rediscover Schedule
          </button>
        </div>

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>SCHEDULE NAME</th>
                <th>TYPE</th>
                <th>TIME</th>
                <th>MONITORS</th>
                <th>STATUS</th>
                <th>LAST RUN</th>
                <th>NEXT RUN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td className={styles.nameCell}>{schedule.name}</td>
                  <td>
                    <span className={`${styles.typeBadge} ${getScheduleTypeBadge(schedule.scheduleType)}`}>
                      {schedule.scheduleType}
                    </span>
                  </td>
                  <td>
                    <div className={styles.timeCell}>
                      <Icon icon="mdi:clock-outline" width={14} height={14} />
                      {schedule.time}
                    </div>
                  </td>
                  <td>
                    <span className={styles.monitorCount}>
                      {schedule.monitors}
                    </span>
                  </td>
                  <td>
                    <span className={styles.statusActive}>
                      {schedule.status}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{schedule.lastRun}</td>
                  <td className={styles.dateCell}>{schedule.nextRun}</td>
                  <td>
                    <div className={styles.actionsCell}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => setShowActionsMenu(showActionsMenu === schedule.id ? null : schedule.id)}
                      >
                        <Icon icon="mdi:dots-vertical" width={18} height={18} />
                      </button>
                      {showActionsMenu === schedule.id && (
                        <div className={styles.actionsMenu}>
                          <div className={styles.actionItem} onClick={() => alert('Running now...')}><Icon icon="mdi:play" width={16} height={16} /> Run Now</div>
                          <div className={styles.actionItem} onClick={() => alert('Editing...')}><Icon icon="mdi:pencil" width={16} height={16} /> Edit</div>
                          <div className={styles.actionItem} onClick={() => alert('Deleting...')}><Icon icon="mdi:trash-can" width={16} height={16} /> Delete</div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button className={styles.paginationBtn}>«</button>
          <button className={styles.paginationBtn}>‹</button>
          <button className={`${styles.paginationBtn} ${styles.paginationBtnActive}`}>1</button>
          <button className={styles.paginationBtn}>›</button>
          <button className={styles.paginationBtn}>»</button>
          <SelectComponent
            className={styles.paginationSelect}
            value={50}
            onChange={() => {}}
            options={[{ value: 50, label: '50' }]}
            placeholder="50"
            isSearchable={false}
          />
          <span className={styles.paginationInfo}>items per page</span>
          <span className={styles.paginationCount}>1 - {filteredSchedules.length} of {filteredSchedules.length} items</span>
        </div>
      </div>

      {/* Create Rediscover Schedule Modal */}
      {showCreateModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Create Rediscover Schedule</h3>
              <Icon icon="mdi:close" width={20} height={20} className={styles.closeButton} onClick={() => setShowCreateModal(false)} />
            </div>
            <form onSubmit={handleCreateSchedule} className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Schedule Name <span className={styles.required}>*</span></label>
                <input type="text" name="name" placeholder="e.g., Daily Device Rediscovery" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Schedule Type <span className={styles.required}>*</span></label>
                  <SelectComponent
                    className={styles.formSelect}
                    value={formData.scheduleType}
                    onChange={(e) => handleInputChange({ target: { name: 'scheduleType', value: e.target.value } })}
                    options={[
                      { value: 'Hourly', label: 'Hourly' },
                      { value: 'Daily', label: 'Daily' },
                      { value: 'Weekly', label: 'Weekly' },
                    ]}
                    placeholder="Select schedule type"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Time <span className={styles.required}>*</span></label>
                  <input type="time" name="time" value={formData.time} onChange={handleInputChange} required />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <div className={styles.modalActions}>
                  <button type="button" className={styles.resetBtn} onClick={() => setFormData({ name: '', scheduleType: 'Daily', time: '02:00', monitors: [] })}>Reset</button>
                  <button type="submit" className={styles.createBtnModal}>Create Schedule</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RediscoverSettings;
