/**
 * Infrastructure Developer Documentation
 * End-to-end system architecture and deployment
 */

export const infrastructureDocumentation = {
  'infra-overview': {
    title: 'System Overview',
    category: 'Infrastructure',
    description: 'Complete end-to-end system architecture',
    content: `
## System Overview

### Architecture Layers

1. **Data Collection Layer**
   - SNMP poller (Python)
   - Syslog receiver (UDP)
   - NetFlow collector (IPFix)
   - APM agent integration
   - Custom API providers

2. **Processing Layer**
   - Message queue (Redis/RabbitMQ)
   - Stream processing engines
   - Data validation & transformation
   - Metric aggregation

3. **Storage Layer**
   - TimescaleDB (metrics)
   - PostgreSQL (operational data)
   - Redis (caching)
   - File storage (exports)

4. **API Layer**
   - FastAPI backend
   - REST endpoints
   - WebSocket connections
   - Authentication & authorization

5. **Presentation Layer**
   - Next.js frontend
   - React components
   - Real-time dashboards
   - Data visualization

6. **Infrastructure**
   - Docker containers
   - Kubernetes orchestration
   - Load balancing
   - Monitoring & logging

### Technology Stack

**Backend**
- Python 3.11
- FastAPI 0.109
- SQLAlchemy ORM
- Pydantic validation
- Celery async tasks
- APScheduler scheduling

**Database**
- PostgreSQL 14
- TimescaleDB extension
- Redis 7
- Elasticsearch (optional)

**Frontend**
- Next.js 16
- React 19
- ECharts visualization
- Axios HTTP client
- CSS Modules styling

**Infrastructure**
- Docker & Docker Compose
- Kubernetes (optional)
- Nginx reverse proxy
- Prometheus monitoring
- ELK Stack logging

### Component Interactions

**Device Discovery Flow**
Network Scanner → SNMP Collector → Message Queue → Processing Engine → Storage → API → Frontend

**Alert Generation**
Metric Collection → Threshold Check → Alert Engine → Notification Service → Frontend Notification

**Dashboard Updates**
Database → API Endpoint → WebSocket → Frontend → UI Re-render

    `,
    diagram: `
graph TB
    subgraph Collection["Collection Layer"]
        SNMPPoller["SNMP Poller"]
        SyslogRx["Syslog Receiver"]
        NetFlow["NetFlow Collector"]
        APM["APM Agent"]
    end

    subgraph Queue["Message Queue"]
        Redis["Redis/RabbitMQ"]
    end

    subgraph Processing["Processing Layer"]
        Validator["Data Validator"]
        Aggregator["Metric Aggregator"]
        AlertEngine["Alert Engine"]
    end

    subgraph Storage["Storage Layer"]
        TimescaleDB["TimescaleDB"]
        PostgreSQL["PostgreSQL"]
        Elasticsearch["Elasticsearch"]
        Cache["Redis Cache"]
    end

    subgraph API["API Layer"]
        FastAPI["FastAPI Backend"]
    end

    subgraph Frontend["Frontend Layer"]
        NextJS["Next.js App"]
    end

    Collection -->|Publish| Queue
    Queue -->|Consume| Processing
    Processing -->|Store| Storage
    Storage -->|Query| FastAPI
    FastAPI -->|REST/WS| NextJS
    NextJS -->|Render| Browser["User Browser"]
    `,
  },

  'infra-dataflow': {
    title: 'Data Flow Diagrams',
    category: 'Infrastructure',
    description: 'Complete pipeline from collection to visualization',
    content: `
## Data Flow Pipelines

### SNMP Metrics Collection

1. **Discovery Phase**
   - Network range scan
   - Device SNMP walk
   - OID mapping
   - Device registration

2. **Collection Phase**
   - Periodic polling (every 5 min)
   - Bulk get requests
   - Performance counters
   - Status indicators

3. **Processing Phase**
   - Data validation
   - Unit conversion
   - Threshold checking
   - Trend calculation

4. **Storage Phase**
   - Compression
   - Aggregation (1h, 1d, 1w)
   - Retention policy
   - Archival

5. **Retrieval Phase**
   - Query optimization
   - Caching layer
   - API aggregation
   - Real-time streaming

### Syslog Event Processing

\`\`\`
Device
  ↓ UDP/514
Syslog Receiver
  ↓ Parse (severity, facility)
Message Queue
  ↓ Consume
Event Enricher (Add metadata)
  ↓ Match rules
Rule Engine (Correlation)
  ↓ If triggered
Alert Creator (Generate alert)
  ↓ Store
Alert Database
  ↓ Subscribe (WebSocket)
Frontend (Real-time notification)
\`\`\`

### Alert Notification Flow

\`\`\`
Metric Value Exceeds Threshold
  ↓
Alert Policy Check
  ↓
Alert Created (store in DB)
  ↓ Fork into parallel processes
  ├─→ Send Email
  ├─→ Send Slack
  ├─→ Send SMS
  └─→ Publish WebSocket
     ↓
Frontend receives update
  ↓
User notification displayed
\`\`\`

### Dashboard Refresh Pattern

\`\`\`
Frontend mounted
  ↓
Establish WebSocket connection
  ↓
Subscribe to metric streams
  ↓ Continuous
Backend publishes metrics (every 30s)
  ↓
Frontend receives update
  ↓
Update React state
  ↓
Component re-renders
  ↓
Chart animated update
\`\`\`

    `,
    diagram: null,
  },

  'infra-protocols': {
    title: 'Communication Protocols',
    category: 'Infrastructure',
    description: 'SNMP, Syslog, NetFlow, APM protocols',
    content: `
## Supported Protocols

### SNMP v2c/v3

**Implementation**
- Community strings for v2c
- USM for v3 authentication
- Bulk get optimization
- Walk operations for tree traversal

**OID Groups Monitored**
\`\`\`
1.3.6.1.2.1.1    System group (hostname, uptime)
1.3.6.1.2.1.2    Interfaces group
1.3.6.1.2.1.25   Host resources
1.3.6.1.4.1.9    Cisco specific
\`\`\`

**Polling Strategy**
- Base interval: 5 minutes
- Fast interval: 1 minute (alerts)
- Slow interval: 30 minutes (bulk data)
- Configurable per device

### Syslog (RFC 3164/5424)

**Receivers**
\`\`\`
UDP 514 - Legacy format
TCP 514 - Reliable delivery
UDP 601 - TLS variant
\`\`\`

**Message Format**
\`\`\`
<PRI>TIMESTAMP HOSTNAME TAG[PID]: MESSAGE

Facility: 0-23
Severity: 0=Emergency, 7=Debug
\`\`\`

**Processing**
- Real-time parsing
- Facility/severity extraction
- Pattern matching
- Event correlation
- Retention: 90 days

### NetFlow v5/v9/IPFIX

**Collection**
- UDP port 2055 (default)
- Flow timeout: 15 minutes
- Active timeout: 30 minutes
- Aggregation: 5-tuple

**Exported Fields**
- Source/Dest IP
- Source/Dest Port
- Protocol, Bytes, Packets
- Ingress/Egress interface
- VLAN, Next Hop

**Use Cases**
- Traffic analysis
- Bandwidth monitoring
- DDoS detection
- Security investigation

### APM Agent Integration

**Supported Agents**
- OpenTelemetry
- Jaeger
- DataDog
- New Relic

**Trace Attributes**
- Service name
- Span duration
- Error status
- Custom tags

    `,
    diagram: null,
  },

  'infra-deployment': {
    title: 'Deployment Architecture',
    category: 'Infrastructure',
    description: 'Single-server and multi-server deployments',
    content: `
## Deployment Models

### Single-Server Deployment

**Hardware Requirements**
- CPU: 8+ cores
- RAM: 32+ GB
- Storage: 1TB+ (SSD)
- Network: 1Gbps

**Docker Compose Setup**
\`\`\`yaml
version: '3.8'
services:
  postgres:
    image: timescale/timescaledb-ha:latest
    environment:
      POSTGRES_DB: nms_management
      POSTGRES_USER: nms_admin
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: ./NMS-SYSTEM-ENTERPRISE-BACKEND
    environment:
      DATABASE_URL: postgresql://nms_admin:\${DB_PASSWORD}@postgres:5432/nms_management
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis
    ports:
      - "8000:8000"

  frontend:
    build: ./NMS-SYSTEM-ENTERPRISE-FRONTEND
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8000/api/v1
    ports:
      - "3000:3000"

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
\`\`\`

### Multi-Server Deployment

**Architecture**
\`\`\`
Load Balancer (Nginx/HAProxy)
├─ Frontend Server 1 (3000)
├─ Frontend Server 2 (3000)
├─ API Server 1 (8000)
└─ API Server 2 (8000)

Shared Storage
├─ PostgreSQL (Primary + Replica)
├─ Redis Cluster
└─ Elasticsearch

Monitoring Stack
├─ Prometheus
├─ Grafana
└─ ELK Stack
\`\`\`

### Kubernetes Deployment

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nms-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nms-backend
  template:
    metadata:
      labels:
        app: nms-backend
    spec:
      containers:
      - name: backend
        image: nms-backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: nms-secrets
              key: database-url
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: nms-backend-service
spec:
  selector:
    app: nms-backend
  ports:
  - protocol: TCP
    port: 8000
    targetPort: 8000
  type: LoadBalancer
\`\`\`

    `,
    diagram: null,
  },

  'infra-monitoring': {
    title: 'Monitoring & Observability',
    category: 'Infrastructure',
    description: 'Prometheus, Grafana, ELK stack, and logging',
    content: `
## Monitoring Stack

### Prometheus Metrics

**Backend Metrics**
- Request count (by endpoint)
- Request duration (p50, p95, p99)
- Error rate
- Database query time
- Queue depth
- Cache hit ratio

**Configuration**
\`\`\`yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'backend'
    static_configs:
      - targets: ['localhost:8000']
    metrics_path: '/metrics'

  - job_name: 'postgres'
    static_configs:
      - targets: ['localhost:5432']

  - job_name: 'redis'
    static_configs:
      - targets: ['localhost:6379']
\`\`\`

### Grafana Dashboards

**Pre-built Dashboards**
1. System Overview - CPU, Memory, Disk, Network
2. API Performance - Response times, errors, throughput
3. Database Health - Connections, queries, replication
4. Redis Cache - Hit ratio, evictions, memory usage
5. Alerts Status - Active alerts, trends, SLA
6. Device Inventory - Online/offline, utilization
7. Network Traffic - Bandwidth, packet loss, jitter

### ELK Stack (Elasticsearch, Logstash, Kibana)

**Log Types**
\`\`\`
Backend Logs:
  - Application logs (INFO, WARN, ERROR)
  - Access logs (HTTP)
  - Audit logs (user actions)

System Logs:
  - Docker/Kubernetes
  - System services
  - Network events
\`\`\`

**Logstash Pipeline**
\`\`\`
input {
  file {
    path => "/var/log/nms/app.log"
    start_position => "beginning"
  }
}

filter {
  json {
    source => "message"
  }
  date {
    match => ["timestamp", "ISO8601"]
  }
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "nms-logs-%{+YYYY.MM.dd}"
  }
}
\`\`\`

### Health Checks

\`\`\`python
# Backend health endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "database": check_db(),
        "redis": check_redis(),
        "timestamp": datetime.utcnow()
    }
\`\`\`

### Alerting Rules

\`\`\`yaml
groups:
- name: nms_alerts
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_errors[5m]) > 0.05
    for: 5m
    annotations:
      summary: "High error rate"

  - alert: DBConnectionPoolExhausted
    expr: db_pool_available < 5
    for: 2m
    annotations:
      summary: "Database connection pool low"

  - alert: RedisMemoryHigh
    expr: redis_memory_used_percent > 90
    for: 5m
    annotations:
      summary: "Redis memory usage critical"
\`\`\`

    `,
    diagram: null,
  },

  'infra-scaling': {
    title: 'Scaling & Performance',
    category: 'Infrastructure',
    description: 'Optimization strategies and capacity planning',
    content: `
## Scaling Strategies

### Horizontal Scaling

**Backend API Scaling**
- Stateless FastAPI instances
- Load balancer (Nginx/HAProxy)
- Session storage in Redis
- Shared database connection

**Frontend Scaling**
- CDN for static assets (Cloudflare)
- Edge caching
- Geographic distribution
- Next.js ISR (Incremental Static Regeneration)

**Database Scaling**
- Master-slave replication
- Read replicas for reporting
- Sharding (by region/customer)
- TimescaleDB hypertable compression

### Vertical Scaling

**CPU Scaling**
- Async task workers (Celery)
- Process pool optimization
- GIL awareness (Python)
- CPU pinning for real-time tasks

**Memory Scaling**
- Redis cluster mode
- Connection pooling
- Caching strategy
- Query result caching

**I/O Scaling**
- SSD storage
- Parallel queries
- Batch processing
- Asynchronous operations

### Performance Optimization

**API Performance**
\`\`\`
Response Time Targets:
- P50: < 100ms
- P95: < 500ms
- P99: < 2s

Optimization:
- Pagination (max 1000 items)
- Field selection
- Index optimization
- Query caching
\`\`\`

**Database Performance**
\`\`\`sql
-- Index strategy
CREATE INDEX idx_device_status ON devices(status);
CREATE INDEX idx_metric_timestamp ON metrics(device_id, timestamp DESC);
CREATE INDEX idx_alert_severity ON alerts(severity, created_at DESC);

-- Partitioning
SELECT create_hypertable('metrics', 'timestamp', if_not_exists => TRUE);

-- Compression
ALTER TABLE metrics SET (timescaledb.compress, timescaledb.compress_interval_length => '1 day');
\`\`\`

**Frontend Performance**
\`\`\`
Metrics:
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1

Optimization:
- Code splitting
- Image lazy loading
- CSS minification
- Bundle analysis
\`\`\`

### Capacity Planning

**Growth Model**
- Year 1: 1000 devices
- Year 2: 5000 devices
- Year 3: 20000 devices

**Storage Requirements**
- Metric retention: 2 years
- 5-minute interval = 525,600 points/year/device
- Average metric size: 100 bytes
- Compression ratio: 10:1
- Year 1: 50GB, Year 3: 2TB

**CPU/Memory Requirements**
- Polling engines: 2 CPU cores per 5000 devices
- API servers: 1 CPU per 100 concurrent users
- Database: 4+ cores, 16GB+ RAM
- Total: Vertical + Horizontal growth

    `,
    diagram: null,
  },
};

export default infrastructureDocumentation;
