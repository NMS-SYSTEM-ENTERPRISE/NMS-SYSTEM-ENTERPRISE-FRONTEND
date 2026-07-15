import React from 'react';
import { Icon } from '@iconify/react';
import {
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

const CCTVDashboard = ({ data }) => {
  const upCount = data.filter((d) => d.status === 'Up').length;
  const downCount = data.filter((d) => d.status === 'Down').length;

  let validCCTVCount = 0;

  const vendorCounts = {};
  const typeCounts = {};
  const bandwidthData = [];

  data.forEach(device => {
    const metrics = device.cctvMetrics || {};

    if (Object.keys(metrics).length > 0) {
      validCCTVCount++;
      // Vendor Distribution
      const vendor = metrics.vendor || 'Unknown';
      vendorCounts[vendor] = (vendorCounts[vendor] || 0) + 1;

      // Type Distribution
      const type = metrics.type || 'Unknown';
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    }

    // Bandwidth Data (strip 'Mbps' and parse float)
    let bIn = 0;
    let bOut = 0;
    if (device.bandwidthIn) {
      bIn = parseFloat(device.bandwidthIn.replace(/[^\d.-]/g, '')) || 0;
    }
    if (device.bandwidthOut) {
      bOut = parseFloat(device.bandwidthOut.replace(/[^\d.-]/g, '')) || 0;
    }

    if (bIn > 0 || bOut > 0) {
      bandwidthData.push({
        name: device.name.substring(0, 12),
        in: bIn,
        out: bOut
      });
    }
  });

  const vendorData = Object.keys(vendorCounts).map(key => ({ name: key, value: vendorCounts[key] }));
  const typeData = Object.keys(typeCounts).map(key => ({ name: key, value: typeCounts[key] }));

  // Sort bandwidth data to show top 15 highest consumers to keep chart clean
  bandwidthData.sort((a, b) => (b.in + b.out) - (a.in + a.out));
  const topBandwidthData = bandwidthData.slice(0, 15);

  const VENDOR_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#14b8a6'];
  const TYPE_COLORS = ['#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#a855f7'];

  return (
    <div className={styles.dashboardView}>
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>

        {/* Health Overview Card */}
        <div className={styles.dashboardCard} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Icon icon="mdi:cctv" width={20} height={20} />
              CCTV Infrastructure Health
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
                  <span className={styles.donutLabel}>Total Devices</span>
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

        {/* Vendor Distribution Card */}
        <div className={styles.dashboardCard} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Icon icon="mdi:domain" width={20} height={20} />
              Vendor Distribution
            </h3>
          </div>
          <div className={styles.cardContent} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={vendorData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {vendorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={VENDOR_COLORS[index % VENDOR_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Camera Types Card */}
        <div className={styles.dashboardCard} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Icon icon="mdi:shape" width={20} height={20} />
              Camera Types
            </h3>
          </div>
          <div className={styles.cardContent} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={TYPE_COLORS[index % TYPE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bandwidth Usage Card */}
        <div className={styles.dashboardCard} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Icon icon="mdi:access-point-network" width={20} height={20} />
              Top Camera Traffic (Mbps)
            </h3>
          </div>
          <div className={styles.cardContent} style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topBandwidthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="in" name="Bandwidth In (Mbps)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={25} />
                <Bar dataKey="out" name="Bandwidth Out (Mbps)" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Resource Grid */}
      <div className={styles.resourceGrid}>
        <h3 className={styles.sectionTitle}>
          <Icon icon="mdi:camera" width={20} height={20} style={{ color: 'var(--color-chart-yellow)' }} />
          CCTV Infrastructure Overview
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

export default CCTVDashboard;
