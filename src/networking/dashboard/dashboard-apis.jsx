import { authApi } from '@/services/axios';

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
    cpuGroupData: data.performance?.cpu_group_data || [],
    cpuMonitorData: mapMonitorItems(data.performance?.cpu_monitor_data),
    memoryGroupData: data.performance?.memory_group_data || [],
    memoryMonitorData: mapMonitorItems(data.performance?.memory_monitor_data),
    droppedPacketsData: mapMonitorItems(data.performance?.dropped_packets_data),
    latencyMonitorData: mapMonitorItems(data.performance?.latency_monitor_data),
    badges: data.performance?.badges || {},
  },
  resources: {
    diskUsageData: mapNamedItems(data.resources?.disk_usage_data),
    diskSpaceData: mapNamedItems(data.resources?.disk_space_data),
    droppedPacketsData: mapMonitorItems(data.resources?.error_packets_data),
    networkPacketsData: mapMonitorItems(data.resources?.network_packets_data),
    bytesPerSecData: mapMonitorItems(data.resources?.bytes_per_sec_data),
    deviceAvailabilityData: (data.resources?.device_availability_data || []).map((item) => ({
      monitor: item.monitor,
      value: item.value,
      color: item.color,
    })),
    networkDeviceDowntime: (data.resources?.network_device_downtime || []).map((item) => ({
      monitor: item.monitor,
      downtime: item.downtime,
      value: item.downtime,
      sparkline: item.sparkline || [],
      color: item.color,
    })),
    badges: data.resources?.badges || {},
  },
});
