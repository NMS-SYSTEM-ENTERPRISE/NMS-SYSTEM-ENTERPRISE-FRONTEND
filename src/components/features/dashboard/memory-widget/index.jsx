import { Zap } from 'lucide-react';
import styles from './styles.module.css';

const memoryData = [
  { id: 1, label: 'Active Directory', value: 12.62, unit: 'GB', color: '#8b5cf6' }, // Purple
  { id: 2, label: 'Microsoft IIS', value: 12.62, unit: 'GB', color: '#a855f7' },
  { id: 3, label: 'Server + Linux', value: 12.5, unit: 'GB', color: '#d946ef' }, // Fuchsia
  { id: 4, label: 'Server', value: 12.36, unit: 'GB', color: '#ec4899' }, // Pink
  { id: 5, label: 'Server + Windows', value: 6, unit: 'GB', color: '#f43f5e' }, // Rose
  { id: 6, label: 'Windows IIS', value: 5.33, unit: 'GB', color: '#f97316' }, // Orange
  { id: 7, label: 'SQL Server', value: 5.23, unit: 'GB', color: '#eab308' }, // Yellow
  { id: 8, label: 'Server + Solaris', value: 4.11, unit: 'GB', color: '#22c55e' }, // Green
];

export const MemoryWidget = () => {
  // Calculate max value for relative progress bars
  const maxValue = Math.max(...memoryData.map(d => d.value));

  return (
    <div className={styles.memoryWidget}>
      <div className={styles.title}>
        <Zap size={20} className={styles.icon} />
        <span>Memory Used Bytes by Group</span>
      </div>
      
      <div className={styles.list}>
        {memoryData.map((item) => {
          const percent = (item.value / maxValue) * 100;
          return (
            <div key={item.id} className={styles.item}>
              <div className={styles.header}>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value} style={{ color: item.color }}>
                  {item.value.toFixed(2)} {item.unit}
                </span>
              </div>
              <div className={styles.progressBarTrack}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ 
                    width: `${percent}%`,
                    backgroundColor: item.color 
                  }} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
