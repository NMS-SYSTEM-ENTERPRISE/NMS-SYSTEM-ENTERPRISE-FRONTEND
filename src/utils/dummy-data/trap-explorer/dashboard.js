export const TRAP_TOP_SOURCES = [
  { ip: '192.168.1.1', count: 320, pct: 85 },
  { ip: '10.0.0.5', count: 284, pct: 72 },
  { ip: '172.16.0.1', count: 215, pct: 60 },
  { ip: '192.168.1.100', count: 180, pct: 45 },
  { ip: '10.0.0.1', count: 142, pct: 30 },
  { ip: '172.16.10.50', count: 98, pct: 20 },
];

export const TRAP_INCIDENT_STREAM = [
  {
    title: 'BGP Session Down',
    time: '12:04:22',
    desc: 'Neighbor relationship lost with 10.255.0.1 on Core-Switch-01',
    severity: 'critical',
    node: 'Core-SW-01',
  },
  {
    title: 'Link Flap Detected',
    time: '11:58:10',
    desc: 'Interface TenGigabitEthernet 1/0/1 transition to DOWN state',
    severity: 'major',
    node: 'Edge-Router-02',
  },
  {
    title: 'Threshold Violation',
    time: '11:45:30',
    desc: 'CPU usage exceeded 95% threshold for sustained period',
    severity: 'minor',
    node: 'Auth-Server-05',
  },
  {
    title: 'Configuration Change',
    time: '11:32:15',
    desc: 'New trap community string updated via SNMP write request',
    severity: 'warning',
    node: 'Gateway-01',
  },
];

export const TRAP_VOLUME_CHART_DATA = [120, 132, 101, 134, 90, 230, 210];

export const TRAP_VOLUME_CHART_LABELS = [
  '00:00',
  '04:00',
  '08:00',
  '12:00',
  '16:00',
  '20:00',
  '24:00',
];

export const TRAP_SEVERITY_CHART_DATA = [
  { value: 1048, name: 'Critical', colorToken: 'critical' },
  { value: 735, name: 'Major', colorToken: 'major' },
  { value: 580, name: 'Minor', colorToken: 'minor' },
  { value: 484, name: 'Warning', colorToken: 'warning' },
  { value: 300, name: 'Info', colorToken: 'info' },
];
