import { Icon } from '@iconify/react';
import { SelectComponent } from '@/components/ui/select';
import { useState } from 'react';
import styles from './styles.module.css';

/**
 * Trap Explorer Action Sidebar with Live Trap Viewer
 */
export const TrapActionSidebar = ({
  isOpen,
  onClose,
  searchQuery = '',
  onSearchChange,
  filters = {},
  onFilterChange,
  onApply,
  onReset,
}) => {
  const [activeView, setActiveView] = useState('filters');
  const [autoRefresh, setAutoRefresh] = useState(false);

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
            <Icon icon="mdi:alert-octagon" width={20} />
            Trap Explorer Actions
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <Icon icon="mdi:close" width={24} />
          </button>
        </div>

        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewToggleBtn} ${activeView === 'filters' ? styles.viewToggleBtnActive : ''}`}
            onClick={() => setActiveView('filters')}
          >
            <Icon icon="mdi:filter" width={18} />
            Filters
          </button>
          <button
            className={`${styles.viewToggleBtn} ${activeView === 'live' ? styles.viewToggleBtnActive : ''}`}
            onClick={() => setActiveView('live')}
          >
            <Icon icon="mdi:access-point" width={18} />
            Live Viewer
          </button>
        </div>

        <div className={styles.content}>
          {activeView === 'filters' ? (
            <>
              <div className={styles.searchSection}>
                <div className={styles.searchBar}>
                  <Icon icon="mdi:magnify" className={styles.searchIcon} width={18} />
                  <input
                    type="text"
                    placeholder="Search traps..."
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.filtersSection}>
                <h3 className={styles.sectionTitle}>Filters</h3>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Trap OID</label>
                  <SelectComponent
                    value={filters.trapOid || ''}
                    onChange={(e) => onFilterChange && onFilterChange('trapOid', e.target.value)}
                    options={[
                      { value: '', label: 'All' },
                      { value: '1.3.6.1.4.1.9.9.41.2.0.1', label: 'clogMessageGenerated' },
                      { value: '1.3.6.1.4.1.9.0.1', label: '1.3.6.1.4.1.9.0.1' },
                      { value: '1.3.6.1.4.1.9.9.43.2.0.1', label: 'ciscoConfigManEvent' },
                    ]}
                    placeholder="Select Trap OID"
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Source</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={filters.source || ''}
                    onChange={(e) => onFilterChange && onFilterChange('source', e.target.value)}
                    placeholder="Enter source IP"
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Vendor</label>
                  <SelectComponent
                    value={filters.vendor || ''}
                    onChange={(e) => onFilterChange && onFilterChange('vendor', e.target.value)}
                    options={[
                      { value: '', label: 'All' },
                      { value: 'cisco', label: 'Cisco' },
                      { value: 'juniper', label: 'Juniper' },
                      { value: 'hp', label: 'HP' },
                      { value: 'dell', label: 'Dell' },
                    ]}
                    placeholder="Select vendor"
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Severity</label>
                  <SelectComponent
                    value={filters.severity || ''}
                    onChange={(e) => onFilterChange && onFilterChange('severity', e.target.value)}
                    options={[
                      { value: '', label: 'All' },
                      { value: 'critical', label: 'Critical' },
                      { value: 'major', label: 'Major' },
                      { value: 'warning', label: 'Warning' },
                      { value: 'info', label: 'Info' },
                    ]}
                    placeholder="Select severity"
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Acknowledged</label>
                  <SelectComponent
                    value={filters.acknowledged || ''}
                    onChange={(e) => onFilterChange && onFilterChange('acknowledged', e.target.value)}
                    options={[
                      { value: '', label: 'All' },
                      { value: 'true', label: 'Acknowledged' },
                      { value: 'false', label: 'Unacknowledged' },
                    ]}
                    placeholder="Select status"
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Count Range</label>
                  <div className={styles.rangeGroup}>
                    <input
                      type="number"
                      className={styles.rangeInput}
                      value={filters.countMin || ''}
                      onChange={(e) => onFilterChange && onFilterChange('countMin', e.target.value)}
                      placeholder="Min"
                    />
                    <span className={styles.rangeSeparator}>-</span>
                    <input
                      type="number"
                      className={styles.rangeInput}
                      value={filters.countMax || ''}
                      onChange={(e) => onFilterChange && onFilterChange('countMax', e.target.value)}
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <LiveTrapViewer autoRefresh={autoRefresh} setAutoRefresh={setAutoRefresh} />
          )}
        </div>

        {activeView === 'filters' && (
          <div className={styles.footer}>
            <button className={styles.resetBtn} onClick={handleReset}>
              <Icon icon="mdi:refresh" width={18} />
              Reset
            </button>
            <button className={styles.applyBtn} onClick={handleApply}>
              <Icon icon="mdi:check" width={18} />
              Apply Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// Live Trap Viewer Component
const LiveTrapViewer = ({ autoRefresh, setAutoRefresh }) => {
  const liveTrapData = [
    {
      id: 1,
      time: '12:45:32 PM',
      source: '172.16.9.221',
      trapName: 'clogMessageGenerated',
      severity: 'info',
      message: 'When a syslog message is generated...',
      acknowledged: false,
    },
    {
      id: 2,
      time: '12:44:18 PM',
      source: '172.16.8.105',
      trapName: 'linkDown',
      severity: 'critical',
      message: 'Interface Gi0/1 changed state to down',
      acknowledged: false,
    },
    {
      id: 3,
      time: '12:43:05 PM',
      source: '172.16.9.221',
      trapName: 'ciscoConfigManEvent',
      severity: 'warning',
      message: 'Configuration management event detected',
      acknowledged: true,
    },
    {
      id: 4,
      time: '12:41:52 PM',
      source: '192.168.1.1',
      trapName: 'authenticationFailure',
      severity: 'major',
      message: 'SNMP authentication failure from 10.0.0.5',
      acknowledged: false,
    },
    {
      id: 5,
      time: '12:40:30 PM',
      source: '172.16.9.221',
      trapName: 'coldStart',
      severity: 'info',
      message: 'Device restarted (cold start)',
      acknowledged: true,
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return '#ef4444';
      case 'major':
        return '#f97316';
      case 'warning':
        return '#eab308';
      case 'info':
        return '#06b6d4';
      default:
        return '#6b7280';
    }
  };

  const stats = {
    total: liveTrapData.length,
    acknowledged: liveTrapData.filter(t => t.acknowledged).length,
    unacknowledged: liveTrapData.filter(t => !t.acknowledged).length,
  };

  return (
    <div className={styles.liveViewer}>
      <div className={styles.liveControls}>
        <h3 className={styles.sectionTitle}>
          <Icon icon="mdi:access-point" width={20} />
          Live Trap Stream
        </h3>
        <div className={styles.controlButtons}>
          <label className={styles.autoRefreshToggle}>
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            <span>Auto Refresh</span>
          </label>
          <button className={styles.refreshIconBtn}>
            <Icon icon="mdi:refresh" width={18} />
          </button>
        </div>
      </div>

      <div className={styles.liveStats}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.total}</div>
          <div className={styles.statLabel}>Total Traps</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue} style={{ color: '#22c55e' }}>{stats.acknowledged}</div>
          <div className={styles.statLabel}>Acknowledged</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue} style={{ color: '#ef4444' }}>{stats.unacknowledged}</div>
          <div className={styles.statLabel}>Unacknowledged</div>
        </div>
      </div>

      <div className={styles.trapStream}>
        {liveTrapData.map((trap) => (
          <div key={trap.id} className={styles.trapItem}>
            <div 
              className={styles.trapSeverityBar}
              style={{ backgroundColor: getSeverityColor(trap.severity) }}
            />
            <div className={styles.trapContent}>
              <div className={styles.trapHeader}>
                <div className={styles.trapTime}>
                  <Icon icon="mdi:clock-outline" width={14} />
                  {trap.time}
                </div>
                <div className={styles.trapSource}>
                  <Icon icon="mdi:server" width={14} />
                  {trap.source}
                </div>
              </div>
              <div className={styles.trapName}>{trap.trapName}</div>
              <div className={styles.trapMessage}>{trap.message}</div>
              <div className={styles.trapFooter}>
                <span 
                  className={styles.trapSeverity}
                  style={{ color: getSeverityColor(trap.severity) }}
                >
                  {trap.severity.toUpperCase()}
                </span>
                {!trap.acknowledged && (
                  <button className={styles.acknowledgeBtn}>
                    <Icon icon="mdi:check-circle" width={14} />
                    Acknowledge
                  </button>
                )}
                {trap.acknowledged && (
                  <span className={styles.acknowledgedBadge}>
                    <Icon icon="mdi:check" width={14} />
                    Acknowledged
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};




