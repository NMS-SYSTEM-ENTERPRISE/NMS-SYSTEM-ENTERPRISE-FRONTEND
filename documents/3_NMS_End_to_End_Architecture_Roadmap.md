# Enterprise NMS: End-to-End Architectural Roadmap & Implementation Plan

Based on the thorough analysis of the `Credential Profile` and `Discovery Profile` foundations, this report outlines the end-to-end architectural roadmap for building out the remaining Network Management System (NMS) features. 

## 1. The Foundation Analysis (Discovery Engine)
I have reviewed your backend implementation and discovered a highly robust architecture:
1. **Python FastAPI Backend** manages the API layers and user configurations.
2. **Go-based Poller (`nms-discovery/poller/worker.go`)** handles the highly concurrent network discovery (Ping/SNMP).
3. **Database Flow**: User creates `CredentialProfiles` -> Attaches to `DiscoveryProfiles` -> Go Poller executes -> Successful hits are stored in the `discovered_devices` table.

**Current State**: Devices are currently captured in the `discovered_devices` table with `status="Discovered"`. 

**Critical Next Step**: Implement a **"Commissioning"** workflow. Discovered devices must be explicitly "Commissioned" by an admin to move them into an active `monitored_nodes` table, triggering continuous data polling.

---

## 2. End-to-End Feature Implementation Plan

With the foundational nodes (Core Switches, Distribution Switches, Edge Switches, Servers, Cameras, and Routers) captured, here is the exact plan to implement the remaining screens and their backend architectures.

### 2.1 `/network-monitoring` (The Inventory & Node Details)
- **Concept**: The central hub for all commissioned devices.
- **Backend Architecture**: A relational table `monitored_nodes` linked to the discovery data. A Go-based continuous poller will run every 5 minutes fetching CPU, Memory, and Interface status via SNMP.
- **Frontend**: A highly filterable data grid categorizing devices by type (Switch, Router, Server, Camera). Clicking a node routes to a detailed Node Dashboard showing real-time gauges and historical graphs.

### 2.2 `/network-topology` (Layer 2/3 Mapping)
- **Concept**: Visual mapping of how Core -> Distribution -> Edge switches connect.
- **Backend Architecture**: The Go poller must query **LLDP (Link Layer Discovery Protocol)** and **CDP (Cisco Discovery Protocol)** SNMP MIBs on all commissioned switches. The backend parses these neighbor tables to calculate physical links.
- **Frontend**: Utilize a canvas/WebGL graphing library (like D3.js or React Flow) to draw dynamic, draggable network maps with link-status colors (Green/Red).

### 2.3 `/alerts` & `/trap-explorer` (Event Management)
- **Concept**: Real-time fault detection.
- **Backend Architecture**: 
  - *Active Polling*: If the Go poller detects CPU > 90% or a Node Down, it inserts a record into the `alerts` table.
  - *Passive Listening (Traps)*: A UDP listener daemon runs on port 162. When a switch interface goes down, it sends an SNMP Trap. The daemon parses the trap and streams it to the `/trap-explorer` via WebSockets, and evaluates it against Alert Rules.
- **Frontend**: Real-time streaming grids (using WebSocket/SSE) with alert acknowledgement workflows (Acknowledge, Mute, Resolve).

### 2.4 `/metric-explorer` & `/dashboard` (Data Visualization)
- **Concept**: Time-series visualization and high-level NOC (Network Operations Center) overviews.
- **Database Architecture**: Relational DBs (PostgreSQL/MySQL) are too slow for millions of metric data points. Introduce a **Time-Series Database (TSDB)** like InfluxDB or TimescaleDB. The Go poller writes metrics (CPU %, Interface Traffic Mbps) directly to the TSDB.
- **Frontend**: The `/dashboard` aggregates data (e.g., "Top 5 Switches by CPU"). `/metric-explorer` allows custom graphing where users select a node, a metric, and a time window.

### 2.5 `/flow` (Traffic Analysis)
- **Concept**: Deep packet/bandwidth analysis.
- **Backend Architecture**: Core and Distribution switches will be configured to send NetFlow/sFlow/IPFIX packets to the NMS server. A dedicated UDP collector service must parse these flow records, aggregate them (Source IP, Dest IP, Protocol, Bytes), and store them in a fast analytical DB (like ClickHouse).
- **Frontend**: Sankey diagrams and Top Talkers pie charts showing exactly *what* application is consuming bandwidth.

### 2.6 `/slo` (Service Level Objectives)
- **Concept**: Uptime and performance SLAs.
- **Backend Architecture**: A scheduled cron job that calculates the percentage of "UP" time versus "DOWN" time over a month for grouped devices (e.g., "All Core Switches"). 
- **Frontend**: Progress bars and burn-down charts showing if the 99.99% uptime objective is being met.

### 2.7 `/netpath` (Path Analysis)
- **Concept**: Visualizing the hop-by-hop latency to critical routers.
- **Backend Architecture**: The poller executes specialized `traceroute` or TCP-ping commands and stores the latency per hop.
- **Frontend**: A horizontal, node-based flowchart showing latency bottlenecks between the NMS and the target router.

### 2.8 `/log-management` & `/audit`
- **Concept**: Syslog collection and internal system auditing.
- **Backend Architecture**: 
  - *Syslog*: A daemon listening on UDP 514 to receive logs from Routers and Switches. Stored in Elasticsearch or OpenSearch for fast full-text searching.
  - *Audit*: FastAPI middleware that intercepts every `POST/PUT/DELETE` request and logs the User ID and action to an `audit_logs` table.
- **Frontend**: Infinite scrolling, heavily indexed search interfaces.

### 2.9 `/apm` (Application Performance) & `/ticketing`
- **Concept**: Server application tracing and ITSM integration.
- **Backend Architecture**: 
  - *APM*: Agents installed on the "Servers" discovered in Step 1 send tracing data (OpenTelemetry) to the NMS.
  - *Ticketing*: Webhook integrations with Jira/ServiceNow triggered automatically by severe records in the `alerts` table.

---

## 3. Database Architecture Strategy

To support this massive scale of data from Core Switches to Edge Cameras, you must adopt a **Polyglot Persistence Strategy**:

1. **Relational Database (PostgreSQL/MySQL)**: Use for configurations, users, credentials, discovery profiles, and the core inventory (`monitored_nodes`).
2. **Time-Series Database (TimescaleDB or InfluxDB)**: Use strictly for high-frequency polling data (Interface traffic, CPU utilization polled every 5 mins).
3. **Search Engine (Elasticsearch / VictoriaLogs)**: Use for Syslogs and SNMP Traps where rapid full-text searching is required.
4. **Analytical Database (ClickHouse)**: Highly recommended for NetFlow data, as it requires aggregating millions of network traffic rows per second.

---

## 4. Immediate Action Plan

To move forward methodically, I recommend executing the development in the following phases:

### Phase 1: The Inventory Bridge
- Create the **Device Commissioning UI**. Move devices from `/settings/discovery/profile` results into the official `/network-monitoring` inventory.
- Expand the Go Poller to start pulling standard MIB-II data (CPU, Memory, Interfaces) for commissioned devices.

### Phase 2: Visibility & Alerting
- Implement `/metric-explorer` and `/dashboard` reading from the TSDB.
- Set up the Alert Rules engine and the `/alerts` screen.

### Phase 3: Advanced Networking
- Implement `/network-topology` by parsing LLDP tables.
- Set up the Syslog and Trap listeners for `/log-management` and `/trap-explorer`.

This architecture guarantees that as you discover thousands of switches and routers, the system will scale gracefully without UI freezing or database locking.
