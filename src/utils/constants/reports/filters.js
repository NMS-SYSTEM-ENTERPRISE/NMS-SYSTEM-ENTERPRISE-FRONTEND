export const REPORT_FILTER_SIDEBAR_CONFIG = [
  { key: 'search', type: 'search' },
  {
    key: 'type',
    type: 'select',
    label: 'Report Type',
    options: [
      { value: '', label: 'All' },
      { value: 'Performance', label: 'Performance' },
      { value: 'Availability', label: 'Availability' },
      { value: 'Flow', label: 'Flow' },
      { value: 'Alert', label: 'Alert' },
      { value: 'Active Alerts', label: 'Active Alerts' },
      { value: 'Custom Script', label: 'Custom Script' },
    ],
    placeholder: 'Select report type',
  },
  {
    key: 'reportType',
    type: 'select',
    label: 'Category',
    options: [
      { value: '', label: 'All' },
      { value: 'Default', label: 'Default' },
      { value: 'Custom', label: 'Custom' },
    ],
    placeholder: 'Select category',
  },
  {
    key: 'schedule',
    type: 'select',
    label: 'Schedule',
    options: [
      { value: '', label: 'All' },
      { value: 'true', label: 'Scheduled' },
      { value: 'false', label: 'Not Scheduled' },
    ],
    placeholder: 'Select schedule status',
  },
  {
    key: 'favorite',
    type: 'checkbox',
    label: 'Favorites',
    checkboxLabel: 'Show only favorite reports',
  },
];

export const DEFAULT_REPORT_FILTERS = {
  search: '',
  reportType: '',
  type: '',
  schedule: '',
  favorite: false,
};
