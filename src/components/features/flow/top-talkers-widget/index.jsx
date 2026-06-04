"use client";
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import styles from './top-talkers.module.css';

export const TopTalkersWidget = ({ data = [] }) => {
  const totalTraffic = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={styles.topTalkersWidget}>
      <div className={styles.widgetContent}>
        <div className={styles.chartSection}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={85}
                outerRadius={120}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
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
            {data.map((talker, index) => {
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
        </div>
      </div>
    </div>
  );
};
