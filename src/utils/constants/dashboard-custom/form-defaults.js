export const DEFAULT_WIDGET_FORM = {
  name: '',
  description: '',
  counter: 'system.cpu.percent',
  aggregation: 'avg',
  sourceFilter: 'everywhere',
  source: '',
  resultBy: '',
  selectedCategory: 'Metric',
  style: 'area',
  rotation: 0,
  xAxisTitle: false,
  yAxisTitle: false,
  zAxisTitle: false,
  legend: false,
  lineWidth: 2,
  showMarkers: true,
  area: true,
  timelinePreference: 'default',
  sorting: 'none',
  gridStyle: 'grid',
  headerFontSize: 'Small',
  resizable: true,
  sortable: true,
  orderable: true,
  columnWidth: 0,
  thresholds: [
    { type: 'critical', operator: 'gt', value: 0, color: 'critical' },
    { type: 'major', operator: 'gt', value: 0, color: 'major' },
    { type: 'warning', operator: 'gt', value: 0, color: 'warning' },
  ],
  mapStyle: 'bubble',
  showZoomControls: true,
  sankeyOrientation: 'horizontal',
};

export const CONFIG_TABS = ['Style', 'Data', 'Settings'];

export const DEFAULT_CONFIG_TAB = 'Style';
