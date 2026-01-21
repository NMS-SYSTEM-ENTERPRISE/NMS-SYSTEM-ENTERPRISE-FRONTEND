"use client";
import { ChartModal } from '@/components/features/metric-explorer/chart-modal';
import { MetricChartContainer } from '@/components/features/metric-explorer/metric-chart-container';
import { MetricExplorerSidebar } from '@/components/features/metric-explorer/metric-explorer-sidebar';
import { ShareWidgetModal } from '@/components/features/metric-explorer/share-widget-modal';
import { Modal } from '@/components/ui/modal';
import { Popup } from '@/components/ui/popup';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

const MetricExplorer = () => {
  const [metricTabs, setMetricTabs] = useState([
    {
      id: '1',
      name: 'Workspace 1',
      monitor: null,
      instanceType: null,
      instance: null,
      selectedMetrics: [],
    },
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [expandedChart, setExpandedChart] = useState(null);
  const [shareWidget, setShareWidget] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeTab = metricTabs.find((tab) => tab.id === activeTabId);

  const handleAddTab = () => {
    const newId = String(metricTabs.length + 1);
    setMetricTabs([
      ...metricTabs,
      {
        id: newId,
        name: `Workspace ${metricTabs.length + 1}`,
        monitor: null,
        instanceType: null,
        instance: null,
        selectedMetrics: [],
      },
    ]);
    setActiveTabId(newId);
  };

  const handleCloseTab = (tabId, e) => {
    e.stopPropagation();
    if (metricTabs.length === 1) return;
    const newTabs = metricTabs.filter((tab) => tab.id !== tabId);
    setMetricTabs(newTabs);
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[0].id);
    }
  };

  const handleUpdateTab = (tabId, updates) => {
    setMetricTabs(
      metricTabs.map((tab) => (tab.id === tabId ? { ...tab, ...updates } : tab))
    );
  };

  const handleAddMetric = (metric) => {
    if (!activeTab) return;
    const newMetric = {
      id: `${activeTab.id}-${Date.now()}`,
      name: metric.name,
      monitor: activeTab.monitor,
      instanceType: activeTab.instanceType,
      instance: activeTab.instance,
      timeRange: '6h',
      data: generateMockData(),
    };
    handleUpdateTab(activeTab.id, {
      selectedMetrics: [...activeTab.selectedMetrics, newMetric],
    });
  };

  const handleRemoveMetric = (metricId) => {
    if (!activeTab) return;
    handleUpdateTab(activeTab.id, {
      selectedMetrics: activeTab.selectedMetrics.filter(
        (m) => m.id !== metricId
      ),
    });
  };

  const handleUpdateMetric = (metricId, updates) => {
    if (!activeTab) return;
    handleUpdateTab(activeTab.id, {
      selectedMetrics: activeTab.selectedMetrics.map((m) =>
        m.id === metricId ? { ...m, ...updates } : m
      ),
    });
  };

  const generateMockData = () => {
    const data = [];
    const now = Date.now();
    for (let i = 0; i < 100; i++) {
      data.push({
        timestamp: now - (100 - i) * 60000,
        value: 45 + Math.random() * 10,
      });
    }
    return data;
  };

  const [renamingTab, setRenamingTab] = useState(null);
  const [deletingTab, setDeletingTab] = useState(null);
  const [newTabName, setNewTabName] = useState('');

  const handleRenameClick = (tab) => {
    setRenamingTab(tab);
    setNewTabName(tab.name);
  };

  const handleDeleteClick = (tab) => {
    setDeletingTab(tab);
  };

  const confirmRename = () => {
    if (renamingTab && newTabName.trim()) {
      handleUpdateTab(renamingTab.id, { name: newTabName.trim() });
      setRenamingTab(null);
    }
  };

  const confirmDelete = () => {
    if (deletingTab) {
      if (metricTabs.length > 1) {
        const newTabs = metricTabs.filter((tab) => tab.id !== deletingTab.id);
        setMetricTabs(newTabs);
        if (activeTabId === deletingTab.id) {
          setActiveTabId(newTabs[0].id);
        }
      }
      setDeletingTab(null);
    }
  };

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
          <button className={styles.actionBtn} title="Time Range">
            <Icon icon="mdi:clock-outline" width={18} />
          </button>
          <button className={styles.actionBtn} title="Share">
            <Icon icon="mdi:share-variant" width={18} />
          </button>
          <button className={styles.actionBtn} title="Settings">
            <Icon icon="mdi:cog" width={18} />
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {/* Sidebar - Resource Selector */}
        <div className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}>
          <div className={styles.sidebarHeader}>
            <span className={styles.sidebarTitle}>Resource Selection</span>
            <button 
              className={styles.collapseBtn} 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              <Icon 
                icon={isSidebarOpen ? "mdi:chevron-double-left" : "mdi:chevron-double-right"} 
                width={20} 
              />
            </button>
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
                    <button className={styles.tabActionBtn}>
                      <Icon icon="mdi:dots-vertical" width={14} />
                    </button>
                  }
                  content={
                    <div className={styles.menuContent}>
                      <button 
                        className={styles.menuItem} 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRenameClick(tab);
                        }}
                      >
                        <Icon icon="mdi:pencil" width={14} />
                        Rename
                      </button>
                      <button 
                        className={`${styles.menuItem} ${styles.menuItemDanger}`} 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(tab);
                        }}
                      >
                        <Icon icon="mdi:delete" width={14} />
                        Delete
                      </button>
                    </div>
                  }
                />
              </div>
            ))}
            <button className={styles.addTabBtn} onClick={handleAddTab}>
              <Icon icon="mdi:plus" width={16} />
            </button>
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
          <input
            type="text"
            className={styles.modalInput}
            value={newTabName}
            onChange={(e) => setNewTabName(e.target.value)}
            autoFocus
          />
          <div className={styles.modalActions}>
            <button 
              className={`${styles.modalBtn} ${styles.modalBtnCancel}`}
              onClick={() => setRenamingTab(null)}
            >
              Cancel
            </button>
            <button 
              className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
              onClick={confirmRename}
            >
              Save Changes
            </button>
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
           Are you sure you want to delete <strong>{deletingTab?.name}</strong>? This action cannot be undone.
          </p>
          <div className={styles.modalActions}>
             <button 
              className={`${styles.modalBtn} ${styles.modalBtnCancel}`}
              onClick={() => setDeletingTab(null)}
            >
              Cancel
            </button>
            <button 
              className={`${styles.modalBtn} ${styles.modalBtnDanger}`}
              onClick={confirmDelete}
            >
              Delete Workspace
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MetricExplorer;
