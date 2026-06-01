'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_SLO_FILTERS,
  DEFAULT_SLO_PAGE_SIZE,
  STATUS_CATEGORY_IDS,
} from '@/utils/constants/slo';
import { MOCK_SLOS } from '@/utils/dummy-data/slo';

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
  return true;
};

export const SloProvider = ({ children }) => {
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
    return MOCK_SLOS.filter((slo) => {
      const matchesSearch = !query || slo.name.toLowerCase().includes(query);
      return matchesSearch && matchesCategory(slo, activeCategory) && matchesFilters(slo, filters);
    });
  }, [searchQuery, activeCategory, filters]);

  const paginatedSLOs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSLOs.slice(start, start + itemsPerPage);
  }, [filteredSLOs, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, filters, itemsPerPage]);

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
    filteredSLOs,
    paginatedSLOs,
    totalSLOs: filteredSLOs.length,
    handleResetFilters,
    handleApplyFilters,
  };

  return <SloContext.Provider value={value}>{children}</SloContext.Provider>;
};
