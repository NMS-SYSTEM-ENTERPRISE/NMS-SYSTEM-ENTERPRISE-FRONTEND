import { Icon } from '@iconify/react';
import {
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
    YAxis
} from 'recharts';
import styles from '../styles.module.css';

const ServerDashboard = ({ data }) => {
  // Mock data specific to the image
  const memoryDetailsData = [
    { time: '06:00', committed: 4.66, cache: 9.31, installed: 13.97, used: 5.5 },
    { time: '06:30', committed: 4.8, cache: 9.2, installed: 13.97, used: 5.6 },
    { time: '07:00', committed: 4.7, cache: 9.4, installed: 13.97, used: 5.4 },
    { time: '07:30', committed: 4.9, cache: 9.1, installed: 13.97, used: 5.7 },
    { time: '08:00', committed: 4.66, cache: 9.31, installed: 13.97, used: 5.5 },
    { time: '08:30', committed: 4.8, cache: 9.2, installed: 13.97, used: 5.6 },
    { time: '09:00', committed: 4.7, cache: 9.4, installed: 13.97, used: 5.4 },
    { time: '09:30', committed: 4.9, cache: 9.1, installed: 13.97, used: 5.7 },
    { time: '10:00', committed: 4.66, cache: 9.31, installed: 13.97, used: 5.5 },
    { time: '10:30', committed: 4.8, cache: 9.2, installed: 13.97, used: 5.6 },
  ];

  return (
    <div className={styles.dashboardView}>
      {/* Header Section */}
      <div className={styles.serverHeader}>
        <div className={styles.breadcrumb}>
          <Icon icon="mdi:chevron-right" width={20} height={20} />
          <Icon icon="mdi:home" width={20} height={20} />
          <Icon icon="mdi:chevron-right" width={20} height={20} />
          <Icon icon="mdi:linux" width={20} height={20} className={styles.breadcrumbIcon} />
          <div>
            <div className={styles.breadcrumbTitle}>VM.Linux.server3</div>
            <div className={styles.breadcrumbSub}>172.16.10.48 | Linux Server</div>
          </div>
        </div>
        <div className={styles.headerControls}>
          <span>Last Poll : 29/01/2020 14:15</span>
          <div className={styles.controlIcons}>
            <Icon icon="mdi:refresh" width={18} height={18} className={styles.controlIcon} />
            <Icon icon="mdi:image-area" width={18} height={18} className={styles.controlIcon} />
            <Icon icon="mdi:arrow-expand-all" width={18} height={18} className={styles.controlIcon} />
            <Icon icon="mdi:export-variant" width={18} height={18} className={styles.controlIcon} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.serverTabs}>
        <div className={`${styles.serverTab} ${styles.serverTabActive}`}>Overview</div>
        <div className={styles.serverTab}>Metric Explorer</div>
        <div className={styles.serverTab}>Configured Policies</div>
        <div className={styles.serverTab}>Active Policies</div>
        <Icon icon="mdi:dots-vertical" width={20} height={20} style={{ marginLeft: 'auto', cursor: 'pointer', color: 'var(--color-text-secondary)' }} />
      </div>

      {/* Top Row Metrics */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--gap-md)' }}>
        {/* CPU */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <div className={styles.metricIcon}><Icon icon="mdi:cpu-64-bit" width={24} height={24} /></div>
            <span>CPU</span>
          </div>
          <div className={styles.metricDetails}>
            <span>User: 16%</span>
            <span>Interrupt: 0%</span>
          </div>
          <div className={styles.metricProgress}><div className={styles.metricProgressFill} style={{ width: '28%' }}></div></div>
          <div className={styles.metricValue}>28%</div>
        </div>

        {/* Memory */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <div className={styles.metricIcon}><Icon icon="mdi:memory" width={24} height={24} /></div>
            <span>Memory</span>
          </div>
          <div className={styles.metricDetails}>
            <span>Total: 8.4GB</span>
            <span>Free: 478.6MB</span>
          </div>
          <div className={styles.metricProgress}><div className={styles.metricProgressFill} style={{ width: '23.4%' }}></div></div>
          <div className={styles.metricValue}>23.4%</div>
        </div>

        {/* Disk */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <div className={styles.metricIcon}><Icon icon="mdi:harddisk" width={24} height={24} /></div>
            <span>Disk</span>
          </div>
          <div className={styles.metricDetails}>
            <span>Total: 146.5GB</span>
            <span>Free: 75.6GB</span>
          </div>
          <div className={styles.metricProgress}><div className={styles.metricProgressFill} style={{ width: '44%' }}></div></div>
          <div className={styles.metricValue}>44%</div>
        </div>

        {/* IOPS */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <div className={styles.metricIcon}><Icon icon="mdi:layers-triple" width={24} height={24} /></div>
            <span>IOPS</span>
          </div>
          <div className={styles.metricDetails}>
            <span>Disk Queue Length: 0.1</span>
          </div>
          <div className={styles.metricValue} style={{ marginTop: 'auto' }}>65.2</div>
        </div>

        {/* Network */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <div className={styles.metricIcon}><Icon icon="mdi:swap-vertical" width={24} height={24} /></div>
            <span>Network</span>
          </div>
          <div className={styles.metricDetails}>
            <span>Retransmissions: 29.7M</span>
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              <span style={{ color: '#3b82f6' }}>IN 11.7kbps</span>
              <span style={{ color: '#3b82f6' }}>OUT 2.4kbps</span>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <div className={styles.metricIcon}><Icon icon="mdi:swap-horizontal" width={24} height={24} /></div>
            <span>Response Time</span>
          </div>
          <div className={styles.metricDetails}>
            <span>Lost Packets: 0</span>
          </div>
          <div className={styles.metricValue} style={{ marginTop: 'auto' }}>0.7ms</div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr 1fr 2fr', marginTop: 'var(--margin-lg)' }}>
        {/* Device Availability */}
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Device Availability</h3>
          </div>
          <div className={styles.cardContent} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '150px', height: '150px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ value: 89 }, { value: 11 }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    <Cell fill="#84cc16" />
                    <Cell fill="#ef4444" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>UP</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#84cc16' }}>89%</div>
              </div>
            </div>
            <div style={{ marginTop: '10px', color: 'var(--color-text-secondary)' }}>Availability (Today)</div>
          </div>
        </div>

        {/* Availability Last 30 Days */}
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Availability Last 30 Days</h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.availabilityBars}>
              <div className={styles.availabilityBarRow}>
                <span className={styles.availabilityLabel}>7 Days</span>
                <div className={styles.availabilityTrack}>
                  <div className={styles.availabilityFill} style={{ width: '85%' }}></div>
                  <div className={styles.availabilityLoss} style={{ width: '15%' }}></div>
                </div>
              </div>
              <div className={styles.availabilityBarRow}>
                <span className={styles.availabilityLabel}>15 Days</span>
                <div className={styles.availabilityTrack}>
                  <div className={styles.availabilityFill} style={{ width: '90%' }}></div>
                  <div className={styles.availabilityLoss} style={{ width: '10%' }}></div>
                </div>
              </div>
              <div className={styles.availabilityBarRow}>
                <span className={styles.availabilityLabel}>30 Days</span>
                <div className={styles.availabilityTrack}>
                  <div className={styles.availabilityFill} style={{ width: '95%' }}></div>
                  <div className={styles.availabilityLoss} style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Memory Details */}
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Memory Details</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={memoryDetailsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="committed" stroke="#3b82f6" strokeWidth={2} dot={false} name="system.memory.committed.bytes.avg" />
                <Line type="monotone" dataKey="cache" stroke="#84cc16" strokeWidth={2} dot={false} name="system.cache.memory.bytes.avg" />
                <Line type="monotone" dataKey="installed" stroke="#eab308" strokeWidth={2} dot={false} name="system.memory.installed.bytes.avg" />
                <Line type="monotone" dataKey="used" stroke="#f97316" strokeWidth={2} dot={false} name="system.memory.used.bytes.avg" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerDashboard;
