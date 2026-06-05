'use client';

import { createContext, useCallback, useMemo, useState, useEffect } from 'react';
import {
  DEFAULT_LOG_EXPANDED_SECTIONS,
  DEFAULT_LOG_FILTERS,
  DEFAULT_LOG_VIEW,
} from '@/utils/constants/log-management';
import { fetchSyslogsApi, fetchNetworkLogsApi } from '@/networking/network-monitoring/log-management-apis';
import { toast } from 'sonner';

export const LogManagementContext = createContext(null);

export const LogManagementProvider = ({ children }) => {
  const [activeView, setActiveView] = useState('all');
  const [layoutView, setLayoutView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState(
    () => new Set(DEFAULT_LOG_EXPANDED_SECTIONS)
  );
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [showWidgetSidebar, setShowWidgetSidebar] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_LOG_FILTERS);

  const [syslogs, setSyslogs] = useState([]);
  const [networkLogs, setNetworkLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSyslogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const [sysRes, netRes] = await Promise.all([
        fetchSyslogsApi({
          search: searchQuery || undefined,
          severity: filters.severity || undefined,
          page: 1,
          size: 100,
        }),
        fetchNetworkLogsApi({
          search: searchQuery || undefined,
          severity: filters.severity || undefined,
          page: 1,
          size: 100,
        })
      ]);
      const sysData = sysRes.data || sysRes;
      setSyslogs(sysData.data || []);

      const netData = netRes.data || netRes;
      setNetworkLogs(netData.data || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
      toast.error('Failed to load logs');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, filters.severity]);

  useEffect(() => {
    loadSyslogs();
  }, [loadSyslogs]);

  const filteredEvents = useMemo(() => {
    const formattedSyslogs = syslogs.map(log => ({
      id: `sys-${log.id}`,
      timestamp: log.timestamp,
      source: log.source_ip,
      category: log.category || 'System',
      severity: log.severity_name?.toLowerCase() || 'info',
      message: log.message,
      type: 'Syslog'
    }));

    const formattedNetworkLogs = networkLogs.map(log => ({
      id: `net-${log.id}`,
      timestamp: log.timestamp,
      source: log.source_ip,
      category: log.log_type || 'Network',
      severity: log.severity?.toLowerCase() || 'info',
      message: log.message,
      type: 'Network Log'
    }));

    const allLogs = [...formattedSyslogs, ...formattedNetworkLogs];
    return allLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [syslogs, networkLogs]);

  const displayedEvents = useMemo(() => {
    if (activeView === 'system') {
      return filteredEvents.filter(e => e.type === 'Syslog');
    }
    if (activeView === 'network') {
      return filteredEvents.filter(e => e.type === 'Network Log');
    }
    return filteredEvents;
  }, [filteredEvents, activeView]);
  const toggleSection = useCallback((sectionId) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  }, []);

  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event);
    setShowEventDetail(true);
  }, []);

  const closeEventDetail = useCallback(() => {
    setShowEventDetail(false);
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_LOG_FILTERS, severity: '', timeRange: 'today' });
  }, []);

  const value = {
    activeView,
    setActiveView,
    layoutView,
    setLayoutView,
    searchQuery,
    setSearchQuery,
    isSidebarOpen,
    setIsSidebarOpen,
    expandedSections,
    toggleSection,
    showFilterSidebar,
    setShowFilterSidebar,
    showWidgetSidebar,
    setShowWidgetSidebar,
    selectedEvent,
    showEventDetail,
    handleEventClick,
    closeEventDetail,
    filters,
    setFilters,
    handleFilterChange,
    handleResetFilters,
    filteredEvents,
    displayedEvents,
    loadSyslogs,
    isLoading,
  };

  return (
    <LogManagementContext.Provider value={value}>{children}</LogManagementContext.Provider>
  );
};
