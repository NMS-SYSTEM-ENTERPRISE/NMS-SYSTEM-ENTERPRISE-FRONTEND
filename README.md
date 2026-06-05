This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

===

NEXT BEFORE PROCEEDING TO THIS SCREEN
/ticketing ANALYZE THIS ENTIRE RELATED BACKEND AND FRONT END MODULES OKAY

NEXT CHECK THIS SEARCH BAR DIRECT FILTERING HAPPENED INSTEAD THIS 
INSIDE THE SEARCH INPUT PLACE THE SEARCH ENTER AND THEN SEARCH NEEDED
ENTER THE TEXT SEARCH FILTER TAGS AND RESET FILTER TAGS CLEAR EVERY USER FLEXIBLE ACTIONS NEEDED OKAY
TAKE TIME HANDLE THIS NEATLY WITH OUT ANY ISSUES OKAY 
======================


SEE BASED ON THIS REQUIREMENT UPDATE THE BOTH BACKEND AND FRONT END NEATLY OKAY
WITH OUT ANY ISSUES 
IT IS MAJOR MAJOR TASK MAIN APPLICATION SYSTEM HANDLED HERE BY ITSELF OKAY 

SO TAKE HOW MUCH TIME YOU WANT NO PROBLEM BUT HANDLE THIS GRACEFULLY WITH OUT ANY ISSUES OKAY

FOR THIS NEED TO DEVELOP NEW APIS AND NEED UPDATE THE CREATE NEW UI ALSO NO PROBLEM
WITH OUT DISTURBING THE OTHER THINGS HANDLED IT GRACEFULLY OKAY

EACH AND EVERY FUNCTIONALITY SHOULD MUST WORKED OUT PROPERLY OKAY
CONTEXT AND REQUIREMENT:
Reports
The Reports module in Motadata ObserveOps (formerly known as ObserveOps (formerly known as AIOps)) turns your monitoring data into clear, actionable insights — so you can make informed decisions about your IT environment.

It gives you access to 150+ built-in reports and the flexibility to create custom reports tailored to your needs. Whether you're tracking system availability, monitoring resource usage, or meeting compliance requirements, Reports gives you the information you need in one place.

Reports Screen

What Can You Do with Reports?
View built-in reports — Access 150+ default reports covering performance, availability, compliance, network flow, and more. No setup needed.
Create custom reports — Build your own reports using filters, KPIs, and time ranges that match your team's specific needs.
Schedule automated delivery — Set any report to run on a schedule and deliver it to users by email automatically.
Export reports — Download reports in PDF, XLSX, or HTML format for sharing or archiving.
Organize with categories — Group reports into custom categories using the New Category option in the left panel.
Use Cases
Network Administrator: Spot Bottlenecks Fast
Use the All Network Monitors Summary – Last Day report to get a full view of network performance metrics. Identify congestion points and areas that need more bandwidth — before users feel the impact.

System Administrator: Troubleshoot Incidents Quickly
Use the All Network Monitors Summary – Last Day report to detect deviations from normal network behavior. Respond to incidents faster and keep downtime to a minimum.

IT Operations Manager: Plan Capacity
Use the Top 25 Process by CPU Utilization – Last Week report to compare resource-intensive processes. Identify what's consuming the most CPU, optimize resource allocation, and plan infrastructure upgrades with confidence.

Network Performance Monitoring
Use the Top 25 Monitors by CPU Utilization – Last Week report to review CPU usage across all monitored devices. Identify resource-heavy monitors and ensure optimal performance across your network.

Understanding the Tabs on the Reports Screen
The Reports screen is organized into tabs by data source type. Each tab shows its own set of built-in and custom reports.

Metric Tab
The Metric tab displays all reports related to infrastructure monitoring metrics — CPU utilization, memory usage, network traffic, and more. It includes both built-in default reports and custom reports your team has created. Use the left panel to filter by categories like Alert, Availability, Performance, Server, Network, Wireless, Virtualization, Capacity Planning, Forecast, and more.

info
To customize a built-in report without changing the original, click the Actions icon and select Copy As. You can then adjust the timeline and apply Group, Tag, or Monitor filters on the next screen.

Log Tab
The Log tab displays reports built on system log data from your devices and applications. It includes built-in log reports and any custom log reports you've created. Filter by Performance, Log Events, or custom categories you've added.

Flow Tab
The Flow tab displays reports based on network flow data — traffic patterns, bandwidth usage, and data flows across network devices. Built-in reports include Top 25 Source IP – Last 24 Hours, Top 25 Destination IP by Application – Last 24 Hours, Malicious IP Summary, and TCP SYN Flag Summary.

Trap Tab
The Trap tab displays reports related to SNMP trap data captured from network devices. Use this tab to analyze trap events and monitor device status. Create custom trap reports and organize them with New Category.

note
This tab shows "No records available" if no trap reports have been configured yet.

Audit Tab
The Audit tab is for reports that track system changes — configuration updates, user actions, and system modifications. It supports compliance and change management use cases. Custom audit reports support fields like Module Type, Operation Type, Users, and Status.

note
This tab shows "No records available" until audit reports are created.

NCCM Tab
The NCCM (Network Configuration and Change Management) tab displays reports about network device configurations, backups, firmware updates, and compliance. Built-in reports include NCM Backup Summary, Firmware Upgrade Success/Failed Summary, Running-Baseline Config Conflict Summary, and Executive Summary Report.

APM Tab
The APM (Application Performance Monitoring) tab displays reports focused on application performance metrics. It supports both built-in and custom APM reports, organized under Performance and custom categories.

RUM Tab
The RUM (Real User Monitoring) tab displays reports based on real user interaction data. Create custom RUM reports and organize them with New Category.

note
This tab shows "No records available" if no RUM reports have been configured yet.

NetRoute Tab
The NetRoute tab displays reports related to network path and routing data. Create custom NetRoute reports and organize them with New Category.

note
This tab shows "No records available" if no NetRoute reports have been configured yet.

Log Compliance Tab
The Log Compliance tab displays reports mapped to major compliance standards — PCI-DSS, HIPAA, GDPR, SOX, and ISO 27001:2022. Each standard is displayed as a tile showing the total number of reports and category count.

Click any compliance tile to drill into the full list of reports for that standard. Each report is mapped to its specific requirement, act, article, section, or control — depending on the standard. You can filter reports by their compliance reference and export them individually.

Related Topics
Reports Screen
Create Custom Reports



 Reports Screen
The Reports screen in Motadata ObserveOps is where you view, manage, schedule, and export all built-in and custom reports across your IT environment.

Every report — whether default or custom — lives here, organized by data source type across dedicated tabs.

Navigation
Go to Menu and select Reports .

Reports Screen

The Reports screen opens.

Reports Screen Layout
The screen has two main areas:

Left panel — Filters reports within the active tab by category. Select any category to narrow the grid on the right. Use New Category to add your own groupings for custom reports.
Right panel (grid) — Lists all reports matching the selected tab and category.
At the top, a row of tabs lets you switch between report data sources: Metric, Log, Flow, Trap, Audit, NCCM, APM, RUM, NetRoute, and Log Compliance.

Use the Create Custom Report button in the top-right corner to build a new report from scratch.

Report Grid Fields
Every tab displays reports in a standard grid. Here's what each column means:

Field	Description
Name	The name of the report. Click it to open and view the full report.
Description	A brief summary of what the report shows.
Type	The category of data displayed — for example, Performance, Availability, Active Alerts, Flow Analytics, Log Compliance, NCCM, APM, and so on.
Report Type	Whether the report is Default (built-in, out-of-the-box) or Custom (created by your team).
Schedule	Toggle this on to schedule automated report delivery. Set the recipient by email address, username, handle, or user profile — and define the delivery frequency.
Download	Shows the progress of a report export in real time.
Actions	Click the  icon to access the following options: Edit, Clone Report, Email This Report, Export PDF / Export XLSX / Export HTML, Copy As, and Delete.
note
Default reports are built-in and cannot be edited directly. Use Copy As to duplicate a default report and customize the copy — including timeline and source filters — without changing the original.

Actions Menu — What Each Option Does
Action	Description
Edit	Edit a custom report's configuration. Not available for Default reports.
Clone Report	Create an exact copy of the selected report under a new name.
Email This Report	Send the report immediately to a user by their email address.
Export PDF	Download the report as a PDF file.
Export XLSX	Download the report as an Excel spreadsheet.
Export HTML	Download the report as an HTML file.
Copy As	Duplicate a Default report and save it as a custom report. Apply your own timeline and source filters on the next screen.
Delete	Permanently delete a custom report.
note
Deleting a report is permanent. It cannot be undone. Default reports cannot be deleted.

Tabs on the Reports Screen
Metric Tab
The Metric tab displays reports based on infrastructure monitoring metrics — CPU utilization, memory usage, network traffic, disk performance, and more.

The left panel organizes Metric reports into the following categories:

Category	What It Contains
Favorites	Reports you've starred for quick access.
All Reports	Every report in this tab, both Default and Custom.
Alert	Reports based on active alert data.
Virtualization	Reports for virtual machine and virtual server environments.
Availability	Reports tracking uptime and downtime of monitors.
Wireless	Reports for wireless access points and connections.
Performance	Reports covering CPU, memory, disk, and interface performance metrics.
Config	Reports related to configuration monitoring.
Inventory	Reports listing monitored devices and their attributes.
Server	Reports specific to server monitors.
Network	Reports specific to network device monitors.
Service Check	Reports for service check monitors.
Process	Reports tracking process-level metrics.
Capacity Planning	Reports classifying monitors as Overutilized, Underutilized, or Idle based on CPU, memory, and disk usage over time.
Vlan	Reports covering VLAN-level data.
Forecast	Reports predicting future resource utilization based on historical data.
WAN Link	Reports for WAN link performance.
New Category	Add a custom category to organize your own reports.
About Capacity Planning Reports
Capacity Planning reports help you understand whether your resources are overworked, underused, or sitting idle. ObserveOps classifies each monitor based on CPU, memory, and disk utilization over the selected time period.

Category	Logic	What to Do
Overutilized	CPU, Memory, or Disk utilization exceeds 90% — or any of these stays above 90% for more than 50% of the time period.	Investigate resource constraints immediately. Consider increasing RAM, upgrading storage, or optimizing resource allocation. Plan hardware upgrades or virtualization improvements for the long term.
Underutilized	CPU, Memory, and Disk utilization all stay below 50% — or any of these stays under 50% for more than 50% of the time period.	Look for opportunities to consolidate resources or reallocate capacity. Consider right-sizing to reduce energy and operational costs.
Idle	CPU, Memory, and Disk utilization all stay below 30% — or any of these stays under 30% for more than 50% of the time period.	Consider consolidating idle resources to improve server utilization and reduce hardware costs. Reallocate capacity to critical systems where needed.
Below is a screenshot of the Idle monitors report:

Idle Monitors Report

Here, an ESXi monitor (172.16.10.27) has its CPU utilization in an idle state for 60% of the monitored period.

Below is a screenshot of the Underutilized monitors report:

Underutilized Monitors Report

For the same ESXi monitor (172.16.10.27), CPU utilization is in an underutilized state for 100% of the monitored period.

From these two reports together, you can clearly see that this monitor fluctuates between idle and underutilized states — making it a strong candidate for reallocation, consolidation, or right-sizing to reduce operational and energy costs.

About Forecast Reports
Forecast reports predict when a monitored resource will reach key utilization thresholds, based on its historical data. ObserveOps gathers data for up to 90 days to improve forecast accuracy. A minimum of 3 days of data is required before forecasting begins.

ObserveOps predicts when each monitor will reach the following thresholds:

Threshold
Greater than or equal to 80% utilization
Greater than or equal to 90% utilization
Equal to 100% utilization
ObserveOps assigns one of the following forecast conditions to each monitor:

Forecast Condition	Description
No Growth	No considerable growth in utilization. Usage is stable.
Already Reached	The resource has already reached maximum capacity.
Insufficient Data	Less than 3 days of data has been collected. Forecast not yet available.
Below is an example of a Forecast report showing CPU utilization data for a monitored resource:

CPU Forecast Report

Log Tab
The Log tab displays reports built from system log data collected across your devices and applications.

The left panel organizes Log reports into the following categories:

Category	What It Contains
Favorites	Reports you've starred for quick access.
All Reports	Every report in this tab, both Default and Custom.
Performance	Log-based performance reports.
Log Events	Reports based on raw log event data.
New Category	Add a custom category to organize your own reports.
Flow Tab
The Flow tab displays reports based on network flow data — traffic volumes, bandwidth usage, source and destination IP analysis, and application-level traffic patterns.

The left panel organizes Flow reports into the following categories:

Category	What It Contains
Favorites	Reports you've starred for quick access.
All Reports	Every report in this tab.
Flow Reports	All built-in flow analytics reports.
New Category	Add a custom category to organize your own reports.
Built-in Flow reports include:

Malicious IP Summary – Last 24 Hours
TCP SYN Flag Summary – Last 24 Hours
Top 25 Destination IP – Last 24 Hours
Top 25 Destination IP by Application – Last 24 Hours
Top 25 Destination IP by Domain – Last 24 Hours
Top 25 Node – Last 24 Hours
Top 25 Source IP – Last 24 Hours
Top 25 Source IP by Application – Last 24 Hours
Top 25 Source IP by Domain – Last 24 Hours
Trap Tab
The Trap tab displays reports related to SNMP trap data captured from network devices.

The left panel organizes Trap reports into the following categories:

Category	What It Contains
Favorites	Reports you've starred for quick access.
All Reports	Every report in this tab.
New Category	Add a custom category to organize your own reports.
note
This tab shows "No records available" if no trap reports have been configured yet.

Audit Tab
The Audit tab displays reports tracking changes made to the system — configuration changes, user actions, and system modifications.

The left panel organizes Audit reports into the following categories:

Category	What It Contains
Favorites	Reports you've starred for quick access.
All Reports	Every report in this tab.
New Category	Add a custom category to organize your own reports.
note
This tab shows "No records available" until audit reports are created.

NCCM Tab
The NCCM (Network Configuration and Change Management) tab displays reports about network device configurations, backups, and firmware changes.

The left panel organizes NCCM reports into the following categories:

Category	What It Contains
Favorites	Reports you've starred for quick access.
All Reports	Every report in this tab, both Default and Custom.
Config	Reports related to device configuration changes and conflicts.
Compliance	Reports checking device compliance against organizational standards.
New Category	Add a custom category to organize your own reports.
Built-in NCCM reports include:

Executive Summary Report
Firmware Upgrade Failed Summary
Firmware Upgrade Success Summary
NCM Backup Summary
NCM Device Inventory
NCM Failed Backup Summary
Running-Baseline Config Conflict Summary
Running-Startup Config Conflict Summary
APM Tab
The APM (Application Performance Monitoring) tab displays reports focused on application performance metrics.

The left panel organizes APM reports into the following categories:

Category	What It Contains
Favorites	Reports you've starred for quick access.
All Reports	Every report in this tab, both Default and Custom.
Performance	Application performance reports.
New Category	Add a custom category to organize your own reports.
RUM Tab
The RUM (Real User Monitoring) tab displays reports based on real user interaction and experience data.

The left panel organizes RUM reports into the following categories:

Category	What It Contains
Favorites	Reports you've starred for quick access.
All Reports	Every report in this tab.
New Category	Add a custom category to organize your own reports.
note
This tab shows "No records available" if no RUM reports have been configured yet.

NetRoute Tab
The NetRoute tab displays reports related to network routing paths and hop-level performance data.

The left panel organizes NetRoute reports into the following categories:

Category	What It Contains
Favorites	Reports you've starred for quick access.
All Reports	Every report in this tab.
New Category	Add a custom category to organize your own reports.
note
This tab shows "No records available" if no NetRoute reports have been configured yet.

Log Compliance Tab
The Log Compliance tab displays reports mapped to major regulatory and security compliance standards. It helps your organization maintain secure system activity logs and demonstrate compliance with regulatory requirements.

The tab opens with a set of compliance tiles. Each tile represents a standard and shows:

The full name of the standard
A short description of how ObserveOps supports compliance for that standard
Total Report count — the number of reports available for that standard
Category Count — the number of report categories within that standard
The following compliance standards are available out of the box:

Standard	Full Name	Total Reports
PCI-DSS	Payment Card Industry Data Security Standard	79
HIPAA	Health Insurance Portability and Accountability Act	236
GDPR	General Data Protection Regulation	208
SOX	Sarbanes-Oxley Act of 2002	38
ISO	International Organization for Standardization 27001:2022	135
Drilling into a Compliance Standard
Click any compliance tile to open the full report list for that standard.

Each report in the list is mapped to a specific control reference within the standard:

Standard	Reference Column Label	Example
PCI-DSS	Requirement	Requirement 10.5.5
HIPAA	Act	164.312(b)
GDPR	Article	Article 5(1)(f)
SOX	SOX Section	SEC 302 (a) (5) (A)
ISO 27001:2022	Control	8.16: Monitoring activities
Use the filter dropdown in the top-right corner of the list to filter reports by their specific requirement, act, article, section, or control reference.

All reports in this tab are of type Log Compliance and Default report type. You can schedule, export, or use the Actions menu on each report just like any other report on the screen.

Related Topics
Reports Overview
Create Custom Reports


Creating Custom Reports
Motadata ObserveOps (formerly known as AIOps) offers a powerful feature that allows you to create custom reports tailored to your specific needs. The process to create custom reports in Motadata ObserveOps is divided into three steps, each focusing on different aspects of report creation:

Navigation
Go to Menu, Select Reports . Click on  button to start creating a custom report.

The process of creating a custom report is simple and intuitive, consisting of three straightforward steps:

1. Report Type
Begin by selecting the type of report you want to create. Choose from the following options:

Report Type Description
Availability Monitor the availability and uptime of your critical components.
Performance Gain insights into the performance metrics of your infrastructure.
Inventory View detailed information about all your monitored resources.
Active Alerts Track currently active alerts within your environment.
Availability Status Focus specifically on availability alerts.
Metric Alerts Focus specifically on metric alerts.
Log Analytics Analyze log data to uncover insights and trends.
Log Events Focus on the raw log data.
Flow Analytics Gain insights from network flow data.
Custom Script Create custom reports using scripts tailored to your requirements.
Polling Data Gain insights into polling-data.
Trap Events Focus on the tap events.
Forecast Helps to predict future metric behavior using historical data trends.
Capacity Forecasting To predict when infrastructure components will reach their capacity limits.
Historical Trend Focus on the historical trend.
Audit To have detailed visibility into system-level activities performed across different modules within the platform.
Compliance To provide detailed visibility into the compliance-related activities within the platform.
APM To provide detailed visibility into the APM-related activities within the platform.
RUM To provide detailed visibility into the RUM-related activities within the platform.
NetRoute To provide detailed visibility into the NetRoute-related activities within the platform.

Each report type serves a specific purpose and offers unique insights into your environment.

1. Report Criteria
After selecting the report type, proceed to define the report criteria. This step involves specifying what data will be displayed on the report and how it will be presented. Similar to creating widgets on a dashboard, you have the flexibility to choose from various visualization options and configure the data sources. Additionally, you can preview the report you are creating in this step to assess how your report will appear before finalizing it.

The process of defining the criteria for a report will depend on the Report Type that you select in the Step 1. Click on the corresponding links below to define criteria for each report type:

Availability Report
Performance Report
Inventory Report
Active Alerts Report
Availability Status Report
Availability Flap Summary
Metric Alerts Report
Log Events
Log Analytics Report
Flow Analytics Report
Custom Script Report
Polling Data Report
Trap Events Report
Forecast Report
Capacity Forecasting Report
Historical Trend Report
Audit Report
Compliance Report
APM
RUM
NetRoute
3. Report Properties
Once the report criteria are specified, proceed to define the report properties. Here, you can set properties such as the name of the report, the category it belongs to, the schedule for sending the report to specific individuals, and more.

Here, you can define the essential properties of your report to ensure proper categorization and easy identification. These properties help organize your custom reports effectively.

Enter the details on the Report Properties screen as following:

Field Description
Report Name Provide a unique report name to identify the report.
Report Description Provide a description of the report.
Report Category Select the category of the report.
Report Orientation 

- Auto : Select this so that the layout of your report gets auto adjusted according to the number of columns in the report.

- Portrait : Select this option to set the layout of your report as Portrait

- Landscape : Select this option to set the layout of your report as Landscape

Schedule Use this toggle button to schedule your custom report. Configure the scheduling settings including recepients, date, and time for sending the report to specific individuals.
Select Save & Exit to create the report and exit.

By following these three steps, you can create custom reports tailored to your organization's specific monitoring requirements, enabling you to gain deeper insights and make informed decisions about your IT environment.
