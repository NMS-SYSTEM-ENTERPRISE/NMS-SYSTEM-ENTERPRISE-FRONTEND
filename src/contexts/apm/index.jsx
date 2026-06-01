'use client';
import { APM_SERVICES, TRACE_DATA } from '@/utils/dummy-data/apm';
import { createContext, useCallback, useMemo, useState } from 'react';

export const ApmContext = createContext(null);

export const ApmProvider = ({ children }) => {
  const [activeView, setActiveView] = useState('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    language: '',
    type: '',
  });

  const filteredServices = useMemo(() => {
    return APM_SERVICES.filter((service) => {
      const matchesSearch = service.name
        .toLowerCase()
        .includes((filters.search || searchQuery).toLowerCase());
      const matchesStatus =
        !filters.status || service.status === filters.status;
      const matchesLanguage =
        !filters.language || service.language === filters.language;
      const matchesType = !filters.type || service.type === filters.type;
      return matchesSearch && matchesStatus && matchesLanguage && matchesType;
    });
  }, [filters, searchQuery]);

  const filteredTraces = useMemo(() => {
    return TRACE_DATA.filter(
      (trace) =>
        trace.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trace.resource.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleResetFilters = useCallback(() => {
    setFilters({
      search: '',
      status: '',
      language: '',
      type: '',
    });
    setSearchQuery('');
  }, []);

  const value = {
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    showFilterSidebar,
    setShowFilterSidebar,
    isSidebarOpen,
    setIsSidebarOpen,
    filters,
    setFilters,
    filteredServices,
    filteredTraces,
    handleResetFilters,
  };

  return <ApmContext.Provider value={value}>{children}</ApmContext.Provider>;
};
