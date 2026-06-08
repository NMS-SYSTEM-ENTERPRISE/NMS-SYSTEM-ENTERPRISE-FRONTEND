/**
 * Developer Documentation Content
 * Comprehensive technical documentation for NMS system
 */

export const documentationData = {
  // ============================================================================
  // BACKEND DOCUMENTATION
  // ============================================================================

  'backend-architecture': {
    title: 'Backend Project Architecture & Setup',
    category: 'Backend',
    description: 'Complete overview of FastAPI backend architecture',
    content: `
## Backend Architecture Overview

### Technology Stack
- **Framework**: FastAPI (async Python web framework)
- **Server**: Uvicorn (ASGI server)
- **Database ORM**: SQLAlchemy 2.0
- **Database**: PostgreSQL 14+ with TimescaleDB
- **Validation**: Pydantic v2
- **Authentication**: JWT, LDAP, MSAL, SAML
- **SNMP**: pysnmp-lextudio

### Core Architecture Principles

1. **Async-First Design**
   - All I/O operations use async/await
   - Non-blocking database queries
   - Concurrent request handling

2. **Modular Structure**
   - Each feature in separate module
   - Clear separation of concerns
   - Consistent patterns across modules

3. **Layered Architecture**
   - Router layer (FastAPI endpoints)
   - Service layer (business logic)
   - Data layer (database operations)
   - Model layer (ORM models)

4. **Dependency Injection**
   - FastAPI's elegant DI system
   - Easy testing and mocking
   - Clean request handlers

### Project Structure

\`\`\`
app/
├── main.py                    # Entry point, startup/shutdown events
├── core/
│   ├── config.py             # Environment configuration
│   └── audit_middleware.py   # Request logging middleware
├── db/
│   ├── session.py            # Database connection management
│   ├── base.py               # SQLAlchemy declarative base
│   └── base_class.py         # Base model mixins
└── modules/
    ├── settings/             # User & system configuration
    ├── network_monitoring/   # Core monitoring features
    ├── apm/                  # Application performance monitoring
    └── chatbot/              # AI chatbot module
\`\`\`

### How Modules Are Organized

Each module follows this pattern:

\`\`\`
module_name/
├── __init__.py
├── module_router.py          # API endpoints (FastAPI Router)
├── models.py                 # SQLAlchemy ORM models
├── schemas.py                # Pydantic request/response schemas
├── crud.py                   # Database CRUD operations
├── utils.py                  # Helper functions (optional)
└── engine.py                 # Background task engine (optional)
\`\`\`

### Key Features of Architecture

- **RESTful API** with proper HTTP conventions
- **Async concurrency** for thousands of concurrent requests
- **Type safety** with Pydantic validation
- **Database relationships** with SQLAlchemy ORM
- **Background tasks** using asyncio
- **SNMP integration** for device monitoring
- **Event-driven** architecture for real-time updates
- **Audit logging** of all requests

### Startup Process

1. FastAPI app initialized
2. Database tables auto-created
3. V1 API router included
4. CORS middleware configured
5. Audit middleware added
6. Background tasks started:
   - Syslog server (UDP:514)
   - SNMP trap engine (UDP:1620)
   - Alert evaluation engine
   - Device sync job (every 60s)
   - APM metrics collection
   - Log processing engine

    `,
    diagram: `
graph TD
    A["FastAPI Application"] -->|startup event| B["Initialize Database"]
    B --> C["Create Tables"]
    C --> D["Start Background Engines"]
    D -->|Syslog Server| E["UDP:514"]
    D -->|Trap Engine| F["UDP:1620"]
    D -->|Alert Engine| G["Continuous Eval"]
    D -->|Device Sync| H["Every 60s"]
    D -->|APM Engine| I["Service Health"]
    A -->|CORS| J["Cross-Origin Requests"]
    A -->|Audit| K["Request Logging"]
    A -->|Routes| L["v1: /api/v1"]
    A -->|Routes| M["v2: /api/v2"]
    L -->|includes| N["User Settings"]
    L -->|includes| O["Network Monitoring"]
    L -->|includes| P["Alerts & Traps"]
    `,
  },

  'backend-database': {
    title: 'Database Layer & Models',
    category: 'Backend',
    description: 'PostgreSQL schema design and SQLAlchemy ORM models',
    content: `
## Database Architecture

### Database Technology
- **Primary**: PostgreSQL 14+
- **Time-Series**: TimescaleDB extension
- **ORM**: SQLAlchemy 2.0
- **Driver**: psycopg2-binary

### Core Database Tables

#### Authentication & Authorization
- **users**: User accounts, profiles, passwords
- **roles**: Role definitions (Admin, Operator, Viewer)
- **permissions**: Permission definitions (resource:action)
- **user_roles**: Many-to-many user-role mapping
- **role_permissions**: Many-to-many role-permission mapping

#### Device Management
- **devices**: Network device inventory
- **interfaces**: Network interfaces on devices
- **device_metrics_history**: Time-series metrics (hypertable)
- **interface_metrics_history**: Interface metrics (hypertable)

#### Alerts & Events
- **alerts**: Alert rule definitions
- **alert_history**: Alert trigger records
- **snmp_traps**: SNMP trap logs
- **syslog_events**: Syslog message records

#### Network & Flow
- **flow_records**: NetFlow/sFlow records
- **services**: APM monitored services
- **traces**: Application request traces

#### Configuration
- **discovery_profiles**: Network discovery definitions
- **credential_profiles**: SNMP/SSH credentials (encrypted)
- **reports**: Report templates

#### Ticketing & Audit
- **tickets**: Incident/ticket records
- **ticket_comments**: Ticket discussion
- **audit_logs**: User action audit trail

### TimescaleDB Hypertables

Automatic partitioning and compression:
\`\`\`sql
CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

-- Metrics automatically partitioned by time
SELECT create_hypertable('device_metrics_history', by_range('time'));
SELECT create_hypertable('interface_metrics_history', by_range('time'));
\`\`\`

Benefits:
- Automatic time-based partitioning
- Compression of old data
- Fast time-range queries
- Downsampling for long-term storage

### Key Design Patterns

1. **Soft Deletes**: is_active flag instead of hard deletes
2. **Timestamps**: created_at, updated_at on all tables
3. **Indexing**: Strategic indexes for common queries
4. **Relationships**: Foreign keys for data integrity
5. **Partitioning**: Time-based for metrics tables

### Sample Model Structure

\`\`\`python
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from app.db.base import Base
from datetime import datetime

class Device(Base):
    __tablename__ = "devices"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    ip_address = Column(String(50), unique=True)
    status = Column(String(20))  # 'up', 'down'
    device_type = Column(String(100))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)
\`\`\`

### Relationships

- **Device → Interfaces** (1:M)
- **Device → Metrics** (1:M)
- **Device → Traps** (1:M)
- **Alert Rules → Alert History** (1:M)
- **User → Tickets** (1:M)
- **Service → Traces** (1:M)

    `,
    diagram: `
graph TD
    A["PostgreSQL Database"] --> B["TimescaleDB Extension"]
    A --> C["Core Tables"]
    C --> D["Users & Auth"]
    C --> E["Devices & Monitoring"]
    C --> F["Alerts & Events"]
    C --> G["Configuration"]
    D -->|users| D1["credentials"]
    D -->|roles| D2["permissions"]
    E -->|devices| E1["interfaces"]
    E -->|metrics| E2["Hypertables"]
    F -->|alerts| F1["history"]
    F -->|events| F2["traps/logs"]
    B --> H["Automatic Partitioning"]
    B --> I["Compression"]
    B --> J["Fast Time-Range Queries"]
    `,
  },

  'backend-services': {
    title: 'Core Services & Data Ingestion',
    category: 'Backend',
    description: 'Business logic, service layer, and data collection methods',
    content: `
## Core Services & Data Ingestion

### Data Ingestion Pipeline

#### 1. SNMP Polling Service
**Purpose**: Query devices for metrics
- Periodic queries every 60 seconds
- Retrieves: CPU, memory, interfaces, uptime
- Async SNMP queries for concurrency
- Automatic device status updates

**Flow**:
\`\`\`
Scheduled Task (every 60s)
  → Get all active devices
  → Parallel SNMP queries
  → Parse responses
  → Store in device_metrics_history
  → Update device status
  → Evaluate alert rules
\`\`\`

#### 2. SNMP Trap Engine
**Purpose**: Receive and process device events
- Listens on UDP port 1620
- Async UDP socket
- Parses SNMP trap OIDs
- Stores in database
- Triggers alerts

**Flow**:
\`\`\`
Device sends SNMP Trap (UDP:162 → redirected to 1620)
  → Trap engine receives
  → Parse OID and values
  → Map to device
  → Store in snmp_traps table
  → Check alert rules
  → Create alert if needed
\`\`\`

#### 3. Syslog Server
**Purpose**: Collect system logs from devices
- Listens on UDP port 514
- Async UDP datagram handler
- Parses RFC 3164/5424 format
- Extracts: timestamp, hostname, facility, severity, message

**Flow**:
\`\`\`
Device sends Syslog (UDP:514)
  → Syslog server receives
  → Parse message
  → Identify source device
  → Extract components
  → Store in syslog_events
  → Real-time streaming to UI
\`\`\`

#### 4. NetFlow Collector
**Purpose**: Analyze network traffic
- Collects NetFlow v5/v9/v10 (IPFIX)
- UDP port 2055
- Parses flow records
- Aggregates traffic data

**Flow**:
\`\`\`
Router/Switch exports NetFlow (UDP:2055)
  → Collector receives
  → Parse flow records
  → Calculate bandwidth
  → Identify top talkers
  → Store in flow_records
  → Real-time visualization
\`\`\`

#### 5. APM Service
**Purpose**: Monitor application performance
- Health check endpoints
- Performance metrics collection
- Service dependency mapping
- Trace collection

**Flow**:
\`\`\`
APM Agent sends metrics
  → Collect response times
  → Track error rates
  → Store service metrics
  → Detect anomalies
  → Create alerts
\`\`\`

### Service Layer Architecture

\`\`\`python
# Service pattern
class DeviceService:
    async def sync_device_metrics(self, device_id):
        # SNMP query
        metrics = await snmp_client.get_metrics(device.ip)
        
        # Validate
        validated = validate_metrics(metrics)
        
        # Store
        await db.store_metrics(device_id, validated)
        
        # Check alerts
        await alert_engine.evaluate(device_id, validated)

class AlertService:
    async def evaluate_alert_rule(self, rule, metrics):
        # Check condition
        if metrics['cpu'] > rule['threshold']:
            # Create alert
            alert = await create_alert(rule, metrics)
            
            # Notify
            await notify_service.send(alert)
            
            # Create ticket if configured
            if rule['auto_ticket']:
                await ticketing_service.create(alert)
\`\`\`

### Background Task Engines

1. **Device Sync** (every 60 seconds)
   - Query all devices
   - Collect metrics
   - Update status

2. **Alert Engine** (every 30 seconds)
   - Evaluate all rules
   - Create alerts
   - Send notifications

3. **Trap Engine** (real-time)
   - Listen for SNMP traps
   - Parse and store
   - Trigger actions

4. **Syslog Server** (real-time)
   - Listen for syslog messages
   - Parse and categorize
   - Store for analysis

5. **Log Engine**
   - Actively fetch logs from devices
   - SSH/Telnet connections
   - Parse and store

6. **APM Engine** (every 60 seconds)
   - Query service health checks
   - Collect performance metrics
   - Detect anomalies

    `,
    diagram: `
graph TD
    subgraph "Data Ingestion Pipeline"
        A["SNMP Polling"] -->|every 60s| B["Device Metrics"]
        C["SNMP Traps"] -->|real-time| D["Device Events"]
        E["Syslog"] -->|UDP:514| F["System Logs"]
        G["NetFlow"] -->|UDP:2055| H["Traffic Data"]
        I["APM"] -->|health checks| J["Service Metrics"]
    end
    
    subgraph "Processing"
        B -->|validate| K["Database Write"]
        D -->|parse| K
        F -->|extract| K
        H -->|aggregate| K
        J -->|analyze| K
    end
    
    subgraph "Actions"
        K --> L["Alert Engine"]
        L -->|trigger| M["Notifications"]
        L -->|create| N["Tickets"]
        L -->|update| O["UI Real-time"]
    end
    `,
  },

  'backend-api': {
    title: 'API Layer & Routing',
    category: 'Backend',
    description: '200+ REST endpoints, versioning, and request handling',
    content: `
## API Architecture

### API Versioning

- **Current**: /api/v1 (production)
- **Future**: /api/v2 (placeholder)
- Allows API evolution without breaking clients

### API Router Structure

\`\`\`python
# app/modules/settings/api.py
from fastapi import APIRouter

api_router = APIRouter()

# Include sub-routers
api_router.include_router(user_router, prefix="/user-settings")
api_router.include_router(system_router, prefix="/system-settings")
api_router.include_router(discovery_router, prefix="/discovery-settings")
api_router.include_router(device_router)
api_router.include_router(alerts_router)
api_router.include_router(traps_router)
# ... more routers

# Mount in main app
app.mount("/api/v1", v1_app)
\`\`\`

### Endpoint Categories (200+)

#### User Settings (15+)
- POST /users - Create user
- GET /users - List users
- GET /users/{id} - Get user
- PUT /users/{id} - Update user
- DELETE /users/{id} - Delete user
- GET /roles - List roles
- GET /permissions - List permissions

#### Device Monitoring (30+)
- GET /device-monitoring/devices - List devices
- GET /device-monitoring/devices/{id} - Device details
- GET /device-monitoring/devices/{id}/metrics - Metrics
- GET /device-monitoring/devices/{id}/interfaces - Interfaces
- GET /device-monitoring/devices/{id}/history - Historical data
- POST /device-monitoring/devices - Add device
- PUT /device-monitoring/devices/{id} - Update device
- DELETE /device-monitoring/devices/{id} - Delete device

#### Alerts (20+)
- GET /alerts/rules - List alert rules
- POST /alerts/rules - Create rule
- GET /alerts/active - Active alerts
- GET /alerts/history - Alert history
- GET /alerts/history/{id} - Alert details
- POST /alerts/{id}/acknowledge - Acknowledge alert
- POST /alerts/{id}/resolve - Resolve alert

#### Additional Groups
- Traps (15+)
- Logs (20+)
- Flow (15+)
- Dashboard (10+)
- Reports (15+)
- Ticketing (20+)
- APM (25+)
- Settings (30+)

### Request/Response Pattern

\`\`\`python
from pydantic import BaseModel
from fastapi import APIRouter, Depends

# Request Schema
class CreateDeviceRequest(BaseModel):
    name: str
    ip_address: str
    snmp_version: str
    credential_profile_id: int

# Response Schema
class DeviceResponse(BaseModel):
    id: int
    name: str
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Endpoint
@router.post("/devices", response_model=DeviceResponse)
async def create_device(
    req: CreateDeviceRequest,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    # Check permissions
    if not await check_permission(current_user, "device:create"):
        raise HTTPException(status_code=403)
    
    # Create device
    device = Device(**req.dict())
    session.add(device)
    await session.commit()
    return device
\`\`\`

### Pagination Pattern

\`\`\`python
class PaginatedResponse(BaseModel):
    items: list[DeviceResponse]
    total: int
    page: int
    page_size: int
    total_pages: int

@router.get("/devices", response_model=PaginatedResponse)
async def list_devices(
    skip: int = 0,
    limit: int = 10,
    session: AsyncSession = Depends(get_session)
):
    # Query
    total = await session.scalar(select(func.count(Device.id)))
    items = await session.execute(
        select(Device).offset(skip).limit(limit)
    )
    
    return {
        "items": items.scalars().all(),
        "total": total,
        "page": skip // limit + 1,
        "page_size": limit,
        "total_pages": (total + limit - 1) // limit
    }
\`\`\`

### HTTP Status Codes

- **200**: Success
- **201**: Created
- **204**: No content
- **400**: Bad request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not found
- **422**: Validation error
- **500**: Server error

    `,
    diagram: `
graph TD
    A["HTTP Request"] -->|POST /api/v1/devices| B["Router Handler"]
    B --> C["Dependency Injection"]
    C -->|get_current_user| D["Auth Check"]
    C -->|get_session| E["Database Session"]
    D -->|validate| F["Check Permissions"]
    F -->|authorized| G["Pydantic Validation"]
    G -->|valid| H["Service Logic"]
    H --> I["Database Operation"]
    I --> J["Response Schema"]
    J -->|200/201| K["JSON Response"]
    
    F -->|denied| L["403 Forbidden"]
    G -->|invalid| M["422 Validation Error"]
    I -->|error| N["500 Server Error"]
    `,
  },

  'backend-auth': {
    title: 'Security & Authentication',
    category: 'Backend',
    description: 'JWT, LDAP, MSAL, SAML, and RBAC implementation',
    content: `
## Authentication & Security

### Authentication Methods

#### 1. JWT (JSON Web Tokens)
- Default local authentication
- Token-based stateless auth
- Issued after username/password validation

\`\`\`python
# Login endpoint
@router.post("/login", response_model=TokenResponse)
async def login(creds: LoginRequest, session: AsyncSession):
    # Validate credentials
    user = await authenticate_user(session, creds.username, creds.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate token
    token = create_jwt_token(user.id)
    refresh_token = create_refresh_token(user.id)
    
    return {
        "access_token": token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

# Token refresh
@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(token_req: RefreshTokenRequest):
    user_id = verify_refresh_token(token_req.refresh_token)
    new_token = create_jwt_token(user_id)
    return {"access_token": new_token, "token_type": "bearer"}
\`\`\`

#### 2. LDAP (Active Directory)
- Enterprise user directory integration
- Validate against AD
- Sync user attributes

\`\`\`python
@router.post("/ldap-login")
async def ldap_login(creds: LoginRequest, session: AsyncSession):
    # Connect to LDAP server
    conn = ldap3.Server(settings.LDAP_SERVER)
    conn.bind(user_dn, creds.password)
    
    if conn.bind_status:
        # Create/update user in database
        user = await sync_ldap_user(session, creds.username)
        token = create_jwt_token(user.id)
        return {"access_token": token}
    else:
        raise HTTPException(status_code=401)
\`\`\`

#### 3. MSAL (Microsoft Azure AD)
- Microsoft cloud identity
- OAuth 2.0 flow
- Enterprise integration

\`\`\`python
@router.get("/msal-login")
async def msal_login(code: str, session: AsyncSession):
    # Exchange auth code for token
    token = acquire_token_by_auth_code(code)
    
    # Get user info from Microsoft
    user_info = get_user_from_microsoft(token)
    
    # Sync or create user
    user = await sync_microsoft_user(session, user_info)
    
    # Issue JWT
    jwt_token = create_jwt_token(user.id)
    return {"access_token": jwt_token}
\`\`\`

#### 4. SAML (Enterprise SSO)
- XML-based authentication
- Enterprise single sign-on
- SAML metadata configuration

\`\`\`python
@router.post("/saml-login")
async def saml_login(saml_response: str, session: AsyncSession):
    # Validate SAML assertion
    result = validate_saml_response(saml_response)
    
    if result.is_authenticated():
        user_id = result.get_nameid()
        user = await sync_saml_user(session, user_id)
        token = create_jwt_token(user.id)
        return {"access_token": token}
\`\`\`

### Token Structure

\`\`\`json
{
  "sub": "user_id",
  "exp": 1623456789,    // 1 hour from now
  "iat": 1623453189,    // issued at
  "scopes": [
    "read:devices",
    "write:alerts",
    "read:reports"
  ]
}
\`\`\`

### Token Refresh Flow

\`\`\`
User makes request
  → Check access token
  → If not expired: proceed
  → If expired: check refresh token
  → If refresh valid: issue new access token
  → If refresh expired: redirect to login
\`\`\`

### Role-Based Access Control (RBAC)

\`\`\`python
class Permission:
    RESOURCE_DEVICE = "device"
    RESOURCE_ALERT = "alert"
    RESOURCE_REPORT = "report"
    
    ACTION_READ = "read"
    ACTION_WRITE = "write"
    ACTION_DELETE = "delete"

# Predefined roles
ADMIN_ROLE = ["device:*", "alert:*", "report:*"]
OPERATOR_ROLE = ["device:read", "device:write", "alert:read", "alert:write"]
VIEWER_ROLE = ["device:read", "alert:read", "report:read"]

# Permission check
async def check_permission(user: User, permission: str):
    # Get user roles
    roles = await user.roles
    
    # Collect permissions
    user_permissions = set()
    for role in roles:
        perms = await role.permissions
        user_permissions.update([p.name for p in perms])
    
    # Check if permission granted
    return permission in user_permissions or "*" in user_permissions
\`\`\`

### Password Security

\`\`\`python
from passlib.context import CryptContext

# Password hashing with bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hash password on storage
hashed = pwd_context.hash("plain_password")

# Verify on login
is_valid = pwd_context.verify("plain_password", hashed)
\`\`\`

### Credential Encryption

\`\`\`python
from cryptography.fernet import Fernet

cipher = Fernet(settings.ENCRYPTION_KEY)

# Encrypt sensitive data (SNMP credentials)
encrypted = cipher.encrypt(b"sensitive_data")

# Decrypt for use
decrypted = cipher.decrypt(encrypted)
\`\`\`

### Audit Logging

\`\`\`python
# Every request logged
@app.middleware("http")
async def audit_middleware(request: Request, call_next):
    # Log request
    audit_log = {
        "user_id": request.user.id,
        "action": f"{request.method} {request.url.path}",
        "ip_address": request.client.host,
        "timestamp": datetime.now()
    }
    
    # Store in database
    await store_audit_log(audit_log)
    
    # Continue
    return await call_next(request)
\`\`\`

    `,
    diagram: `
graph TD
    A["Login Request"] -->|username/password| B{Auth Method?}
    B -->|JWT| C["Local Auth"]
    B -->|LDAP| D["AD Query"]
    B -->|MSAL| E["Azure AD"]
    B -->|SAML| F["Enterprise SSO"]
    
    C --> G["Hash Verification"]
    D --> G
    E --> G
    F --> G
    
    G -->|success| H["Create JWT Token"]
    H --> I["Access Token 1h"]
    H --> J["Refresh Token 30d"]
    
    I --> K["API Requests"]
    K -->|expired| L["Use Refresh Token"]
    L -->|valid| M["New Access Token"]
    
    K --> N["Check Permissions"]
    N -->|has permission| O["Allow Request"]
    N -->|denied| P["403 Forbidden"]
    
    K --> Q["Audit Log"]
    Q --> R["Database"]
    `,
  },

  'backend-performance': {
    title: 'Performance & Scaling Optimization',
    category: 'Backend',
    description: 'Async patterns, caching, indexing, and scalability strategies',
    content: `
## Performance & Scaling

### Async/Await Optimization

\`\`\`python
# Non-blocking concurrent operations
async def sync_device_metrics(devices: list):
    # Parallel SNMP queries to all devices
    tasks = [
        snmp_client.get_metrics(device.ip, device.credential)
        for device in devices
    ]
    
    # Wait for all to complete
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    # Process results
    for device, result in zip(devices, results):
        if isinstance(result, Exception):
            logger.error(f"Failed {device.name}: {result}")
        else:
            await store_metrics(device.id, result)
\`\`\`

Benefits:
- Thousands of concurrent requests
- No thread overhead
- I/O efficient
- Resource utilization

### Database Connection Pooling

\`\`\`python
from sqlalchemy.ext.asyncio import create_async_engine

# Connection pool configuration
engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    pool_size=20,              # Max connections
    max_overflow=10,           # Extra overflow connections
    pool_pre_ping=True,        # Test connection before use
    pool_recycle=3600,         # Recycle after 1 hour
)
\`\`\`

### Query Optimization

\`\`\`python
# Efficient queries with proper joins

# Bad: N+1 query problem
devices = await session.execute(select(Device))
for device in devices:
    interfaces = await session.execute(
        select(Interface).where(Interface.device_id == device.id)
    )  # Separate query per device!

# Good: Single join query
stmt = select(Device).options(selectinload(Device.interfaces))
devices = await session.execute(stmt)
\`\`\`

### Strategic Indexing

\`\`\`sql
-- Fast lookups
CREATE INDEX idx_devices_ip ON devices(ip_address);
CREATE INDEX idx_devices_status ON devices(status);
CREATE INDEX idx_devices_created ON devices(created_at DESC);

-- Time-series queries
CREATE INDEX idx_metrics_device_time 
    ON device_metrics_history(device_id, time DESC);

-- Common filters
CREATE INDEX idx_alerts_device_created 
    ON alerts(device_id, created_at DESC);
CREATE INDEX idx_alerts_severity 
    ON alerts(severity);
\`\`\`

### TimescaleDB Compression

\`\`\`sql
-- Automatic compression of old data
ALTER TABLE device_metrics_history
SET (timescaledb.compress, timescaledb.compress_interval = '7 days');

-- Compress data older than 30 days
SELECT compress_chunk(chunk) FROM show_chunks('device_metrics_history')
WHERE chunk_time_range(chunk) < now() - INTERVAL '30 days';
\`\`\`

### Caching Strategy

\`\`\`python
# Redis caching for frequent queries
import redis_asyncio

redis = redis_asyncio.from_url("redis://localhost:6379")

async def get_device_with_cache(device_id: int):
    # Check cache
    cached = await redis.get(f"device:{device_id}")
    if cached:
        return json.loads(cached)
    
    # Query database
    device = await session.execute(
        select(Device).where(Device.id == device_id)
    )
    
    # Cache for 5 minutes
    await redis.setex(f"device:{device_id}", 300, json.dumps(device.dict()))
    
    return device
\`\`\`

### Monitoring & Observability

\`\`\`python
# Prometheus metrics
from prometheus_client import Counter, Histogram

request_count = Counter('http_requests_total', 'Total HTTP requests')
request_duration = Histogram('http_request_duration_seconds', 'Request duration')

@app.middleware("http")
async def metrics_middleware(request: Request, call_next):
    start = time.time()
    
    response = await call_next(request)
    
    duration = time.time() - start
    request_count.inc()
    request_duration.observe(duration)
    
    return response
\`\`\`

### Load Testing Results

Expected performance:
- **Concurrent Users**: 1000+
- **Requests/Second**: 1000+ (with 20 connection pool)
- **Response Time**: < 100ms (p95)
- **Database Queries**: < 10ms (with indexes)
- **API Latency**: < 50ms (network included)

    `,
    diagram: `
graph TD
    A["Request"] -->|Async Handler| B["Non-Blocking I/O"]
    B --> C["Connection Pool"]
    C -->|reuse connections| D["PostgreSQL"]
    
    E["Metrics Query"] -->|indexed| F["Time-Series Hypertable"]
    F -->|compressed old data| G["Minimal Storage"]
    
    H["Frequent Queries"] -->|cached| I["Redis"]
    I -->|TTL| J["Auto-Invalidation"]
    
    K["Database"] -->|connection pool| L["20 connections"]
    L -->|overflow| M["10 extra connections"]
    
    N["Slow Queries"] -->|monitored| O["Prometheus"]
    O -->|metrics| P["Observability"]
    
    Q["Peak Load"] -->|scales| R["Horizontal: Add API servers"]
    R --> S["Load Balancer"]
    S -->|distributes| T["API Server 1"]
    S -->|distributes| U["API Server 2"]
    S -->|distributes| V["API Server 3"]
    `,
  },

  'backend-folder': {
    title: 'Backend Folder Structure',
    category: 'Backend',
    description: 'Complete directory organization and file layout',
    content: `
## Backend Folder Structure

\`\`\`
NMS-SYSTEM-ENTERPRISE-BACKEND/
│
├── app/                           # Main application
│   ├── __init__.py               # Package initialization
│   ├── main.py                   # FastAPI entry point
│   │
│   ├── core/                     # Core configuration
│   │   ├── __init__.py
│   │   ├── config.py             # Settings from .env
│   │   └── audit_middleware.py   # Request logging
│   │
│   ├── db/                       # Database setup
│   │   ├── __init__.py
│   │   ├── session.py            # Connection management
│   │   ├── base.py               # SQLAlchemy declarative base
│   │   └── base_class.py         # Base model mixins (timestamps, etc)
│   │
│   └── modules/                  # Feature modules
│       ├── __init__.py
│       │
│       ├── settings/             # User & System configuration
│       │   ├── __init__.py
│       │   ├── api.py           # Main router
│       │   │
│       │   ├── user_settings/   # User management
│       │   │   ├── user_settings_api/
│       │   │   │   ├── __init__.py
│       │   │   │   ├── router.py
│       │   │   │   ├── models.py
│       │   │   │   ├── schemas.py
│       │   │   │   └── crud.py
│       │   │   │
│       │   │   └── roles_permissions/
│       │   │       ├── __init__.py
│       │   │       ├── router.py
│       │   │       ├── models.py
│       │   │       ├── schemas.py
│       │   │       └── crud.py
│       │   │
│       │   ├── system_settings/
│       │   │   ├── __init__.py
│       │   │   ├── router.py
│       │   │   ├── models.py
│       │   │   ├── schemas.py
│       │   │   └── crud.py
│       │   │
│       │   └── discovery_settings/
│       │       ├── __init__.py
│       │       ├── discovery_router.py
│       │       │
│       │       ├── discovery_profile/
│       │       │   ├── discovery_profile_router.py
│       │       │   ├── discovery_profile_models.py
│       │       │   ├── discovery_profile_crud.py
│       │       │   ├── discovery_profile_schemas.py
│       │       │   ├── groups/
│       │       │   │   ├── discovery_groups_router.py
│       │       │   │   ├── discovery_groups_models.py
│       │       │   │   ├── discovery_groups_crud.py
│       │       │   │   └── discovery_groups_schemas.py
│       │       │   └── tags/
│       │       │       ├── discovery_tags_router.py
│       │       │       ├── discovery_tags_models.py
│       │       │       ├── discovery_tags_crud.py
│       │       │       └── discovery_tags_schemas.py
│       │       │
│       │       └── credential_profile/
│       │           ├── credential_profile_router.py
│       │           ├── credential_profile_models.py
│       │           ├── credential_profile_crud.py
│       │           ├── credential_profile_schemas.py
│       │           ├── groups/
│       │           │   └── (similar structure)
│       │           └── tags/
│       │               └── (similar structure)
│       │
│       ├── network_monitoring/       # Core monitoring
│       │   ├── __init__.py
│       │   │
│       │   ├── device_monitoring/
│       │   │   ├── device_monitoring_router.py
│       │   │   ├── models.py
│       │   │   ├── schemas.py
│       │   │   ├── crud.py
│       │   │   ├── sync_job.py        # Background metric sync
│       │   │   └── utils.py
│       │   │
│       │   ├── alerts/
│       │   │   ├── alerts_router.py
│       │   │   ├── models.py
│       │   │   ├── schemas.py
│       │   │   ├── crud.py
│       │   │   ├── alert_engine.py    # Background alert evaluation
│       │   │   └── utils.py
│       │   │
│       │   ├── traps/
│       │   │   ├── traps_router.py
│       │   │   ├── models.py
│       │   │   ├── schemas.py
│       │   │   ├── crud.py
│       │   │   ├── trap_engine.py     # Background trap receiver
│       │   │   └── snmp_parser.py
│       │   │
│       │   ├── log_management/
│       │   │   ├── router.py
│       │   │   ├── models.py
│       │   │   ├── schemas.py
│       │   │   ├── crud.py
│       │   │   ├── syslog_server.py   # UDP listener
│       │   │   ├── log_engine.py      # Processing
│       │   │   └── parser.py
│       │   │
│       │   ├── flow/
│       │   │   ├── flow_router.py
│       │   │   ├── models.py
│       │   │   ├── schemas.py
│       │   │   ├── crud.py
│       │   │   └── collector.py
│       │   │
│       │   ├── dashboard/
│       │   │   ├── dashboard_router.py
│       │   │   ├── models.py
│       │   │   ├── crud.py
│       │   │   └── aggregation.py
│       │   │
│       │   ├── reports/
│       │   │   ├── reports_router.py
│       │   │   ├── models.py
│       │   │   ├── schemas.py
│       │   │   ├── crud.py
│       │   │   └── generator.py
│       │   │
│       │   └── ticketing/
│       │       ├── ticketing_router.py
│       │       ├── models.py
│       │       ├── schemas.py
│       │       └── crud.py
│       │
│       ├── apm/                      # Application Performance Monitoring
│       │   ├── __init__.py
│       │   ├── apm_router.py
│       │   ├── models.py
│       │   ├── schemas.py
│       │   ├── crud.py
│       │   ├── apm_engine.py         # Background metrics collection
│       │   └── trace_collector.py
│       │
│       └── chatbot/                  # AI chatbot
│           ├── __init__.py
│           ├── chatbot_router.py
│           ├── models.py
│           ├── schemas.py
│           └── engine.py
│
├── .env                      # Environment variables
├── requirements.txt          # Python dependencies
├── nms.db                    # SQLite dev database (optional)
├── README.md                 # Project documentation
│
└── scripts/                  # Utility scripts
    ├── create_tables.py
    ├── seed_data.py
    ├── migrations.py
    └── health_check.py
\`\`\`

### File Naming Conventions

- **routers**: \`*_router.py\` or \`router.py\`
- **models**: \`models.py\` (SQLAlchemy)
- **schemas**: \`schemas.py\` (Pydantic)
- **crud**: \`crud.py\` (Create, Read, Update, Delete)
- **engines**: \`*_engine.py\` (Background tasks)
- **services**: \`*_service.py\` (Business logic)
- **utilities**: \`utils.py\` or \`*_utils.py\`

### Module Pattern

Every module follows:
\`\`\`
module/
├── __init__.py              # Import key exports
├── module_router.py         # API endpoints
├── models.py               # ORM models
├── schemas.py              # Request/response schemas
├── crud.py                 # Database operations
├── engine.py               # Background processing
└── utils.py                # Helpers
\`\`\`

    `,
    diagram: `
graph TD
    A["app/"] --> B["core/"]
    A --> C["db/"]
    A --> D["modules/"]
    
    B -->|config.py| E["Settings"]
    B -->|audit_middleware.py| F["Logging"]
    
    C -->|session.py| G["Connection Pool"]
    C -->|base.py| H["ORM Base"]
    
    D -->|settings/| I["User & System Config"]
    D -->|network_monitoring/| J["Core Monitoring"]
    D -->|apm/| K["Application Monitoring"]
    D -->|chatbot/| L["AI Module"]
    
    I --> I1["user_settings/"]
    I --> I2["system_settings/"]
    I --> I3["discovery_settings/"]
    
    J --> J1["device_monitoring/"]
    J --> J2["alerts/"]
    J --> J3["traps/"]
    J --> J4["log_management/"]
    J --> J5["flow/"]
    J --> J6["dashboard/"]
    J --> J7["reports/"]
    J --> J8["ticketing/"]
    
    I1 --> X["router.py, models.py, schemas.py, crud.py"]
    `,
  },

  'backend-codebase': {
    title: 'Backend Codebase Explanation',
    category: 'Backend',
    description: 'Key files and how they work together',
    content: `
## Backend Codebase Deep Dive

### Entry Point: main.py

\`\`\`python
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.db.session import engine
from app.db.base import Base
from app.core.config import settings

# Initialize tables
Base.metadata.create_all(bind=engine)

# Create v1 app
v1_app = FastAPI(
    title="NMS Management API - V1",
    version="1.0.0"
)
v1_app.include_router(api_router)

# Main app
app = FastAPI(title=settings.PROJECT_NAME)

# Middleware
app.add_middleware(AuditMiddleware)
app.add_middleware(CORSMiddleware, allow_origins=["*"])

# Mount versioned APIs
app.mount("/api/v1", v1_app)

# Startup events
@app.on_event("startup")
async def startup_event():
    # Start background engines
    asyncio.create_task(start_syslog_server())
    asyncio.create_task(run_trap_engine())
    asyncio.create_task(run_alert_engine())
    asyncio.create_task(start_log_engines())
    asyncio.create_task(periodic_sync_devices())
    asyncio.create_task(run_apm_engine())
\`\`\`

**Purpose**: Application initialization, middleware setup, background task startup

### Router Pattern

\`\`\`python
# app/modules/device_monitoring/device_monitoring_router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/device-monitoring", tags=["Device Monitoring"])

@router.get("/devices")
async def list_devices(
    skip: int = 0,
    limit: int = 10,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """List all network devices with pagination."""
    devices = await DeviceCRUD.list_devices(session, skip, limit)
    return {"items": devices, "total": len(devices)}

@router.get("/devices/{device_id}")
async def get_device(
    device_id: int,
    session: AsyncSession = Depends(get_session)
):
    """Get specific device details."""
    device = await DeviceCRUD.get_by_id(session, device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    return device

@router.post("/devices")
async def create_device(
    req: CreateDeviceRequest,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """Create new device in inventory."""
    if not await check_permission(current_user, "device:create"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    device = Device(**req.dict())
    session.add(device)
    await session.commit()
    return device
\`\`\`

**Purpose**: Define API endpoints, handle requests, delegate to CRUD

### Model Pattern

\`\`\`python
# app/modules/device_monitoring/models.py
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from app.db.base import Base
from datetime import datetime

class Device(Base):
    __tablename__ = "devices"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True)
    ip_address = Column(String(50), nullable=False, unique=True)
    snmp_version = Column(String(10))  # v1, v2c, v3
    status = Column(String(20), default="unknown")  # up, down
    device_type = Column(String(100))  # router, switch, server
    credential_profile_id = Column(Integer)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)
    
    # Relationships
    interfaces = relationship("Interface", back_populates="device")
    metrics = relationship("DeviceMetrics", back_populates="device")
    traps = relationship("SNMPTrap", back_populates="device")
\`\`\`

**Purpose**: Define database tables and relationships

### Schema Pattern

\`\`\`python
# app/modules/device_monitoring/schemas.py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class CreateDeviceRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    ip_address: str
    snmp_version: str
    credential_profile_id: int
    device_type: str

class DeviceResponse(BaseModel):
    id: int
    name: str
    ip_address: str
    status: str
    device_type: str
    created_at: datetime
    
    class Config:
        from_attributes = True  # Map ORM models

class DeviceDetailResponse(DeviceResponse):
    interfaces: list["InterfaceResponse"]
    metrics: list["MetricResponse"]
\`\`\`

**Purpose**: Validate and serialize request/response data

### CRUD Pattern

\`\`\`python
# app/modules/device_monitoring/crud.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

class DeviceCRUD:
    @staticmethod
    async def list_devices(
        session: AsyncSession,
        skip: int = 0,
        limit: int = 10
    ):
        """Fetch paginated device list."""
        stmt = select(Device).offset(skip).limit(limit)
        result = await session.execute(stmt)
        return result.scalars().all()
    
    @staticmethod
    async def get_by_id(session: AsyncSession, device_id: int):
        """Fetch device by ID."""
        stmt = select(Device).where(Device.id == device_id)
        result = await session.execute(stmt)
        return result.scalar_one_or_none()
    
    @staticmethod
    async def create(session: AsyncSession, device_data: dict):
        """Create new device."""
        device = Device(**device_data)
        session.add(device)
        await session.commit()
        return device
    
    @staticmethod
    async def update(session: AsyncSession, device_id: int, updates: dict):
        """Update existing device."""
        device = await DeviceCRUD.get_by_id(session, device_id)
        for key, value in updates.items():
            setattr(device, key, value)
        await session.commit()
        return device
    
    @staticmethod
    async def delete(session: AsyncSession, device_id: int):
        """Delete device."""
        device = await DeviceCRUD.get_by_id(session, device_id)
        if device:
            await session.delete(device)
            await session.commit()
\`\`\`

**Purpose**: Handle all database operations for a model

### Background Engine Pattern

\`\`\`python
# app/modules/network_monitoring/alerts/alert_engine.py
import asyncio
from logging import getLogger

logger = getLogger(__name__)

async def run_alert_engine():
    """Continuous background task for alert evaluation."""
    while True:
        try:
            logger.info("Evaluating alert rules...")
            
            # Get active alert rules
            rules = await get_active_alert_rules()
            
            for rule in rules:
                # Get latest metrics for device
                metrics = await get_latest_device_metrics(rule.device_id)
                
                # Evaluate condition
                if evaluate_condition(rule.condition, metrics):
                    # Check if already alerted (avoid duplicates)
                    existing = await get_recent_alert(rule.id)
                    
                    if not existing:
                        # Create alert
                        alert = await create_alert(rule, metrics)
                        logger.warning(f"Alert triggered: {alert.id}")
                        
                        # Send notifications
                        await send_email_notification(alert)
                        await send_slack_webhook(alert)
                        
                        # Create ticket if configured
                        if rule.auto_create_ticket:
                            await create_ticket_from_alert(alert)
        
        except Exception as e:
            logger.error(f"Alert engine error: {e}")
        
        # Check every 30 seconds
        await asyncio.sleep(30)

def evaluate_condition(condition: str, metrics: dict) -> bool:
    """Evaluate alert condition against metrics."""
    # Examples:
    # "cpu > 85"
    # "memory > 90"
    # "response_time > 1000"
    
    # Simple eval (in production, use safer evaluation)
    return eval(condition, {"__builtins__": {}}, metrics)
\`\`\`

**Purpose**: Continuous background processing

    `,
    diagram: `
graph TD
    A["main.py"] -->|imports| B["core/config.py"]
    A -->|imports| C["db/session.py"]
    A -->|imports| D["modules/settings/api.py"]
    A -->|creates| E["FastAPI app"]
    A -->|startup| F["Background Engines"]
    
    D -->|includes| G["user_settings_router"]
    D -->|includes| H["system_settings_router"]
    D -->|includes| I["discovery_settings_router"]
    D -->|includes| J["device_monitoring_router"]
    
    J -->|uses| K["DeviceCRUD"]
    K -->|queries| L["Device Model"]
    L -->|via| M["SQLAlchemy ORM"]
    M -->|to| N["PostgreSQL"]
    
    J -->|validates| O["DeviceResponse Schema"]
    J -->|checks| P["get_current_user"]
    J -->|checks| Q["check_permission"]
    
    F -->|includes| R["Alert Engine"]
    F -->|includes| S["Trap Engine"]
    F -->|includes| T["Syslog Server"]
    F -->|includes| U["Device Sync"]
    `,
  },

  'backend-features': {
    title: 'Features Implemented',
    category: 'Backend',
    description: 'Complete list of backend features and capabilities',
    content: `
## Backend Features Implemented

### 1. Device Management
- [x] Discover network devices via SNMP
- [x] Maintain device inventory
- [x] Track device status (up/down)
- [x] Store device metadata
- [x] Manage network interfaces
- [x] Interface status tracking

### 2. Metrics Collection
- [x] Periodic SNMP metrics polling
- [x] CPU, memory, disk metrics
- [x] Interface traffic metrics
- [x] Historical metrics storage (TimescaleDB)
- [x] Real-time metric updates
- [x] Metric aggregation

### 3. Alert System
- [x] Define alert rules
- [x] Threshold-based alerting
- [x] Real-time alert evaluation
- [x] Alert history tracking
- [x] Multi-severity levels
- [x] Notification delivery

### 4. SNMP Trap Handling
- [x] UDP syslog server (port 1620)
- [x] SNMP trap parsing
- [x] OID mapping
- [x] Event correlation
- [x] Real-time trap ingestion
- [x] Trap history

### 5. Log Management
- [x] UDP syslog collection (port 514)
- [x] RFC 3164/5424 parsing
- [x] Log categorization
- [x] Severity level extraction
- [x] Log searchability
- [x] Historical log retention

### 6. Network Flow Analysis
- [x] NetFlow v5/v9 collection
- [x] Flow record aggregation
- [x] Top talker identification
- [x] Bandwidth calculation
- [x] Application detection
- [x] Traffic pattern analysis

### 7. APM (Application Performance Monitoring)
- [x] Service health checks
- [x] Performance metrics collection
- [x] Trace data ingestion
- [x] Service dependency mapping
- [x] Anomaly detection
- [x] SLA tracking

### 8. User Management
- [x] User CRUD operations
- [x] User authentication
- [x] Role assignment
- [x] Permission management
- [x] User activity tracking

### 9. Authentication & Security
- [x] JWT token-based auth
- [x] LDAP directory integration
- [x] Microsoft Azure AD (MSAL)
- [x] SAML enterprise SSO
- [x] 2FA support
- [x] Password hashing (bcrypt)
- [x] Credential encryption
- [x] Audit logging

### 10. Reporting
- [x] Report generation
- [x] Custom report builder
- [x] Scheduled reports
- [x] Report distribution
- [x] Historical reports
- [x] Export to PDF/Excel

### 11. Ticketing System
- [x] Incident management
- [x] Auto-ticket creation from alerts
- [x] Ticket assignment
- [x] Status tracking
- [x] Ticket comments
- [x] SLA tracking

### 12. Discovery Settings
- [x] Define discovery profiles
- [x] SNMP credential management
- [x] Credential groups
- [x] Discovery scheduling
- [x] Automatic device discovery
- [x] Device tagging

### 13. System Administration
- [x] System configuration
- [x] Password policies
- [x] Backup/restore
- [x] License management
- [x] Session management
- [x] System health

### 14. Audit & Compliance
- [x] User action logging
- [x] Configuration change tracking
- [x] Compliance reporting
- [x] Audit trail
- [x] Data retention policies

### 15. Chatbot (AI)
- [x] Natural language queries
- [x] System information retrieval
- [x] Device status queries
- [x] Alert information
- [x] Historical data queries

    `,
    diagram: null,
  },

  'backend-git': {
    title: 'Git & Version Control',
    category: 'Backend',
    description: 'Git workflow and commit conventions',
    content: `
## Git Workflow & Conventions

### Branch Strategy

\`\`\`
main
  ↑
  └─── develop (development branch)
        ↑
        ├─── feature/device-monitoring
        ├─── feature/alert-engine
        ├─── bugfix/snmp-timeout
        └─── hotfix/security-patch
\`\`\`

### Branch Naming
- **feature/**: \`feature/new-capability\`
- **bugfix/**: \`bugfix/issue-fix\`
- **hotfix/**: \`hotfix/critical-fix\`
- **refactor/**: \`refactor/code-optimization\`

### Commit Message Format

\`\`\`
<type>: <subject>

<body>

<footer>
\`\`\`

Examples:
\`\`\`
feat(device-monitoring): Add SNMP v3 support
  - Implement SNMPv3 authentication
  - Add user/password/encryption validation
  
Closes #123

feat(alerts): Add alert templates
  - Create predefined alert templates
  - Add template selection in UI
  
feat(api): Implement pagination
  - Add skip/limit query parameters
  - Return total count with results

fix(trap-engine): Fix OID parsing issue
  - Handle variable-length OIDs correctly
  - Add unit tests
  
docs: Update API documentation
  - Document all endpoints
  - Add request/response examples

refactor(database): Optimize queries
  - Add missing indexes
  - Use eager loading for relationships
\`\`\`

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Code style (formatting)
- **refactor**: Code refactoring
- **perf**: Performance improvement
- **test**: Test additions
- **chore**: Build, dependencies

### Viewing Git History

\`\`\`bash
# Recent commits
git log --oneline -10

# Commit details
git show commit_sha

# File history
git log -- app/modules/alerts/alert_engine.py

# Branch graph
git log --graph --oneline --all

# Changes in last week
git log --since="1 week ago"
\`\`\`

### Code Review Process

1. Create feature branch from develop
2. Make changes with descriptive commits
3. Push to remote
4. Create Pull Request
5. Code review by team
6. Approve and merge to develop
7. Test in staging
8. Merge to main for production

    `,
    diagram: null,
  },

  'backend-run': {
    title: 'How to Run the Backend',
    category: 'Backend',
    description: 'Setup, installation, and running instructions',
    content: `
## Backend Setup & Running

### Prerequisites

- Python 3.8+
- PostgreSQL 14+
- pip package manager
- Virtual environment (recommended)

### Installation

#### 1. Clone Repository
\`\`\`bash
cd /home/snr/Downloads/Downloads/Projects/NMS
git clone <repository-url>
cd NMS-SYSTEM-ENTERPRISE-BACKEND
\`\`\`

#### 2. Create Virtual Environment
\`\`\`bash
# Create
python3 -m venv venv

# Activate (Linux/Mac)
source venv/bin/activate

# Activate (Windows)
venv\\Scripts\\activate
\`\`\`

#### 3. Install Dependencies
\`\`\`bash
pip install -r requirements.txt
\`\`\`

#### 4. Setup Database

##### Install PostgreSQL
\`\`\`bash
# Ubuntu
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql

# Or use Docker
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=nms@123 postgres:14
\`\`\`

##### Create Database
\`\`\`bash
createdb nms_management

# Or using psql
psql postgres
CREATE DATABASE nms_management;
\`\`\`

##### Create User
\`\`\`bash
createuser -P nms_user
# Enter password: nms@123
\`\`\`

##### Grant Permissions
\`\`\`bash
psql nms_management
ALTER USER nms_user WITH SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE nms_management TO nms_user;
\`\`\`

##### Install TimescaleDB
\`\`\`bash
# Ubuntu
sudo sh -c "echo 'deb https://packagecloud.io/timescale/timescaledb/ubuntu/ \$(lsb_release -c -s) main' > /etc/apt/sources.list.d/timescaledb.list"
sudo apt-get update
sudo apt-get install timescaledb-2-postgresql-14

# macOS
brew install timescaledb

# Enable extension
psql -d nms_management -c "CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;"
\`\`\`

#### 5. Configure Environment
\`\`\`bash
# Create .env file
cat > .env << EOF
PROJECT_NAME="NMS Management"
SECRET_KEY="your-secret-key-change-this"
ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=30

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=nms_user
POSTGRES_PASSWORD=nms@123
POSTGRES_DB=nms_management

# Optional: LDAP, MSAL, SAML configuration
LDAP_SERVER=ldap://ad.company.com
MSAL_TENANT=common
SAML_METADATA_URL=https://idp.company.com/metadata
EOF
\`\`\`

### Running the Application

#### Option 1: Development Server
\`\`\`bash
# With auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or
python -m uvicorn app.main:app --reload
\`\`\`

#### Option 2: Production Server
\`\`\`bash
# Single worker
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Multiple workers (4 workers)
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000
\`\`\`

#### Option 3: Using Startup Script
\`\`\`bash
# Run API server
python startupserver.py api

# Run background engines
python startupserver.py engine

# Both
python startupserver.py all
\`\`\`

### Verify Installation

\`\`\`bash
# Check API is running
curl http://localhost:8000/

# Access API docs
curl http://localhost:8000/api/v1/docs

# Check database connection
python -c "from app.db.session import SessionLocal; db = SessionLocal(); print('DB OK')"
\`\`\`

### Firewall Rules (SNMP/Syslog)

\`\`\`bash
# SNMP Trap port forwarding (Linux)
sudo iptables -t nat -A PREROUTING -p udp --dport 162 -j REDIRECT --to-port 1620
sudo iptables -t nat -A OUTPUT -p udp --dport 162 -j REDIRECT --to-port 1620

# Persist iptables (Linux)
sudo apt-get install iptables-persistent
sudo netfilter-persistent save
\`\`\`

### Testing

\`\`\`bash
# Run tests
pytest

# With coverage
pytest --cov=app

# Specific test file
pytest tests/test_alerts.py

# Verbose output
pytest -v
\`\`\`

### Troubleshooting

#### Database Connection Error
\`\`\`bash
# Check PostgreSQL is running
pg_isready -h localhost -p 5432

# Verify credentials
psql -h localhost -U nms_user -d nms_management
\`\`\`

#### Port Already in Use
\`\`\`bash
# Find process using port 8000
lsof -i :8000

# Kill process
kill -9 <PID>

# Or use different port
uvicorn app.main:app --port 8001
\`\`\`

#### Import Errors
\`\`\`bash
# Reinstall dependencies
pip install --upgrade -r requirements.txt

# Clear Python cache
find . -type d -name __pycache__ -exec rm -rf {} +
find . -type f -name "*.pyc" -delete
\`\`\`

    `,
    diagram: null,
  },

  // FRONTEND sections will follow in next creation
};

export default documentationData;
