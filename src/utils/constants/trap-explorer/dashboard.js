export const TRAP_DASHBOARD_SECTIONS = {
  summary: { title: 'Operational Summary', icon: 'mdi:view-dashboard-variant-outline', badge: 'HEALTHY' },
  trends: { title: 'Trap Trends & Severity', icon: 'mdi:chart-timeline-variant', badge: 'ANALYTICS' },
  sources: { title: 'Top Trap Sources', icon: 'mdi:ip-network', badge: 'INTELLIGENCE' },
  activity: { title: 'Incident Stream', icon: 'mdi:history', badge: 'LIVE' },
};

export const DEFAULT_DASHBOARD_SECTIONS = {
  summary: true,
  trends: true,
  sources: true,
  activity: true,
};

export const TRAP_SUMMARY_METRICS = [
  { key: 'critical', label: 'CRITICAL TRAPS', value: '1,048', colorToken: 'critical' },
  { key: 'major', label: 'MAJOR TRAPS', value: '735', colorToken: 'major' },
  { key: 'total', label: 'TOTAL EVENTS', value: '3,147', colorToken: 'cyan' },
  { key: 'ack', label: 'ACK RATE', value: '98.2%', colorToken: 'info' },
];

export const SEVERITY_LEGEND = [
  { name: 'Critical', colorToken: 'critical', val: '33%' },
  { name: 'Major', colorToken: 'major', val: '23%' },
  { name: 'Minor', colorToken: 'minor', val: '18%' },
  { name: 'Warning', colorToken: 'warning', val: '15%' },
  { name: 'Info', colorToken: 'info', val: '11%' },
];
