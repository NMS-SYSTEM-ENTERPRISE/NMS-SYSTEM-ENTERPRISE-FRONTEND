import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

/**
 * SLO Action Sidebar with Timeline View
 */
export const SLOActionSidebar = ({
  isOpen,
  onClose,
  searchQuery = '',
  onSearchChange,
  filters = {},
  onFilterChange,
  onApply,
  onReset,
}) => {
  const [activeView, setActiveView] = useState('filters'); // 'filters' or 'timeline'

  if (!isOpen) return null;

  const handleApply = () => {
    if (onApply) {
      onApply(filters);
    }
    onClose();
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <Icon icon="ph:gear-six-bold" />
            SLO Actions
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <Icon icon="ph:x-bold" />
          </button>
        </div>

        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewToggleBtn} ${activeView === 'filters' ? styles.viewToggleBtnActive : ''}`}
            onClick={() => setActiveView('filters')}
          >
            <Icon icon="ph:funnel-bold" />
            Filters
          </button>
          <button
            className={`${styles.viewToggleBtn} ${activeView === 'timeline' ? styles.viewToggleBtnActive : ''}`}
            onClick={() => setActiveView('timeline')}
          >
            <Icon icon="ph:clock-bold" />
            Timeline
          </button>
        </div>

        <div className={styles.content}>
          {activeView === 'filters' ? (
            <>
              <div className={styles.searchSection}>
                <div className={styles.searchBar}>
                  <Icon icon="ph:magnifying-glass-bold" className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search by SLO name..."
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.filtersSection}>
                <h3 className={styles.sectionTitle}>Filter Settings</h3>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Status</label>
                  <SelectComponent
                    value={filters.status || ''}
                    onChange={(e) => onFilterChange && onFilterChange('status', e.target.value)}
                    options={[
                      { value: '', label: 'All Statuses' },
                      { value: 'Ok', label: 'Healthy' },
                      { value: 'Warning', label: 'Warning' },
                      { value: 'Breached', label: 'Breached' },
                    ]}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Category</label>
                  <SelectComponent
                    value={filters.sloType || ''}
                    onChange={(e) => onFilterChange && onFilterChange('sloType', e.target.value)}
                    options={[
                      { value: '', label: 'All Categories' },
                      { value: 'Performance', label: 'Performance' },
                      { value: 'Availability', label: 'Availability' },
                    ]}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Reporting Period</label>
                  <SelectComponent
                    value={filters.frequency || ''}
                    onChange={(e) => onFilterChange && onFilterChange('frequency', e.target.value)}
                    options={[
                      { value: '', label: 'All Periods' },
                      { value: 'Daily', label: 'Daily' },
                      { value: 'Weekly', label: 'Weekly' },
                      { value: 'Monthly', label: 'Monthly' },
                      { value: 'Quarterly', label: 'Quarterly' },
                    ]}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Objective Range (%)</label>
                  <div className={styles.rangeGroup}>
                    <input
                      type="number"
                      className={styles.rangeInput}
                      value={filters.targetMin || ''}
                      onChange={(e) => onFilterChange && onFilterChange('targetMin', e.target.value)}
                      placeholder="Min"
                    />
                    <Icon icon="ph:minus-bold" style={{color: 'var(--color-text-muted)'}} />
                    <input
                      type="number"
                      className={styles.rangeInput}
                      value={filters.targetMax || ''}
                      onChange={(e) => onFilterChange && onFilterChange('targetMax', e.target.value)}
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <TimelineView />
          )}
        </div>

        {activeView === 'filters' && (
          <div className={styles.footer}>
            <button className={styles.resetBtn} onClick={handleReset}>
              <Icon icon="ph:arrow-counter-clockwise-bold" />
              Reset All
            </button>
            <button className={styles.applyBtn} onClick={handleApply}>
              <Icon icon="ph:check-bold" />
              Apply
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// Timeline View Component
const TimelineView = () => {
  const timelineData = [
    {
      date: 'Today',
      items: [
        { time: '12:30 PM', slo: 'Monitor-SLO-Weekly-Perf-Windows', status: 'Ok', event: 'Target achieved' },
        { time: '10:15 AM', slo: 'slo-monthly-interface', status: 'Warning', event: 'Approaching threshold' },
      ],
    },
    {
      date: 'Yesterday',
      items: [
        { time: '06:45 PM', slo: 'Interface-SLO-Weekly-Ava-Network', status: 'Breached', event: 'SLO breached' },
        { time: '02:30 PM', slo: 'slo-tag-coorelation', status: 'Ok', event: 'Target achieved' },
        { time: '09:00 AM', slo: 'Monitor-SLO-Monthly-Ava-Server', status: 'Warning', event: 'Error budget low' },
      ],
    },
    {
      date: '2 Days Ago',
      items: [
        { time: '04:20 PM', slo: 'Monitor-SLO-Weekly-Perf-Windows', status: 'Ok', event: 'Target achieved' },
        { time: '11:00 AM', slo: 'slo-monthly-interface', status: 'Ok', event: 'Target achieved' },
      ],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ok': return '#10b981';
      case 'Warning': return '#f59e0b';
      case 'Breached': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className={styles.timelineView}>
      <h3 className={styles.sectionTitle}>Activity Log</h3>
      
      {timelineData.map((day, dayIndex) => (
        <div key={dayIndex} className={styles.timelineDay}>
          <div className={styles.timelineDayHeader}>
             <span>{day.date}</span>
          </div>
          <div className={styles.timelineItems}>
            {day.items.map((item, itemIndex) => (
              <div key={itemIndex} className={styles.timelineItem}>
                <div 
                  className={styles.timelineDot}
                  style={{ color: getStatusColor(item.status) }}
                />
                <div className={styles.timelineTime}>{item.time}</div>
                <div className={styles.timelineSlo}>{item.slo}</div>
                <div className={styles.timelineEvent}>
                  <span style={{ color: getStatusColor(item.status), fontWeight: 'bold' }}>{item.status}</span>
                  {' • '}
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};




