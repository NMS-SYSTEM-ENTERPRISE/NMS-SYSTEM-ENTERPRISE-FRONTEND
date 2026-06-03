'use client';

import { createContext, useCallback, useMemo, useState, useEffect } from 'react';
import { DEFAULT_OPEN_SECTIONS } from '@/utils/constants/reports-create-custom';
import { DEFAULT_REPORT_CONFIG } from '@/utils/dummy-data/reports-create-custom';
import { getReportCreateOptions, createCustomReport } from '@/networking/network-monitoring/network-monitoring-apis';

export const ReportsCreateCustomContext = createContext(null);

export const ReportsCreateCustomProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState(null);
  const [openSections, setOpenSections] = useState(DEFAULT_OPEN_SECTIONS);
  const [reportConfig, setReportConfig] = useState(DEFAULT_REPORT_CONFIG);

  const [categories, setCategories] = useState([]);
  const [formOptions, setFormOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const data = await getReportCreateOptions();
        setCategories(data.categories || []);
        if (data.categories?.length > 0 && data.categories[0].types?.length > 0) {
          setSelectedReportType(data.categories[0].types[0]);
        }
        setFormOptions({
          deviceOptions: data.device_options || [],
          groupOptions: data.group_options || [],
          metricOptions: data.metric_options || [],
          timeRangeOptions: data.time_range_options || [],
          outputFormatOptions: data.output_format_options || []
        });
      } catch (err) {
        console.error('Failed to fetch report options:', err);
        setError('Failed to load configuration options.');
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const filteredCategories = useMemo(
    () =>
      categories.filter((category) => category.types && category.types.length > 0),
    [categories]
  );

  const totalTypeCount = useMemo(
    () => filteredCategories.reduce((acc, cat) => acc + (cat.types ? cat.types.length : 0), 0),
    [filteredCategories]
  );

  const toggleSection = useCallback((sectionId) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  }, []);

  const updateReportConfig = useCallback((updates) => {
    setReportConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const value = {
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
    formOptions,
    loading,
    error,
  };

  return (
    <ReportsCreateCustomContext.Provider value={value}>
      {children}
    </ReportsCreateCustomContext.Provider>
  );
};
