'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { ALERT_ENVIRONMENT_CATEGORIES } from '@/utils/constants/alerts';
import { DEFAULT_ALERT_OVERVIEW_SECTIONS } from '@/utils/constants/alerts/sections';
import { MOCK_ALERTS } from '@/utils/dummy-data/alerts';

export const AlertsContext = createContext(null);

export const AlertsProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('metric');
  const [view, setView] = useState('overview');
  const [severityFilter, setSeverityFilter] = useState(null);
  const [expandedRows, setExpandedRows] = useState(new Set([MOCK_ALERTS[0].id]));
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [openSections, setOpenSections] = useState(DEFAULT_ALERT_OVERVIEW_SECTIONS);

  const alertCounts = useMemo(
    () => ({
      total: MOCK_ALERTS.length,
      down: MOCK_ALERTS.filter((a) => a.severity === 'down').length,
      unreachable: MOCK_ALERTS.filter((a) => a.severity === 'unreachable').length,
      critical: MOCK_ALERTS.filter((a) => a.severity === 'critical').length,
      major: MOCK_ALERTS.filter((a) => a.severity === 'major').length,
      warning: MOCK_ALERTS.filter((a) => a.severity === 'warning').length,
    }),
    []
  );

  const categoryStats = useMemo(
    () =>
      ALERT_ENVIRONMENT_CATEGORIES.map((cat) => ({
        name: cat,
        total: MOCK_ALERTS.filter((a) => a.category === cat).length,
        down: MOCK_ALERTS.filter((a) => a.category === cat && a.severity === 'down').length,
        critical: MOCK_ALERTS.filter((a) => a.category === cat && a.severity === 'critical').length,
        warning: MOCK_ALERTS.filter((a) => a.category === cat && a.severity === 'warning').length,
      })),
    []
  );

  const filteredAlerts = useMemo(() => {
    if (!severityFilter) return MOCK_ALERTS;
    return MOCK_ALERTS.filter((alert) => alert.severity === severityFilter);
  }, [severityFilter]);

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
  };

  return <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>;
};
