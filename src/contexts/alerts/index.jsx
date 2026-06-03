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
  const [openSections, setOpenSections] = useState(
    DEFAULT_ALERT_OVERVIEW_SECTIONS
  );

  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAlerts = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getAlerts();
      setAlerts(res.items || []);
    } catch (err) {
      console.error('Failed to fetch alerts:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
      total: alerts.length,
      down: alerts.filter((a) => a.severity === 'down').length,
      unreachable: alerts.filter((a) => a.severity === 'unreachable').length,
      critical: alerts.filter((a) => a.severity === 'critical').length,
      major: alerts.filter((a) => a.severity === 'major').length,
      warning: alerts.filter((a) => a.severity === 'warning').length,
    }),
    [alerts]
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

  const filteredAlerts = useMemo(() => {
    if (!severityFilter) return alerts;
    return alerts.filter((alert) => alert.severity === severityFilter);
  }, [severityFilter, alerts]);

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
    openSections,
    toggleSection,
    alertCounts,
    categoryStats,
    filteredAlerts,
    isLoading,
    handleAcknowledge,
    fetchAlerts,
  };

  return (
    <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>
  );
};
