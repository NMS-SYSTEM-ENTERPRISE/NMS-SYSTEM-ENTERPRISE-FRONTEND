import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MetricSidebarSkeleton } from '@/components/ui/skeleton-loaders/metric-explorer-skeleton';

// Helper to get unique categories from metrics list
const getCategories = (metricsList) => {
  const categories = new Set();
  metricsList.forEach(metric => {
    const parts = metric.split('.');
    const category = parts.length >= 2 ? parts[1] : parts[0];
    categories.add(category);
  });
  return Array.from(categories);
};

export const MetricExplorerSidebar = ({
  activeTab,
  onUpdateTab,
  onAddMetric,
  activeTabId, // Passed but not used for tabs anymore
  isSidebarOpen = true,
  monitors = [],
  metrics = [],
  isLoading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const selectedMonitor = monitors.find((monitor) => monitor.id === activeTab?.monitor);
  const sourceMetrics = selectedMonitor?.metrics?.length ? selectedMonitor.metrics : metrics;
  const metricItems = sourceMetrics.map((metric) =>
    typeof metric === 'string' ? { name: metric, label: metric, available: true } : metric
  );

  const filteredMetrics = metricItems.filter((metric) =>
    metric.name.toLowerCase().includes(searchQuery.toLowerCase())
    || metric.label?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Collapsed View
  if (!isSidebarOpen) {
    const categories = getCategories(metricItems.map((metric) => metric.name)); // Show all categories in collapsed state
    return (
      <div className={styles.sidebar} style={{ alignItems: 'center', padding: '16px 0', background: 'transparent' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {categories.map(category => (
            <div key={category} title={category.toUpperCase()} style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              color: '#6b7280',
              cursor: 'help',
              transition: 'all 0.2s',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <Icon icon={getCategoryIcon(category)} width={18} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.sidebar}>
      {/* Monitor Selection */}
      <div className={styles.section}>
        <label className={styles.label}>Monitor</label>
        <SelectComponent
          className={styles.select}
          value={activeTab?.monitor || ''}
          onChange={(e) =>
            onUpdateTab(activeTabId, { monitor: e.target.value })
          }
          options={[
            { value: '', label: 'Select Monitor', icon: 'mdi:monitor' },
            ...Object.entries(
              monitors.reduce((acc, monitor) => {
                const groupName = monitor.group || 'Ungrouped';
                if (!acc[groupName]) acc[groupName] = [];

                // Determine appropriate icon based on device type or name
                let deviceIcon = 'mdi:server-network';
                const typeStr = (monitor.device_type || monitor.type || '').toLowerCase();
                const nameStr = (monitor.name || '').toLowerCase();

                if (typeStr.includes('switch') || nameStr.includes('switch') || nameStr.includes('agg')) {
                  deviceIcon = 'mdi:switch';
                } else if (typeStr.includes('router') || nameStr.includes('router')) {
                  deviceIcon = 'mdi:router-network';
                } else if (typeStr.includes('firewall') || nameStr.includes('fw')) {
                  deviceIcon = 'mdi:wall-fire';
                } else if (typeStr.includes('server')) {
                  deviceIcon = 'mdi:server';
                }

                acc[groupName].push({
                  value: monitor.id,
                  label: monitor.name,
                  subLabel: monitor.ip || 'Unknown IP',
                  icon: deviceIcon,
                  color: monitor.status === 'UP' ? 'var(--color-success)' : 'var(--color-danger)',
                });
                return acc;
              }, {})
            ).map(([group, opts]) => ({
              label: group.toUpperCase(),
              options: opts,
            })),
          ]}
          placeholder="Select Monitor"
        />
      </div>

      {/* Metrics Section */}
      <div className={styles.metricsSection}>
        <div className={styles.searchBox}>
          <Input
            type="text"
            placeholder="Search metrics..."
            containerClassName={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Icon icon="mdi:magnify" width={16} height={16} />}
          />
        </div>

        <div className={styles.metricsList}>
          {isLoading && <MetricSidebarSkeleton />}
          {!isLoading && monitors.length === 0 && (
            <div className={styles.metricItem}>
              <span className={styles.metricName} style={{ opacity: 0.6 }}>No monitored devices found.</span>
            </div>
          )}
          {!isLoading && monitors.length > 0 && !activeTab?.monitor && (
            <div className={styles.metricItem}>
              <span className={styles.metricName} style={{ opacity: 0.6 }}>Select a monitor to view metrics.</span>
            </div>
          )}
          {Object.entries(
            filteredMetrics.reduce((acc, metric) => {
              const parts = metric.name.split('.');
              // Improved grouping: always take the second part if available (e.g. system.cpu -> cpu)
              const category = parts.length >= 2 ? parts[1] : parts[0];
              if (!acc[category]) acc[category] = [];
              acc[category].push(metric);
              return acc;
            }, {})
          ).map(([category, metrics]) => (
            <MetricGroup
              key={category}
              category={category}
              metrics={metrics}
              onAddMetric={onAddMetric}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper for category icons
const getCategoryIcon = (category) => {
  const map = {
    memory: 'mdi:memory',
    load: 'mdi:speedometer',
    cpu: 'mdi:cpu-64-bit',
    swap: 'mdi:swap-horizontal',
    disk: 'mdi:harddisk',
    network: 'mdi:network',
    running: 'mdi:run',
    blocked: 'mdi:minus-circle-outline',
    context: 'mdi:call-split',
    interrupts: 'mdi:flash',
    uptime: 'mdi:clock-time-four-outline',
  };
  return map[category.toLowerCase()] || 'mdi:folder-outline';
};

const MetricGroup = ({ category, metrics, onAddMetric }) => {
  const [isOpen, setIsOpen] = useState(true);
  const icon = getCategoryIcon(category);

  return (
    <div className={styles.metricGroup}>
      <div className={styles.groupHeader} onClick={() => setIsOpen(!isOpen)}>
        <Icon
          icon={isOpen ? "mdi:chevron-down" : "mdi:chevron-right"}
          width={16}
          style={{ marginRight: '4px', opacity: 0.7 }}
        />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flex: 1,
          color: isOpen ? '#0ea5e9' : 'inherit'
        }}>
          <Icon icon={icon} width={18} />
          <span className={styles.groupTitle}>{category.toUpperCase()}</span>
        </div>
      </div>

      {isOpen && (
        <div className={styles.groupContent}>
          {metrics.map((metric, index) => (
            <div
              key={metric.name || index}
              className={styles.metricItem}
              onClick={() => onAddMetric(metric)}
            >
              <span className={styles.metricItemLine}></span>
              <span className={styles.metricName}>{metric.name}</span>
              <Button variant="ghost" className={styles.metricAdd}>
                <Icon icon="mdi:plus" width={14} height={14} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
