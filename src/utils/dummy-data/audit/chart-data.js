export const AUDIT_MODULE_CHART_DATA = [
  { name: 'Metric', value: 515 },
  { name: 'Monitor', value: 512 },
  { name: 'Dependency Mapper', value: 32 },
  { name: 'Configuration', value: 28 },
  { name: 'User', value: 5 },
];

export const AUDIT_USER_CHART_DATA = [
  { name: 'system', value: 1080 },
  { name: 'admin', value: 12 },
];

export const AUDIT_PIE_CHART_DATA = [
  { value: 512, name: 'Metric Explorer', colorToken: 'cyan' },
  { value: 480, name: 'Configuration', colorToken: 'violet' },
  { value: 98, name: 'Security & Auth', colorToken: 'rose' },
];

export const AUDIT_DISTRIBUTION_LEGEND = [
  { label: 'Metric', percent: '47%', colorToken: 'sky' },
  { label: 'Config', percent: '44%', colorToken: 'violet' },
  { label: 'Security', percent: '9%', colorToken: 'rose' },
];

export const AUDIT_SUMMARY_METRICS = [
  { id: 'total', label: 'TOTAL EVENTS', value: '1,090', colorToken: 'sky', sparkMin: 0.8, sparkMax: 1.2 },
  { id: 'success', label: 'SUCCESS RATE', value: '98.2%', colorToken: 'green', sparkMin: 95, sparkMax: 100 },
  { id: 'failures', label: 'FAILURES', value: '12', colorToken: 'danger', sparkMin: 0, sparkMax: 5 },
];

export const AUDIT_TREND_DATA = Array.from({ length: 24 }, (_, i) => ({
  time: i === 0 ? '23:00' : i === 1 ? '23. Jun' : `${String(i - 1).padStart(2, '0')}:00`,
  succeed: Math.floor(Math.random() * 80) + 40,
  fail: Math.floor(Math.random() * 10),
}));

export const generateTimeSeriesData = (count, min, max) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({ value: Math.floor(Math.random() * (max - min + 1)) + min });
  }
  return data;
};
