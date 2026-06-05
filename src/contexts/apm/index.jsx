'use client';
import { createContext, useCallback, useMemo, useState, useEffect } from 'react';
import { getApmServices, getApmTraces, getApmAnalytics } from '@/networking/apm/apm-apis';

export const ApmContext = createContext(null);

export const ApmProvider = ({ children }) => {
  const [activeView, setActiveView] = useState('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Real Data State
  const [servicesData, setServicesData] = useState([]);
  const [tracesData, setTracesData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    language: '',
    type: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const results = await Promise.allSettled([
          getApmServices(),
          getApmTraces(),
          getApmAnalytics()
        ]);

        if (results[0].status === 'fulfilled') setServicesData(results[0].value || []);
        else console.error("Failed to fetch services:", results[0].reason);

        if (results[1].status === 'fulfilled') setTracesData(results[1].value || []);
        else console.error("Failed to fetch traces:", results[1].reason);

        if (results[2].status === 'fulfilled') setAnalyticsData(results[2].value || null);
        else console.error("Failed to fetch analytics:", results[2].reason);

      } catch (error) {
        console.error("Critical failure during APM fetch:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
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
  }, [servicesData, filters, searchQuery]);

  const filteredTraces = useMemo(() => {
    return tracesData.filter(
      (trace) =>
        (trace.serviceName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (trace.resource || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tracesData, searchQuery]);

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
    analyticsData,
    isLoading,
    handleResetFilters,
  };

  return <ApmContext.Provider value={value}>{children}</ApmContext.Provider>;
};
