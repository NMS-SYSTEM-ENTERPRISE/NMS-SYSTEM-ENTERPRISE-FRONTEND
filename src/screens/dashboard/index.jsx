'use client';

import { PerformanceAccordion } from '@/components/features/dashboard/performance-accordion';
import { ResourceAccordion } from '@/components/features/dashboard/resource-accordion';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

// Performance Data
import {
  cpuGroupData,
  cpuMonitorData,
  droppedPacketsData,
  latencyMonitorData,
  memoryGroupData,
  memoryMonitorData,
} from '@/utils/dummy-data/dashboard/performance';

// Resources Data
import {
  bytesPerSecData,
  deviceAvailabilityData,
  diskSpaceData,
  diskUsageData,
  networkDeviceDowntime,
  networkPacketsData,
} from '@/utils/dummy-data/dashboard/resources';

const Index = () => {
  const router = useRouter();

  return (
    <div className={styles.dashboard}>
      <main className={styles.dashboard_content}>
        {/* Unified Performance Matrix */}
        <div className={styles.dashboard_performance_wrapper}>
          <PerformanceAccordion
            cpuGroupData={cpuGroupData}
            cpuTopData={cpuMonitorData}
            memoryGroupData={memoryGroupData}
            memoryTopData={memoryMonitorData}
            droppedPacketsData={droppedPacketsData}
            latencyData={latencyMonitorData}
          />
        </div>

        {/* Unified Resource Metrics */}
        <div className={styles.dashboard_performance_wrapper}>
          <ResourceAccordion
            diskUsageData={diskUsageData}
            lowDiskSpaceData={diskSpaceData}
            errorPacketsData={droppedPacketsData}
            networkPacketsData={networkPacketsData}
            networkBytesData={bytesPerSecData}
            deviceAvailabilityData={deviceAvailabilityData}
            deviceDowntimeData={networkDeviceDowntime}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
