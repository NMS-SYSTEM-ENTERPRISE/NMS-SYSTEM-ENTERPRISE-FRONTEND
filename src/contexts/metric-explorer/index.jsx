'use client';
import {
  createMetricExplorerWorkspace,
  deleteMetricExplorerWorkspace,
  getMetricExplorerBootstrap,
  getMetricExplorerSeries,
  updateMetricExplorerWorkspace,
} from '@/networking/network-monitoring/network-monitoring-apis';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export const MetricExplorerContext = createContext(null);

const buildEmptyWorkspace = () => ({
  id: 'local-1',
  name: 'Workspace 1',
  monitor: null,
  instanceType: null,
  instance: null,
  selectedMetrics: [],
});

const serializeMetric = (metric) => ({
  id: metric.id,
  name: metric.name,
  displayName: metric.displayName,
  unit: metric.unit,
  monitor: metric.monitor,
  monitorIp: metric.monitorIp,
  instanceType: metric.instanceType,
  instance: metric.instance,
  timeRange: metric.timeRange || '6h',
});

const serializeWorkspaceMetrics = (metrics = []) => metrics.map(serializeMetric);

export const MetricExplorerProvider = ({ children }) => {
  const [metricTabs, setMetricTabs] = useState([buildEmptyWorkspace()]);
  const [activeTabId, setActiveTabId] = useState('local-1');
  const [expandedChart, setExpandedChart] = useState(null);
  const [shareWidget, setShareWidget] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [monitors, setMonitors] = useState([]);
  const [metricsCatalog, setMetricsCatalog] = useState([]);
  const [instanceTypes, setInstanceTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [renamingTab, setRenamingTab] = useState(null);
  const [deletingTab, setDeletingTab] = useState(null);
  const [newTabName, setNewTabName] = useState('');

  const activeTab = useMemo(
    () => metricTabs.find((tab) => tab.id === activeTabId),
    [metricTabs, activeTabId]
  );

  const persistWorkspace = useCallback(async (tabId, updates) => {
    if (!tabId || String(tabId).startsWith('local-')) return;
    try {
      await updateMetricExplorerWorkspace(tabId, updates);
    } catch (error) {
      console.error('Failed to save metric workspace:', error);
      setErrorMessage('Unable to save workspace changes right now.');
    }
  }, []);

  const loadMetricSeries = useCallback(async (tabId, metricConfig) => {
    if (!metricConfig.monitorIp || !metricConfig.name) return;
    setMetricTabs((prev) =>
      prev.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              selectedMetrics: tab.selectedMetrics.map((metric) =>
                metric.id === metricConfig.id
                  ? { ...metric, isLoading: true, message: '', data: metric.data || [] }
                  : metric
              ),
            }
          : tab
      )
    );

    try {
      const response = await getMetricExplorerSeries({
        deviceIp: metricConfig.monitorIp,
        metric: metricConfig.name,
        timeRange: metricConfig.timeRange || '6h',
      });
      setMetricTabs((prev) =>
        prev.map((tab) =>
          tab.id === tabId
            ? {
                ...tab,
                selectedMetrics: tab.selectedMetrics.map((metric) =>
                  metric.id === metricConfig.id
                    ? {
                        ...metric,
                        data: response.data || [],
                        unit: response.metric?.unit || metric.unit || '%',
                        isLoading: false,
                        message: response.message || '',
                      }
                    : metric
                ),
              }
            : tab
        )
      );
    } catch (error) {
      console.error('Failed to load metric series:', error);
      setMetricTabs((prev) =>
        prev.map((tab) =>
          tab.id === tabId
            ? {
                ...tab,
                selectedMetrics: tab.selectedMetrics.map((metric) =>
                  metric.id === metricConfig.id
                    ? { ...metric, isLoading: false, message: 'Unable to load this metric series.' }
                    : metric
                ),
              }
            : tab
        )
      );
    }
  }, []);

  useEffect(() => {
    const fetchBootstrap = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const response = await getMetricExplorerBootstrap();
        const loadedMonitors = response.monitors || [];
        setMonitors(loadedMonitors);
        setMetricsCatalog(response.metrics || []);
        setInstanceTypes(response.instance_types || []);

        const tabs = (response.workspaces || []).map((workspace) => {
          const selectedMetrics = (workspace.selected_metrics || []).map((metric, index) => ({
            ...metric,
            id: metric.id || `${workspace.id}-${metric.name}-${index}`,
            timeRange: metric.timeRange || '6h',
            data: [],
            isLoading: true,
            message: '',
          }));
          const firstMetric = selectedMetrics[0];
          return {
            id: String(workspace.id),
            name: workspace.name,
            monitor: firstMetric?.monitorIp || null,
            instanceType: firstMetric?.instanceType || null,
            instance: firstMetric?.instance || null,
            selectedMetrics,
          };
        });

        const nextTabs = tabs.length ? tabs : [buildEmptyWorkspace()];
        setMetricTabs(nextTabs);
        setActiveTabId(nextTabs[0].id);
        nextTabs.forEach((tab) => {
          tab.selectedMetrics.forEach((metric) => loadMetricSeries(tab.id, metric));
        });
      } catch (error) {
        console.error('Failed to load metric explorer metadata:', error);
        setErrorMessage('Unable to load metric explorer data right now.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBootstrap();
  }, [loadMetricSeries]);

  const handleAddTab = useCallback(async () => {
    try {
      const created = await createMetricExplorerWorkspace({
        name: `Workspace ${metricTabs.length + 1}`,
        selected_metrics: [],
      });
      const tab = {
        id: String(created.id),
        name: created.name,
        monitor: null,
        instanceType: null,
        instance: null,
        selectedMetrics: [],
      };
      setMetricTabs((prev) => [...prev, tab]);
      setActiveTabId(tab.id);
    } catch (error) {
      console.error('Failed to create metric workspace:', error);
      setErrorMessage('Unable to create workspace right now.');
    }
  }, [metricTabs.length]);

  const handleCloseTab = useCallback((tabId, e) => {
    e?.stopPropagation();
    setDeletingTab(metricTabs.find((tab) => tab.id === tabId) || null);
  }, [metricTabs]);

  const handleUpdateTab = useCallback((tabId, updates) => {
    let nextSelectedMetrics = null;
    setMetricTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== tabId) return tab;
        const monitorChanged = Object.prototype.hasOwnProperty.call(updates, 'monitor')
          && updates.monitor !== tab.monitor;
        nextSelectedMetrics = monitorChanged ? [] : updates.selectedMetrics ?? tab.selectedMetrics;
        return {
          ...tab,
          ...updates,
          selectedMetrics: nextSelectedMetrics,
        };
      })
    );
    if (Object.prototype.hasOwnProperty.call(updates, 'monitor')) {
      persistWorkspace(tabId, { selected_metrics: serializeWorkspaceMetrics(nextSelectedMetrics || []) });
    }
  }, [persistWorkspace]);

  const handleAddMetric = useCallback(
    async (metric) => {
      if (!activeTab) return;
      if (!activeTab.monitor) {
        setErrorMessage('Select a monitor before adding metrics.');
        return;
      }

      const selectedMonitor = monitors.find((monitor) => monitor.id === activeTab.monitor);
      const newMetric = {
        id: `${activeTab.id}-${Date.now()}`,
        name: metric.name,
        displayName: metric.label || metric.name,
        unit: metric.unit || '%',
        monitor: selectedMonitor?.name || activeTab.monitor,
        monitorIp: activeTab.monitor,
        instanceType: activeTab.instanceType,
        instance: activeTab.instance,
        timeRange: '6h',
        data: [],
        isLoading: true,
        message: '',
      };
      const nextMetrics = [...activeTab.selectedMetrics, newMetric];
      setMetricTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeTab.id ? { ...tab, selectedMetrics: nextMetrics } : tab
        )
      );
      persistWorkspace(activeTab.id, { selected_metrics: serializeWorkspaceMetrics(nextMetrics) });
      loadMetricSeries(activeTab.id, newMetric);
    },
    [activeTab, loadMetricSeries, monitors, persistWorkspace]
  );

  const handleRemoveMetric = useCallback(
    (metricId) => {
      if (!activeTab) return;
      const nextMetrics = activeTab.selectedMetrics.filter((metric) => metric.id !== metricId);
      setMetricTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeTab.id ? { ...tab, selectedMetrics: nextMetrics } : tab
        )
      );
      persistWorkspace(activeTab.id, { selected_metrics: serializeWorkspaceMetrics(nextMetrics) });
    },
    [activeTab, persistWorkspace]
  );

  const handleUpdateMetric = useCallback(
    async (metricId, updates) => {
      if (!activeTab) return;
      const targetMetric = activeTab.selectedMetrics.find((metric) => metric.id === metricId);
      const nextMetrics = activeTab.selectedMetrics.map((metric) =>
        metric.id === metricId ? { ...metric, ...updates } : metric
      );
      setMetricTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeTab.id ? { ...tab, selectedMetrics: nextMetrics } : tab
        )
      );
      persistWorkspace(activeTab.id, { selected_metrics: serializeWorkspaceMetrics(nextMetrics) });

      if (targetMetric && Object.prototype.hasOwnProperty.call(updates, 'timeRange')) {
        loadMetricSeries(activeTab.id, { ...targetMetric, ...updates });
      }
    },
    [activeTab, loadMetricSeries, persistWorkspace]
  );

  const handleRenameClick = useCallback((tab) => {
    setRenamingTab(tab);
    setNewTabName(tab.name);
  }, []);

  const handleDeleteClick = useCallback((tab) => {
    setDeletingTab(tab);
  }, []);

  const confirmRename = useCallback(async () => {
    if (renamingTab && newTabName.trim()) {
      const name = newTabName.trim();
      setMetricTabs((prev) =>
        prev.map((tab) => (tab.id === renamingTab.id ? { ...tab, name } : tab))
      );
      await persistWorkspace(renamingTab.id, { name });
      setRenamingTab(null);
    }
  }, [newTabName, persistWorkspace, renamingTab]);

  const confirmDelete = useCallback(async () => {
    if (!deletingTab || metricTabs.length <= 1) {
      setDeletingTab(null);
      return;
    }
    try {
      await deleteMetricExplorerWorkspace(deletingTab.id);
      setMetricTabs((prev) => {
        const nextTabs = prev.filter((tab) => tab.id !== deletingTab.id);
        if (activeTabId === deletingTab.id) {
          setActiveTabId(nextTabs[0].id);
        }
        return nextTabs;
      });
    } catch (error) {
      console.error('Failed to delete metric workspace:', error);
      setErrorMessage('Unable to delete workspace right now.');
    } finally {
      setDeletingTab(null);
    }
  }, [activeTabId, deletingTab, metricTabs.length]);

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
    monitors,
    metricsCatalog,
    instanceTypes,
    isLoading,
    errorMessage,
    setErrorMessage,
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
