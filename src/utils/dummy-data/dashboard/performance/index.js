export const cpuMonitorData = [
  {
    monitor: 'WIN-SQLSVR2025',
    value: '82.08%',
    sparkline: [45, 52, 48, 60, 58, 65, 70, 68, 75, 82, 80, 85, 82, 80, 78, 82],
    color: 'var(--color-chart-orange)',
  },
  {
    monitor: 'moduledata01928',
    value: '54.99%',
    sparkline: [30, 35, 32, 40, 45, 48, 52, 50, 54, 55, 52, 58, 54, 52, 50, 54],
    color: 'var(--color-chart-orange-light)',
  },
  {
    monitor: 'WIN-SQLSVR2011',
    value: '43.76%',
    sparkline: [25, 28, 30, 35, 38, 40, 42, 45, 43, 46, 44, 48, 43, 42, 40, 43],
    color: 'var(--color-chart-orange)',
  },
  {
    monitor: 'WIN-crmTempServ01U',
    value: '40.73%',
    sparkline: [20, 25, 28, 32, 35, 38, 40, 42, 40, 43, 41, 45, 40, 38, 36, 40],
    color: 'var(--color-chart-orange-light)',
  },
];

export const memoryMonitorData = [
  {
    monitor: 'WL3.ML',
    value: '89.72%',
    sparkline: [65, 70, 68, 72, 75, 78, 80, 82, 85, 87, 89, 90, 89, 88, 87, 89],
    color: 'var(--color-chart-purple)',
  },
  {
    monitor: 'indmediaapp2',
    value: '89.23%',
    sparkline: [60, 65, 68, 70, 72, 75, 78, 80, 83, 85, 87, 90, 89, 87, 86, 89],
    color: 'var(--color-chart-purple-light)',
  },
  {
    monitor: 'WIN-LISPSAD0001',
    value: '89.23%',
    sparkline: [55, 60, 63, 67, 70, 73, 76, 78, 81, 84, 86, 88, 89, 88, 87, 89],
    color: 'var(--color-chart-purple)',
  },
  {
    monitor: 'crm-web',
    value: '--------',
    sparkline: [],
  },
];

export const droppedPacketsData = [
  {
    monitor: 'disputed-42',
    interface: 'wir0/0',
    packets: '0',
    sparkline: [5, 2, 8, 4, 9, 3, 7, 2, 6, 4],
    color: '#ef4444',
  },
  {
    monitor: 'isbaon',
    interface: 'wir0/0',
    packets: '0',
    sparkline: [3, 6, 2, 8, 4, 7, 3, 5, 2, 6],
    color: '#ef4444',
  },
  {
    monitor: 'WIN-crmTendServ01U',
    interface: 'useDock2 Pseudo-Int...',
    packets: '0',
    sparkline: [2, 4, 6, 3, 7, 2, 5, 8, 3, 4],
    color: '#ef4444',
  },
  {
    monitor: 'ethernet5',
    interface: '<Ethernet [Drvdli]>',
    packets: '0',
    sparkline: [4, 2, 7, 3, 6, 8, 2, 5, 3, 7],
    color: '#ef4444',
  },
];

export const latencyMonitorData = [
  {
    monitor: '8.8.8.8',
    value: '12 ms',
    sparkline: [8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 12, 11, 10, 12],
    color: '#ef4444',
  },
  {
    monitor: 'WIN-crmTempServ01U',
    value: '12 ms',
    sparkline: [7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 12, 11, 10, 12],
    color: '#ef4444',
  },
  {
    monitor: 'ultra-db',
    value: '7 ms',
    sparkline: [4, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 7, 6, 5, 7],
    color: '#ef4444',
  },
  {
    monitor: 'mgpi.mwbd.com',
    value: '8 ms',
    sparkline: [5, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 8, 7, 6, 8],
    color: '#ef4444',
  },
];

export const diskIOPSData = [
  {
    monitor: 'mcsyspchs2028',
    value: '2387',
    sparkline: [
      1800, 1900, 2000, 2100, 2200, 2300, 2400, 2350, 2300, 2250, 2300, 2350,
      2387,
    ],
    color: '#8b5cf6',
  },
  {
    monitor: 'eqmodel',
    value: '476',
    sparkline: [
      350, 380, 400, 420, 440, 460, 476, 470, 465, 460, 465, 470, 476,
    ],
    color: '#8b5cf6',
  },
  {
    monitor: 'ecmasansbsnp',
    value: '362',
    sparkline: [
      280, 300, 320, 340, 350, 360, 362, 360, 358, 355, 358, 360, 362,
    ],
    color: '#8b5cf6',
  },
  {
    monitor: 'deut640',
    value: '283',
    sparkline: [
      220, 240, 250, 260, 270, 280, 283, 282, 280, 278, 280, 282, 283,
    ],
    color: '#8b5cf6',
  },
  {
    monitor: 'mcsdepehs2020',
    value: '145',
    sparkline: [
      100, 110, 120, 130, 140, 145, 143, 142, 140, 138, 140, 143, 145,
    ],
    color: '#8b5cf6',
  },
];

export const cpuGroupData = [
  { label: 'SQL Server', value: 79.07 },
  { label: 'Server + Windows', value: 70.56 },
  { label: 'Windows IIS', value: 69.65 },
  { label: 'Microsoft IIS', value: 55.7 },
  { label: 'Active Directory', value: 55.7 },
  { label: 'Network Core', value: 17.3 },
  { label: 'Switch Stack A', value: 14.26 },
  { label: 'Switch Stack B', value: 13.08 },
];

export const memoryGroupData = [
  { label: 'Active Directory', value: 12.62 },
  { label: 'Microsoft IIS', value: 12.62 },
  { label: 'Server + Linux', value: 12.5 },
  { label: 'Server', value: 12.36 },
  { label: 'Server + Windows', value: 6.0 },
  { label: 'Windows IIS', value: 5.33 },
  { label: 'SQL Server', value: 5.23 },
  { label: 'Server + Solaris', value: 4.11 },
];
