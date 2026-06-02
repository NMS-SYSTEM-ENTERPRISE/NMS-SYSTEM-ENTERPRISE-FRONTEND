import React from 'react';
import { Icon } from '@iconify/react';
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

const UPSDashboard = ({ data }) => {
  const upCount = data.filter((d) => d.status === 'Up').length;
  const downCount = data.filter((d) => d.status === 'Down').length;

  // Aggregate UPS metrics across all discovered UPS devices
  let totalLoad = 0;
  let totalBatteryCharge = 0;
  let validUPSCount = 0;
  let totalMinutesRemaining = 0;
  let totalAlarms = 0;
  let maxTemp = 0;

  const loadData = [];
  const batteryData = [];
  const tempData = [];
  const voltageData = [];

  data.forEach(device => {
    const metrics = device.upsMetrics || {};
    if (Object.keys(metrics).length > 0) {
      validUPSCount++;
      const load = parseFloat(metrics.output_load_percent) || 0;
      const charge = parseFloat(metrics.battery_charge_percent) || 0;
      const temp = parseFloat(metrics.battery_temperature) || 0;
      const mins = parseInt(metrics.battery_minutes_remaining) || 0;
      const alarms = parseInt(metrics.alarms_present) || 0;
      const inVolt = parseFloat(metrics.input_voltage) || 0;
      const outVolt = parseFloat(metrics.output_voltage) || 0;

      totalLoad += load;
      totalBatteryCharge += charge;
      totalMinutesRemaining += mins;
      totalAlarms += alarms;
      if (temp > maxTemp) maxTemp = temp;

      const shortName = device.name.substring(0, 10);

      loadData.push({ name: shortName, load: load });
      batteryData.push({ name: shortName, charge: charge });
      tempData.push({ name: shortName, temperature: temp });
      voltageData.push({ name: shortName, input: inVolt, output: outVolt });
    }
  });

  const avgLoad = validUPSCount ? Math.round(totalLoad / validUPSCount) : 0;
  const avgCharge = validUPSCount ? Math.round(totalBatteryCharge / validUPSCount) : 0;
  const avgMinutes = validUPSCount ? Math.round(totalMinutesRemaining / validUPSCount) : 0;

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className={styles.dashboardView}>
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>

        {/* Health Overview Card */}
        <div className={styles.dashboardCard} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Icon icon="mdi:heart-pulse" width={20} height={20} />
              UPS Fleet Health
            </h3>
          </div>
          <div className={styles.cardContent}>
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
                      <Cell fill="#10b981" />
                      <Cell fill="#ef4444" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className={styles.donutCenter}>
                  <span className={styles.donutValue}>{data.length}</span>
                  <span className={styles.donutLabel}>Total UPS</span>
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

        {/* Global UPS Status Summary */}
        <div className={styles.dashboardCard} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Icon icon="mdi:flash" width={20} height={20} />
              Power Telemetry Summary
            </h3>
          </div>
          <div className={styles.cardContent} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '10px' }}>
            <div style={{ background: 'var(--color-bg-tertiary)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>Avg Battery Capacity</div>
              <div style={{ fontSize: '28px', color: '#10b981', fontWeight: 'bold' }}>{avgCharge}%</div>
            </div>
            <div style={{ background: 'var(--color-bg-tertiary)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>Avg Load Remaining</div>
              <div style={{ fontSize: '28px', color: '#3b82f6', fontWeight: 'bold' }}>{avgLoad}%</div>
            </div>
            <div style={{ background: 'var(--color-bg-tertiary)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>Avg Run Time</div>
              <div style={{ fontSize: '28px', color: '#f59e0b', fontWeight: 'bold' }}>{avgMinutes}m</div>
            </div>
            <div style={{ background: 'var(--color-bg-tertiary)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>Active Alarms</div>
              <div style={{ fontSize: '28px', color: totalAlarms > 0 ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>{totalAlarms}</div>
            </div>
          </div>
        </div>

        {/* Fleet Load Distribution */}
        <div className={styles.dashboardCard} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Icon icon="mdi:chart-bar" width={20} height={20} />
              Fleet Load Distribution
            </h3>
          </div>
          <div className={styles.cardContent} style={{ height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loadData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                />
                <Bar dataKey="load" name="Output Load %" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Battery Capacity Status */}
        <div className={styles.dashboardCard} style={{ gridColumn: 'span 3' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Icon icon="mdi:battery-high" width={20} height={20} />
              Battery Capacity Status
            </h3>
          </div>
          <div className={styles.cardContent} style={{ height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={batteryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                />
                <Bar dataKey="charge" name="Battery Charge %" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature Distribution */}
        <div className={styles.dashboardCard} style={{ gridColumn: 'span 3' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Icon icon="mdi:thermometer" width={20} height={20} />
              Temperature Monitoring
            </h3>
          </div>
          <div className={styles.cardContent} style={{ height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tempData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}°C`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                />
                <Bar dataKey="temperature" name="Temp °C" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Voltage Metrics */}
        <div className={styles.dashboardCard} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Icon icon="mdi:sine-wave" width={20} height={20} />
              Input vs Output Voltage
            </h3>
          </div>
          <div className={styles.cardContent} style={{ height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={voltageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}V`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="input" name="Input (V)" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="output" name="Output (V)" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Resource Grid */}
      <div className={styles.resourceGrid}>
        <h3 className={styles.sectionTitle}>
          <Icon icon="mdi:car-battery" width={20} height={20} style={{ color: 'var(--color-chart-orange)' }} />
          UPS Resources
        </h3>
        <div className={styles.hexagonGrid}>
          {data.map((item) => {
            let hexColor = item.status === 'Up' ? '#10b981' : '#ef4444';
            return (
              <div key={item.id} className={styles.hexagon} style={{ backgroundColor: hexColor }} title={item.name}>
                <span className={styles.hexagonLabel}>
                  {item.name.substring(0, 3)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UPSDashboard;
