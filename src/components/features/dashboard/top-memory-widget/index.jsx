import { Zap } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import styles from './styles.module.css';

const resolveColor = (color) => {
  if (!color) return '#a855f7';
  if (color.startsWith('var(')) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return color;
    const varName = color.match(/var\(([^)]+)\)/)?.[1];
    if (varName) {
       const resolved = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
       return resolved || color;
    }
  }
  return color;
};

export const TopMemoryWidget = ({ data }) => {
  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <Zap size={20} className={styles.icon} />
        <h3 className={styles.title}>Top Monitor by Memory Percent</h3>
      </div>

      <div className={styles.list}>
        {data.map((item, index) => {
          const resolvedColor = resolveColor(item.color || '#a855f7');
          const hasSparkline = item.sparkline && item.sparkline.length > 0;
          const chartData = hasSparkline ? item.sparkline.map((val, i) => ({ i, value: val })) : [];
          
          return (
            <div key={index} className={styles.item}>
              <div className={styles.monitorInfo}>
                <span className={styles.monitorName} title={item.monitor}>{item.monitor}</span>
                <div className={styles.monitorStatus}>
                  <div className={styles.statusDot} style={{ backgroundColor: resolvedColor }} />
                  <span style={{ opacity: 0.7 }}>Running</span>
                </div>
              </div>

              <div className={styles.sparklineContainer}>
                {hasSparkline && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id={`gradient-mem-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={resolvedColor} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={resolvedColor} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={resolvedColor} 
                        fill={`url(#gradient-mem-${index})`} 
                        strokeWidth={2}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className={styles.valueContainer}>
                <span className={styles.value} style={{ color: resolvedColor }}>
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
