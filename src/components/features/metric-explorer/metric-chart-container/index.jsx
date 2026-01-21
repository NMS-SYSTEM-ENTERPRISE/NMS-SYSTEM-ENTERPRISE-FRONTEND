import { Icon } from '@iconify/react';
import { MetricChart } from '../metric-chart';
import styles from './styles.module.css';

export const MetricChartContainer = ({
  metrics,
  onRemoveMetric,
  onUpdateMetric,
  onExpandChart,
  onShareWidget,
}) => {
  if (metrics.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateContent}>
          <div className={styles.iconWrapper}>
            <div className={styles.iconGlow} />
            <Icon icon="mdi:chart-timeline-variant" width={64} height={64} className={styles.mainIcon} />
          </div>
          <h3 className={styles.emptyTitle}>No Metrics Selected</h3>
          <p className={styles.emptyDescription}>
            Select a metric from the sidebar or drag and drop it here to visualize trends and analyze performance.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chartsContainer}>
      {metrics.map((metric) => (
        <MetricChart
          key={metric.id}
          metric={metric}
          onRemove={() => onRemoveMetric(metric.id)}
          onUpdate={(updates) => onUpdateMetric(metric.id, updates)}
          onExpand={() => onExpandChart(metric)}
          onShare={() => onShareWidget(metric)}
        />
      ))}
    </div>
  );
};
