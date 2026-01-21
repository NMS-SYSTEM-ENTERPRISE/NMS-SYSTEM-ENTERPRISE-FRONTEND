import { Icon } from '@iconify/react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import styles from '../styles.module.css';

export const ServiceCheckDashboard = () => {
  // Mock data for Service Check
  const serviceStats = {
    total: 120,
    up: 115,
    down: 3,
    warning: 2
  };

  const responseTimeData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    http: Math.floor(Math.random() * 200) + 50,
    dns: Math.floor(Math.random() * 50) + 10,
  }));

  const sslExpiryData = [
    { name: 'Valid (>30 days)', value: 85 },
    { name: 'Expiring Soon (<30 days)', value: 10 },
    { name: 'Expired', value: 5 },
  ];

  const topServicesData = [
    { name: 'Auth Service', uptime: 99.99 },
    { name: 'Payment Gateway', uptime: 99.95 },
    { name: 'User API', uptime: 99.90 },
    { name: 'Search Engine', uptime: 99.50 },
    { name: 'Email Service', uptime: 98.50 },
  ];

  return (
    <div className={styles.dashboardView}>


      {/* Top Stats Row */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <Icon icon="mdi:check-network-outline" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{serviceStats.total}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Total Services</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Icon icon="mdi:check-circle" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{serviceStats.up}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Operational</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              <Icon icon="mdi:alert-circle" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{serviceStats.down}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Down</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(234, 179, 8, 0.1)', color: '#eab308' }}>
              <Icon icon="mdi:alert" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{serviceStats.warning}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Warning</div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Response Time & SSL Status */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Response Time Trend (24h)</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="http" name="HTTP (ms)" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="dns" name="DNS (ms)" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>SSL Certificate Status</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sslExpiryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#eab308" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                  itemStyle={{ color: 'var(--color-text-primary)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Service Uptime */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Service Uptime Summary</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topServicesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" domain={[90, 100]} stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} width={150} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                  cursor={{ fill: 'var(--color-bg-hover)' }}
                  formatter={(value) => `${value}%`}
                />
                <Bar dataKey="uptime" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20}>
                  {topServicesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.uptime > 99.9 ? '#10b981' : entry.uptime > 99 ? '#3b82f6' : '#eab308'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ServiceDashboard = () => {
  const serviceStats = { running: 45, stopped: 12, failed: 3, total: 60 };
  const serviceStatusData = [
    { name: 'Running', value: 45 },
    { name: 'Stopped', value: 12 },
    { name: 'Failed', value: 3 },
  ];
  return (
    <div className={styles.dashboardView}>

      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
             <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><Icon icon="mdi:play-circle" width={32} height={32} /></div>
             <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{serviceStats.running}</div><div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Running</div></div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
             <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }}><Icon icon="mdi:stop-circle" width={32} height={32} /></div>
             <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{serviceStats.stopped}</div><div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Stopped</div></div>
          </div>
        </div>
         <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
             <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}><Icon icon="mdi:alert-circle" width={32} height={32} /></div>
             <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{serviceStats.failed}</div><div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Failed</div></div>
          </div>
        </div>
         <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
             <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}><Icon icon="mdi:format-list-bulleted" width={32} height={32} /></div>
             <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{serviceStats.total}</div><div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Total Services</div></div>
          </div>
        </div>
      </div>
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr 1fr' }}>
         <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}><h3 className={styles.cardTitle}>Service Status Distribution</h3></div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={serviceStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  <Cell fill="#10b981" />
                  <Cell fill="#6b7280" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProcessDashboard = () => {
  const processStats = { total: 145, threads: 1240, handles: 5600, zombies: 0 };
  const topCpuProcesses = [
    { name: 'java', value: 45 },
    { name: 'chrome', value: 30 },
    { name: 'node', value: 15 },
    { name: 'python', value: 10 },
  ];
  return (
    <div className={styles.dashboardView}>

      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
         <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
             <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}><Icon icon="mdi:cog" width={32} height={32} /></div>
             <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{processStats.total}</div><div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Total Processes</div></div>
          </div>
        </div>
         <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
             <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><Icon icon="mdi:source-branch" width={32} height={32} /></div>
             <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{processStats.threads}</div><div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Threads</div></div>
          </div>
        </div>
      </div>
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr' }}>
         <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}><h3 className={styles.cardTitle}>Top CPU Consuming Processes</h3></div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCpuProcesses} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" stroke="var(--color-text-secondary)" />
                <YAxis dataKey="name" type="category" stroke="var(--color-text-secondary)" width={80} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContainerDashboard = () => {
  const containerStats = { running: 12, exited: 4, paused: 0, images: 25 };
  const containerResourceData = [
    { name: 'web-app', cpu: 25, memory: 40 },
    { name: 'db-service', cpu: 45, memory: 60 },
    { name: 'cache', cpu: 10, memory: 20 },
  ];
  return (
     <div className={styles.dashboardView}>

      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
         <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
             <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><Icon icon="mdi:docker" width={32} height={32} /></div>
             <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{containerStats.running}</div><div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Running</div></div>
          </div>
        </div>
         <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
             <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }}><Icon icon="mdi:stop" width={32} height={32} /></div>
             <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{containerStats.exited}</div><div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Exited</div></div>
          </div>
        </div>
      </div>
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr' }}>
         <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}><h3 className={styles.cardTitle}>Container Resource Usage</h3></div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={containerResourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }} />
                <Legend />
                <Bar dataKey="cpu" name="CPU %" fill="#3b82f6" />
                <Bar dataKey="memory" name="Memory %" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
