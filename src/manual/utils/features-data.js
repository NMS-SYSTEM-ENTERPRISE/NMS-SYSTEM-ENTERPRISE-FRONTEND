/**
 * Manual Module - Feature Definitions
 * Complete guide content for each NMS feature.
 * This is the single source of truth for all manual content.
 */

export const MANUAL_FEATURES = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: 'mdi:rocket-launch-outline',
    color: '#3b82f6',
    category: 'overview',
    description: 'Learn how to log in, navigate the dashboard, and set up your NMS environment.',
    overview: `SNR-Edatas AIOps is a comprehensive Network Management System (NMS) designed for enterprise infrastructure monitoring. It provides real-time visibility into your network devices, services, and application performance — all from a unified, high-density dashboard.`,
    sections: [
      {
        title: 'Logging In',
        content: `Navigate to your NMS URL and enter your enterprise credentials (username/email and password). Contact your IT administrator if you do not have login credentials. After successful authentication, you will be redirected to the main Control Center dashboard.`,
        steps: [
          'Open your browser and navigate to the NMS URL provided by your IT team.',
          'Enter your Username or Email address in the first field.',
          'Enter your Password in the second field.',
          'Click "Sign In" to authenticate.',
          'You will be taken to the Control Center dashboard upon successful login.',
        ],
      },
      {
        title: 'Navigation',
        content: `The left-hand sidebar provides access to all major modules. Click any icon or label to navigate between features. The sidebar can be collapsed to save screen space by clicking the menu toggle button.`,
        steps: [
          'The left sidebar shows module icons: Overview, Infrastructure, Analytics, Operations, Configuration.',
          'Hover over any icon to see its label if the sidebar is collapsed.',
          'Click the hamburger icon at the top to expand or collapse the sidebar.',
          'The top header shows breadcrumbs, date range selector, and your profile.',
        ],
      },
    ],
    imageSet: 'login',
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'mdi:view-dashboard-outline',
    color: '#06b6d4',
    category: 'overview',
    description: 'The central command center — real-time infrastructure health, KPIs, and live device summaries.',
    overview: `The Dashboard is the primary landing screen after login. It presents a high-level summary of your entire network infrastructure — total device counts, active alerts, CPU and memory utilization heat maps, top devices by traffic, and network health scores. It is designed for at-a-glance situational awareness.`,
    sections: [
      {
        title: 'Infrastructure Summary',
        content: `The top row of the dashboard shows key infrastructure KPIs: total managed devices, devices currently online/offline, active critical alerts, and average network health score. Each metric card is color-coded — green for healthy, yellow for warning, red for critical.`,
      },
      {
        title: 'CPU & Memory Utilization',
        content: `The utilization heatmap shows real-time CPU and memory usage across all monitored devices. Devices are ranked from highest to lowest utilization. Red indicates overload (>90%), amber is warning (70–90%), and green is healthy (<70%).`,
      },
      {
        title: 'Top Devices by Traffic',
        content: `The traffic leaderboard shows the top 10 devices by inbound/outbound throughput in real time. This helps you instantly identify bandwidth-heavy devices that may need attention or capacity upgrades.`,
      },
    ],
    imageSet: 'dashboard',
  },
  {
    id: 'device-monitoring',
    title: 'Device Monitoring',
    icon: 'mdi:server-network',
    color: '#10b981',
    category: 'infrastructure',
    description: 'Monitor individual network devices — routers, switches, servers — with SNMP metrics, interface stats, and historical graphs.',
    overview: `Device Monitoring is the core infrastructure module. It connects to your network devices via SNMP (v1/v2c/v3) and continuously collects performance metrics: CPU load, memory usage, interface throughput, error rates, and more. Every device has its own detail dashboard with historical graphs, interface breakdowns, and alert history.`,
    sections: [
      {
        title: 'Device List View',
        content: `The list view shows all monitored devices with their current status (Online / Offline / Warning / Critical), IP address, device type, last seen time, and key metrics. You can filter by group, status, or type, and search by hostname or IP.`,
        steps: [
          'Navigate to Infrastructure → Device Monitoring from the sidebar.',
          'Use the search bar to find a specific device by name or IP.',
          'Use the filter dropdown to filter by device group or status.',
          'Click any device row to open its detailed dashboard.',
        ],
      },
      {
        title: 'Group-wise Dashboard',
        content: `Devices are organized into logical groups (e.g., Core Routers, Distribution Switches, Servers). The group dashboard shows aggregated metrics for all devices in a group, making it easy to assess overall group health at a glance.`,
      },
      {
        title: 'Individual Device Dashboard',
        content: `The individual device view shows CPU, memory, disk, and interface performance over time. You can select any time range (last 1h, 6h, 24h, 7d, 30d) and drill down into specific interfaces using the interface selector.`,
      },
      {
        title: 'Interface Details',
        content: `Each device interface shows inbound/outbound traffic (in bps/Mbps/Gbps), error rates, discard rates, and operational status (Up/Down). Graphs are real-time with configurable polling intervals.`,
      },
    ],
    imageSet: 'device-monitoring',
  },
  {
    id: 'topology',
    title: 'Network Topology',
    icon: 'mdi:sitemap-outline',
    color: '#8b5cf6',
    category: 'infrastructure',
    description: 'Visualize your entire network as an interactive map — see device connections, traffic flows, and real-time health status.',
    overview: `The Network Topology module renders your infrastructure as a live interactive graph. Devices are nodes; physical and logical connections are edges. Node colors reflect real-time health status, and hovering shows key metrics inline. You can zoom, pan, filter, and highlight paths to understand your network architecture at a glance.`,
    sections: [
      {
        title: 'Topology Map Overview',
        content: `The topology canvas auto-arranges devices based on discovered connections. Routers, switches, servers, and endpoint devices are represented with distinct icons. Color coding — green (healthy), amber (warning), red (critical), grey (offline) — gives instant visual status.`,
      },
      {
        title: 'Node Highlighting & Selection',
        content: `Click any node to select it and highlight all directly connected neighbors. A details panel slides in on the right showing the device's current metrics, alert count, and a direct link to its monitoring dashboard.`,
      },
      {
        title: 'Viewing Interconnections',
        content: `Edges (connections) between nodes show the link type (Ethernet, Fiber, Wireless) and utilization percentage. Thick lines indicate high traffic; thin lines indicate low usage. Hover over any edge to see current bandwidth consumption.`,
      },
    ],
    imageSet: 'topology',
  },
  {
    id: 'alerts',
    title: 'Alerts',
    icon: 'mdi:bell-alert-outline',
    color: '#ef4444',
    category: 'operations',
    description: 'Manage all network alerts — view active incidents, acknowledge, escalate, and track resolution timelines.',
    overview: `The Alerts module is your incident management center. It aggregates all threshold-based and anomaly-detected alerts from across the monitored infrastructure. Alerts are prioritized by severity (Critical, Major, Minor, Warning, Info) and can be acknowledged, assigned, escalated, or resolved directly from the UI.`,
    sections: [
      {
        title: 'Alerts Overview',
        content: `The overview cards show total active alerts broken down by severity. The trend chart shows alert volume over time, helping you identify recurring patterns or sudden spikes caused by infrastructure events.`,
      },
      {
        title: 'Alert List View',
        content: `The list view shows all alerts with columns for Severity, Device, Alert Type, Triggered Time, Duration, and Status. You can sort by any column, filter by severity or device group, and use the search bar to find specific alerts.`,
        steps: [
          'Navigate to Operations → Alerts from the sidebar.',
          'Click the Severity filter to view only Critical or Major alerts.',
          'Click any alert row to open the detail panel.',
          'Use the Acknowledge button to confirm you are aware of the issue.',
          'Use the Resolve button to close the alert once the issue is fixed.',
        ],
      },
      {
        title: 'Individual Alert Detail',
        content: `Each alert detail page shows the full event timeline, the triggering metric value vs. the configured threshold, affected device details, and any related alerts from the same device. A comments section allows team members to log investigation notes.`,
      },
    ],
    imageSet: 'alerts',
  },
  {
    id: 'apm',
    title: 'APM',
    icon: 'mdi:chart-timeline-variant-shimmer',
    color: '#f97316',
    category: 'analytics',
    description: 'Application Performance Monitoring — track service latency, throughput, error rates, and distributed traces.',
    overview: `The APM (Application Performance Monitoring) module provides deep visibility into the performance of your applications and microservices. It tracks latency, throughput, and error rates per service, and provides distributed trace analysis to identify bottlenecks across service dependencies. It has three sub-views: Services, Explorer, and Analytics.`,
    sections: [
      {
        title: 'Services View',
        content: `The Services view lists all monitored services (databases, APIs, microservices) with their current latency, throughput (requests per minute), and error count. Color coding indicates health — green for good, amber for degraded, red for critical. Service cards expand to show trend sparklines.`,
      },
      {
        title: 'Trace Explorer',
        content: `The Trace Explorer lets you search and analyze individual distributed traces. Each trace represents a single request flowing through multiple services. You can view the trace waterfall to see which service caused the most latency and identify slow or failing spans.`,
        steps: [
          'Navigate to APM → Explorer from the APM sidebar.',
          'Use the search bar to filter traces by service name or trace ID.',
          'Click any trace row to open the trace waterfall view.',
          'Identify the longest spans — these indicate performance bottlenecks.',
          'Click any span to see its metadata, tags, and error logs.',
        ],
      },
      {
        title: 'Performance Analytics',
        content: `The Analytics tab shows aggregated performance trends: P50/P95/P99 latency percentiles, error rate trends over time, service dependency maps, and top endpoints by request volume. Use the time range selector to zoom in on specific incidents.`,
      },
      {
        title: 'Performance Trends',
        content: `Trend charts show how service performance has changed over time. Sudden spikes in latency or error rate are visually prominent. You can overlay multiple services on the same chart to compare relative performance.`,
      },
    ],
    imageSet: 'apm',
  },
  {
    id: 'flow-explorer',
    title: 'Flow Explorer',
    icon: 'mdi:wave',
    color: '#14b8a6',
    category: 'analytics',
    description: 'Analyze NetFlow/sFlow data — visualize traffic patterns, top talkers, protocol distribution, and conversation flows.',
    overview: `The Flow Explorer (Net Flow Analysis) module processes NetFlow, sFlow, and IPFIX data exported by your network devices. It lets you analyze who is talking to whom, what protocols are being used, and how bandwidth is being consumed across your network. It is essential for capacity planning and security investigation.`,
    sections: [
      {
        title: 'Flow Overview',
        content: `The overview dashboard shows total flow volume, top source/destination IPs, top protocols (TCP, UDP, ICMP), and bandwidth utilization trends over the selected time range. Pie charts break down traffic by application type.`,
      },
      {
        title: 'Flow Journey Analysis',
        content: `The journey view visualizes traffic as a Sankey diagram — showing how traffic flows from sources through intermediate devices to destinations. This reveals the actual data paths taken by traffic and where bottlenecks occur.`,
      },
      {
        title: 'Flow Conversation Explorer',
        content: `The explorer shows individual conversations (src IP ↔ dst IP) ranked by bytes transferred. You can filter by time range, device, protocol, or port to investigate specific traffic patterns or suspicious activity.`,
      },
    ],
    imageSet: 'flow-explorer',
  },
  {
    id: 'log-explorer',
    title: 'Log Explorer',
    icon: 'mdi:text-search',
    color: '#eab308',
    category: 'analytics',
    description: 'Search, filter, and analyze log streams from devices, servers, and applications in real time.',
    overview: `The Log Explorer provides a centralized log management and analysis interface. Logs are ingested from network devices (syslog), servers (agent-based), and applications. You can search across millions of log entries in real time, filter by severity or source, and drill down into individual log events to investigate incidents.`,
    sections: [
      {
        title: 'Log Overview Dashboard',
        content: `The overview shows log ingestion rate over time, distribution by log level (ERROR, WARN, INFO, DEBUG), top log-producing devices, and recent critical log events. This gives you an at-a-glance view of your log health.`,
      },
      {
        title: 'Log List View',
        content: `The log stream shows real-time logs as they arrive. Each row shows timestamp, severity, source device/service, and the log message. You can pause the live stream to investigate specific entries.`,
        steps: [
          'Navigate to Analytics → Log Explorer from the sidebar.',
          'Use the search bar to search for keywords (e.g., "error", "timeout", specific IP).',
          'Use the Severity filter to show only ERROR or CRITICAL logs.',
          'Click any log row to expand and see the full log message and metadata.',
          'Use the time range picker to analyze historical log data.',
        ],
      },
      {
        title: 'Log Categories',
        content: `Logs are automatically categorized by source type: System Logs (OS level), Application Logs (from apps), Network Logs (from devices), and Security Logs (auth events). Switch between categories using the left-side filter panel.`,
      },
      {
        title: 'Individual Log Detail',
        content: `Clicking a log entry opens a full detail panel showing the complete raw log, parsed fields (extracted key-value pairs), the source device's current status, and related logs from the same host within the same time window.`,
      },
    ],
    imageSet: 'log-explorer',
  },
  {
    id: 'metric-explorer',
    title: 'Metric Explorer',
    icon: 'mdi:chart-line',
    color: '#a855f7',
    category: 'analytics',
    description: 'Build custom metric workspaces — drag-and-drop widgets to visualize any metric from any device.',
    overview: `The Metric Explorer is a self-service analytics workspace. You can create custom dashboards (workspaces) by dragging and dropping chart widgets, selecting any collected metric from any device or service, and configuring visualization options (line chart, bar chart, gauge, heat map). Workspaces can be saved and shared with your team.`,
    sections: [
      {
        title: 'Workspace Overview',
        content: `A workspace is a canvas of metric widgets. You can create multiple workspaces for different purposes — one for network capacity, one for server health, one for application performance. Each workspace is independently configurable.`,
      },
      {
        title: 'Creating a Widget',
        content: `Click the "Add Widget" button to open the widget builder. Select the metric source (device or service), choose the specific metric (CPU, memory, interface traffic, etc.), pick the visualization type, and configure the time range and aggregation method.`,
        steps: [
          'Navigate to Analytics → Metric Explorer.',
          'Click "+ New Workspace" or select an existing workspace.',
          'Click "Add Widget" to open the widget configuration panel.',
          'Select Device/Service from the dropdown.',
          'Choose the specific metric (e.g., CPU Utilization %).',
          'Select chart type (Line, Bar, Gauge, Heatmap).',
          'Click "Apply" to add the widget to your workspace.',
        ],
      },
      {
        title: 'Widget Actions',
        content: `Each widget has a toolbar with options to: Refresh data, Edit configuration, Duplicate the widget, Download data as CSV, Zoom in on the time axis, and Remove the widget from the workspace.`,
      },
    ],
    imageSet: 'metric-explorer',
  },
  {
    id: 'slo',
    title: 'SLO Monitoring',
    icon: 'mdi:target',
    color: '#ec4899',
    category: 'analytics',
    description: 'Define and track Service Level Objectives — monitor uptime, latency, and error budgets against your SLA targets.',
    overview: `The SLO (Service Level Objective) module lets you define quantitative reliability targets for your services and infrastructure, and track compliance over time. For each SLO, you define a target (e.g., 99.9% uptime), a time window (rolling 30 days), and the measurement criteria. The system continuously evaluates your error budget and alerts you when you are burning it too fast.`,
    sections: [
      {
        title: 'SLO Overview',
        content: `The SLO dashboard shows all defined objectives with their current compliance percentage, error budget remaining (as a percentage and in raw time), and status (Healthy, At Risk, Breached). Color-coded status badges make it easy to see which SLOs need attention.`,
      },
      {
        title: 'SLO List View',
        content: `The list view shows all SLOs in tabular format with sortable columns for Name, Target %, Current Compliance, Error Budget Remaining, and Measurement Window. You can filter by status (On Track / Breaching / Breached) or sort by error budget consumed to prioritize attention.`,
      },
      {
        title: 'SLO Detail Report',
        content: `The detail page for each SLO shows a compliance trend chart over the measurement window, good vs. bad event counts, error budget burn rate over time, and a list of incidents that contributed to SLO degradation. This gives you the context needed to improve reliability.`,
      },
    ],
    imageSet: 'slo',
  },
  {
    id: 'trap-explorer',
    title: 'Trap Explorer',
    icon: 'mdi:bug-outline',
    color: '#f97316',
    category: 'operations',
    description: 'Receive, decode, and analyze SNMP trap events from network devices in real time.',
    overview: `The Trap Explorer receives SNMP trap notifications sent by network devices when specific events occur — link failures, authentication failures, temperature thresholds exceeded, hardware faults, etc. Each trap is decoded, classified, and stored for analysis. The Live Trap Viewer shows traps arriving in real time via WebSocket.`,
    sections: [
      {
        title: 'Trap Overview',
        content: `The overview shows total traps received in the selected time period, traps by severity, top trap-sending devices, and a time-series chart of trap arrival rate. Spikes in this chart often correlate with network incidents.`,
      },
      {
        title: 'Trap List & Detail View',
        content: `The trap list shows all received traps with timestamp, source device IP, trap OID, severity, and decoded message. Clicking a trap opens its full detail — including the complete OID tree, variable bindings, and the device's current operational status at the time the trap was sent.`,
      },
      {
        title: 'Trap History',
        content: `Historical trap data is retained and searchable. You can filter by date range, source IP, OID prefix, or severity. This is essential for post-incident analysis and compliance reporting.`,
      },
      {
        title: 'Trap Detail Dashboard',
        content: `The trap detail dashboard shows a per-device trap trend chart, trap type distribution, and links to the affected device's monitoring dashboard for correlated metric investigation.`,
      },
    ],
    imageSet: 'trap-explorer',
  },
  {
    id: 'tickets',
    title: 'Ticketing',
    icon: 'mdi:ticket-outline',
    color: '#06b6d4',
    category: 'operations',
    description: 'Create, assign, and manage incident tickets — link them to alerts, track resolution status, and maintain SLA compliance.',
    overview: `The Ticketing module provides an integrated incident tracking system. When an alert fires, a ticket can be automatically or manually created. Tickets can be assigned to team members, given priority levels, linked to related alerts and devices, and tracked through states: Open → In Progress → Resolved → Closed. All ticket history is retained for audit purposes.`,
    sections: [
      {
        title: 'Tickets Overview',
        content: `The tickets dashboard shows open ticket count by priority (Critical, High, Medium, Low), average resolution time, ticket volume trend, and tickets assigned to your team. SLA compliance metrics are displayed prominently to track response time adherence.`,
      },
      {
        title: 'Ticket List View',
        content: `The list view shows all tickets with columns for ID, Title, Priority, Assigned To, Created Date, Status, and SLA Breach Risk. You can sort, filter by status or priority, and bulk-assign tickets to team members.`,
        steps: [
          'Navigate to Operations → Support Desk from the sidebar.',
          'Click "New Ticket" to create a ticket manually.',
          'Fill in the title, priority, assigned team member, and description.',
          'Link to related alerts using the "Related Alerts" field.',
          'Click "Save" to create the ticket.',
        ],
      },
      {
        title: 'Ticket Detail',
        content: `The ticket detail page shows all ticket metadata, the full conversation thread (comments), status change history, linked alerts, and the affected device summary. Team members can add updates, change status, or escalate directly from this view.`,
      },
    ],
    imageSet: 'tickets',
  },
  {
    id: 'reports-builder',
    title: 'Reports Builder',
    icon: 'mdi:file-chart-outline',
    color: '#3b82f6',
    category: 'operations',
    description: 'Generate scheduled and on-demand reports — device health summaries, capacity planning, SLA compliance, and custom analytics.',
    overview: `The Reports Builder allows you to create professional PDF and Excel reports for management review, compliance audits, and capacity planning. Choose from pre-built report templates or build fully custom reports using a drag-and-drop report designer. Reports can be scheduled to auto-generate and email to stakeholders.`,
    sections: [
      {
        title: 'Reports Overview',
        content: `The reports library shows all available report templates and previously generated reports. Each report card shows the report name, type, last generated date, and status. You can regenerate, schedule, download, or delete reports from this view.`,
      },
      {
        title: 'Individual Report View',
        content: `Opening a specific report shows a preview of the report content — charts, tables, and summary statistics. Reports include executive summaries, key metrics, trend analysis, and recommendations. You can download as PDF or Excel.`,
      },
      {
        title: 'Custom Report Creation',
        content: `The custom report builder lets you select data sources, metric types, date ranges, device groups, and visualization types for each section of your report. Add as many sections as needed, rearrange them, and configure report scheduling.`,
        steps: [
          'Navigate to Operations → Report Builder.',
          'Click "Create Custom Report".',
          'Give the report a name and select the time range.',
          'Add sections: click "Add Section" and choose metric type.',
          'For each section, select device group and specific metrics.',
          'Configure schedule (Daily/Weekly/Monthly) and recipient emails.',
          'Click "Save & Generate" to create the report immediately.',
        ],
      },
    ],
    imageSet: 'reports-builder',
  },
  {
    id: 'system-settings',
    title: 'System Settings',
    icon: 'mdi:cog-outline',
    color: '#64748b',
    category: 'configuration',
    description: 'Configure discovery profiles, credential profiles, user management, and system-wide settings.',
    overview: `System Settings is the administration center for the NMS platform. It controls how devices are discovered and added, how authentication credentials are managed, who has access to the system, and how the platform behaves. Proper configuration here is the foundation for all monitoring capabilities.`,
    sections: [
      {
        title: 'Settings Overview',
        content: `The settings landing page shows all configuration categories: Discovery Settings (credential profiles, discovery profiles, manual device addition), User Settings (user management, roles, permissions), and System Settings (SNMP global settings, notification channels, data retention policies).`,
      },
      {
        title: 'Credential Profiles',
        content: `A credential profile stores SNMP credentials (community string for v1/v2c, or username/auth/priv for v3) that are used during device discovery and ongoing polling. You can create multiple profiles for different device types or security zones.`,
        steps: [
          'Go to Settings → Discovery Settings → Credential Profiles.',
          'Click "Create Credential Profile".',
          'Select SNMP version (v1, v2c, or v3).',
          'Enter the community string (v1/v2c) or authentication details (v3).',
          'Give the profile a descriptive name and save.',
        ],
      },
      {
        title: 'Discovery Profiles',
        content: `A discovery profile defines how the NMS discovers devices in your network. You specify the IP range or CIDR block to scan, which credential profiles to use, the ICMP/SNMP polling interval, and the device groups to assign discovered devices to.`,
        steps: [
          'Go to Settings → Discovery Settings → Discovery Profiles.',
          'Click "Create Discovery Profile".',
          'Enter the target IP range or CIDR (e.g., 192.168.1.0/24).',
          'Select the credential profiles to use for this discovery.',
          'Set the discovery schedule and click "Save".',
          'Click "Run Now" to start an immediate discovery scan.',
        ],
      },
      {
        title: 'Adding Devices Manually',
        content: `You can add individual devices manually instead of through automated discovery. Enter the device IP, hostname, device type, and select the credential profile to use for SNMP polling. Devices can also be bulk-imported via an Excel (XLSX) file.`,
      },
      {
        title: 'User Management',
        content: `The user management section lets administrators create, edit, and deactivate user accounts. Assign roles (Admin, Operator, Viewer) to control access levels. Admins can do everything; Operators can acknowledge and resolve alerts; Viewers have read-only access.`,
      },
    ],
    imageSet: 'system-settings',
  },
  {
    id: 'net-flow',
    title: 'Net Flow Analysis',
    icon: 'mdi:chart-sankey',
    color: '#0ea5e9',
    category: 'analytics',
    description: 'Analyze NetFlow data from routers — understand traffic composition, top talkers, and bandwidth consumption by device.',
    overview: `The Net Flow module (distinct from Flow Explorer) focuses on per-device NetFlow analysis. While Flow Explorer provides network-wide flow correlation, Net Flow provides a device-centric view — showing what traffic is flowing through each specific router or switch, broken down by protocol, port, and conversation.`,
    sections: [
      {
        title: 'NetFlow Overview',
        content: `The overview shows aggregate flow statistics: total flows processed, top talker devices, protocol distribution (TCP vs UDP vs ICMP vs others), and bandwidth trends. Choose any time window from the last hour to the last 30 days.`,
      },
      {
        title: 'Device Categories',
        content: `Devices are grouped by their role (Core, Distribution, Access, WAN Edge). Each category shows aggregated flow statistics so you can quickly identify which part of the network is under the most traffic pressure.`,
      },
      {
        title: 'Overall NetFlow Analysis',
        content: `The overall analysis view shows a comprehensive Sankey diagram of traffic flow through the network, top conversations (IP pairs) ranked by bytes, and a time-series breakdown of traffic by application type.`,
      },
    ],
    imageSet: 'net-flow',
  },
  {
    id: 'audit',
    title: 'Audit Logs',
    icon: 'mdi:clipboard-text-clock-outline',
    color: '#f43f5e',
    category: 'operations',
    description: 'Full audit trail of all user actions — logins, configuration changes, alert acknowledgements, and system events.',
    overview: `The Audit Logs module maintains a complete, tamper-proof record of every action performed in the NMS platform. Who logged in, what they changed, when alerts were acknowledged, which reports were generated — all captured and searchable. This is essential for compliance with security standards (ISO 27001, SOC 2, PCI DSS).`,
    sections: [
      {
        title: 'Audit Overview',
        content: `The overview shows audit event volume over time, top users by action count, most common event types, and recent critical events. A timeline chart helps identify unusual spikes in activity that may warrant investigation.`,
      },
      {
        title: 'Audit Log List View',
        content: `The full audit log is searchable and filterable by user, event type, date range, and result (success/failure). Each entry shows timestamp, user, action performed, affected resource, and outcome.`,
        steps: [
          'Navigate to Operations → Audit Logs.',
          'Use the date range picker to narrow down the time window.',
          'Filter by User to see all actions performed by a specific person.',
          'Filter by Event Type (Login, Config Change, Alert Action, etc.).',
          'Click any row to see full event details.',
        ],
      },
      {
        title: 'Individual Audit Event Detail',
        content: `The detail view for each audit entry shows the full event payload — before/after values for configuration changes, the user's IP address and browser session details, and any related system events in the same time window.`,
      },
    ],
    imageSet: 'audit',
  },
];

export const MANUAL_CATEGORIES = [
  { id: 'all', label: 'All Modules', icon: 'mdi:apps' },
  { id: 'overview', label: 'Overview', icon: 'mdi:home-outline' },
  { id: 'infrastructure', label: 'Infrastructure', icon: 'mdi:server-network' },
  { id: 'analytics', label: 'Analytics', icon: 'mdi:chart-line' },
  { id: 'operations', label: 'Operations', icon: 'mdi:bell-alert-outline' },
  { id: 'configuration', label: 'Configuration', icon: 'mdi:cog-outline' },
];
