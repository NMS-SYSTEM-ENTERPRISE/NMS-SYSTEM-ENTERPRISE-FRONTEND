export const AUDIT_MODULE_FILTER_OPTIONS = [
  { value: '', label: 'All Modules' },
  { value: 'Monitors', label: 'Monitors' },
  { value: 'Metric', label: 'Metric' },
  { value: 'User', label: 'User' },
  { value: 'Configuration', label: 'Configuration' },
];

export const AUDIT_STATUS_FILTER_OPTIONS = [
  { value: 'All', label: 'All' },
  { value: 'Success', label: 'Success' },
  { value: 'Failed', label: 'Failed' },
];

export const DEFAULT_AUDIT_FILTERS = {
  search: '',
  module: '',
  operationType: 'All',
  user: '',
  remoteIp: '',
  status: 'All',
};

export const AUDIT_FILTER_SIDEBAR_CONFIG = [
  { key: 'search', type: 'search' },
  {
    key: 'module',
    type: 'select',
    label: 'Module',
    options: [
      { value: '', label: 'All' },
      { value: 'Monitors', label: 'Monitors' },
      { value: 'Metric', label: 'Metric' },
      { value: 'User', label: 'User' },
      { value: 'Configuration', label: 'Configuration' },
      { value: 'Dependency Mapper', label: 'Dependency Mapper' },
    ],
    placeholder: 'Select module',
  },
  {
    key: 'operationType',
    type: 'select',
    label: 'Operation Type',
    options: [
      { value: 'All', label: 'All' },
      { value: 'Create', label: 'Create' },
      { value: 'Update', label: 'Update' },
      { value: 'Delete', label: 'Delete' },
      { value: 'Login', label: 'Login' },
      { value: 'Logout', label: 'Logout' },
    ],
    placeholder: 'Select operation type',
  },
  {
    key: 'user',
    type: 'input',
    label: 'User',
    placeholder: 'Enter username',
  },
  {
    key: 'remoteIp',
    type: 'input',
    label: 'Remote IP',
    placeholder: 'Enter IP address',
  },
  {
    key: 'status',
    type: 'select',
    label: 'Status',
    options: [
      { value: 'All', label: 'All' },
      { value: 'Success', label: 'Success' },
      { value: 'Failed', label: 'Failed' },
    ],
    placeholder: 'Select status',
  },
];
