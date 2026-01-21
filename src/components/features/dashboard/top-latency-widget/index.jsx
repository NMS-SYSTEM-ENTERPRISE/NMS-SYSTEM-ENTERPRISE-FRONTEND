import { Timer } from 'lucide-react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './styles.module.css';

const resolveColor = (color) => {
  if (!color) return '#f97316';
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

export const TopLatencyWidget = ({ data }) => {
  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <Timer size={20} className={styles.icon} />
        <h3 className={styles.title}>Top Monitor by Latency</h3>
      </div>

      <div className={styles.list}>
        {data.map((item, index) => {
          const resolvedColor = resolveColor(item.color || '#f97316');
          const hasSparkline = item.sparkline && item.sparkline.length > 0;
          const chartData = hasSparkline ? item.sparkline.map((val, i) => ({ i, value: val })) : [];
          
          return (
            <div key={index} className={styles.item}>
              <div className={styles.monitorInfo}>
                <span className={styles.monitorName} title={item.monitor}>{item.monitor}</span>
                <div className={styles.monitorStatus}>
                  <div className={styles.statusDot} style={{ backgroundColor: resolvedColor }} />
                  <span style={{ opacity: 0.7 }}>Active</span>
                </div>
              </div>

              <div className={styles.sparklineContainer}>
                {hasSparkline && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barGap={1}>
                       <Tooltip 
                         cursor={{fill: 'transparent'}}
                         contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '4px', fontSize: '10px' }}
                         itemStyle={{ color: '#fff' }}
                         labelStyle={{ display: 'none' }}
                       />
                       <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                         {chartData.map((entry, i) => (
                           <Cell 
                              key={`cell-${i}`} 
                              fill={resolvedColor} 
                              fillOpacity={0.6 + (entry.value / Math.max(...item.sparkline)) * 0.4} 
                           />
                         ))}
                       </Bar>
                    </BarChart>
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
