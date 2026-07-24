'use client';
import { createContext, useCallback, useMemo, useState, useEffect } from 'react';
import { getApmServices, getApmTraces, getApmAnalytics, getApmFilterOptions } from '@/networking/apm/apm-apis';

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
  const [filterOptions, setFilterOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total_pages: 1,
    total_count: 0,
  });

  const [filters, setFilters] = useState({
    search: '',
    status_filter: '',
    service: '',
    status_code: '',
    user: '',
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const opts = await getApmFilterOptions();
        setFilterOptions(opts);
      } catch (e) {
        console.error("Failed to fetch filter options:", e);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const serviceParams = {};
        if (filters.status_filter) serviceParams.status_filter = filters.status_filter;

        const traceParams = {
          page: pagination.page,
          limit: pagination.limit,
        };
        if (filters.service) traceParams.service = filters.service;
        if (filters.status_code) traceParams.status_code = filters.status_code;
        if (filters.user) traceParams.user = filters.user;
        if (filters.start_date) traceParams.start_date = filters.start_date;
        if (filters.end_date) traceParams.end_date = filters.end_date;

        const analyticsParams = {};
        if (filters.start_date) analyticsParams.start_date = filters.start_date;
        if (filters.end_date) analyticsParams.end_date = filters.end_date;

        const results = await Promise.allSettled([
          getApmServices(serviceParams),
          getApmTraces(traceParams),
          getApmAnalytics(analyticsParams)
        ]);

        const getArray = (res, key) => {
          if (Array.isArray(res)) return res;
          if (res?.[key] && Array.isArray(res[key])) return res[key];
          if (res?.data && Array.isArray(res.data)) return res.data;
          if (res?.items && Array.isArray(res.items)) return res.items;
          return [];
        };

        if (results[0].status === 'fulfilled') setServicesData(getArray(results[0].value, 'services'));
        else console.error("Failed to fetch services:", results[0].reason);

        if (results[1].status === 'fulfilled') {
          setTracesData(getArray(results[1].value, 'traces'));
          if (results[1].value?.pagination) {
            setPagination((prev) => ({
              ...prev,
              ...results[1].value.pagination
            }));
          }
        }
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
  }, [filters, pagination.page, pagination.limit]);

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      if (!searchQuery && !filters.search) return true;
      const q = (filters.search || searchQuery).toLowerCase();
      return (service.name || '').toLowerCase().includes(q) ||
        (service.framework || '').toLowerCase().includes(q);
    });
  }, [servicesData, filters.search, searchQuery]);

  const filteredTraces = useMemo(() => {
    return tracesData.filter(
      (trace) =>
        (trace.service || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (trace.endpoint || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tracesData, searchQuery]);

  const handleResetFilters = useCallback(() => {
    setFilters({
      search: '',
      status_filter: '',
      service: '',
      status_code: '',
      user: '',
      start_date: '',
      end_date: '',
    });
    setSearchQuery('');
    setPagination(prev => ({ ...prev, page: 1 }));
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
    filterOptions,
    pagination,
    setPagination,
    isLoading,
    handleResetFilters,
  };

  return <ApmContext.Provider value={value}>{children}</ApmContext.Provider>;
};
