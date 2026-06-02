'use client';

import { createContext, useEffect, useMemo, useState } from 'react';
import {
  cpuGroupData,
  cpuMonitorData,
  droppedPacketsData,
  latencyMonitorData,
  memoryGroupData,
  memoryMonitorData,
} from '@/utils/dummy-data/dashboard/performance';
import {
  bytesPerSecData,
  deviceAvailabilityData,
  diskSpaceData,
  diskUsageData,
  networkDeviceDowntime,
  networkPacketsData,
} from '@/utils/dummy-data/dashboard/resources';
import { getMainDashboard, mapDashboardResponse } from '@/networking/dashboard/dashboard-apis';

export const DashboardContext = createContext(null);

const fallbackValue = {
  statistics: { total: 0, online: 0, offline: 0 },
  performance: {
    cpuGroupData,
    cpuMonitorData,
    memoryGroupData,
    memoryMonitorData,
    droppedPacketsData,
    latencyMonitorData,
    badges: {
      cpu_peak: '82% Peak',
      memory_status: 'Healthy',
      network_alerts: 0,
    },
  },
  resources: {
    diskUsageData,
    diskSpaceData,
    droppedPacketsData,
    networkPacketsData,
    bytesPerSecData,
    deviceAvailabilityData,
    networkDeviceDowntime,
    badges: {
      storage_alerts: 0,
      network_load: 'Normal',
      health_status: 'Healthy',
    },
  },
};

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(fallbackValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      try {
        const response = await getMainDashboard();
        setDashboardData(mapDashboardResponse(response));
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError(err);
        setDashboardData(fallbackValue);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
    const interval = setInterval(fetchDashboard, 60000);
    return () => clearInterval(interval);
  }, []);

  const value = useMemo(
    () => ({
      ...dashboardData,
      isLoading,
      error,
    }),
    [dashboardData, isLoading, error]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};
