'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import { CREATE_REPORT_CATEGORIES, DEFAULT_OPEN_SECTIONS } from '@/utils/constants/reports-create-custom';
import { DEFAULT_REPORT_CONFIG } from '@/utils/dummy-data/reports-create-custom';

const firstReportType = CREATE_REPORT_CATEGORIES[0]?.types[0] || null;

export const ReportsCreateCustomContext = createContext(null);

export const ReportsCreateCustomProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState(firstReportType);
  const [openSections, setOpenSections] = useState(DEFAULT_OPEN_SECTIONS);
  const [reportConfig, setReportConfig] = useState(DEFAULT_REPORT_CONFIG);

  const filteredCategories = useMemo(
    () =>
      CREATE_REPORT_CATEGORIES.map((category) => ({
        ...category,
        types: category.types.filter((type) =>
          type.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((category) => category.types.length > 0),
    [searchQuery]
  );

  const totalTypeCount = useMemo(
    () => filteredCategories.reduce((acc, cat) => acc + cat.types.length, 0),
    [filteredCategories]
  );

  const toggleSection = useCallback((sectionId) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  }, []);

  const updateReportConfig = useCallback((updates) => {
    setReportConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const value = {
    searchQuery,
    setSearchQuery,
    isSidebarOpen,
    setIsSidebarOpen,
    selectedReportType,
    setSelectedReportType,
    openSections,
    toggleSection,
    reportConfig,
    updateReportConfig,
    filteredCategories,
    totalTypeCount,
  };

  return (
    <ReportsCreateCustomContext.Provider value={value}>
      {children}
    </ReportsCreateCustomContext.Provider>
  );
};
