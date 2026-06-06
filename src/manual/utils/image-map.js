/**
 * Manual Module - Image Map
 * Maps imageSet keys (from features-data.js) to actual imported image objects.
 * Centralizes all image imports for the manual module.
 */

import {
  alertsOverview1,
  alertsOverviewListView2,
  alertsIndividualDetail3,
} from '@/resources/images/alerts';

import {
  apmOverview1,
  apmTraces2,
  apmTracesAnalysis3,
  apmPerformanceTrend4,
} from '@/resources/images/apm';

import {
  auditLogsOverview1,
  auditLogsListView2,
  auditLogsIndividualDetail3,
} from '@/resources/images/audit';

import {
  infrastructureSummary1,
  cpuMemoryUtilization2,
} from '@/resources/images/dashboard';

import {
  deviceMonitoringListview1,
  deviceMonitoringGroupWiseDashboard2,
  deviceMonitoringIndividualDeviceDashboard3,
  deviceMonitoringIndividualDeviceInterfaceDetails4,
} from '@/resources/images/device-monitoring';

import {
  flowAnalysisOverview1,
  flowAnalysisJourney2,
  flowAnalysisExplorer3,
  flowAnalysisJourney4,
} from '@/resources/images/flow-explorer';

import {
  logExplorerOverview1,
  logExplorerListView2,
  logExplorerCategories3,
  logExplorerIndividualLogDetail,
} from '@/resources/images/log-explorer';

import { loginScreen } from '@/resources/images/login';

import {
  metricExplorerOverview1,
  metricExplorerWorkspace1,
  metricExplorerIndividualWidget3,
  metricExplorerWorkspaceActions4,
  metricExplorerWidgetActions5,
} from '@/resources/images/metric-explorer';

import {
  netflowOverview1,
  netflowDeviceCategories2,
  netflowOverallAnalysis3,
} from '@/resources/images/net-flow';

import {
  reportsBuilderOverview1,
  reportsBuilderIndividualReport2,
  reportsBuilderCustomReportCreation3,
} from '@/resources/images/reports-builder';

import {
  sloOverview1,
  sloOverviewList2,
  sloIndividualDetailReport3,
} from '@/resources/images/slo';

import {
  systemSettingsOverview1,
  systemSettingsModules2,
  credentialProfile1,
  createCredentialProfile2,
  discoveryProfile1,
  discoveryProfile2,
  addDeviceManually1,
  addDeviceManuallyThroughXlsx2,
  createUser1,
} from '@/resources/images/system-settings';

import {
  ticketsOverview1,
  ticketsListView2,
  ticketsIndividualDetail3,
} from '@/resources/images/tickets';

import {
  topologyOverview1,
  topologyNodeHighlighting2,
  topologyInterconnections3,
} from '@/resources/images/topology';

import {
  trapExplorerOverview1,
  trapExplorerOverviewDetail2,
  trapDetailHistory3,
  trapDetailDashboard4,
} from '@/resources/images/trap-explorer';

/**
 * Maps imageSet key → array of { src, caption } objects
 */
export const MANUAL_IMAGE_MAP = {
  login: [
    { src: loginScreen, caption: 'SNR-Edatas AIOps Login Screen' },
  ],
  dashboard: [
    { src: infrastructureSummary1, caption: 'Dashboard — Infrastructure Summary Overview' },
    { src: cpuMemoryUtilization2, caption: 'Dashboard — CPU & Memory Utilization Heatmap' },
  ],
  'device-monitoring': [
    { src: deviceMonitoringListview1, caption: 'Device Monitoring — Device List View' },
    { src: deviceMonitoringGroupWiseDashboard2, caption: 'Device Monitoring — Group-wise Dashboard' },
    { src: deviceMonitoringIndividualDeviceDashboard3, caption: 'Device Monitoring — Individual Device Dashboard' },
    { src: deviceMonitoringIndividualDeviceInterfaceDetails4, caption: 'Device Monitoring — Interface Details View' },
  ],
  topology: [
    { src: topologyOverview1, caption: 'Network Topology — Interactive Map Overview' },
    { src: topologyNodeHighlighting2, caption: 'Network Topology — Node Highlighting & Selection' },
    { src: topologyInterconnections3, caption: 'Network Topology — Device Interconnections' },
  ],
  alerts: [
    { src: alertsOverview1, caption: 'Alerts — Overview Dashboard' },
    { src: alertsOverviewListView2, caption: 'Alerts — Full List View with Filters' },
    { src: alertsIndividualDetail3, caption: 'Alerts — Individual Alert Detail Page' },
  ],
  apm: [
    { src: apmOverview1, caption: 'APM — Services Overview' },
    { src: apmTraces2, caption: 'APM — Trace Explorer' },
    { src: apmTracesAnalysis3, caption: 'APM — Trace Analysis Detail' },
    { src: apmPerformanceTrend4, caption: 'APM — Performance Trends & Analytics' },
  ],
  'flow-explorer': [
    { src: flowAnalysisOverview1, caption: 'Flow Explorer — Analysis Overview' },
    { src: flowAnalysisJourney2, caption: 'Flow Explorer — Traffic Journey Analysis' },
    { src: flowAnalysisExplorer3, caption: 'Flow Explorer — Conversation Explorer' },
    { src: flowAnalysisJourney4, caption: 'Flow Explorer — Detailed Flow Journey' },
  ],
  'log-explorer': [
    { src: logExplorerOverview1, caption: 'Log Explorer — Overview Dashboard' },
    { src: logExplorerListView2, caption: 'Log Explorer — Log Stream List View' },
    { src: logExplorerCategories3, caption: 'Log Explorer — Log Categories & Filters' },
    { src: logExplorerIndividualLogDetail, caption: 'Log Explorer — Individual Log Event Detail' },
  ],
  'metric-explorer': [
    { src: metricExplorerOverview1, caption: 'Metric Explorer — Overview' },
    { src: metricExplorerWorkspace1, caption: 'Metric Explorer — Custom Workspace' },
    { src: metricExplorerIndividualWidget3, caption: 'Metric Explorer — Individual Widget View' },
    { src: metricExplorerWorkspaceActions4, caption: 'Metric Explorer — Workspace Actions' },
    { src: metricExplorerWidgetActions5, caption: 'Metric Explorer — Widget Configuration' },
  ],
  slo: [
    { src: sloOverview1, caption: 'SLO — Service Level Objectives Overview' },
    { src: sloOverviewList2, caption: 'SLO — Objectives List View' },
    { src: sloIndividualDetailReport3, caption: 'SLO — Individual SLO Detail Report' },
  ],
  'trap-explorer': [
    { src: trapExplorerOverview1, caption: 'Trap Explorer — SNMP Traps Overview' },
    { src: trapExplorerOverviewDetail2, caption: 'Trap Explorer — Trap List Detail' },
    { src: trapDetailHistory3, caption: 'Trap Explorer — Trap History View' },
    { src: trapDetailDashboard4, caption: 'Trap Explorer — Trap Detail Dashboard' },
  ],
  tickets: [
    { src: ticketsOverview1, caption: 'Ticketing — Incident Tickets Overview' },
    { src: ticketsListView2, caption: 'Ticketing — Ticket List View' },
    { src: ticketsIndividualDetail3, caption: 'Ticketing — Ticket Detail Page' },
  ],
  'reports-builder': [
    { src: reportsBuilderOverview1, caption: 'Reports Builder — Report Library' },
    { src: reportsBuilderIndividualReport2, caption: 'Reports Builder — Individual Report Preview' },
    { src: reportsBuilderCustomReportCreation3, caption: 'Reports Builder — Custom Report Creation' },
  ],
  'system-settings': [
    { src: systemSettingsOverview1, caption: 'System Settings — Settings Overview' },
    { src: systemSettingsModules2, caption: 'System Settings — Module Configuration' },
    { src: credentialProfile1, caption: 'System Settings — Credential Profiles List' },
    { src: createCredentialProfile2, caption: 'System Settings — Create Credential Profile' },
    { src: discoveryProfile1, caption: 'System Settings — Discovery Profiles List' },
    { src: discoveryProfile2, caption: 'System Settings — Discovery Profile Configuration' },
    { src: addDeviceManually1, caption: 'System Settings — Add Device Manually' },
    { src: addDeviceManuallyThroughXlsx2, caption: 'System Settings — Bulk Import via XLSX' },
    { src: createUser1, caption: 'System Settings — Create User Account' },
  ],
  'net-flow': [
    { src: netflowOverview1, caption: 'Net Flow — Traffic Overview Dashboard' },
    { src: netflowDeviceCategories2, caption: 'Net Flow — Device Category Breakdown' },
    { src: netflowOverallAnalysis3, caption: 'Net Flow — Overall Network Flow Analysis' },
  ],
  audit: [
    { src: auditLogsOverview1, caption: 'Audit Logs — Overview Dashboard' },
    { src: auditLogsListView2, caption: 'Audit Logs — Full Audit Log List' },
    { src: auditLogsIndividualDetail3, caption: 'Audit Logs — Event Detail View' },
  ],
};
