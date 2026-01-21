import { Cpu } from 'lucide-react';
import styles from './styles.module.css';

const cpuData = [
  { id: 1, label: 'SQL Server', value: 79.07, color: '#ef4444' }, // Red
  { id: 2, label: 'Server + Windows', value: 70.56, color: '#f97316' }, // Orange
  { id: 3, label: 'Windows IIS', value: 69.65, color: '#f59e0b' }, // Amber
  { id: 4, label: 'Microsoft IIS', value: 55.7, color: '#eab308' }, // Yellow
  { id: 5, label: 'Active Directory', value: 55.7, color: '#84cc16' }, // Lime
  { id: 6, label: 'Network Core', value: 17.3, color: '#22c55e' }, // Green
  { id: 7, label: 'Switch Stack A', value: 14.26, color: '#10b981' }, // Emerald
  { id: 8, label: 'Switch Stack B', value: 13.08, color: '#06b6d4' }, // Cyan
];

export const CPUWidget = () => {
  return (
    <div className={styles.cpuWidget}>
      <div className={styles.title}>
        <Cpu size={20} className={styles.icon} />
        <span>System CPU Percent by Group</span>
      </div>
      
      <div className={styles.list}>
        {cpuData.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.header}>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.value} style={{ color: item.color }}>
                {item.value.toFixed(2)}%
              </span>
            </div>
            <div className={styles.progressBarTrack}>
              <div 
                className={styles.progressBarFill} 
                style={{ 
                  width: `${item.value}%`,
                  backgroundColor: item.color 
                }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
