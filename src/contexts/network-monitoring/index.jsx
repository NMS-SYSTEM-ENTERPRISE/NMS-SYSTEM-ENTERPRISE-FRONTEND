'use client';

import { createContext, useCallback, useMemo, useState, useEffect } from 'react';
import { CATEGORY_CONFIGS } from '@/utils/constants/network-monitoring';
import { getProgressBarColor } from '@/utils/dummy-data/network-monitoring';
import { getAllDevices, getNetworkDashboard } from '@/networking/network-monitoring/network-monitoring-apis';

export const NetworkMonitoringContext = createContext(null);

export const NetworkMonitoringProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState('Network');
  const [activeGroup, setActiveGroup] = useState(null);
  const [availableGroups, setAvailableGroups] = useState({
    Network: ['Network Switch', 'core switch'],
    UPS: ['UPS-Group']
  });
  const [viewMode, setViewMode] = useState('details');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [filters, setFilters] = useState({});

  // Real Data State
  const [devicesData, setDevicesData] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [groupCounts, setGroupCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [metadata, setMetadata] = useState(null);

  const categories = useMemo(() => Object.keys(CATEGORY_CONFIGS), []);
  const currentConfig = CATEGORY_CONFIGS[activeCategory];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params = {
          category: activeCategory,
          device_group: activeGroup || undefined,
          search: searchQuery || filters?.search || undefined,
          status: filters?.status || undefined,
          paginated: true,
          limit: filters?.limit ? parseInt(filters.limit, 10) : 100,
          skip: filters?.skip ? parseInt(filters.skip, 10) : 0,
          start_date: filters?.start_date || undefined,
          end_date: filters?.end_date || undefined,
          multiple_dates: filters?.multiple_dates || undefined,
          quick_select: filters?.quick_select || undefined,
          start_time: filters?.start_time || undefined,
          end_time: filters?.end_time || undefined,
        };

        const [devicesRes, dashboardRes] = await Promise.all([
          getAllDevices(params),
          getNetworkDashboard()
        ]);

        const rawDevices = Array.isArray(devicesRes) ? devicesRes : (devicesRes.items || devicesRes.data || []);
        if (devicesRes && !Array.isArray(devicesRes)) {
          setMetadata({
            total: devicesRes.total,
            pages: devicesRes.pages,
            current_page: devicesRes.current_page
          });
        }

        // Map backend API data to match frontend component expected props
        const mappedDevices = rawDevices.map(device => {
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
            latency: i.latency_ms,
            tags: i.tags || [],
            group: i.group || (s.device_group ? [s.device_group] : [s.device_type].filter(Boolean)),
            cpu: parseFloat(m.cpu_load_percent) || 0,
            memory: parseFloat(m.memory_consumption_percent) || 0,
            bandwidthIn: m.total_bandwidth_in,
            bandwidthOut: m.total_bandwidth_out,
            interfaces: device.frontend_data.interfaces || [],
            upsMetrics: device.frontend_data.ups_metrics || null,
            cctvMetrics: device.frontend_data.cctv_metrics || null,
            raw: device
          };
        });

        // Extract available groups if activeGroup is not set (so we have all groups for the category)
        if (!activeGroup) {
          if (devicesRes.stats && devicesRes.stats.by_device_group) {
            const uniqueGroups = new Set();
            const counts = {};
            devicesRes.stats.by_device_group.forEach(g => {
              if (g.device_group) {
                uniqueGroups.add(g.device_group);
                counts[g.device_group] = g.total;
              }
            });
            setAvailableGroups(prev => ({
              ...prev,
              [activeCategory]: Array.from(uniqueGroups).filter(Boolean)
            }));
            setGroupCounts(counts);
          } else {
            // Fallback to manual extraction from current page if stats are missing
            const uniqueGroups = new Set();
            const counts = {};
            mappedDevices.forEach(d => {
              if (d.group && Array.isArray(d.group)) {
                d.group.forEach(g => {
                  if (g) {
                    uniqueGroups.add(g);
                    counts[g] = (counts[g] || 0) + 1;
                  }
                });
              } else if (d.type) {
                uniqueGroups.add(d.type);
                counts[d.type] = (counts[d.type] || 0) + 1;
              }
            });
            setAvailableGroups(prev => ({
              ...prev,
              [activeCategory]: Array.from(uniqueGroups).filter(Boolean)
            }));
            setGroupCounts(counts);
          }
        }

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
  }, [activeCategory, activeGroup, searchQuery, filters]);

  const filteredData = useMemo(() => {
    return devicesData;
  }, [devicesData]);

  const handleCloseFilterSidebar = useCallback(() => {
    setShowFilterSidebar(false);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({});
    setSearchQuery('');
    setActiveGroup(null);
  }, []);

  const handleCategoryChange = useCallback((newCategory) => {
    setActiveCategory(newCategory);
    setActiveGroup(null);
    setSearchQuery('');
    setFilters(prev => ({ ...prev, search: undefined, skip: 0 }));
  }, []);

  const handleGroupChange = useCallback((newGroup) => {
    setActiveGroup(newGroup);
    setSearchQuery('');
    setFilters(prev => ({ ...prev, search: undefined, skip: 0 }));
  }, []);

  const dynamicMetadata = useMemo(() => {
    if (!metadata) return null;
    if (activeGroup && filteredData.length !== devicesData.length) {
      return {
        ...metadata,
        total: filteredData.length,
        pages: 1
      };
    }
    return metadata;
  }, [metadata, activeGroup, filteredData, devicesData]);

  const value = {
    activeCategory,
    setActiveCategory: handleCategoryChange,
    activeGroup,
    setActiveGroup: handleGroupChange,
    availableGroups,
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
    metadata: dynamicMetadata,
    isLoading,
    dashboardData,
    groupCounts,
    getProgressBarColor,
    handleCloseFilterSidebar,
    handleResetFilters,
  };

  return (
    <NetworkMonitoringContext.Provider value={value}>{children}</NetworkMonitoringContext.Provider>
  );
};
