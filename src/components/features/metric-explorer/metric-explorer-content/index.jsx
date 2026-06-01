'use client';

import { ChartModal } from '@/components/features/metric-explorer/chart-modal';
import { MetricChartContainer } from '@/components/features/metric-explorer/metric-chart-container';
import { MetricExplorerSidebar } from '@/components/features/metric-explorer/metric-explorer-sidebar';
import sharedStyles from '@/components/features/metric-explorer/shared/styles.module.css';
import { ShareWidgetModal } from '@/components/features/metric-explorer/share-widget-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Popup } from '@/components/ui/popup';
import { useMetricExplorer } from '@/hooks/metric-explorer';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

export const MetricExplorerContent = () => {
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
    <div className={sharedStyles.metricExplorer}>
      <div className={sharedStyles.header}>
        <div className={sharedStyles.headerLeft}>
          <div className={sharedStyles.headerIcon}>
            <Icon icon="mdi:chart-box-outline" width={20} height={20} />
          </div>
          <h1 className={sharedStyles.headerTitle}>Metric Explorer</h1>
        </div>
        <div className={sharedStyles.headerActions}>
          <Button type="button" variant="ghost" className={sharedStyles.actionBtn} title="Time Range">
            <Icon icon="mdi:clock-outline" width={18} />
          </Button>
          <Button type="button" variant="ghost" className={sharedStyles.actionBtn} title="Share">
            <Icon icon="mdi:share-variant" width={18} />
          </Button>
          <Button type="button" variant="ghost" className={sharedStyles.actionBtn} title="Settings">
            <Icon icon="mdi:cog" width={18} />
          </Button>
        </div>
      </div>

      <div className={sharedStyles.content}>
        <div
          className={clsx(sharedStyles.sidebar, !isSidebarOpen && sharedStyles.sidebarCollapsed)}
        >
          <div className={sharedStyles.sidebarHeader}>
            <span className={sharedStyles.sidebarTitle}>Resource Selection</span>
            <Button
              type="button"
              variant="icon"
              className={sharedStyles.collapseBtn}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
            >
              <Icon
                icon={isSidebarOpen ? 'mdi:chevron-double-left' : 'mdi:chevron-double-right'}
                width={20}
              />
            </Button>
          </div>
          <div className={sharedStyles.sidebarContent}>
            <MetricExplorerSidebar
              activeTab={activeTab}
              activeTabId={activeTabId}
              onUpdateTab={handleUpdateTab}
              onAddMetric={handleAddMetric}
              isSidebarOpen={isSidebarOpen}
            />
          </div>
        </div>

        <div className={sharedStyles.mainArea}>
          <div className={sharedStyles.tabsBar}>
            {metricTabs.map((tab) => (
              <div
                key={tab.id}
                role="button"
                tabIndex={0}
                className={clsx(sharedStyles.tab, activeTabId === tab.id && sharedStyles.tabActive)}
                onClick={() => setActiveTabId(tab.id)}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTabId(tab.id)}
              >
                <span>{tab.name}</span>
                <Popup
                  placement="bottom-end"
                  trigger={
                    <Button type="button" variant="icon" className={sharedStyles.tabActionBtn}>
                      <Icon icon="mdi:dots-vertical" width={14} />
                    </Button>
                  }
                  content={
                    <div className={sharedStyles.menuContent}>
                      <Button
                        type="button"
                        variant="ghost"
                        className={sharedStyles.menuItem}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRenameClick(tab);
                        }}
                      >
                        <Icon icon="mdi:pencil" width={14} />
                        Rename
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className={clsx(sharedStyles.menuItem, sharedStyles.menuItemDanger)}
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
            <Button type="button" variant="icon" className={sharedStyles.addTabBtn} onClick={handleAddTab}>
              <Icon icon="mdi:plus" width={16} />
            </Button>
          </div>

          <div className={sharedStyles.chartGrid}>
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
          onSaveAsWidget={() => setExpandedChart(null)}
        />
      )}

      {shareWidget && (
        <ShareWidgetModal
          metric={shareWidget}
          onClose={() => setShareWidget(null)}
          onShare={() => setShareWidget(null)}
        />
      )}

      <Modal
        isOpen={!!renamingTab}
        onClose={() => setRenamingTab(null)}
        title="Rename Workspace"
        className={sharedStyles.modalContent}
      >
        <div className={sharedStyles.modalBody}>
          <label className={sharedStyles.label}>Workspace Name</label>
          <Input
            type="text"
            className={sharedStyles.modalInput}
            value={newTabName}
            onChange={(e) => setNewTabName(e.target.value)}
            autoFocus
          />
          <div className={sharedStyles.modalActions}>
            <Button type="button" variant="secondary" onClick={() => setRenamingTab(null)}>
              Cancel
            </Button>
            <Button type="button" variant="primary" onClick={confirmRename}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!deletingTab}
        onClose={() => setDeletingTab(null)}
        title="Delete Workspace"
        className={sharedStyles.modalContent}
      >
        <div className={sharedStyles.modalBody}>
          <p className={sharedStyles.modalText}>
            Are you sure you want to delete <strong>{deletingTab?.name}</strong>? This action cannot
            be undone.
          </p>
          <div className={sharedStyles.modalActions}>
            <Button type="button" variant="secondary" onClick={() => setDeletingTab(null)}>
              Cancel
            </Button>
            <Button type="button" variant="danger" onClick={confirmDelete}>
              Delete Workspace
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
