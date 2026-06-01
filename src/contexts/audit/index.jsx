'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import {
  DEFAULT_AUDIT_EXPANDED_SECTIONS,
  DEFAULT_AUDIT_FILTERS,
  DEFAULT_AUDIT_VIEW,
} from '@/utils/constants/audit';
import { MOCK_AUDIT_EVENTS } from '@/utils/dummy-data/audit';

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

  const filteredEvents = useMemo(() => {
    let events = MOCK_AUDIT_EVENTS;
    const query = searchQuery.toLowerCase();
    if (query) {
      events = events.filter(
        (e) =>
          e.message.toLowerCase().includes(query) ||
          e.user.toLowerCase().includes(query) ||
          e.module.toLowerCase().includes(query)
      );
    }
    if (filters.module) {
      events = events.filter((e) => e.module === filters.module);
    }
    if (filters.status && filters.status !== 'All') {
      events = events.filter((e) => e.status === filters.status);
    }
    return events;
  }, [searchQuery, filters.module, filters.status]);

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
    console.log('Applied filters:', appliedFilters);
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
    auditEvents: MOCK_AUDIT_EVENTS,
  };

  return <AuditContext.Provider value={value}>{children}</AuditContext.Provider>;
};
