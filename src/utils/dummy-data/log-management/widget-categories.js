export const WIDGET_CATEGORIES = [
  {
    category: 'Graph',
    widgets: [
      { id: 'chart', name: 'Chart', icon: 'mdi:chart-line', colorToken: 'cyan' },
      { id: 'topN', name: 'Top N', icon: 'mdi:format-list-numbered', colorToken: 'blue' },
      { id: 'gauge', name: 'Gauge', icon: 'mdi:gauge', colorToken: 'violet' },
      { id: 'grid', name: 'Grid', icon: 'mdi:table', colorToken: 'green' },
      { id: 'pie', name: 'Pie', icon: 'mdi:chart-pie', colorToken: 'amber' },
      { id: 'queryValue', name: 'Query Value', icon: 'mdi:numeric-1-box', colorToken: 'success' },
      { id: 'numericGrid', name: 'Numeric Grid', icon: 'mdi:grid', colorToken: 'teal' },
      { id: 'sankey', name: 'Sankey', icon: 'mdi:chart-sankey', colorToken: 'indigo' },
    ],
  },
  {
    category: 'Alert / Availability',
    widgets: [
      { id: 'heatMap', name: 'Heat Map', icon: 'mdi:grid', colorToken: 'danger' },
      { id: 'stream', name: 'Stream', icon: 'mdi:chart-timeline-variant', colorToken: 'orange' },
      { id: 'activeAlert', name: 'Active Alert', icon: 'mdi:alert-circle', colorToken: 'dangerDark' },
    ],
  },
  {
    category: 'Map',
    widgets: [
      { id: 'treeMap', name: 'Tree Map', icon: 'mdi:file-tree', colorToken: 'lime' },
      { id: 'map', name: 'Map', icon: 'mdi:map-marker', colorToken: 'green' },
    ],
  },
  {
    category: 'AI / ML',
    widgets: [
      { id: 'anomaly', name: 'Anomaly', icon: 'mdi:chart-bell-curve', colorToken: 'purple' },
      { id: 'forecast', name: 'Forecast', icon: 'mdi:chart-timeline-variant-shimmer', colorToken: 'fuchsia' },
    ],
  },
];

export const WIDGET_SIDEBAR_TABS = ['Create Widget', 'Predefined', 'User Define'];
