export const FORECAST_REPORT_TITLE = 'CPU Forecast Report';

export const isForecastReport = (title) => title === FORECAST_REPORT_TITLE;

export const MONITOR_TYPE_ICONS = {
  linux: 'mdi:linux',
  windows: 'mdi:microsoft-windows',
  solaris: 'mdi:weather-sunny',
  vmware: 'mdi:server',
};

export const DEFAULT_MONITOR_TYPE_ICON = 'mdi:laptop';
