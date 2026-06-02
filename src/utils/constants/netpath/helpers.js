export const getPathInitials = (name) => name.substring(0, 2).toUpperCase();

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
