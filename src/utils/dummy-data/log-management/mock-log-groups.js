export const MOCK_LOG_GROUPS = [
  {
    id: 'other',
    name: 'Other',
    count: '277.9 K',
    icon: 'mdi:help-circle',
    colorToken: 'slate',
    expanded: false,
  },
  {
    id: 'router',
    name: 'Router',
    count: '400',
    icon: 'mdi:router',
    colorToken: 'cyan',
    expanded: true,
    children: [
      { id: 'cisco-router', name: 'Cisco Router', count: '391' },
      { id: 'cisco-device-login', name: 'Cisco Device Login Audit', count: '8' },
    ],
  },
  {
    id: 'linux',
    name: 'Linux',
    count: '40',
    icon: 'mdi:linux',
    colorToken: 'violet',
    expanded: true,
    children: [{ id: 'linux-syslog', name: 'Linux Syslog', count: '40' }],
  },
  {
    id: 'firewall',
    name: 'Firewall',
    count: '193.45 K',
    icon: 'mdi:security',
    colorToken: 'rose',
    expanded: false,
    children: [
      { id: 'palo-alto-traffic', name: 'Palo Alto Traffic', count: '122.83 K' },
      { id: 'palo-alto-system', name: 'Palo Alto System', count: '574' },
    ],
  },
];
