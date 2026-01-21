import { WifiOff } from 'lucide-react';
import { Bar, BarChart, Cell, ResponsiveContainer } from 'recharts';
import styles from './styles.module.css';

const resolveColor = (color) => {
  if (!color) return '#ef4444';
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

export const DroppedPacketsWidget = ({ data }) => {
  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <WifiOff size={20} className={styles.icon} />
        <h3 className={styles.title}>Top Monitor Interface by Dropped Packets</h3>
      </div>

      <div className={styles.list}>
        {data.map((item, index) => {
          const resolvedColor = resolveColor(item.color || '#ef4444');
          const hasSparkline = item.sparkline && item.sparkline.length > 0;
          const chartData = hasSparkline ? item.sparkline.map((val, i) => ({ i, value: val })) : [];
          const maxValue = hasSparkline ? Math.max(...item.sparkline) : 1;
          
          return (
            <div key={index} className={styles.item}>
              <div className={styles.monitorInfo}>
                <span className={styles.monitorName} title={item.monitor}>{item.monitor}</span>
                <span className={styles.interfaceName} title={item.interface}>
                  {item.interface}
                </span>
              </div>

              <div className={styles.sparklineContainer}>
                {hasSparkline && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barGap={1}>
                       <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                         {chartData.map((entry, i) => (
                           <Cell 
                              key={`cell-${i}`} 
                              fill={resolvedColor} 
                              fillOpacity={0.5 + (entry.value / maxValue) * 0.5} 
                           />
                         ))}
                       </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className={styles.valueContainer}>
                <span className={styles.value} style={{ color: resolvedColor }}>
                  {item.packets}
                </span>
                <span className={styles.unit}>PKTS</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
