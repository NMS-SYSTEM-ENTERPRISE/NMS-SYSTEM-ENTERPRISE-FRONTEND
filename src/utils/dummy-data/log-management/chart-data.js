export const LOG_SUMMARY_METRICS = [
  {
    id: 'eps',
    label: 'EVENTS PER SECOND',
    value: '3.2',
    colorToken: 'cyan',
    sparkMin: 2,
    sparkMax: 5,
  },
  {
    id: 'volume',
    label: 'TOTAL VOLUME (24H)',
    value: '325.6 K',
    colorToken: 'violet',
    sparkMin: 80,
    sparkMax: 120,
  },
  {
    id: 'storage',
    label: 'STORAGE USAGE',
    value: '84.2 GB',
    colorToken: 'green',
    sparkMin: 80,
    sparkMax: 85,
  },
];

export const generateTimeSeriesData = (count, min, max) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({ value: Math.floor(Math.random() * (max - min + 1)) + min });
  }
  return data;
};
