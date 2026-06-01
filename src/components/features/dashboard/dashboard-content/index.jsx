'use client';

import { PerformanceAccordion } from '@/components/features/dashboard/performance-accordion';
import { ResourceAccordion } from '@/components/features/dashboard/resource-accordion';
import sharedStyles from '@/components/features/dashboard/shared/styles.module.css';
import { useDashboard } from '@/hooks/dashboard';

export const DashboardContent = () => {
  const { performance, resources } = useDashboard();

  return (
    <div className={sharedStyles.dashboard}>
      <main className={sharedStyles.dashboardContent}>
        <div className={sharedStyles.dashboardSection}>
          <PerformanceAccordion
            cpuGroupData={performance.cpuGroupData}
            cpuTopData={performance.cpuMonitorData}
            memoryGroupData={performance.memoryGroupData}
            memoryTopData={performance.memoryMonitorData}
            droppedPacketsData={performance.droppedPacketsData}
            latencyData={performance.latencyMonitorData}
          />
        </div>

        <div className={sharedStyles.dashboardSection}>
          <ResourceAccordion
            diskUsageData={resources.diskUsageData}
            lowDiskSpaceData={resources.diskSpaceData}
            errorPacketsData={resources.droppedPacketsData}
            networkPacketsData={resources.networkPacketsData}
            networkBytesData={resources.bytesPerSecData}
            deviceAvailabilityData={resources.deviceAvailabilityData}
            deviceDowntimeData={resources.networkDeviceDowntime}
          />
        </div>
      </main>
    </div>
  );
};
