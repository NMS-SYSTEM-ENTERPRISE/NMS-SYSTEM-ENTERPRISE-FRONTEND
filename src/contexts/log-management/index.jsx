'use client';

import { createContext, useCallback, useMemo, useState, useEffect } from 'react';
import {
  DEFAULT_LOG_EXPANDED_SECTIONS,
  DEFAULT_LOG_FILTERS,
  DEFAULT_LOG_VIEW,
} from '@/utils/constants/log-management';
import { fetchSyslogsApi } from '@/networking/network-monitoring/log-management-apis';
import { toast } from 'sonner';

export const LogManagementContext = createContext(null);

export const LogManagementProvider = ({ children }) => {
  const [activeView, setActiveView] = useState(DEFAULT_LOG_VIEW);
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
  const [isLoading, setIsLoading] = useState(false);

  const loadSyslogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchSyslogsApi({
        search: searchQuery || undefined,
        severity: filters.severity || undefined,
        page: 1,
        size: 100,
      });
      const data = response.data || response;
      setSyslogs(data.data || []);
    } catch (error) {
      console.error('Error fetching syslogs:', error);
      toast.error('Failed to load syslogs');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, filters.severity]);

  useEffect(() => {
    loadSyslogs();
  }, [loadSyslogs]);

  const filteredEvents = useMemo(() => {
    // The backend handles filtering by search and severity now.
    // So we just return the syslogs, optionally formatting them for the UI.
    return syslogs.map(log => ({
      id: log.id,
      timestamp: log.timestamp,
      source: log.source_ip,
      category: log.category || 'System',
      severity: log.severity_name?.toLowerCase() || 'info',
      message: log.message,
    }));
  }, [syslogs]);

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
    loadSyslogs,
  };

  return (
    <LogManagementContext.Provider value={value}>{children}</LogManagementContext.Provider>
  );
};
