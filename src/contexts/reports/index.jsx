'use client';

import { createContext, useCallback, useMemo, useState, useEffect } from 'react';
import {
  DEFAULT_REPORT_CATEGORY,
  DEFAULT_REPORT_FILTERS,
  DEFAULT_REPORT_TAB,
} from '@/utils/constants/reports';
import { getReports, getReportCategories } from '@/networking/network-monitoring/network-monitoring-apis';

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
  
  const [reports, setReports] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [reportsData, categoriesData] = await Promise.all([
          getReports(),
          getReportCategories(),
        ]);
        setReports(reportsData.items || []);
        setCategories(categoriesData || []);
      } catch (err) {
        console.error('Failed to fetch reports or categories:', err);
        setError('Failed to load reports');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredReports = useMemo(
    () =>
      reports.filter((report) => {
        const matchesSearch = report.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = !filters.type || report.type === filters.type;
        const matchesReportType = !filters.reportType || report.reportType === filters.reportType;
        const matchesSchedule = !filters.schedule || String(report.schedule) === filters.schedule;
        const matchesFavorite = !filters.favorite || report.favorite;

        return matchesSearch && matchesType && matchesReportType && matchesSchedule && matchesFavorite;
      }),
    [searchQuery, reports, filters]
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
    // Create a dummy CSV file download
    const reportData = `Report ID,${reportId}\nStatus,Generated\nDate,${new Date().toISOString()}`;
    const blob = new Blob([reportData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${reportId}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleApplyFilters = useCallback((appliedFilters) => {
    setSearchQuery(appliedFilters.search || '');
    setFilters({
      search: appliedFilters.search || '',
      type: appliedFilters.type || '',
      reportType: appliedFilters.reportType || '',
      schedule: appliedFilters.schedule || '',
      favorite: appliedFilters.favorite || false,
    });
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
    loading,
    error,
    categories,
  };

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>;
};
