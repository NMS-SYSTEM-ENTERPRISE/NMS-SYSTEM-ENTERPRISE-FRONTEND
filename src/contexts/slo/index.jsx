'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getSloPortfolio } from '@/networking/network-monitoring/network-monitoring-apis';
import {
  DEFAULT_SLO_FILTERS,
  DEFAULT_SLO_PAGE_SIZE,
  STATUS_CATEGORY_IDS,
} from '@/utils/constants/slo';

export const SloContext = createContext(null);

const matchesCategory = (slo, activeCategory) => {
  if (activeCategory === 'all') return true;
  if (STATUS_CATEGORY_IDS.includes(activeCategory)) {
    return slo.status === activeCategory;
  }
  return slo.sloType === activeCategory;
};

const matchesFilters = (slo, filters) => {
  if (filters.status && slo.status !== filters.status) return false;
  if (filters.sloType && slo.sloType !== filters.sloType) return false;
  if (filters.frequency && slo.frequency !== filters.frequency) return false;
  const target = parseFloat(String(slo.target).replace('%', ''));
  const violation = parseFloat(String(slo.violation).replace('%', ''));
  if (filters.targetMin && target < Number(filters.targetMin)) return false;
  if (filters.targetMax && target > Number(filters.targetMax)) return false;
  if (filters.violationMin && violation < Number(filters.violationMin)) return false;
  if (filters.violationMax && violation > Number(filters.violationMax)) return false;
  return true;
};

export const SloProvider = ({ children }) => {
  const [slos, setSlos] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [sourceInfo, setSourceInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showActionSidebar, setShowActionSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_SLO_PAGE_SIZE);
  const [filters, setFilters] = useState(DEFAULT_SLO_FILTERS);

  const filteredSLOs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return slos.filter((slo) => {
      const matchesSearch = !query || slo.name.toLowerCase().includes(query);
      return matchesSearch && matchesCategory(slo, activeCategory) && matchesFilters(slo, filters);
    });
  }, [slos, searchQuery, activeCategory, filters]);

  const paginatedSLOs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSLOs.slice(start, start + itemsPerPage);
  }, [filteredSLOs, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, filters, itemsPerPage]);

  const loadSloPortfolio = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await getSloPortfolio();
      setSlos(response.items || []);
      setTimelineData(response.timeline || []);
      setSourceInfo(response.source || {});
    } catch (error) {
      console.error('Failed to load SLO portfolio:', error);
      setSlos([]);
      setTimelineData([]);
      setErrorMessage('Unable to load SLO data from monitoring history right now.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSloPortfolio();
  }, [loadSloPortfolio]);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_SLO_FILTERS);
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
    timelineData,
    sourceInfo,
    filteredSLOs,
    paginatedSLOs,
    totalSLOs: filteredSLOs.length,
    handleResetFilters,
    handleApplyFilters,
    refreshSloPortfolio: loadSloPortfolio,
  };

  return <SloContext.Provider value={value}>{children}</SloContext.Provider>;
};
