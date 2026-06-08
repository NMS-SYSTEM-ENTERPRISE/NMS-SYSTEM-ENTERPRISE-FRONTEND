/**
 * Frontend Developer Documentation
 * Complete technical guide for Next.js React frontend
 */

export const frontendDocumentation = {
  'frontend-architecture': {
    title: 'Frontend Architecture & Framework',
    category: 'Frontend',
    description: 'Next.js 16, React 19, and component architecture',
    content: `
## Frontend Architecture

### Technology Stack
- **Framework**: Next.js 16.1.4
- **Runtime**: React 19.2.3
- **Language**: JavaScript (ES6+)
- **Styling**: CSS Modules + Custom CSS
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Charting**: ECharts + Recharts
- **Icons**: Lucide React + Iconify
- **Notifications**: Sonner (Toast)

### Architecture Principles

1. **Component-Based**
   - Reusable UI components
   - Single responsibility
   - Clear prop contracts

2. **Service Layer**
   - Centralized API communication
   - Request/response handling
   - Error management

3. **Context-Based State**
   - Global auth state
   - Manual/Help content
   - Theme configuration

4. **Route Guards**
   - Protected routes
   - Access control
   - Automatic redirects

5. **Responsive Design**
   - Mobile-first approach
   - Breakpoint-based styling
   - Flexible layouts

### Rendering Strategy

- **Server Components**: Layout, metadata
- **Client Components**: Interactive features
- **Static Generation**: Documentation pages
- **Incremental Static Regeneration**: Regular updates

### Next.js App Router

Using file-based routing:
\`\`\`
src/app/
├── layout.js            # Root layout
├── page.js              # Home (dashboard)
├── dashboard/page.js    # /dashboard
├── alerts/page.js       # /alerts
├── alerts/[id]/page.js  # /alerts/:id
├── settings/page.js     # /settings
└── developer-documentation/page.js  # /developer-documentation
\`\`\`

    `,
    diagram: `
graph TD
    A["Next.js App"] -->|App Router| B["File-Based Routing"]
    A -->|Providers| C["Auth Context"]
    A -->|Providers| D["Manual Context"]
    A -->|Layout| E["Client Layout"]
    E -->|Header| F["Navigation"]
    E -->|Sidebar| G["Menu Items"]
    E -->|Main| H["Page Content"]
    
    I["Page Component"] -->|useContext| C
    I -->|fetch| J["API Service"]
    J -->|Axios| K["Backend API"]
    
    L["UI Component"] -->|CSS Module| M["Styling"]
    L -->|Props| N["Data Flow"]
    
    O["Chart Component"] -->|ECharts| P["Visualization"]
    Q["Form Component"] -->|State| R["Input Handling"]
    `,
  },

  'frontend-state': {
    title: 'State Management & Real-Time Ingestion',
    category: 'Frontend',
    description: 'React Context API, hooks, and real-time data updates',
    content: `
## State Management

### Auth Context

\`\`\`javascript
// src/contexts/AuthContext.jsx
'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import authService from '@/services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const stored = localStorage.getItem('token');
      if (stored) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
          setToken(stored);
        } catch (err) {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    const response = await authService.login(email, password);
    setUser(response.user);
    setToken(response.access_token);
    localStorage.setItem('token', response.access_token);
    return response;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
\`\`\`

### Manual Context

\`\`\`javascript
// src/manual/contexts/ManualContext.jsx
'use client';

import { createContext, useCallback, useState } from 'react';

export const ManualContext = createContext();

export const ManualProvider = ({ children }) => {
  const [selectedFeature, setSelectedFeature] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const updateFeature = useCallback((featureId) => {
    setSelectedFeature(featureId);
  }, []);

  return (
    <ManualContext.Provider value={{ selectedFeature, updateFeature, searchQuery, setSearchQuery }}>
      {children}
    </ManualContext.Provider>
  );
};
\`\`\`

### Custom Hooks

\`\`\`javascript
// useAuth.js
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// useApi.js
import { useState, useEffect } from 'react';

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
\`\`\`

### Real-Time Updates

\`\`\`javascript
// useRealTimeMetrics.js
import { useEffect, useState } from 'react';

export const useRealTimeMetrics = (deviceId) => {
  const [metrics, setMetrics] = useState(null);
  const [status, setStatus] = useState('connecting');

  useEffect(() => {
    const ws = new WebSocket(\`ws://localhost:8000/api/v1/ws/metrics/\${deviceId}\`);

    ws.onopen = () => {
      setStatus('connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMetrics(data);
    };

    ws.onerror = () => {
      setStatus('error');
    };

    ws.onclose = () => {
      setStatus('disconnected');
    };

    return () => ws.close();
  }, [deviceId]);

  return { metrics, status };
};
\`\`\`

    `,
    diagram: null,
  },

  'frontend-components': {
    title: 'UI Component Library & Visual Elements',
    category: 'Frontend',
    description: '50+ reusable components and design system',
    content: `
## Component Library

### Base Components

Located in \`src/components/ui/\`:

1. **Button.jsx** - Primary, secondary, danger variants
2. **Input.jsx** - Text input with validation
3. **Select.jsx** - Dropdown selection
4. **Checkbox.jsx** - Toggle options
5. **Radio.jsx** - Single selection
6. **Modal.jsx** - Dialog boxes
7. **Card.jsx** - Content containers
8. **Badge.jsx** - Status indicators
9. **Table.jsx** - Data tables with sorting
10. **Pagination.jsx** - Page navigation
11. **Tooltip.jsx** - Hover information
12. **Dropdown.jsx** - Menu options
13. **Tabs.jsx** - Tabbed content
14. **Alert.jsx** - Alert messages
15. **Loader.jsx** - Loading spinners

### Feature Components

Located in \`src/components/features/\`:

#### Dashboard
- DashboardGrid - Widget layout
- KPICard - Key performance indicator
- MetricsChart - Chart display
- StatusWidget - Device status

#### Alerts
- AlertTable - Alert list
- AlertDetail - Alert information
- CreateAlert - Form for new alerts
- AlertTimeline - Historical events

#### Network Monitoring
- DeviceList - Device inventory
- DeviceCard - Device summary
- DeviceMetrics - Performance metrics
- InterfaceTable - Interface details

#### APM
- ServiceGrid - Service list
- ServiceMetrics - Performance data
- TraceTimeline - Request trace view
- DependencyMap - Service relationships

### Layout Components

Located in \`src/components/layout/\`:

\`\`\`javascript
// Header.jsx
export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
      <UserMenu />
    </header>
  );
};

// Sidebar.jsx
export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <NavMenu />
      <Favorites />
      <QuickActions />
    </aside>
  );
};

// ClientLayout.jsx - Wraps all pages
export const ClientLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};
\`\`\`

### Component Pattern

\`\`\`javascript
// src/components/ui/Button.jsx
import styles from './Button.module.css';
import classNames from 'classnames';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[\`variant-\${variant}\`],
        styles[\`size-\${size}\`],
        { [styles.disabled]: disabled }
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
\`\`\`

### Styling System

\`\`\`css
/* Color Palette */
--primary: #06b6d4;    /* Cyan */
--secondary: #64748b;  /* Slate */
--success: #10b981;    /* Green */
--warning: #f59e0b;    /* Amber */
--danger: #ef4444;     /* Red */
--info: #3b82f6;       /* Blue */

/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;

/* Typography */
--font-sans: 'Manrope', system-ui;
--font-mono: 'Courier New', monospace;

/* Breakpoints */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
\`\`\`

    `,
    diagram: null,
  },

  'frontend-charts': {
    title: 'Interactive Data Visualization',
    category: 'Frontend',
    description: 'ECharts and Recharts for real-time visualization',
    content: `
## Data Visualization

### ECharts Implementation

\`\`\`javascript
// MetricsChart.jsx
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const MetricsChart = ({ data, title }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const option = {
      title: { text: title },
      tooltip: { trigger: 'axis' },
      legend: { data: ['CPU', 'Memory'] },
      xAxis: { type: 'category', data: data.timestamps },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'CPU',
          data: data.cpu,
          type: 'line',
          smooth: true,
          areaStyle: {},
        },
        {
          name: 'Memory',
          data: data.memory,
          type: 'line',
          smooth: true,
          areaStyle: {},
        },
      ],
    };

    chart.setOption(option);

    return () => chart.dispose();
  }, [data, title]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};
\`\`\`

### Recharts Implementation

\`\`\`javascript
// TrafficChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const TrafficChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="inbound" stroke="#06b6d4" />
        <Line type="monotone" dataKey="outbound" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  );
};
\`\`\`

### Chart Types

1. **Line Charts** - Time-series metrics
2. **Bar Charts** - Comparisons
3. **Pie Charts** - Percentages
4. **Gauge Charts** - Current values
5. **Heatmaps** - Data density
6. **Scatter Plots** - Correlations
7. **Candlestick** - OHLC data
8. **Sankey** - Flow visualization

### Real-Time Chart Updates

\`\`\`javascript
// useRealtimeChart.js
import { useEffect, useState } from 'react';

export const useRealtimeChart = (deviceId, interval = 5000) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(\`/api/v1/devices/\${deviceId}/metrics/latest\`);
        const data = await response.json();
        
        setChartData((prev) => [
          ...prev.slice(-59), // Keep last 60 points
          {
            time: new Date().toLocaleTimeString(),
            cpu: data.cpu,
            memory: data.memory,
          },
        ]);
      } catch (err) {
        console.error('Failed to fetch metrics:', err);
      }
    };

    fetchMetrics();
    const interval_id = setInterval(fetchMetrics, interval);

    return () => clearInterval(interval_id);
  }, [deviceId, interval]);

  return chartData;
};
\`\`\`

### Export as Image

\`\`\`javascript
import html2canvas from 'html2canvas';

export const exportChartAsImage = async (elementRef, filename) => {
  const canvas = await html2canvas(elementRef.current);
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = \`\${filename}.png\`;
  link.click();
};
\`\`\`

    `,
    diagram: null,
  },

  'frontend-auth': {
    title: 'Authentication & Access Enforcement',
    category: 'Frontend',
    description: 'Auth guards, permission checks, and secure routes',
    content: `
## Authentication & Authorization

### Auth Guard

\`\`\`javascript
// src/guards/auth-guard.jsx
'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export const AuthGuard = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <LoadingSpinner />;
  
  return user ? children : null;
};
\`\`\`

### Guest Guard (Login Page)

\`\`\`javascript
// src/guards/guest-guard.jsx
'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const GuestGuard = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) return <LoadingSpinner />;
  
  return !user ? children : null;
};
\`\`\`

### Permission Check Component

\`\`\`javascript
// CanAccess.jsx
import { useAuth } from '@/hooks/useAuth';

export const CanAccess = ({ permission, children, fallback = null }) => {
  const { user } = useAuth();

  const hasPermission = user?.permissions?.includes(permission);

  return hasPermission ? children : fallback;
};

// Usage
<CanAccess permission="device:write">
  <Button onClick={handleCreate}>Create Device</Button>
</CanAccess>
\`\`\`

### API Service with Auth

\`\`\`javascript
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
\`\`\`

### Login Flow

\`\`\`javascript
// screens/login/index.jsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
\`\`\`

    `,
    diagram: null,
  },

  'frontend-deployment': {
    title: 'Deployment & Build Pipelines',
    category: 'Frontend',
    description: 'Next.js build, deployment, and CI/CD',
    content: `
## Deployment & Build

### Build Process

\`\`\`bash
# Development build
npm run dev              # Hot-reload on port 3000

# Production build
npm run build            # Optimizes and minifies

# Production server
npm start                # Runs optimized build

# Export static site
npm run export           # Static HTML export
\`\`\`

### Build Configuration (next.config.mjs)

\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization
  images: {
    unoptimized: true, // For static export
    domains: ['api.company.com'],
  },

  // Environment variables
  env: {
    API_URL: process.env.API_URL,
    APP_NAME: 'NMS Enterprise',
  },

  // ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Compression
  compress: true,
  
  // Font optimization
  optimizeFonts: true,
};

export default nextConfig;
\`\`\`

### Docker Deployment

\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Docker Compose

\`\`\`yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./NMS-SYSTEM-ENTERPRISE-FRONTEND
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      API_URL: http://backend:8000
      NODE_ENV: production
    depends_on:
      - backend

  backend:
    build:
      context: ./NMS-SYSTEM-ENTERPRISE-BACKEND
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://user:pass@db:5432/nms
    depends_on:
      - db

  db:
    image: postgres:14-timescaledb
    environment:
      POSTGRES_DB: nms_management
      POSTGRES_USER: nms_user
      POSTGRES_PASSWORD: nms@123
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

### Vercel Deployment

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
\`\`\`

### Nginx Reverse Proxy

\`\`\`nginx
server {
    listen 80;
    server_name nms.company.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host \$host;
    }
}
\`\`\`

### Performance Optimization

\`\`\`javascript
// Code splitting
const DeviceDetail = dynamic(() => import('@/screens/device-detail'), {
  loading: () => <LoadingSpinner />,
});

// Image optimization
<Image
  src={image}
  alt="description"
  width={200}
  height={200}
  priority // Load immediately
/>

// Script optimization
<Script
  src="https://analytics.example.com"
  strategy="lazyOnload"
/>
\`\`\`

    `,
    diagram: null,
  },

  // Continue with other frontend sections...
};

export default frontendDocumentation;
