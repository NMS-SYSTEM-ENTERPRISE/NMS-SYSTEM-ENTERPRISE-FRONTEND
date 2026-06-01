'use client';

import { createContext, useMemo } from 'react';
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

export const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const value = useMemo(
    () => ({
      performance: {
        cpuGroupData,
        cpuMonitorData,
        memoryGroupData,
        memoryMonitorData,
        droppedPacketsData,
        latencyMonitorData,
      },
      resources: {
        diskUsageData,
        diskSpaceData,
        droppedPacketsData,
        networkPacketsData,
        bytesPerSecData,
        deviceAvailabilityData,
        networkDeviceDowntime,
      },
    }),
    []
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};
