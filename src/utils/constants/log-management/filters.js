export const LOG_SEVERITY_FILTER_OPTIONS = [
  { value: '', label: 'All Levels' },
  { value: 'Critical', label: 'Critical' },
  { value: 'Warning', label: 'Warning' },
  { value: 'Informational', label: 'Informational' },
];

export const LOG_TIME_RANGE_OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: 'last_hour', label: 'Last Hour' },
  { value: 'last_24h', label: 'Last 24 Hours' },
];

export const DEFAULT_LOG_FILTERS = {
  counter: 'message',
  aggregation: 'Count',
  sourceFilter: 'Everywhere',
  source: '',
  resultBy: '',
  groupMatching: 'All',
  includeExclude: 'include',
  groupMatchingFilter: '',
  criteriaCounter: '',
  operator: '',
  value: '',
  timeRange: 'today',
  severity: '',
  eventType: '',
  eventCategory: '',
};

export const LOG_FILTER_SIDEBAR_CONFIG = [
  {
    key: 'severity',
    type: 'select',
    label: 'Severity',
    options: LOG_SEVERITY_FILTER_OPTIONS,
  },
  {
    key: 'timeRange',
    type: 'select',
    label: 'Time Range',
    options: LOG_TIME_RANGE_OPTIONS,
  },
];
