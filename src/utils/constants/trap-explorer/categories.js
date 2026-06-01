/** Sidebar category definitions for trap severity filtering. */
export const TRAP_CATEGORIES = [
  { id: 'all', label: 'All Traps', icon: 'mdi:view-list', colorToken: 'cyan' },
  { id: 'critical', label: 'Critical', icon: 'mdi:alert-circle', colorToken: 'critical' },
  { id: 'major', label: 'Major', icon: 'mdi:alert', colorToken: 'major' },
  { id: 'minor', label: 'Minor', icon: 'mdi:alert-outline', colorToken: 'minor' },
  { id: 'warning', label: 'Warning', icon: 'mdi:alert-octagon', colorToken: 'warning' },
  { id: 'info', label: 'Informational', icon: 'mdi:information', colorToken: 'info' },
];
