export const WIDGET_CATEGORIES = [
  {
    category: 'Graph',
    widgets: [
      { id: 'chart', name: 'Chart', icon: 'mdi:chart-line', colorToken: 'cyan' },
      { id: 'topN', name: 'Top N', icon: 'mdi:format-list-numbered', colorToken: 'blue' },
      { id: 'gauge', name: 'Gauge', icon: 'mdi:gauge', colorToken: 'violet' },
      { id: 'sunburst', name: 'Sunburst', icon: 'mdi:chart-donut-variant', colorToken: 'amber' },
      { id: 'pie', name: 'Pie', icon: 'mdi:chart-pie', colorToken: 'amber' },
      { id: 'queryValue', name: 'Query Value', icon: 'mdi:numeric-1-box', colorToken: 'green' },
      { id: 'themeRiver', name: 'ThemeRiver', icon: 'mdi:chart-bell-curve-cumulative', colorToken: 'teal' },
      { id: 'sankey', name: 'Sankey', icon: 'mdi:chart-sankey', colorToken: 'indigo' },
    ],
  },
  {
    category: 'Alert / Availability',
    widgets: [
      { id: 'heatMap', name: 'Heat Map', icon: 'mdi:grid', colorToken: 'red' },
      { id: 'stream', name: 'Stream', icon: 'mdi:chart-timeline-variant', colorToken: 'orange' },
      { id: 'activeAlert', name: 'Active Alert', icon: 'mdi:alert-circle', colorToken: 'redDark' },
    ],
  },
  {
    category: 'Map',
    widgets: [
      { id: 'treeMap', name: 'Tree Map', icon: 'mdi:file-tree', colorToken: 'lime' },
      { id: 'map', name: 'Map', icon: 'mdi:map-marker', colorToken: 'greenAlt' },
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
