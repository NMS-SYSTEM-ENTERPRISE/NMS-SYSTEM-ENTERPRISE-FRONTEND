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

  const filteredData = useMemo(
    () =>
      devicesData.filter((item) =>
        item.category === activeCategory &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [devicesData, activeCategory, searchQuery]
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
    isLoading,
    dashboardData,
    getProgressBarColor,
    handleCloseFilterSidebar,
  };

  return (
    <NetworkMonitoringContext.Provider value={value}>{children}</NetworkMonitoringContext.Provider>
  );
};
