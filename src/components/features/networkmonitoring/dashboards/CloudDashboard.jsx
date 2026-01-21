import { Icon } from '@iconify/react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import styles from '../styles.module.css';

const CloudDashboard = () => {
  // Mock data for Cloud
  const cloudStats = {
    instances: 45,
    storage: '12.5 TB',
    cost: '$3,450',
    regions: 5
  };

  const costData = [
    { name: 'AWS', cost: 1800 },
    { name: 'Azure', cost: 1200 },
    { name: 'GCP', cost: 450 },
  ];

  const instanceTypeData = [
    { name: 't3.micro', value: 15 },
    { name: 'm5.large', value: 10 },
    { name: 'c5.xlarge', value: 8 },
    { name: 'Standard_D2s', value: 12 },
  ];

  const regionData = [
    { name: 'us-east-1', value: 20 },
    { name: 'eu-west-1', value: 15 },
    { name: 'ap-south-1', value: 10 },
  ];

  const resourceTrendData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    cpu: Math.floor(Math.random() * 40) + 20,
    memory: Math.floor(Math.random() * 50) + 30,
  }));

  return (
    <div className={styles.dashboardView}>


      {/* Top Stats Row */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Icon icon="mdi:server" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{cloudStats.instances}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Active Instances</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <Icon icon="mdi:database" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{cloudStats.storage}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Storage Used</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <Icon icon="mdi:currency-usd" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{cloudStats.cost}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Est. Monthly Cost</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
              <Icon icon="mdi:map-marker-multiple" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{cloudStats.regions}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Active Regions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Cost & Instance Distribution */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Cost Distribution by Provider</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="cost"
                >
                  <Cell fill="#f97316" /> {/* AWS */}
                  <Cell fill="#0ea5e9" /> {/* Azure */}
                  <Cell fill="#34d399" /> {/* GCP */}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                  itemStyle={{ color: 'var(--color-text-primary)' }}
                  formatter={(value) => `$${value}`}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Instance Distribution by Type</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={instanceTypeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                  cursor={{ fill: 'var(--color-bg-hover)' }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Resource Trends & Regional Map */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Resource Usage Trend (Avg)</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={resourceTrendData}>
                <defs>
                  <linearGradient id="colorCloudCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCloudMem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                />
                <Legend />
                <Area type="monotone" dataKey="cpu" name="CPU %" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCloudCpu)" />
                <Area type="monotone" dataKey="memory" name="Memory %" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorCloudMem)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Instances by Region</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" tick={{ fontSize: 10 }} />
                <YAxis stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                  cursor={{ fill: 'var(--color-bg-hover)' }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudDashboard;
