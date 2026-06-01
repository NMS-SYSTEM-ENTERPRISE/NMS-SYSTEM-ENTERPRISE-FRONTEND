export const diskUsageData = [
  { name: 'sqlvm 60.6%', value: 606, color: '#ef4444' },
  { name: 'bangalore 37.6%', value: 376, color: '#f97316' },
  { name: 'bngdevhyp01 14.98%', value: 1498, color: '#22c55e' },
  { name: 'mediahouse 10.45%', value: 1045, color: '#eab308' },
  { name: 'WIN-IIS2A00005 24.85%', value: 2485, color: '#a855f7' },
  { name: 'devmachine01 8.84%', value: 884, color: '#ec4899' },
  { name: 'EFSN1-SS 58.43%', value: 5843, color: '#3b82f6' },
];

export const diskSpaceData = [
  { name: 'www.corpTendServ 4.76%', value: 43, color: '#ef4444' },
  { name: 'chennai-web 39.43%', value: 39, color: '#f97316' },
  { name: 'sqlvm 22.48%', value: 22, color: '#22c55e' },
  { name: 'bngdevhyp01 30.49%', value: 30, color: '#eab308' },
  { name: 'mediahouse 28.48%', value: 28, color: '#a855f7' },
  { name: 'devadmin-corp 38.33%', value: 38, color: '#06b6d4' },
];

export const networkPacketsData = [
  {
    monitor: 'disputed-42',
    interface: 'wir0/0',
    packets: '2907920',
    sparkline: [
      2000000, 2200000, 2400000, 2600000, 2700000, 2800000, 2850000, 2900000,
      2907920,
    ],
    color: 'var(--color-chart-green)',
  },
  {
    monitor: 'isbaon',
    interface: 'useDock2 Pseudo-Int...',
    packets: '0',
    sparkline: [],
  },
  {
    monitor: 'WIN-crmTendServ01U',
    interface: '<Ethernet [Drvdli]>',
    packets: '0',
    sparkline: [],
  },
  {
    monitor: 'ethernet5',
    interface: 'in',
    packets: '0',
    sparkline: [],
  },
];

export const bytesPerSecData = [
  {
    monitor: 'disputed-42',
    value: '1.2 MB/s',
    sparkline: [800, 900, 850, 1000, 1100, 1050, 1200, 1150, 1250, 1200],
    color: '#06b6d4',
  },
  {
    monitor: 'isbaon',
    value: '850 KB/s',
    sparkline: [600, 700, 650, 750, 800, 780, 820, 800, 850, 840],
    color: '#06b6d4',
  },
  {
    monitor: 'WIN-crmTendServ01U',
    value: '500 KB/s',
    sparkline: [300, 400, 350, 450, 480, 460, 500, 490, 510, 500],
    color: '#06b6d4',
  },
  {
    monitor: 'ethernet5',
    value: '120 KB/s',
    sparkline: [80, 100, 90, 110, 115, 110, 120, 118, 122, 120],
    color: '#06b6d4',
  },
];

export const deviceAvailabilityData = [
  { monitor: 'Up Devices', value: 45, color: '#22c55e' },
  { monitor: 'Down Devices', value: 2, color: '#ef4444' },
  { monitor: 'Warning Devices', value: 5, color: '#f97316' },
];

export const networkDeviceDowntime = [
  {
    monitor: '10.10.20.5',
    downtime: '2d 4h 12m',
    sparkline: [10, 15, 12, 18, 20, 25, 22, 28, 30, 35],
    color: '#ef4444',
  },
  {
    monitor: '192.168.1.100',
    downtime: '1d 2h 30m',
    sparkline: [5, 8, 6, 10, 12, 15, 14, 18, 20, 22],
    color: '#ef4444',
  },
  {
    monitor: 'Switch-Core-01',
    downtime: '5h 45m',
    sparkline: [2, 4, 3, 5, 6, 8, 7, 9, 10, 12],
    color: '#ef4444',
  },
  {
    monitor: 'Firewall-Main',
    downtime: '1h 20m',
    sparkline: [1, 2, 1, 3, 2, 4, 3, 5, 4, 6],
    color: '#ef4444',
  },
];
