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

export const HCIDashboard = () => {
  // Mock data for HCI
  const hciStats = {
    clusters: 2,
    nodes: 8,
    vms: 156,
    storageSavings: '3.2:1'
  };

  const iopsData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    read: Math.floor(Math.random() * 5000) + 2000,
    write: Math.floor(Math.random() * 3000) + 1000,
  }));

  const clusterHealthData = [
    { name: 'Healthy', value: 7 },
    { name: 'Warning', value: 1 },
    { name: 'Critical', value: 0 },
  ];

  return (
    <div className={styles.dashboardView}>


      {/* Top Stats */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <Icon icon="mdi:server-cluster" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{hciStats.clusters}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Clusters</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Icon icon="mdi:server" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{hciStats.nodes}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Nodes</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
              <Icon icon="mdi:desktop-tower" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{hciStats.vms}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Total VMs</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <Icon icon="mdi:percent" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{hciStats.storageSavings}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Storage Efficiency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>IOPS Performance Trend</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={iopsData}>
                <defs>
                  <linearGradient id="colorRead" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWrite" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }} />
                <Legend />
                <Area type="monotone" dataKey="read" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRead)" />
                <Area type="monotone" dataKey="write" stroke="#10b981" fillOpacity={1} fill="url(#colorWrite)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Node Health Status</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={clusterHealthData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  <Cell fill="#10b981" />
                  <Cell fill="#eab308" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }} itemStyle={{ color: 'var(--color-text-primary)' }} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StorageDashboard = () => {
  // Mock data for Storage
  const storageStats = {
    capacity: '500 TB',
    used: '320 TB',
    free: '180 TB',
    iops: '45k'
  };

  const volumeUsageData = [
    { name: 'Vol-01', value: 85 },
    { name: 'Vol-02', value: 45 },
    { name: 'Vol-03', value: 92 },
    { name: 'Vol-04', value: 30 },
    { name: 'Vol-05', value: 65 },
  ];

  const latencyData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    latency: Math.random() * 5 + 1,
  }));

  return (
    <div className={styles.dashboardView}>


      {/* Top Stats */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <Icon icon="mdi:database" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{storageStats.capacity}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Total Capacity</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              <Icon icon="mdi:database-alert" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{storageStats.used}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Used Space</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Icon icon="mdi:database-check" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{storageStats.free}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Free Space</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <Icon icon="mdi:speedometer" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{storageStats.iops}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Total IOPS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Top Volumes by Usage</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeUsageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} width={80} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }} cursor={{ fill: 'var(--color-bg-hover)' }} formatter={(value) => `${value}%`} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20}>
                  {volumeUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value > 90 ? '#ef4444' : entry.value > 75 ? '#eab308' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Average Latency (ms)</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={latencyData}>
                <defs>
                  <linearGradient id="colorLatencyStore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }} />
                <Area type="monotone" dataKey="latency" stroke="#f59e0b" fillOpacity={1} fill="url(#colorLatencyStore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContainerOrchestrationDashboard = () => {
  // Mock data for Container Orchestration
  const k8sStats = {
    nodes: 5,
    pods: 145,
    deployments: 24,
    services: 32
  };

  const nodeResourceData = [
    { name: 'Node-1', cpu: 65, memory: 70 },
    { name: 'Node-2', cpu: 40, memory: 55 },
    { name: 'Node-3', cpu: 85, memory: 90 },
    { name: 'Node-4', cpu: 30, memory: 40 },
    { name: 'Node-5', cpu: 50, memory: 60 },
  ];

  const podStatusData = [
    { name: 'Running', value: 135 },
    { name: 'Pending', value: 5 },
    { name: 'Failed', value: 3 },
    { name: 'CrashLoopBackOff', value: 2 },
  ];

  return (
    <div className={styles.dashboardView}>


      {/* Top Stats */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <Icon icon="mdi:server" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{k8sStats.nodes}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Nodes</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Icon icon="mdi:cube-outline" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{k8sStats.pods}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Pods</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
              <Icon icon="mdi:rocket-launch" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{k8sStats.deployments}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Deployments</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <Icon icon="mdi:network-outline" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{k8sStats.services}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Services</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Node Resource Usage</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nodeResourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }} cursor={{ fill: 'var(--color-bg-hover)' }} />
                <Legend />
                <Bar dataKey="cpu" name="CPU %" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="memory" name="Memory %" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Pod Status</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={podStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  <Cell fill="#10b981" />
                  <Cell fill="#eab308" />
                  <Cell fill="#ef4444" />
                  <Cell fill="#f97316" />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }} itemStyle={{ color: 'var(--color-text-primary)' }} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export const VirtualizationDashboard = () => {
  // Mock data for Virtualization
  const virtStats = {
    vms: 245,
    hosts: 12,
    clusters: 3,
    datastores: 8
  };

  const vmStatusData = [
    { name: 'Running', value: 210 },
    { name: 'Suspended', value: 15 },
    { name: 'Powered Off', value: 20 },
  ];

  const hostResourceData = [
    { name: 'Host-01', cpu: 75, memory: 82 },
    { name: 'Host-02', cpu: 45, memory: 60 },
    { name: 'Host-03', cpu: 90, memory: 85 },
    { name: 'Host-04', cpu: 30, memory: 40 },
  ];

  const datastoreData = [
    { name: 'DS-01', used: 85 },
    { name: 'DS-02', used: 60 },
    { name: 'DS-03', used: 45 },
    { name: 'DS-04', used: 92 },
  ];

  return (
    <div className={styles.dashboardView}>


      {/* Top Stats Row */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>
              <Icon icon="mdi:server-network" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{virtStats.vms}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Total VMs</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <Icon icon="mdi:server" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{virtStats.hosts}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>ESXi Hosts</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Icon icon="mdi:domain" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{virtStats.clusters}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Clusters</div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <Icon icon="mdi:harddisk" width={32} height={32} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{virtStats.datastores}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Datastores</div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: VM Status & Host Resources */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr 2fr' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>VM Status Distribution</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vmStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#eab308" />
                  <Cell fill="#9ca3af" />
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
            <h3 className={styles.cardTitle}>Host Resource Utilization</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hostResourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                  cursor={{ fill: 'var(--color-bg-hover)' }}
                />
                <Legend />
                <Bar dataKey="cpu" name="CPU %" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="memory" name="Memory %" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Datastore Usage */}
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr' }}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Datastore Capacity Usage</h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datastoreData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" stroke="var(--color-text-secondary)" tick={{ fontSize: 12 }} width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border)' }}
                  cursor={{ fill: 'var(--color-bg-hover)' }}
                  formatter={(value) => `${value}% Used`}
                />
                <Bar dataKey="used" radius={[0, 4, 4, 0]} barSize={30}>
                  {datastoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.used > 90 ? '#ef4444' : entry.used > 75 ? '#eab308' : '#10b981'} />
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
