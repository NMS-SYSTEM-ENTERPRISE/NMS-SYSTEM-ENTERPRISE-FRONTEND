export const INITIAL_DASHBOARD_WIDGETS = [
  {
    id: 1,
    type: 'Chart',
    title: 'System CPU Performance',
    config: {
      style: 'area',
      area: true,
      lineWidth: 2,
      showMarkers: true,
      counter: 'system.cpu.percent',
      aggregation: 'avg',
    },
  },
  {
    id: 2,
    type: 'Gauge',
    title: 'Memory Usage',
    config: { counter: 'system.mem.used', aggregation: 'avg' },
  },
  {
    id: 3,
    type: 'Top N',
    title: 'Top Processes by Memory',
    config: { counter: 'process.mem', aggregation: 'max' },
  },
];
