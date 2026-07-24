'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import { getSlaReport } from '@/networking/network-monitoring/network-monitoring-apis';
import { DEFAULT_SLA_FILTERS, DEFAULT_SLA_PAGE_SIZE } from '@/utils/constants/sla';

export const SlaContext = createContext(null);

export const SlaProvider = ({ children }) => {
  const [slas, setSlas] = useState([]);
  const [totalDevices, setTotalDevices] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [evaluationWindow, setEvaluationWindow] = useState('');
  const [totalTime, setTotalTime] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showActionSidebar, setShowActionSidebar] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_SLA_PAGE_SIZE);
  const [filters, setFilters] = useState(DEFAULT_SLA_FILTERS);

  // Trigger reload on pagination or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, filters, itemsPerPage]);

  const loadSlaReport = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };

      if (searchQuery) params.search = searchQuery;
      // You can map activeCategory or filters to device_group, device_type here if needed

      const response = await getSlaReport(params);

      setSlas(response.items || []);
      setTotalDevices(response.total_devices || 0);
      setTotalPages(response.total_pages || 0);
      setEvaluationWindow(response.evaluation_window || '');
      setTotalTime(response.total_time || '');

    } catch (error) {
      console.error('Failed to load SLA report:', error);
      setSlas([]);
      setTotalDevices(0);
      setTotalPages(0);
      setErrorMessage('Unable to load SLA data from monitoring history right now.');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, searchQuery, activeCategory, filters]);

  useEffect(() => {
    loadSlaReport();
  }, [loadSlaReport]);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_SLA_FILTERS);
    setSearchQuery('');
  }, []);

  const handleApplyFilters = useCallback((appliedFilters) => {
    setFilters((prev) => ({ ...prev, ...appliedFilters }));
    setShowActionSidebar(false);
  }, []);

  const value = {
    activeCategory,
    setActiveCategory,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    isSidebarOpen,
    setIsSidebarOpen,
    showActionSidebar,
    setShowActionSidebar,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    filters,
    setFilters,
    isLoading,
    errorMessage,
    slas,
    paginatedSLAs: slas, // Since it's server paginated, slas ARE the paginated slas
    filteredSLAs: slas,
    totalSLAs: totalDevices,
    totalPages,
    evaluationWindow,
    totalTime,
    handleResetFilters,
    handleApplyFilters,
    refreshSlaPortfolio: loadSlaReport,
  };

  return <SlaContext.Provider value={value}>{children}</SlaContext.Provider>;
};
