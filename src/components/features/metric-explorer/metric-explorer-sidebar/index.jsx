import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock data for dropdowns
const MONITORS = [
  { id: '1', name: 'xen71master(6492031471S)', ip: '172.16.10.231' },
  { id: '2', name: 'server01(6492031472)', ip: '172.16.10.232' },
];

const INSTANCE_TYPES = [
  { id: '1', name: 'citrix.xen.cluster.node' },
  { id: '2', name: 'system.node' },
];

const METRICS = [
  'system.memory.free.percent',
  'system.memory.free.bytes',
  'system.load.avg1.min',
  'system.cpu.percent',
  'system.load.avg5.min',
  'system.memory.used.percent',
  'system.load.avg15.min',
  'system.memory.available.bytes',
  'system.memory.used.bytes',
  'system.blocked.processes',
  'system.swap.memory.free.bytes',
  'system.running.processes',
  'system.cpu.nice.percent',
  'system.context.switches',
  'system.cpu.kernel.percent',
  'system.interrupts',
  'system.memory.capacity.bytes',
  'system.cpu.steal.percent',
  'system.swap.memory.used.bytes',
];

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
}) => {
  const [activeView, setActiveView] = useState('metric');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMetrics = METRICS.filter((metric) =>
    metric.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Collapsed View
  if (!isSidebarOpen) {
    const categories = getCategories(METRICS); // Show all categories in collapsed state
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
            { value: '', label: 'Select Monitor' },
            ...MONITORS.map((monitor) => ({
              value: monitor.id,
              label: monitor.name,
            })),
          ]}
          placeholder="Select Monitor"
        />
      </div>

      {/* View Tabs */}
      <div className={styles.viewTabs}>
        <button
          className={`${styles.viewTab} ${
            activeView === 'metric' ? styles.viewTabActive : ''
          }`}
          onClick={() => setActiveView('metric')}
        >
          Metrics
        </button>
        <button
          className={`${styles.viewTab} ${
            activeView === 'instance' ? styles.viewTabActive : ''
          }`}
          onClick={() => setActiveView('instance')}
        >
          Instances
        </button>
      </div>

      {/* Instance Type Selection */}
      {/* Instance View - Empty as requested */}
      {activeView === 'instance' && null}

      {/* Metrics Section */}
      <div className={styles.metricsSection}>
        <div className={styles.searchBox}>
          <Icon icon="mdi:magnify" className={styles.searchIcon} width={16} height={16} />
          <input
            type="text"
            placeholder="Search metrics..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.metricsList}>
          {Object.entries(
            filteredMetrics.reduce((acc, metric) => {
              const parts = metric.split('.');
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
              key={index} 
              className={styles.metricItem}
              onClick={() => onAddMetric({ name: metric })}
            >
              <span className={styles.metricItemLine}></span>
              <span className={styles.metricName}>{metric}</span>
              <button className={styles.metricAdd}>
                <Icon icon="mdi:plus" width={14} height={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
