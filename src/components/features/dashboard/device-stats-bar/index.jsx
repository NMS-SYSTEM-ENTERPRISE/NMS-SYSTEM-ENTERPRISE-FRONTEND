'use client';

import { Server, Wifi, WifiOff } from 'lucide-react';
import styles from './styles.module.css';

const STAT_CONFIG = [
  { key: 'total', label: 'Total Devices', icon: Server, color: '#3b82f6' },
  { key: 'online', label: 'Online', icon: Wifi, color: '#22c55e' },
  { key: 'offline', label: 'Offline', icon: WifiOff, color: '#ef4444' },
];

export const DeviceStatsBar = ({ statistics }) => {
  if (!statistics) return null;

  return (
    <div className={styles.statsBar}>
      {STAT_CONFIG.map(({ key, label, icon: Icon, color }) => (
        <div
          key={key}
          className={styles.statCard}
          style={{ '--accent': color }}
        >
          <div className={styles.statIcon}>
            <Icon size={18} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>{label}</span>
            <span className={styles.statValue}>{statistics[key] ?? 0}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
