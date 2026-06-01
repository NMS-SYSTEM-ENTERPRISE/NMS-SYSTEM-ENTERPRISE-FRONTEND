export const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'mdi:view-dashboard' },
  { id: 'explorer', label: 'Explorer', icon: 'mdi:compass' },
  { id: 'analytics', label: 'Analytics', icon: 'mdi:chart-line' },
];

export const EVENT_SOURCE_OPTIONS = [
  { value: '', label: 'Select' },
  { value: 'source1', label: 'Source 1' },
  { value: 'source2', label: 'Source 2' },
];

export const INTERFACE_OPTIONS = [
  { value: '', label: 'Select' },
  { value: 'interface-index-1', label: 'Interface-Index-1' },
  { value: 'interface-index-2', label: 'Interface-Index-2' },
  { value: 'interface-index-3', label: 'Interface-Index-3' },
  { value: 'interface-index-4', label: 'Interface-Index-4' },
  { value: 'interface-index-5', label: 'Interface-Index-5' },
  { value: 'interface-index-6', label: 'Interface-Index-6' },
  { value: 'interface-index-7', label: 'Interface-Index-7' },
  { value: 'interface-index-8', label: 'Interface-Index-8' },
];

export const INITIAL_FLOW_CONFIG = {
  eventSource: '',
  interface: '',
  counter: 'volume.bytes',
  aggregation: 'sum',
  flowSource: '',
  resultBy: 'source.ip',
  chartType: 'area',
  showLegend: true,
  showDataLabels: false,
  enableZoom: false,
  autoRefresh: false,
};
