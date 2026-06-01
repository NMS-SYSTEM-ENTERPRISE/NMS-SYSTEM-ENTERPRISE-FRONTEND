'use client';
import { ChartModal } from '@/components/features/metric-explorer/chart-modal';
import { MetricChartContainer } from '@/components/features/metric-explorer/metric-chart-container';
import { MetricExplorerSidebar } from '@/components/features/metric-explorer/metric-explorer-sidebar';
import { ShareWidgetModal } from '@/components/features/metric-explorer/share-widget-modal';
import { Modal } from '@/components/ui/modal';
import { Popup } from '@/components/ui/popup';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MetricExplorerProvider } from '@/contexts/metric-explorer';
import { useMetricExplorer } from '@/hooks/metric-explorer';

const MetricExplorerContent = () => {
  const {
    metricTabs,
    activeTabId,
    setActiveTabId,
    activeTab,
    expandedChart,
    setExpandedChart,
    shareWidget,
    setShareWidget,
    isSidebarOpen,
    setIsSidebarOpen,
    renamingTab,
    setRenamingTab,
    deletingTab,
    setDeletingTab,
    newTabName,
    setNewTabName,
    handleAddTab,
    handleUpdateTab,
    handleAddMetric,
    handleRemoveMetric,
    handleUpdateMetric,
    handleRenameClick,
    handleDeleteClick,
    confirmRename,
    confirmDelete,
  } = useMetricExplorer();

  return (
    <div className={styles.metricExplorer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <Icon icon="mdi:chart-box-outline" width={20} height={20} />
          </div>
          <h1 className={styles.headerTitle}>Metric Explorer</h1>
        </div>
        <div className={styles.headerActions}>
          <Button
            variant="ghost"
            className={styles.actionBtn}
            title="Time Range"
          >
            <Icon icon="mdi:clock-outline" width={18} />
          </Button>
          <Button variant="ghost" className={styles.actionBtn} title="Share">
            <Icon icon="mdi:share-variant" width={18} />
          </Button>
          <Button variant="ghost" className={styles.actionBtn} title="Settings">
            <Icon icon="mdi:cog" width={18} />
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        {/* Sidebar - Resource Selector */}
        <div
          className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}
        >
          <div className={styles.sidebarHeader}>
            <span className={styles.sidebarTitle}>Resource Selection</span>
            <Button
              variant="icon"
              className={styles.collapseBtn}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
            >
              <Icon
                icon={
                  isSidebarOpen
                    ? 'mdi:chevron-double-left'
                    : 'mdi:chevron-double-right'
                }
                width={20}
              />
            </Button>
          </div>
          <div className={styles.sidebarContent}>
            <MetricExplorerSidebar
              activeTab={activeTab}
              activeTabId={activeTabId}
              onUpdateTab={handleUpdateTab}
              onAddMetric={handleAddMetric}
              isSidebarOpen={isSidebarOpen}
            />
          </div>
        </div>

        {/* Main Area - Tabs & Charts */}
        <div className={styles.mainArea}>
          <div className={styles.tabsBar}>
            {metricTabs.map((tab) => (
              <div
                key={tab.id}
                className={`${styles.tab} ${
                  activeTabId === tab.id ? styles.tabActive : ''
                }`}
                onClick={() => setActiveTabId(tab.id)}
              >
                <span>{tab.name}</span>
                <Popup
                  placement="bottom-end"
                  trigger={
                    <Button variant="icon" className={styles.tabActionBtn}>
                      <Icon icon="mdi:dots-vertical" width={14} />
                    </Button>
                  }
                  content={
                    <div className={styles.menuContent}>
                      <Button
                        variant="ghost"
                        className={styles.menuItem}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRenameClick(tab);
                        }}
                      >
                        <Icon icon="mdi:pencil" width={14} />
                        Rename
                      </Button>
                      <Button
                        variant="ghost"
                        className={`${styles.menuItem} ${styles.menuItemDanger}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(tab);
                        }}
                      >
                        <Icon icon="mdi:delete" width={14} />
                        Delete
                      </Button>
                    </div>
                  }
                />
              </div>
            ))}
            <Button
              variant="icon"
              className={styles.addTabBtn}
              onClick={handleAddTab}
            >
              <Icon icon="mdi:plus" width={16} />
            </Button>
          </div>

          <div className={styles.chartGrid}>
            <MetricChartContainer
              metrics={activeTab?.selectedMetrics || []}
              onRemoveMetric={handleRemoveMetric}
              onUpdateMetric={handleUpdateMetric}
              onExpandChart={setExpandedChart}
              onShareWidget={setShareWidget}
            />
          </div>
        </div>
      </div>

      {expandedChart && (
        <ChartModal
          metric={expandedChart}
          onClose={() => setExpandedChart(null)}
          onSaveAsWidget={() => {
            alert('Widget saved!');
            setExpandedChart(null);
          }}
        />
      )}

      {shareWidget && (
        <ShareWidgetModal
          metric={shareWidget}
          onClose={() => setShareWidget(null)}
          onShare={(data) => {
            alert(`Shared with: ${data.shareWith}\nMessage: ${data.message}`);
            setShareWidget(null);
          }}
        />
      )}

      {/* Rename Modal */}
      <Modal
        isOpen={!!renamingTab}
        onClose={() => setRenamingTab(null)}
        title="Rename Workspace"
        className={styles.modalContent}
      >
        <div className={styles.modalBody}>
          <label className={styles.label}>Workspace Name</label>
          <Input
            type="text"
            className={styles.modalInput}
            value={newTabName}
            onChange={(e) => setNewTabName(e.target.value)}
            autoFocus
          />
          <div className={styles.modalActions}>
            <Button variant="secondary" onClick={() => setRenamingTab(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmRename}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={!!deletingTab}
        onClose={() => setDeletingTab(null)}
        title="Delete Workspace"
        className={styles.modalContent}
      >
        <div className={styles.modalBody}>
          <p className={styles.modalText}>
            Are you sure you want to delete <strong>{deletingTab?.name}</strong>
            ? This action cannot be undone.
          </p>
          <div className={styles.modalActions}>
            <Button variant="secondary" onClick={() => setDeletingTab(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete Workspace
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const MetricExplorer = () => (
  <MetricExplorerProvider>
    <MetricExplorerContent />
  </MetricExplorerProvider>
);

export default MetricExplorer;
