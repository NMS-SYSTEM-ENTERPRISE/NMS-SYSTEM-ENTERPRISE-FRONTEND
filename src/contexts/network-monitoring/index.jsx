'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { CATEGORY_CONFIGS } from '@/utils/constants/network-monitoring';
import { generateMockData, getProgressBarColor } from '@/utils/dummy-data/network-monitoring';

export const NetworkMonitoringContext = createContext(null);

export const NetworkMonitoringProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState('Server & Apps');
  const [viewMode, setViewMode] = useState('details');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [filters, setFilters] = useState({});

  const categories = useMemo(() => Object.keys(CATEGORY_CONFIGS), []);
  const currentConfig = CATEGORY_CONFIGS[activeCategory];
  const mockData = useMemo(() => generateMockData(activeCategory), [activeCategory]);

  const filteredData = useMemo(
    () =>
      mockData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [mockData, searchQuery]
  );

  const handleCloseFilterSidebar = useCallback(() => {
    setShowFilterSidebar(false);
  }, []);

  const value = {
    activeCategory,
    setActiveCategory,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    showFilterSidebar,
    setShowFilterSidebar,
    isCollapsed,
    setIsCollapsed,
    filters,
    setFilters,
    categories,
    currentConfig,
    filteredData,
    getProgressBarColor,
    handleCloseFilterSidebar,
  };

  return (
    <NetworkMonitoringContext.Provider value={value}>{children}</NetworkMonitoringContext.Provider>
  );
};
