export const ALERT_DETAIL_SECTIONS = {
  summary: { title: 'Operational Summary', icon: 'mdi:pulse', badge: 'LIVE' },
  intelligence: { title: 'Intelligence mapping & metadata', icon: 'mdi:brain', badge: 'CONTEXT' },
  analytics: { title: 'Statistical Trend Analytics', icon: 'mdi:chart-areaspline', badge: 'VISUALS' },
  history: { title: 'Incident Response Timeline', icon: 'mdi:history', badge: 'AUDIT' },
};

export const DEFAULT_ALERT_DETAIL_SECTIONS = {
  summary: true,
  intelligence: true,
  analytics: true,
  history: true,
};

export const ALERT_DETAIL_EVENT_TYPES = [
  'THRESHOLD VIOLATION',
  'STATE TRANSITION',
  'MANUAL REVIEW',
  'POLLING CYCLE',
];
