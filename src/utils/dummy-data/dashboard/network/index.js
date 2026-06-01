export const networkAlertSummary = [
  { label: 'Down', count: 54, color: '#ef4444', percentage: 25 },
  { label: 'Up', count: 322, color: '#22c55e', percentage: 75 },
  { label: 'Down', count: 6, color: '#ef4444', percentage: 15 },
  { label: 'Major', count: 6, color: '#f97316', percentage: 15 },
  { label: 'Warning', count: 4, color: '#fbbf24', percentage: 10 },
  { label: 'Clear', count: 502, color: '#22c55e', percentage: 90 },
];

export const topNetworkDevicesByCPU = [
  { name: '18ke2.like2: 24.83%', value: 2483, color: '#06b6d4' },
  { name: 'HB2.HB2.com: 23.92%', value: 2392, color: '#eab308' },
  { name: 'HB3.hb3.com: 23.83%', value: 2383, color: '#84cc16' },
  { name: 'cisco2960.snr-edatas.local: 19.61%', value: 1961, color: '#f97316' },
  { name: 'bgp2.bgp2.com: 18.59%', value: 1859, color: '#ef4444' },
  { name: 'bgp1.bgp1.com: 18.56%', value: 1856, color: '#a855f7' },
  { name: 'rsl.hb1.com: 18.24%', value: 1824, color: '#3b82f6' },
  { name: 'fg_firewall.miotdanny.com: 3.08%', value: 308, color: '#22c55e' },
  { name: 'cisco_core.snr-edatas.local: 1.84%', value: 184, color: '#64748b' },
];

export const networkMemoryUsage = [
  {
    label: '90%',
    segments: [
      { value: 5, color: '#ec4899' },
      { value: 3, color: '#8b5cf6' },
      { value: 2, color: '#06b6d4' },
      { value: 90, color: 'transparent' },
    ],
  },
  {
    label: '85%',
    segments: [
      { value: 5, color: '#ec4899' },
      { value: 5, color: '#8b5cf6' },
      { value: 5, color: '#f97316' },
      { value: 70, color: 'transparent' },
    ],
  },
  {
    label: '80%',
    segments: [
      { value: 1, color: '#8b5cf6' },
      { value: 99, color: 'transparent' },
    ],
  },
  {
    label: '75%',
    segments: [{ value: 100, color: 'transparent' }],
  },
];
