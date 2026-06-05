'use client';

import { createContext, useCallback, useMemo, useState, useEffect } from 'react';
import {
  DEFAULT_AUDIT_EXPANDED_SECTIONS,
  DEFAULT_AUDIT_FILTERS,
  DEFAULT_AUDIT_VIEW,
} from '@/utils/constants/audit';
import { getAuditLogs, getAuditAnalytics } from '@/networking/settings/system/audit-logs/audit-apis';

export const AuditContext = createContext(null);

export const AuditProvider = ({ children }) => {
  const [activeView, setActiveView] = useState(DEFAULT_AUDIT_VIEW);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [showActionSidebar, setShowActionSidebar] = useState(false);
  const [activeActionTab, setActiveActionTab] = useState('details');
  const [expandedSections, setExpandedSections] = useState(
    () => new Set(DEFAULT_AUDIT_EXPANDED_SECTIONS)
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_AUDIT_FILTERS);

  const [auditEvents, setAuditEvents] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAuditLogs = useCallback(async () => {
    try {
      setLoading(true);
      const apiParams = {
        module: filters.module !== 'All' ? filters.module : undefined,
        status: filters.status !== 'All' ? filters.status : undefined,
      };
      
      const data = await getAuditLogs(apiParams);
      // Transform backend response to match frontend expectations if necessary
      const mappedData = (data.items || []).map(item => {
        const dateObj = new Date(item.timestamp + 'Z'); // ensure UTC parsing if missing Z
        const formattedTime = isNaN(dateObj)
          ? item.timestamp
          : dateObj.toLocaleString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
          });

        return {
          id: String(item.id),
          action: item.action,
          operationType: item.action,
          message: `${item.action} performed in ${item.module}`, // fallback or mapped
          module: item.module,
          user: item.username || item.user_id || 'System',
          timestamp: formattedTime,
          status: item.status_code >= 400 ? 'Failed' : 'Success',
          ip: item.ip_address || 'N/A',
          remoteIp: item.ip_address || 'N/A',
          details: item.details || {}
        };
      });
      setAuditEvents(mappedData);

      try {
        const analytics = await getAuditAnalytics(apiParams);
        setAnalyticsData(analytics);
      } catch (analyticsErr) {
        console.error('Failed to load audit analytics', analyticsErr);
      }
    } catch (err) {
      console.error('Failed to load audit logs', err);
      setError('Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  const filteredEvents = useMemo(() => {
    let events = auditEvents;
    const query = searchQuery.toLowerCase();
    if (query) {
      events = events.filter(
        (e) =>
          e.message?.toLowerCase().includes(query) ||
          e.user?.toLowerCase().includes(query) ||
          e.module?.toLowerCase().includes(query)
      );
    }
    if (filters.module && filters.module !== 'All') {
      events = events.filter((e) => e.module === filters.module);
    }
    if (filters.status && filters.status !== 'All') {
      events = events.filter((e) => e.status === filters.status);
    }
    return events;
  }, [searchQuery, filters.module, filters.status, auditEvents]);

  const toggleSection = useCallback((sectionId) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_AUDIT_FILTERS);
    setSearchQuery('');
  }, []);

  const handleApplyFilters = useCallback((appliedFilters) => {
    setSearchQuery(appliedFilters.search || '');
    setFilters((prev) => ({ ...prev, ...appliedFilters }));
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleOpenActionSidebar = useCallback((tab) => {
    setActiveActionTab(tab);
    setShowActionSidebar(true);
  }, []);

  const value = {
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    showFilterSidebar,
    setShowFilterSidebar,
    showActionSidebar,
    setShowActionSidebar,
    activeActionTab,
    expandedSections,
    toggleSection,
    isSidebarOpen,
    setIsSidebarOpen,
    filters,
    setFilters,
    handleResetFilters,
    handleApplyFilters,
    handleFilterChange,
    handleOpenActionSidebar,
    filteredEvents,
    auditEvents,
    analyticsData,
    loading,
    error,
    fetchAuditLogs,
  };

  return <AuditContext.Provider value={value}>{children}</AuditContext.Provider>;
};
