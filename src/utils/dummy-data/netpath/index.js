export const NETWORK_PATHS = [
  {
    id: '1',
    name: 'Local Machine - Mydevice',
    source: 'DESKTOP-K2M5DQG',
    destination: '10.20.40.206',
    port: '443',
    status: 'online',
    lastPolled: 'Tue, Nov 12, 2024 04:55:33 PM',
  },
  {
    id: '2',
    name: 'Google DNS',
    source: 'Localhost',
    destination: '8.8.8.8',
    port: '53',
    status: 'online',
    lastPolled: 'Tue, Nov 12, 2024 04:55:33 PM',
  },
  {
    id: '3',
    name: 'Microsoft Azure',
    source: '172.16.16.1',
    destination: 'www.microsoft.com',
    port: '443',
    status: 'online',
    lastPolled: 'Tue, Nov 12, 2024 04:55:33 PM',
  },
  {
    id: '4',
    name: 'Internal DNS',
    source: 'Localhost',
    destination: '192.168.1.5',
    port: '53',
    status: 'error',
    lastPolled: 'Tue, Nov 12, 2024 04:55:33 PM',
  },
  {
    id: '5',
    name: 'Corporate Web Server',
    source: 'Localhost',
    destination: 'www.snr-edatas.com',
    port: '80',
    status: 'warning',
    lastPolled: 'Tue, Nov 12, 2024 04:55:33 PM',
  },
];

export const FILTER_SIDEBAR_CONFIG = [
  {
    key: 'status',
    type: 'select',
    label: 'Status',
    options: [
      { value: '', label: 'All' },
      { value: 'online', label: 'Online' },
      { value: 'error', label: 'Error' },
      { value: 'warning', label: 'Warning' },
    ],
    placeholder: 'Select status',
  },
  {
    key: 'source',
    type: 'input',
    label: 'Source',
    placeholder: 'Enter source',
  },
];

export const PATH_DATA = {
  1: {
    name: 'Local Machine -Mydevice',
    source: 'DESKTOP-K2M5DQG',
    destination: '10.20.40.206',
    port: '443',
  },
  2: {
    name: 'google',
    source: 'susib',
    destination: 'www.google.com',
    port: '443',
  },
  3: {
    name: 'Microsoft',
    source: '172.16.16.1',
    destination: 'www.microsoft.com',
    port: '551',
  },
};
