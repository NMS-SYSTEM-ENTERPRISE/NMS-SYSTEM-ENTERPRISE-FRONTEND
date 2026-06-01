export const TIME_RANGE_OPTIONS = [
  { value: 'last-24-hours', label: 'Last 24 Hours' },
  { value: 'last-7-days', label: 'Last 7 Days' },
  { value: 'last-30-days', label: 'Last 30 Days' },
  { value: 'last-quarter', label: 'Last Quarter' },
  { value: 'custom', label: 'Custom Range' },
];

export const DEVICE_OPTIONS = [
  { value: 'all', label: 'All Devices' },
  { value: 'device1', label: 'Server-01' },
  { value: 'device2', label: 'Switch-01' },
  { value: 'device3', label: 'Router-01' },
];

export const GROUP_OPTIONS = [
  { value: 'network', label: 'Network' },
  { value: 'server', label: 'Server' },
  { value: 'production', label: 'Production' },
  { value: 'staging', label: 'Staging' },
];

export const METRIC_OPTIONS = [
  { value: 'cpu', label: 'CPU Usage' },
  { value: 'memory', label: 'Memory Usage' },
  { value: 'disk', label: 'Disk Usage' },
  { value: 'network', label: 'Network Traffic' },
  { value: 'uptime', label: 'Uptime' },
];

export const OUTPUT_FORMAT_OPTIONS = [
  { value: 'pdf', label: 'PDF' },
  { value: 'csv', label: 'CSV' },
  { value: 'xlsx', label: 'Excel (XLSX)' },
  { value: 'html', label: 'HTML' },
];
