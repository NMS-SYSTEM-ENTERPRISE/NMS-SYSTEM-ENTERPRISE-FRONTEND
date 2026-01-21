import {
    Area,
    AreaChart,
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

const NetworkDashboard = ({ data }) => {
  const upCount = data.filter((d) => d.status === 'Up').length;
  const downCount = data.filter((d) => d.status === 'Down').length;

  // Mock data for charts
  const latencyData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    latency: Math.floor(Math.random() * 50) + 10,
    packetLoss: Math.random() * 2,
  }));

  const resourceData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    cpu: Math.floor(Math.random() * 60) + 20,
    memory: Math.floor(Math.random() * 40) + 30,
  }));

  const trafficData = [
    { name: 'Eth0', value: 400 },
    { name: 'Eth1', value: 300 },
    { name: 'Eth2', value: 300 },
    { name: 'Wlan0', value: 200 },
  ];

  const interfaceData = Array.from({ length: 10 }, (_, i) => ({
    name: `Int ${i + 1}`,
    in: Math.floor(Math.random() * 1000),
    out: Math.floor(Math.random() * 800),
  }));

  const availabilityTrend = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    uptime: 95 + Math.random() * 5,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className={styles.dashboardView}>


      {/* Top Row: Availability & Heatmap */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr 2fr' }}>
        {/* Network Device Availability */}
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Network Device Availability</h3>
          </div>
          <div className={styles.cardContent} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className={styles.healthDonut}>
              <div className={styles.donutChart}>
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Up', value: upCount },
                        { name: 'Down', value: downCount },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell key="cell-up" fill="#10b981" />
                      <Cell key="cell-down" fill="#ef4444" />
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                      itemStyle={{ color: 'var(--color-text-primary)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className={styles.donutCenter}>
                  <span className={styles.donutValue}>{data.length}</span>
                  <span className={styles.donutLabel}>Total</span>
                </div>
              </div>
              <div className={styles.healthLegend}>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#10b981' }}></span>
                  <span>Up: {upCount}</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#ef4444' }}></span>
                  <span>Down: {downCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Network Heatmap */}
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Network Heatmap</h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.hexagonGrid}>
              {data.slice(0, 50).map((item) => {
                let hexColor = item.status === 'Up' ? '#10b981' : '#ef4444';
                // Randomize colors slightly for heatmap effect
                if (item.status === 'Up') {
                  const opacity = 0.5 + Math.random() * 0.5;
                  hexColor = `rgba(16, 185, 129, ${opacity})`;
                }
                return (
                  <div
                    key={item.id}
                    className={styles.hexagon}
                    style={{ backgroundColor: hexColor }}
                    title={`${item.name} - ${item.status}`}
                  >
                    <span className={styles.hexagonLabel}>{item.id}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Latency & Top Interfaces */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Network Device Latency */}
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Network Device Latency</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={latencyData}>
                <defs>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
                />
                <Area type="monotone" dataKey="latency" stroke="#f59e0b" fillOpacity={1} fill="url(#colorLatency)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Network Interfaces by Traffic */}
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Top Interfaces by Traffic</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                  itemStyle={{ color: 'var(--color-text-primary)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Traffic Utilization & Availability Trend */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Interface Traffic Utilization */}
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Interface Traffic Utilization</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={interfaceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                  cursor={{ fill: 'var(--color-bg-hover)' }}
                />
                <Legend />
                <Bar dataKey="in" name="Inbound" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="out" name="Outbound" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Network Device Availability Trend */}
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Availability Trend (24h)</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={availabilityTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis domain={[90, 100]} stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                />
                <Line type="monotone" dataKey="uptime" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CPU & Memory Usage Trends */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Average CPU & Memory Usage</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={resourceData}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="cpu" name="CPU Usage %" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpu)" />
                <Area type="monotone" dataKey="memory" name="Memory Usage %" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorMem)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkDashboard;
