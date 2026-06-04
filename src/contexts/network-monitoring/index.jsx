'use client';

import { createContext, useCallback, useMemo, useState, useEffect } from 'react';
import { CATEGORY_CONFIGS } from '@/utils/constants/network-monitoring';
import { getProgressBarColor } from '@/utils/dummy-data/network-monitoring';
import { getAllDevices, getNetworkDashboard } from '@/networking/network-monitoring/network-monitoring-apis';

export const NetworkMonitoringContext = createContext(null);

export const NetworkMonitoringProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState('Network');
  const [viewMode, setViewMode] = useState('details');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [filters, setFilters] = useState({});

  // Real Data State
  const [devicesData, setDevicesData] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const categories = useMemo(() => Object.keys(CATEGORY_CONFIGS), []);
  const currentConfig = CATEGORY_CONFIGS[activeCategory];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [devicesRes, dashboardRes] = await Promise.all([
          getAllDevices(),
          getNetworkDashboard()
        ]);

        // Map backend API data to match frontend component expected props
        const mappedDevices = devicesRes.map(device => {
          const m = device.frontend_data.performance_metrics || {};
          const i = device.frontend_data.identity || {};
          const s = device.frontend_data.system_information || {};

          return {
            id: device.id,
            name: i.name || device.device_ip,
            description: i.description || '',
            ip: device.device_ip,
            status: i.status === 'UP' ? 'Up' : 'Down',
            type: s.device_type,
            category: s.device_category || 'Network',
            uptime: s.uptime_days,
            tags: i.tags || [],
            group: i.group || [],
            cpu: parseFloat(m.cpu_load_percent) || 0,
            memory: parseFloat(m.memory_consumption_percent) || 0,
            bandwidthIn: m.total_bandwidth_in,
            bandwidthOut: m.total_bandwidth_out,
            interfaces: device.frontend_data.interfaces || [],
            upsMetrics: device.frontend_data.ups_metrics || null,
            raw: device
          };
        });

        setDevicesData(mappedDevices);
        setDashboardData(dashboardRes);
      } catch (error) {
        console.error("Failed to fetch network monitoring data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // In a real app, you might want to set up an interval to refresh this data
    const interval = setInterval(fetchData, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  const filteredData = useMemo(() => {
    return devicesData.filter((item) => {
      // 1. Category Filter
      if (item.category !== activeCategory) return false;

      // 2. Search Query
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && !item.ip.includes(searchQuery)) {
        return false;
      }

      // 3. Dynamic Filters
      if (filters) {
        if (filters.status && item.status !== filters.status) return false;

        if (filters.type && item.type !== filters.type) return false;
        if (filters.deviceType && item.type !== filters.deviceType) return false;
        if (filters.provider && item.type !== filters.provider) return false;
        if (filters.region && (!item.tags || !item.tags.includes(filters.region))) return false;

        // Ranges
        if (filters.cpu && Array.isArray(filters.cpu)) {
          const [min, max] = filters.cpu;
          if (item.cpu < min || item.cpu > max) return false;
        }
        if (filters.memory && Array.isArray(filters.memory)) {
          const [min, max] = filters.memory;
          if (item.memory < min || item.memory > max) return false;
        }
        if (filters.disk && Array.isArray(filters.disk)) {
          const [min, max] = filters.disk;
          if (item.disk !== undefined && (item.disk < min || item.disk > max)) return false;
        }
        if (filters.latency && Array.isArray(filters.latency)) {
          const [min, max] = filters.latency;
          // assuming ping is somewhere, if not just skip
          if (item.ping !== undefined && (item.ping < min || item.ping > max)) return false;
        }
      }

      return true;
    });
  }, [devicesData, activeCategory, searchQuery, filters]);

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
    isLoading,
    dashboardData,
    getProgressBarColor,
    handleCloseFilterSidebar,
  };

  return (
    <NetworkMonitoringContext.Provider value={value}>{children}</NetworkMonitoringContext.Provider>
  );
};
