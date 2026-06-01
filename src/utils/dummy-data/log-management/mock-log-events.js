export const MOCK_LOG_EVENTS = [
  {
    id: 1,
    timestamp: 'Sat, Nov 08, 2025 08:23:38 PM',
    severity: 'Informational',
    source: '172.16.15.126',
    category: 'Other',
    type: 'Other',
    message:
      '[ event.source: 172.16.15.201, event.category: Other, event.source.type: Other, event.severity: Informational, message: type=CRYPTO_KEY_USER msg=audit(1762613592.322:894073): pid=891278 uid=0 auid=0 uid=0 ouid=0...',
  },
  {
    id: 2,
    timestamp: 'Sat, Nov 08, 2025 08:23:39 PM',
    severity: 'Informational',
    source: '172.16.15.126',
    category: 'Other',
    type: 'Other',
    message:
      '[ event.source: 172.16.15.201, event.category: Other, event.source.type: Other, event.severity: Informational, message: type=LOGIN msg=audit(1762613592.382:894069): pid=891278 uid=0...',
  },
  {
    id: 3,
    timestamp: 'Sat, Nov 08, 2025 08:23:39 PM',
    severity: 'Informational',
    source: '172.16.15.126',
    category: 'Other',
    type: 'Other',
    message:
      '[ event.source: 172.16.15.201, event.category: Other, event.source.type: Other, event.severity: Informational, message: type=CRED_ACQ msg=audit(1762613592.385:894098): pid=891278...',
  },
];

export const MOCK_EVENT_EXTENDED_ATTRIBUTES = [
  { key: 'facility', val: 'auth' },
  { key: 'pid', val: '891278' },
  { key: 'protocol', val: 'udp' },
  { key: 'log_index', val: 'idx_nms_2025' },
  { key: 'collector', val: 'main-syslog-01' },
];
