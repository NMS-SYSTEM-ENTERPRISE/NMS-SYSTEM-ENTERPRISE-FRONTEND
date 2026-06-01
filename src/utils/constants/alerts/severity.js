export const ALERT_SEVERITY_SUFFIX = {
  down: 'Down',
  unreachable: 'Unreachable',
  critical: 'Critical',
  major: 'Major',
  warning: 'Warning',
};

export const getAlertSeverityClassSuffix = (severity) =>
  ALERT_SEVERITY_SUFFIX[severity] || 'Warning';

export const ALERT_SEVERITY_TABS = [
  { id: null, label: 'All', countKey: 'total' },
  { id: 'down', label: 'Down', countKey: 'down' },
  { id: 'critical', label: 'Critical', countKey: 'critical' },
  { id: 'warning', label: 'Warning', countKey: 'warning' },
];

export const ALERT_SUMMARY_METRICS = [
  { key: 'total', label: 'TOTAL ALERTS', colorToken: 'default' },
  { key: 'down', label: 'DOWN NODES', colorToken: 'danger' },
  { key: 'critical', label: 'CRITICAL ISSUES', colorToken: 'major' },
  { key: 'ack', label: 'ACK RATE', colorToken: 'success', value: '94.2%' },
];
