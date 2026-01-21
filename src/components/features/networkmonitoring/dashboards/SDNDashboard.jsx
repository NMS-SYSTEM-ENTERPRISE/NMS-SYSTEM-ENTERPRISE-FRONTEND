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

const SDNDashboard = () => {
  // Mock data for SDN
  const sdnStats = {
    controllers: 5,
    switches: 142,
    flows: 15420,
    alerts: 23
  };

  const controllerHealthData = [
    { name: 'Healthy', value: 4 },
    { name: 'Critical', value: 1 },
    { name: 'Warning', value: 0 },
  ];

  const flowStatsData = [
    { name: 'ODL-Cluster-1', flows: 4500 },
    { name: 'ODL-Cluster-2', flows: 3200 },
    { name: 'ONOS-Core', flows: 5100 },
    { name: 'Ryu-Edge', flows: 2620 },
  ];

  const switchDistData = [
    { name: 'Core', value: 12 },
    { name: 'Distribution', value: 40 },
    { name: 'Access', value: 90 },
  ];

  const trafficTrendData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    openflow: Math.floor(Math.random() * 500) + 200,
    netconf: Math.floor(Math.random() * 100) + 50,
  }));

  return (
    <div className={styles.dashboardView}>


      {/* Top Stats Row */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
              <Icon icon="mdi:server-network" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{sdnStats.controllers}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Controllers</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <Icon icon="mdi:switch" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{sdnStats.switches}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Switches</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Icon icon="mdi:waves" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{sdnStats.flows.toLocaleString()}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Active Flows</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              <Icon icon="mdi:alert-circle" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{sdnStats.alerts}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Active Alerts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Controller Health & Switch Distribution */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Controller Health Status</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={controllerHealthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#ef4444" />
                  <Cell fill="#eab308" />
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

        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Switch Distribution by Layer</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={switchDistData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                  cursor={{ fill: 'var(--color-bg-hover)' }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Flow Stats & Traffic */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr 2fr' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Flows per Controller</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={flowStatsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" tick={{ fontSize: 10 }} interval={0} angle={-45} textAnchor="end" height={60} />
                <YAxis stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                  cursor={{ fill: 'var(--color-bg-hover)' }}
                />
                <Bar dataKey="flows" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Control Plane Traffic</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficTrendData}>
                <defs>
                  <linearGradient id="colorOpenflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNetconf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                />
                <Legend />
                <Area type="monotone" dataKey="openflow" name="OpenFlow (pps)" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorOpenflow)" />
                <Area type="monotone" dataKey="netconf" name="NETCONF (pps)" stroke="#10b981" fillOpacity={1} fill="url(#colorNetconf)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDNDashboard;
