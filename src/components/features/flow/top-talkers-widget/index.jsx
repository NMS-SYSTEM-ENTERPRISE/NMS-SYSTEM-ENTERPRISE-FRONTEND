"use client";
import { Icon } from '@iconify/react';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import styles from './top-talkers.module.css';

// Mock data for top talkers (devices/IPs with highest traffic)
const TOP_TALKERS_DATA = [
  { name: '192.168.1.100', value: 2400, host: 'web-server-01', color: '#06b6d4' },
  { name: '192.168.1.105', value: 1800, host: 'db-server-main', color: '#3b82f6' },
  { name: '192.168.1.112', value: 1200, host: 'app-server-02', color: '#8b5cf6' },
  { name: '192.168.1.89', value: 900, host: 'backup-server', color: '#10b981' },
  { name: '192.168.1.45', value: 600, host: 'file-server', color: '#f59e0b' },
  { name: 'Others', value: 1100, host: 'Various', color: '#64748b' },
];

export const TopTalkersWidget = () => {
  const totalTraffic = TOP_TALKERS_DATA.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={styles.topTalkersWidget}>
      <div className={styles.widgetContent}>
        <div className={styles.chartSection}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={TOP_TALKERS_DATA}
                cx="50%"
                cy="50%"
                innerRadius={85}
                outerRadius={120}
                paddingAngle={3}
                dataKey="value"
              >
                {TOP_TALKERS_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '11px',
                }}
                itemStyle={{ color: 'var(--color-text-primary)' }}
                formatter={(value, name, props) => [
                  `${((value / totalTraffic) * 100).toFixed(1)}% (${value} MB/s)`,
                  props.payload.host,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className={styles.centerStats}>
            <div className={styles.totalValue}>{totalTraffic}</div>
            <div className={styles.totalLabel}>MB/s Total</div>
          </div>
        </div>

        <div className={styles.detailsSection}>
          <div className={styles.detailsHeader}>
            <span>Traffic Breakdown</span>
            <Icon icon="mdi:information-outline" width={14} />
          </div>
          
          <div className={styles.talkersList}>
            {TOP_TALKERS_DATA.map((talker, index) => {
              const percentage = ((talker.value / totalTraffic) * 100).toFixed(1);
              return (
                <div key={index} className={styles.talkerItem}>
                  <div className={styles.talkerInfo}>
                    <div className={styles.talkerRank}>#{index + 1}</div>
                    <div 
                      className={styles.talkerIndicator} 
                      style={{ backgroundColor: talker.color }}
                    />
                    <div className={styles.talkerDetails}>
                      <div className={styles.talkerIP}>{talker.name}</div>
                      <div className={styles.talkerHost}>{talker.host}</div>
                    </div>
                  </div>
                  <div className={styles.talkerStats}>
                    <div className={styles.talkerValue}>{talker.value} MB/s</div>
                    <div className={styles.talkerPercentage}>{percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.widgetFooter}>
            <button className={styles.viewAllBtn}>
              <Icon icon="mdi:arrow-right" width={16} />
              View All Talkers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
