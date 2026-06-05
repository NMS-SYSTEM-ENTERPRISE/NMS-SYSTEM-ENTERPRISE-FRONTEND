'use client';

import { createContext, useCallback, useMemo, useState, useEffect } from 'react';
import {
  DEFAULT_REPORT_FILTERS,
  DEFAULT_REPORT_TAB,
} from '@/utils/constants/reports';
import { getReports, getReportCategories } from '@/networking/network-monitoring/network-monitoring-apis';

export const ReportsContext = createContext(null);

export const ReportsProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(DEFAULT_REPORT_TAB);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set(['1']));
  const [activePopup, setActivePopup] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_REPORT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  // Log Compliance Specific State
  const [selectedComplianceStandard, setSelectedComplianceStandard] = useState(null);
  const [complianceRefFilter, setComplianceRefFilter] = useState('');

  const [reports, setReports] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reports when tab changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [reportsData, categoriesData] = await Promise.all([
          getReports(activeTab),
          getReportCategories(activeTab),
        ]);
        setReports(reportsData.items || []);
        setCategories(categoriesData || []);

        // Reset category selection
        if (activeTab === 'Metric') {
          setSelectedCategory('capacity-planning');
        } else {
          setSelectedCategory('all');
        }
      } catch (err) {
        console.error('Failed to fetch reports or categories:', err);
        setError('Failed to load reports');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  // Reset compliance drilldown state when switching tabs
  useEffect(() => {
    setSelectedComplianceStandard(null);
    setComplianceRefFilter('');
  }, [activeTab]);

  const filteredReports = useMemo(
    () =>
      reports.filter((report) => {
        const matchesSearch = report.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = !filters.type || report.type === filters.type;
        const matchesReportType = !filters.reportType || report.reportType === filters.reportType;
        const matchesSchedule = !filters.schedule || String(report.schedule) === filters.schedule;
        const matchesFavorite = !filters.favorite || report.favorite;

        // Tab-specific filters
        let matchesCategory = true;
        if (selectedCategory === 'favorites') {
          matchesCategory = report.favorite === true;
        } else if (selectedCategory && selectedCategory !== 'all') {
          // Normalize both for flexible matching, e.g. "capacity-planning" vs "Capacity Planning"
          const normalizedCategory = selectedCategory.replace(/-/g, ' ').toLowerCase();
          const normalizedReportType = report.type?.toLowerCase() || '';
          matchesCategory = normalizedReportType === normalizedCategory;
        }

        // Compliance standard filters
        let matchesCompliance = true;
        if (activeTab === 'Log Compliance') {
          if (selectedComplianceStandard) {
            matchesCompliance = report.complianceStandard === selectedComplianceStandard;
            if (complianceRefFilter) {
              matchesCompliance = matchesCompliance && report.complianceRef === complianceRefFilter;
            }
          } else {
            // Tile view of compliance standards, do not show list items
            matchesCompliance = false;
          }
        }

        return matchesSearch && matchesType && matchesReportType && matchesSchedule && matchesFavorite && matchesCategory && matchesCompliance;
      }),
    [searchQuery, reports, filters, selectedCategory, activeTab, selectedComplianceStandard, complianceRefFilter]
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
    reports,
    // Compliance drilldown states
    selectedComplianceStandard,
    setSelectedComplianceStandard,
    complianceRefFilter,
    setComplianceRefFilter,
  };

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>;
};
