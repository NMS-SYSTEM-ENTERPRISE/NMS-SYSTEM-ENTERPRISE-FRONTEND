"use client";
import { FlowActionSidebar } from '@/components/features/flow/flow-action-sidebar';
import { FlowAnalytics } from '@/components/features/flow/flow-analytics';
import { FlowDashboard } from '@/components/features/flow/flow-dashboard';
import { FlowExplorer } from '@/components/features/flow/flow-explorer';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

// Sidebar navigation items
const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'mdi:view-dashboard' },
  { id: 'explorer', label: 'Explorer', icon: 'mdi:compass' },
  { id: 'analytics', label: 'Analytics', icon: 'mdi:chart-line' },
];

const Flow = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedEventSource, setSelectedEventSource] = useState('');
  const [selectedInterface, setSelectedInterface] = useState('');
  const [showActionSidebar, setShowActionSidebar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Collapsed by default
  const [flowConfig, setFlowConfig] = useState({
    eventSource: '',
    interface: '',
    counter: 'volume.bytes',
    aggregation: 'sum',
    flowSource: '',
    resultBy: 'source.ip',
    chartType: 'area',
    showLegend: true,
    showDataLabels: false,
    enableZoom: false,
    autoRefresh: false,
  });

  return (
    <div className={styles.flow}>
      {/* Left Sidebar */}
      <div 
        className={`${styles.leftSidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}
      >
        <div className={styles.sidebarHeader}>
          <span className={`${styles.sidebarTitle} ${!isSidebarOpen ? styles.hidden : ''}`}>
            Categories
          </span>
          <button 
            className={styles.collapseBtn}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? "Collapse" : "Expand"}
          >
            <Icon 
              icon={isSidebarOpen ? "mdi:menu-open" : "mdi:menu"} 
              width={22} 
            />
          </button>
        </div>
        
        <div className={styles.sidebarNav}>
          {/* Root Node */}
          <div className={styles.treeRoot}>
            <Icon icon="mdi:swap-horizontal-bold" width={18} className={styles.rootIcon} />
            <span className={styles.rootLabel}>Flow Analysis</span>
          </div>

          {/* Children */}
          <div className={styles.treeChildren}>
            {SIDEBAR_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`${styles.navItem} ${
                  activeView === item.id ? styles.navItemActive : ''
                }`}
                onClick={() => setActiveView(item.id)}
                title={!isSidebarOpen ? item.label : ''}
              >
                <div className={styles.treeBranch} />
                <div className={styles.itemIconWrapper}>
                   <Icon icon={item.icon} width={18} height={18} />
                </div>
                <span className={styles.navText}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className={styles.mainContentWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <Icon icon="mdi:swap-horizontal-bold" width={24} height={24} />
            </div>
            <h1 className={styles.headerTitle}>Flow Analysis</h1>
          </div>

          <div className={styles.headerRight}>
            {/* Filters */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Event Source:</label>
              <SelectComponent
                className={styles.select}
                value={selectedEventSource}
                onChange={(e) => setSelectedEventSource(e.target.value)}
                options={[
                  { value: '', label: 'Select' },
                  { value: 'source1', label: 'Source 1' },
                  { value: 'source2', label: 'Source 2' },
                ]}
                placeholder="Select"
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Interface:</label>
              <SelectComponent
                className={styles.select}
                value={selectedInterface}
                onChange={(e) => setSelectedInterface(e.target.value)}
                options={[
                  { value: '', label: 'Select' },
                  { value: 'interface-index-1', label: 'Interface-Index-1' },
                  { value: 'interface-index-2', label: 'Interface-Index-2' },
                  { value: 'interface-index-3', label: 'Interface-Index-3' },
                  { value: 'interface-index-4', label: 'Interface-Index-4' },
                  { value: 'interface-index-5', label: 'Interface-Index-5' },
                  { value: 'interface-index-6', label: 'Interface-Index-6' },
                  { value: 'interface-index-7', label: 'Interface-Index-7' },
                  { value: 'interface-index-8', label: 'Interface-Index-8' },
                ]}
                placeholder="Select"
              />
            </div>

            {/* Actions */}
            <div className={styles.headerActions}>
              <button className={styles.actionBtn} title="Refresh">
                <Icon icon="mdi:refresh" width={20} height={20} />
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => setShowActionSidebar(true)}
                title={
                  activeView === 'dashboard'
                    ? 'Dashboard Actions'
                    : 'Explorer Configuration'
                }
              >
                <Icon icon="mdi:cog" width={20} height={20} />
              </button>
              <button className={styles.actionBtn} title="Export">
                <Icon icon="mdi:download" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.contentArea}>
          {activeView === 'dashboard' && <FlowDashboard config={flowConfig} />}
          {activeView === 'explorer' && <FlowExplorer config={flowConfig} />}
          {activeView === 'analytics' && <FlowAnalytics config={flowConfig} />}
          
          {!['dashboard', 'explorer', 'analytics'].includes(activeView) && (
            <div className={styles.placeholderView}>
              <Icon icon={SIDEBAR_ITEMS.find(i => i.id === activeView)?.icon} width={64} height={64} />
              <h2>{SIDEBAR_ITEMS.find(i => i.id === activeView)?.label} View</h2>
              <p>This section is currently under development.</p>
            </div>
          )}
        </div>
      </div>

      {/* Flow Action Sidebar */}
      <FlowActionSidebar
        isOpen={showActionSidebar}
        onClose={() => setShowActionSidebar(false)}
        mode={activeView}
        config={flowConfig}
        onConfigChange={(newConfig) => setFlowConfig(newConfig)}
        onSave={(savedConfig) => {
          setFlowConfig(savedConfig);
          console.log('Flow configuration saved:', savedConfig);
        }}
      />
    </div>
  );
};

export default Flow;
