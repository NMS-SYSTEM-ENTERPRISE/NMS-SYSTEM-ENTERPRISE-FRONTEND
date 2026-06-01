export const ALERT_OVERVIEW_SECTIONS = {
  summary: { title: 'Operational Health Summary', icon: 'mdi:pulse', badge: 'LIVE' },
  analytics: { title: 'Alert Intelligence & Distribution', icon: 'mdi:chart-arc', badge: 'ANALYTICS' },
  categories: { title: 'Alert Density by Environment', icon: 'mdi:grid', badge: 'ZONES' },
};

export const DEFAULT_ALERT_OVERVIEW_SECTIONS = {
  summary: true,
  analytics: true,
  categories: true,
};
