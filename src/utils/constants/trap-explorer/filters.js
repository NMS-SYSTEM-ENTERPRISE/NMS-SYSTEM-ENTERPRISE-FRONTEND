export const DEFAULT_TRAP_FILTERS = {
  trapOid: '',
  source: '',
  vendor: '',
  severity: '',
  acknowledged: '',
  countMin: '',
  countMax: '',
};

export const TRAP_OID_FILTER_OPTIONS = [
  { value: '', label: 'All' },
  { value: '1.3.6.1.4.1.9.9.41.2.0.1', label: 'clogMessageGenerated' },
  { value: '1.3.6.1.4.1.9.0.1', label: '1.3.6.1.4.1.9.0.1' },
  { value: '1.3.6.1.4.1.9.9.43.2.0.1', label: 'ciscoConfigManEvent' },
];

export const VENDOR_FILTER_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'cisco', label: 'Cisco' },
  { value: 'juniper', label: 'Juniper' },
  { value: 'hp', label: 'HP' },
  { value: 'dell', label: 'Dell' },
];

export const SEVERITY_FILTER_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'critical', label: 'Critical' },
  { value: 'major', label: 'Major' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
];

export const ACKNOWLEDGED_FILTER_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'true', label: 'Acknowledged' },
  { value: 'false', label: 'Unacknowledged' },
];
