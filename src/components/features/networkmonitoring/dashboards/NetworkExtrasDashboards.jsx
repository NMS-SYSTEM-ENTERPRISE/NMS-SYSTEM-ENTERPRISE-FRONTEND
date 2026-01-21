import { Icon } from '@iconify/react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import styles from '../styles.module.css';

export const InterfaceDashboard = () => {
  const interfaceStats = { up: 450, down: 23, totalSpeed: '100 Gbps' };
  const trafficData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    in: Math.floor(Math.random() * 800) + 200,
    out: Math.floor(Math.random() * 600) + 100,
  }));
  const errorData = [
    { name: 'Eth0', errors: 12, discards: 5 },
    { name: 'Eth1', errors: 2, discards: 0 },
    { name: 'Eth2', errors: 8, discards: 2 },
  ];

  return (
    <div className={styles.dashboardView}>

      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
         <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
             <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><Icon icon="mdi:check-network" width={32} height={32} /></div>
             <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{interfaceStats.up}</div><div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Interfaces Up</div></div>
          </div>
        </div>
         <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
             <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}><Icon icon="mdi:close-network" width={32} height={32} /></div>
             <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{interfaceStats.down}</div><div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Interfaces Down</div></div>
          </div>
        </div>
         <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
             <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}><Icon icon="mdi:speedometer" width={32} height={32} /></div>
             <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{interfaceStats.totalSpeed}</div><div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Total Capacity</div></div>
          </div>
        </div>
      </div>
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '2fr 1fr' }}>
         <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}><h3 className={styles.cardTitle}>Traffic Trend (Mbps)</h3></div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }} />
                <Legend />
                <Area type="monotone" dataKey="in" stroke="#10b981" fillOpacity={1} fill="url(#colorIn)" />
                <Area type="monotone" dataKey="out" stroke="#3b82f6" fillOpacity={1} fill="url(#colorOut)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
         <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}><h3 className={styles.cardTitle}>Errors & Discards</h3></div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={errorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }} />
                <Legend />
                <Bar dataKey="errors" fill="#ef4444" />
                <Bar dataKey="discards" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WANLinkDashboard = () => {
  const wanStats = { up: 12, down: 1, avgLatency: '45ms', avgJitter: '5ms' };
  const latencyTrend = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    latency: Math.floor(Math.random() * 50) + 30,
    jitter: Math.floor(Math.random() * 10) + 2,
  }));
  return (
    <div className={styles.dashboardView}>

      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
         <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
             <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><Icon icon="mdi:lan-connect" width={32} height={32} /></div>
             <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{wanStats.up}</div><div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Links Up</div></div>
          </div>
        </div>
         <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
             <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}><Icon icon="mdi:lan-disconnect" width={32} height={32} /></div>
             <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{wanStats.down}</div><div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Links Down</div></div>
          </div>
        </div>
         <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
             <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}><Icon icon="mdi:timer-sand" width={32} height={32} /></div>
             <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{wanStats.avgLatency}</div><div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Avg Latency</div></div>
          </div>
        </div>
         <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
             <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}><Icon icon="mdi:pulse" width={32} height={32} /></div>
             <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{wanStats.avgJitter}</div><div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Avg Jitter</div></div>
          </div>
        </div>
      </div>
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr' }}>
         <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}><h3 className={styles.cardTitle}>Latency & Jitter Trend</h3></div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }} />
                <Legend />
                <Line type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="jitter" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
