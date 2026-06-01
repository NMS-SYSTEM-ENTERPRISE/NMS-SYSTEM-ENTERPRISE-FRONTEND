/** Trap severity metadata — icons and badge variants (colors via CSS modules). */
export const TRAP_SEVERITY = {
  critical: { icon: 'mdi:alert-circle', label: 'Critical', colorToken: 'critical', badgeVariant: 'danger' },
  major: { icon: 'mdi:alert', label: 'Major', colorToken: 'major', badgeVariant: 'warning' },
  minor: { icon: 'mdi:alert-outline', label: 'Minor', colorToken: 'minor', badgeVariant: 'warning' },
  warning: { icon: 'mdi:alert-octagon', label: 'Warning', colorToken: 'warning', badgeVariant: 'info' },
  info: { icon: 'mdi:information', label: 'Info', colorToken: 'info', badgeVariant: 'success' },
};

export const LIVE_LOG_SEVERITY_MAP = {
  Critical: 'critical',
  Warning: 'warning',
  Info: 'info',
};
