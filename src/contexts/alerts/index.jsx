'use client';

import {
  acknowledgeAlert,
  ALERTS_WEBSOCKET_URL,
  getAlerts,
} from '@/networking/network-monitoring/network-monitoring-apis';
import { ALERT_ENVIRONMENT_CATEGORIES } from '@/utils/constants/alerts';
import { DEFAULT_ALERT_OVERVIEW_SECTIONS } from '@/utils/constants/alerts/sections';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const AlertsContext = createContext(null);

export const AlertsProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('metric');
  const [view, setView] = useState('overview');
  const [severityFilter, setSeverityFilter] = useState(null);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [openSections, setOpenSections] = useState(
    DEFAULT_ALERT_OVERVIEW_SECTIONS
  );

  const [alerts, setAlerts] = useState([]);
  const [summary, setSummary] = useState(null);
  const [totalAlerts, setTotalAlerts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAlerts = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery || undefined,
        severity: severityFilter || undefined,
        active_only: activeTab === 'active' || undefined, // assuming activeTab='active' maps to active_only
      };

      const res = await getAlerts(params);

      const apiAlerts = Array.isArray(res.items) ? res.items : [];
      setAlerts(apiAlerts);

      setSummary(res.summary || null);
      setTotalAlerts(res.total_alerts || 0);
      setTotalPages(res.total_pages || 0);

    } catch (err) {
      console.error('Failed to fetch alerts:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, searchQuery, severityFilter, activeTab]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  // WebSocket Live Updates
  useEffect(() => {
    if (!ALERTS_WEBSOCKET_URL) return;
    const ws = new WebSocket(ALERTS_WEBSOCKET_URL);
    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.event === 'alert_update') {
          fetchAlerts(); // Refresh the list when alert status changes
        }
      } catch (err) {
        console.error('WebSocket parse error:', err);
      }
    };
    return () => ws.close();
  }, [fetchAlerts]);

  const handleAcknowledge = useCallback(
    async (alertId, { acknowledged, incidentRef, notes }) => {
      try {
        await acknowledgeAlert(alertId, { acknowledged, incidentRef, notes });
        fetchAlerts();
      } catch (error) {
        console.error('Failed to acknowledge alert:', error);
      }
    },
    [fetchAlerts]
  );

  const alertCounts = useMemo(
    () => ({
      total: summary?.total_alerts || 0,
      down: summary?.down_alerts || 0,
      unreachable: summary?.down_alerts || 0, // Fallback since schema doesn't have unreachable
      critical: summary?.critical_alerts || 0,
      major: summary?.major_alerts || 0,
      warning: summary?.warning_alerts || 0,
    }),
    [summary]
  );

  const categoryStats = useMemo(
    () =>
      ALERT_ENVIRONMENT_CATEGORIES.map((cat) => ({
        name: cat,
        total: alerts.filter((a) => a.category === cat).length,
        down: alerts.filter((a) => a.category === cat && a.severity === 'down')
          .length,
        critical: alerts.filter(
          (a) => a.category === cat && a.severity === 'critical'
        ).length,
        warning: alerts.filter(
          (a) => a.category === cat && a.severity === 'warning'
        ).length,
      })),
    [alerts]
  );

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [severityFilter, searchQuery, activeTab, itemsPerPage]);

  const toggleSection = useCallback((section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const toggleRow = useCallback((id) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const value = {
    isSidebarOpen,
    setIsSidebarOpen,
    activeTab,
    setActiveTab,
    view,
    setView,
    severityFilter,
    setSeverityFilter,
    expandedRows,
    toggleRow,
    showFilterSidebar,
    setShowFilterSidebar,
    searchQuery,
    setSearchQuery,
    openSections,
    toggleSection,
    alertCounts,
    categoryStats,
    paginatedAlerts: alerts,
    summary,
    totalAlerts,
    totalPages,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    isLoading,
    handleAcknowledge,
    fetchAlerts,
  };

  return (
    <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>
  );
};
