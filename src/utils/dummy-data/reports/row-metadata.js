export const getReportRowMetadata = (reportId, schedule) => ({
  reportId: `RPT-${String(reportId).padStart(6, '0')}`,
  created: 'Jan 15, 2024',
  lastModified: 'Jan 20, 2024',
  owner: 'admin@nms.local',
  frequency: schedule ? 'Daily' : 'Not Scheduled',
  nextRun: schedule ? 'Tomorrow 06:00' : 'N/A',
  recipients: '3 users',
  format: 'PDF, CSV',
});
