'use client';
import { generateMockData } from '@/utils/dummy-data/metric-explorer';
import { createContext, useCallback, useMemo, useState } from 'react';

export const MetricExplorerContext = createContext(null);

export const MetricExplorerProvider = ({ children }) => {
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

  const [renamingTab, setRenamingTab] = useState(null);
  const [deletingTab, setDeletingTab] = useState(null);
  const [newTabName, setNewTabName] = useState('');

  const activeTab = useMemo(
    () => metricTabs.find((tab) => tab.id === activeTabId),
    [metricTabs, activeTabId]
  );

  const handleAddTab = useCallback(() => {
    const newId = String(metricTabs.length + 1);
    setMetricTabs((prev) => [
      ...prev,
      {
        id: newId,
        name: `Workspace ${prev.length + 1}`,
        monitor: null,
        instanceType: null,
        instance: null,
        selectedMetrics: [],
      },
    ]);
    setActiveTabId(newId);
  }, [metricTabs.length]);

  const handleCloseTab = useCallback(
    (tabId, e) => {
      e?.stopPropagation();
      setMetricTabs((prev) => {
        if (prev.length === 1) return prev;
        const newTabs = prev.filter((tab) => tab.id !== tabId);
        if (activeTabId === tabId) {
          setActiveTabId(newTabs[0].id);
        }
        return newTabs;
      });
    },
    [activeTabId]
  );

  const handleUpdateTab = useCallback((tabId, updates) => {
    setMetricTabs((prev) =>
      prev.map((tab) => (tab.id === tabId ? { ...tab, ...updates } : tab))
    );
  }, []);

  const handleAddMetric = useCallback(
    (metric) => {
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
    },
    [activeTab, handleUpdateTab]
  );

  const handleRemoveMetric = useCallback(
    (metricId) => {
      if (!activeTab) return;
      handleUpdateTab(activeTab.id, {
        selectedMetrics: activeTab.selectedMetrics.filter(
          (m) => m.id !== metricId
        ),
      });
    },
    [activeTab, handleUpdateTab]
  );

  const handleUpdateMetric = useCallback(
    (metricId, updates) => {
      if (!activeTab) return;
      handleUpdateTab(activeTab.id, {
        selectedMetrics: activeTab.selectedMetrics.map((m) =>
          m.id === metricId ? { ...m, ...updates } : m
        ),
      });
    },
    [activeTab, handleUpdateTab]
  );

  const handleRenameClick = useCallback((tab) => {
    setRenamingTab(tab);
    setNewTabName(tab.name);
  }, []);

  const handleDeleteClick = useCallback((tab) => {
    setDeletingTab(tab);
  }, []);

  const confirmRename = useCallback(() => {
    if (renamingTab && newTabName.trim()) {
      handleUpdateTab(renamingTab.id, { name: newTabName.trim() });
      setRenamingTab(null);
    }
  }, [renamingTab, newTabName, handleUpdateTab]);

  const confirmDelete = useCallback(() => {
    if (deletingTab) {
      setMetricTabs((prev) => {
        if (prev.length > 1) {
          const newTabs = prev.filter((tab) => tab.id !== deletingTab.id);
          if (activeTabId === deletingTab.id) {
            setActiveTabId(newTabs[0].id);
          }
          return newTabs;
        }
        return prev;
      });
      setDeletingTab(null);
    }
  }, [deletingTab, activeTabId]);

  const value = {
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
    handleCloseTab,
    handleUpdateTab,
    handleAddMetric,
    handleRemoveMetric,
    handleUpdateMetric,
    handleRenameClick,
    handleDeleteClick,
    confirmRename,
    confirmDelete,
  };

  return (
    <MetricExplorerContext.Provider value={value}>
      {children}
    </MetricExplorerContext.Provider>
  );
};
