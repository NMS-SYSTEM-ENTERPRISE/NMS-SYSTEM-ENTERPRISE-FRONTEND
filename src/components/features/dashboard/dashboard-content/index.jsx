'use client';

import { DeviceStatsBar } from '@/components/features/dashboard/device-stats-bar';
import { PerformanceAccordion } from '@/components/features/dashboard/performance-accordion';
import { ResourceAccordion } from '@/components/features/dashboard/resource-accordion';
import sharedStyles from '@/components/features/dashboard/shared/styles.module.css';
import { useDashboard } from '@/hooks/dashboard';
import { DashboardSkeleton } from '@/components/ui/skeleton-loaders/dashboard-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

export const DashboardContent = () => {
  const { statistics, performance, resources, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className={sharedStyles.dashboard}>
        <main className={sharedStyles.dashboardContent}>
          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  const hasData = statistics && Object.keys(statistics).length > 0;

  if (!hasData) {
    return (
      <div className={sharedStyles.dashboard}>
        <main className={sharedStyles.dashboardContent}>
          <NoDataFound 
            title="Dashboard Data Unavailable" 
            description="There are currently no network metrics or statistics to display." 
            icon="lucide:layout-dashboard" 
          />
        </main>
      </div>
    );
  }

  return (
    <div className={sharedStyles.dashboard}>
      <main className={sharedStyles.dashboardContent}>
        <div className={sharedStyles.dashboardSection}>
          <DeviceStatsBar statistics={statistics} />
        </div>

        <div className={sharedStyles.dashboardSection}>
          <PerformanceAccordion
            cpuGroupData={performance.cpuGroupData}
            cpuTopData={performance.cpuMonitorData}
            memoryGroupData={performance.memoryGroupData}
            memoryTopData={performance.memoryMonitorData}
            droppedPacketsData={performance.droppedPacketsData}
            latencyData={performance.latencyMonitorData}
            badges={performance.badges}
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
            badges={resources.badges}
          />
        </div>
      </main>
    </div>
  );
};
