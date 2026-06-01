'use client';
import { FlowActionSidebar } from '@/components/features/flow/flow-action-sidebar';
import { FlowAnalytics } from '@/components/features/flow/flow-analytics';
import { FlowDashboard } from '@/components/features/flow/flow-dashboard';
import { FlowExplorer } from '@/components/features/flow/flow-explorer';
import { SelectComponent } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { FlowProvider } from '@/contexts/flow';
import { useFlow } from '@/hooks/flow';
import { SIDEBAR_ITEMS, EVENT_SOURCE_OPTIONS, INTERFACE_OPTIONS } from '@/utils/dummy-data/flow';
import styles from './styles.module.css';

const FlowContent = () => {
  const {
    activeView,
    setActiveView,
    selectedEventSource,
    setSelectedEventSource,
    selectedInterface,
    setSelectedInterface,
    showActionSidebar,
    setShowActionSidebar,
    isSidebarOpen,
    setIsSidebarOpen,
    flowConfig,
    setFlowConfig,
  } = useFlow();

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
          <Button
            variant="ghost"
            className={styles.collapseBtn}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? "Collapse" : "Expand"}
          >
            <Icon
              icon={isSidebarOpen ? "mdi:menu-open" : "mdi:menu"}
              width={22}
            />
          </Button>
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
                className={`${styles.navItem} ${activeView === item.id ? styles.navItemActive : ''
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
                variant="borderless"
                className={styles.select}
                value={selectedEventSource}
                onChange={(e) => setSelectedEventSource(e.target.value)}
                options={EVENT_SOURCE_OPTIONS}
                placeholder="Select"
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Interface:</label>
              <SelectComponent
                variant="borderless"
                className={styles.select}
                value={selectedInterface}
                onChange={(e) => setSelectedInterface(e.target.value)}
                options={INTERFACE_OPTIONS}
                placeholder="Select"
              />
            </div>

            {/* Actions */}
            <div className={styles.headerActions}>
              <Button className={styles.actionBtn} title="Refresh">
                <Icon icon="mdi:refresh" width={20} height={20} />
              </Button>
              <Button
                className={styles.actionBtn}
                onClick={() => setShowActionSidebar(true)}
                title={
                  activeView === 'dashboard'
                    ? 'Dashboard Actions'
                    : 'Explorer Configuration'
                }
              >
                <Icon icon="mdi:cog" width={20} height={20} />
              </Button>
              <Button className={styles.actionBtn} title="Export">
                <Icon icon="mdi:download" width={20} height={20} />
              </Button>
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

export default function Flow() {
  return (
    <FlowProvider>
      <FlowContent />
    </FlowProvider>
  );
}
