'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import {
  DEFAULT_REPORT_CATEGORY,
  DEFAULT_REPORT_FILTERS,
  DEFAULT_REPORT_TAB,
} from '@/utils/constants/reports';
import { MOCK_REPORTS } from '@/utils/dummy-data/reports';

export const ReportsContext = createContext(null);

export const ReportsProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(DEFAULT_REPORT_TAB);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_REPORT_CATEGORY);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set(['1']));
  const [activePopup, setActivePopup] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_REPORT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const filteredReports = useMemo(
    () =>
      MOCK_REPORTS.filter((report) =>
        report.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const toggleRow = useCallback((id) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleToggleFavorite = useCallback((reportId) => {
    console.log('Toggle favorite:', reportId);
  }, []);

  const handleToggleSchedule = useCallback((reportId) => {
    console.log('Toggle schedule:', reportId);
  }, []);

  const handleDownload = useCallback((reportId) => {
    console.log('Download report:', reportId);
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleApplyFilters = useCallback((appliedFilters) => {
    setSearchQuery(appliedFilters.search || '');
    console.log('Applied filters:', appliedFilters);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_REPORT_FILTERS);
    setSearchQuery('');
  }, []);

  const value = {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    showFilterSidebar,
    setShowFilterSidebar,
    isSidebarOpen,
    setIsSidebarOpen,
    expandedRows,
    toggleRow,
    activePopup,
    setActivePopup,
    filters,
    handleFilterChange,
    handleApplyFilters,
    handleResetFilters,
    filteredReports,
    handleToggleFavorite,
    handleToggleSchedule,
    handleDownload,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  };

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>;
};
