import { Icon } from '@iconify/react';
import { MetricChart } from '../metric-chart';
import { NoDataFound } from '@/components/ui/no-data-found';
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
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <NoDataFound 
          title="No Metrics Selected" 
          description="Select a metric from the sidebar or drag and drop it here to visualize trends and analyze performance." 
          icon="mdi:chart-timeline-variant" 
        />
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
