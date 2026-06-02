import { authApi } from '@/services/axios';
import {
  cpuGroupData as dummyCpuGroup,
  cpuMonitorData as dummyCpuMonitor,
  memoryGroupData as dummyMemoryGroup,
  memoryMonitorData as dummyMemoryMonitor,
  droppedPacketsData as dummyDroppedPackets,
  latencyMonitorData as dummyLatencyMonitor,
} from '@/utils/dummy-data/dashboard/performance';
import {
  diskUsageData as dummyDiskUsage,
  diskSpaceData as dummyDiskSpace,
  networkPacketsData as dummyNetworkPackets,
  bytesPerSecData as dummyBytesPerSec,
  networkDeviceDowntime as dummyDowntime,
} from '@/utils/dummy-data/dashboard/resources';

const BASE_URL = '/dashboard';

export const getMainDashboard = async (hours = 24) => {
  const response = await authApi.get(BASE_URL, { params: { hours } });
  return response.data;
};

const mapMonitorItems = (items = []) =>
  items.map((item) => ({
    monitor: item.monitor,
    value: item.value,
    packets: item.packets,
    interface: item.interface,
    sparkline: item.sparkline || [],
    color: item.color,
  }));

const mapNamedItems = (items = []) =>
  items.map((item) => ({
    name: item.name,
    value: item.value,
    color: item.color,
  }));

export const mapDashboardResponse = (data) => ({
  statistics: {
    total: data.statistics?.total ?? 0,
    online: data.statistics?.online ?? 0,
    offline: data.statistics?.offline ?? 0,
  },
  performance: {
    cpuGroupData: data.performance?.cpu_group_data?.length ? data.performance.cpu_group_data : dummyCpuGroup,
    cpuMonitorData: data.performance?.cpu_monitor_data?.length ? mapMonitorItems(data.performance.cpu_monitor_data) : dummyCpuMonitor,
    memoryGroupData: data.performance?.memory_group_data?.length ? data.performance.memory_group_data : dummyMemoryGroup,
    memoryMonitorData: data.performance?.memory_monitor_data?.length ? mapMonitorItems(data.performance.memory_monitor_data) : dummyMemoryMonitor,
    droppedPacketsData: data.performance?.dropped_packets_data?.length ? mapMonitorItems(data.performance.dropped_packets_data) : dummyDroppedPackets,
    latencyMonitorData: data.performance?.latency_monitor_data?.length ? mapMonitorItems(data.performance.latency_monitor_data) : dummyLatencyMonitor,
    badges: data.performance?.badges || {},
  },
  resources: {
    diskUsageData: data.resources?.disk_usage_data?.length ? mapNamedItems(data.resources.disk_usage_data) : dummyDiskUsage,
    diskSpaceData: data.resources?.disk_space_data?.length ? mapNamedItems(data.resources.disk_space_data) : dummyDiskSpace,
    droppedPacketsData: data.resources?.error_packets_data?.length ? mapMonitorItems(data.resources.error_packets_data) : dummyDroppedPackets,
    networkPacketsData: data.resources?.network_packets_data?.length ? mapMonitorItems(data.resources.network_packets_data) : dummyNetworkPackets,
    bytesPerSecData: data.resources?.bytes_per_sec_data?.length ? mapMonitorItems(data.resources.bytes_per_sec_data) : dummyBytesPerSec,
    deviceAvailabilityData: (data.resources?.device_availability_data || []).map((item) => ({
      monitor: item.monitor,
      value: item.value,
      color: item.color,
    })),
    networkDeviceDowntime: data.resources?.network_device_downtime?.length
      ? data.resources.network_device_downtime.map((item) => ({
        monitor: item.monitor,
        downtime: item.downtime,
        value: item.downtime,
        sparkline: item.sparkline || [],
        color: item.color,
      }))
      : dummyDowntime,
    badges: data.resources?.badges || {},
  },
});
