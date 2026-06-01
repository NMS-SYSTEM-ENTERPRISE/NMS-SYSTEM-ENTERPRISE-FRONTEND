'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import {
  DEFAULT_LOG_EXPANDED_SECTIONS,
  DEFAULT_LOG_FILTERS,
  DEFAULT_LOG_VIEW,
} from '@/utils/constants/log-management';
import { MOCK_LOG_EVENTS } from '@/utils/dummy-data/log-management';

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

  const filteredEvents = useMemo(() => {
    let events = MOCK_LOG_EVENTS;
    const query = searchQuery.toLowerCase();
    if (query) {
      events = events.filter(
        (e) =>
          e.message.toLowerCase().includes(query) ||
          e.source.includes(query) ||
          e.category.toLowerCase().includes(query)
      );
    }
    if (filters.severity) {
      events = events.filter((e) => e.severity === filters.severity);
    }
    return events;
  }, [searchQuery, filters.severity]);

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
  };

  return (
    <LogManagementContext.Provider value={value}>{children}</LogManagementContext.Provider>
  );
};
