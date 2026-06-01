export const CREATE_REPORT_CATEGORIES = [
  {
    id: 'monitoring',
    label: 'Monitoring Reports',
    icon: 'mdi:monitor-dashboard',
    types: [
      { id: 'availability', name: 'Availability', icon: 'mdi:check-circle', description: 'Monitor availability reports' },
      { id: 'performance', name: 'Performance', icon: 'mdi:speedometer', description: 'Performance metrics reports' },
      { id: 'availability-status', name: 'Availability Status', icon: 'mdi:chart-bar', description: 'Availability status overview' },
      { id: 'availability-flap', name: 'Availability Flap Summary', icon: 'mdi:chart-timeline', description: 'Flap summary reports' },
    ],
  },
  {
    id: 'alerts',
    label: 'Alert Reports',
    icon: 'mdi:bell-alert',
    types: [
      { id: 'active-alerts', name: 'Active Alerts', icon: 'mdi:alert-circle', description: 'Current active alerts' },
      { id: 'metric-alerts', name: 'Metric Alerts', icon: 'mdi:alert-octagon', description: 'Metric-based alerts' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics Reports',
    icon: 'mdi:chart-line',
    types: [
      { id: 'log-events', name: 'Log Events', icon: 'mdi:text-box-multiple', description: 'System log events' },
      { id: 'log-analytics', name: 'Log Analytics', icon: 'mdi:chart-line', description: 'Log analytics reports' },
      { id: 'flow-analytics', name: 'Flow Analytics', icon: 'mdi:chart-timeline-variant', description: 'Flow data analytics' },
    ],
  },
  {
    id: 'system',
    label: 'System Reports',
    icon: 'mdi:cog',
    types: [
      { id: 'inventory', name: 'Inventory', icon: 'mdi:database', description: 'Device inventory reports' },
      { id: 'custom-script', name: 'Custom Script', icon: 'mdi:code-tags', description: 'Custom script reports' },
      { id: 'polling-data', name: 'Polling Data', icon: 'mdi:view-grid', description: 'Polling data reports' },
    ],
  },
];

export const DEFAULT_OPEN_SECTIONS = {
  monitoring: true,
  alerts: true,
  analytics: true,
  system: true,
};
