/** Default filter state for SLA action sidebar. */
export const DEFAULT_SLA_FILTERS = {
  status: '',
  slaType: '',
  frequency: '',
  targetMin: '',
  targetMax: '',
  violationMin: '',
  violationMax: '',
  // Date / time filters (mapped to API params)
  device_group: '',
  device_type: '',
  device_subgroup: '',
  start_date: '',
  end_date: '',
  quick_select: '',
  start_time: '00:00',
  end_time: '23:59',
};

export const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'Ok', label: 'Healthy' },
  { value: 'Warning', label: 'Warning' },
  { value: 'Breached', label: 'Breached' },
];

export const CATEGORY_FILTER_OPTIONS = [
  { value: '', label: 'All Categories' },
  { value: 'Performance', label: 'Performance' },
  { value: 'Availability', label: 'Availability' },
];

export const FREQUENCY_FILTER_OPTIONS = [
  { value: '', label: 'All Periods' },
  { value: 'Daily', label: 'Daily' },
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Monthly', label: 'Monthly' },
  { value: 'Quarterly', label: 'Quarterly' },
];

export const QUICK_SELECT_OPTIONS = [
  { value: '', label: 'Custom Range' },
  { value: 'Today', label: 'Today' },
  { value: 'Yesterday', label: 'Yesterday' },
  { value: 'Last 7 Days', label: 'Last 7 Days' },
  { value: 'Last 30 Days', label: 'Last 30 Days' },
  { value: 'This Month', label: 'This Month' },
];
