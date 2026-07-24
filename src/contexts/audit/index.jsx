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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [expandedSections, setExpandedSections] = useState(
    () => new Set(DEFAULT_AUDIT_EXPANDED_SECTIONS)
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_AUDIT_FILTERS);

  const [auditEvents, setAuditEvents] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [totalEvents, setTotalEvents] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [failureCount, setFailureCount] = useState(0);

  const fetchAuditLogs = useCallback(async () => {
    try {
      setLoading(true);
      const apiParams = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery || undefined,
      };

      const data = await getAuditLogs(apiParams);
      // Transform backend response to match frontend expectations if necessary
      const mappedData = (data.items || []).map(item => {
        // The timestamp already includes a timezone offset (e.g., +05:30).
        // Adding 'Z' makes it invalid. Let the browser parse it natively.
        const dateObj = new Date(item.timestamp);
        const formattedTime = isNaN(dateObj)
          ? item.timestamp
          : dateObj.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
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
      setTotalEvents(data.total_logs || 0);
      setSuccessCount(data.success_logs || 0);
      setFailureCount(data.failure_logs || 0);

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
  }, [filters, currentPage, itemsPerPage, searchQuery]);

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  // Reset to page 1 when filters, search, or itemsPerPage change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery, itemsPerPage]);

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

  const handleOpenActionSidebar = useCallback((tab, event = null) => {
    setActiveActionTab(tab);
    if (event) {
      setSelectedEvent(event);
    }
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
    selectedEvent,
    setSelectedEvent,
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
    auditEvents,
    analyticsData,
    loading,
    error,
    fetchAuditLogs,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalEvents,
    successCount,
    failureCount,
  };

  return <AuditContext.Provider value={value}>{children}</AuditContext.Provider>;
};
