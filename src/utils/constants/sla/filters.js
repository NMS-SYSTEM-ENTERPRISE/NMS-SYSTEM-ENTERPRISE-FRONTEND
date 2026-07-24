/** Default filter state for SLA action sidebar. */
export const DEFAULT_SLA_FILTERS = {
  status: '',
  slaType: '',
  frequency: '',
  targetMin: '',
  targetMax: '',
  violationMin: '',
  violationMax: '',
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
