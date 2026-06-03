export const REPORT_TABS = ['Metric'];

export const REPORT_CATEGORIES = [
  { id: 'favorites', label: 'Favorites', icon: 'mdi:star' },
  { id: 'all', label: 'All Reports', icon: 'mdi:file-document-multiple' },
  { id: 'flow', label: 'Flow Reports', icon: 'mdi:chart-timeline-variant' },
  { id: 'performance', label: 'Performance', icon: 'mdi:speedometer' },
  { id: 'log-events', label: 'Log Events', icon: 'mdi:text-box-multiple' },
  { id: 'inventory', label: 'Inventory', icon: 'mdi:database' },
  { id: 'wireless', label: 'Wireless', icon: 'mdi:wifi' },
  { id: 'availability', label: 'Availability', icon: 'mdi:check-circle' },
  { id: 'virtualization', label: 'Virtualization', icon: 'mdi:cloud-outline' },
  { id: 'alert', label: 'Alert', icon: 'mdi:bell-alert' },
  { id: 'capacity-planning', label: 'Capacity Planning', icon: 'mdi:chart-box', active: true },
  { id: 'network', label: 'Network', icon: 'mdi:lan' },
  { id: 'server', label: 'Server', icon: 'mdi:server' },
  { id: 'process', label: 'Process', icon: 'mdi:cog' },
  { id: 'sdn', label: 'SDN', icon: 'mdi:network' },
  { id: 'service-check', label: 'Service Check', icon: 'mdi:check-decagram' },
  { id: 'hci', label: 'HCI', icon: 'mdi:cube-outline' },
  { id: 'wan-link', label: 'WAN Link', icon: 'mdi:router-wireless' },
  { id: 'forecast', label: 'Forecast', icon: 'mdi:chart-line' },
];

export const DEFAULT_REPORT_CATEGORY = 'capacity-planning';
export const DEFAULT_REPORT_TAB = 'Metric';
