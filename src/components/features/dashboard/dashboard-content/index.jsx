'use client';

import { DeviceStatsBar } from '@/components/features/dashboard/device-stats-bar';
import { PerformanceAccordion } from '@/components/features/dashboard/performance-accordion';
import { ResourceAccordion } from '@/components/features/dashboard/resource-accordion';
import sharedStyles from '@/components/features/dashboard/shared/styles.module.css';
import { useDashboard } from '@/hooks/dashboard';
import { Loader } from '@/components/ui/loader';
import { NoDataFound } from '@/components/ui/no-data-found';

export const DashboardContent = () => {
  const { statistics, performance, resources, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className={sharedStyles.dashboard}>
        <main className={sharedStyles.dashboardContent}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '400px' }}>
            <Loader show={true} message="Loading dashboard metrics..." fullScreen={false} />
          </div>
        </main>
      </div>
    );
  }

  const hasData = statistics || performance || resources;

  if (!hasData) {
    return (
      <div className={sharedStyles.dashboard}>
        <main className={sharedStyles.dashboardContent}>
          <NoDataFound 
            title="No Dashboard Data" 
            message="We couldn't retrieve any metrics or statistics for the dashboard at this time." 
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
            cpuGroupData={performance?.cpuGroupData}
            cpuTopData={performance?.cpuMonitorData}
            memoryGroupData={performance?.memoryGroupData}
            memoryTopData={performance?.memoryMonitorData}
            droppedPacketsData={performance?.droppedPacketsData}
            latencyData={performance?.latencyMonitorData}
            badges={performance?.badges}
          />
        </div>

        <div className={sharedStyles.dashboardSection}>
          <ResourceAccordion
            diskUsageData={resources?.diskUsageData}
            lowDiskSpaceData={resources?.diskSpaceData}
            errorPacketsData={resources?.droppedPacketsData}
            networkPacketsData={resources?.networkPacketsData}
            networkBytesData={resources?.bytesPerSecData}
            deviceAvailabilityData={resources?.deviceAvailabilityData}
            deviceDowntimeData={resources?.networkDeviceDowntime}
            badges={resources?.badges}
          />
        </div>
      </main>
    </div>
  );
};
