import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import styles from './styles.module.css';

export const ChartModal = ({ metric, onClose, onSaveAsWidget }) => {
  const [timeRange, setTimeRange] = useState(metric.timeRange || '24h');
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const modalRef = useRef(null);

  const { data = [], name, monitor, unit = '%' } = metric;

  // Calculate statistics
  const values = data.map((d) => d.value);
  const hasData = values.length > 0;
  const currentValue = hasData ? values[values.length - 1] : 0;
  const min = hasData ? Math.min(...values) : 0;
  const max = hasData ? Math.max(...values) : 0;
  const avg = hasData ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  const formatValue = (value) => `${Number(value || 0).toFixed(2)}${unit === 'bytes' ? ' B' : unit}`;

  useEffect(() => {
    if (!chartRef.current || !hasData) return;
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }
    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;

    const timeLabels = data.map((d, i) => {
      if (i % Math.ceil(data.length / 12) === 0 || i === data.length - 1) {
        const date = new Date(d.timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      }
      return '';
    });

    const option = {
      grid: { left: 80, right: 40, top: 50, bottom: 80 },
      xAxis: {
        type: 'category',
        data: timeLabels,
        axisLabel: { color: '#9ca3af', fontSize: 14 },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af', fontSize: 14, formatter: `{value}${unit === 'bytes' ? ' B' : unit}` },
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#1f2937' } },
      },
      series: [
        {
          type: 'line',
          data: values,
          smooth: true,
          lineStyle: { color: '#06b6d4', width: 3 },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(6, 182, 212, 0.5)' },
                { offset: 0.5, color: 'rgba(6, 182, 212, 0.2)' },
                { offset: 1, color: 'rgba(6, 182, 212, 0.0)' },
              ],
            },
          },
          symbol: 'circle',
          symbolSize: 7,
          itemStyle: { color: '#06b6d4' },
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const point = data[params[0].dataIndex];
          const date = new Date(point.timestamp);
          const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
          const month = date.toLocaleDateString('en-US', { month: 'short' });
          const day = date.getDate();
          const year = date.getFullYear();
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          const period = date.getHours() >= 12 ? 'PM' : 'AM';
          return `${weekday}, ${month} ${day}, ${year} ${hours}:${minutes}:${seconds} ${period}<br/>${name}: <strong>${formatValue(point.value)}</strong>`;
        },
      },
    };
    chart.setOption(option);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [data, name, hasData, unit]);

  // Resize chart when modal opens
  useEffect(() => {
    if (chartInstance.current) {
      setTimeout(() => {
        chartInstance.current.resize();
      }, 100);
    }
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);


  const formatDateRange = () => {
    if (!hasData) return 'No data available';
    const endDate = new Date(data[data.length - 1].timestamp);
    const startDate = new Date(data[0].timestamp);

    const format = (date) => {
      const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.getDate();
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const period = date.getHours() >= 12 ? 'PM' : 'AM';

      return `${weekday}, ${month} ${day}, ${year} ${hours}:${minutes}:${seconds} ${period}`;
    };

    return `${format(startDate)}\n${format(endDate)}`;
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <h3>
              {name} of {monitor?.split('(')[0] || 'Monitor'}
            </h3>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.timeControls}>
              <Button variant="ghost" className={styles.timeBtn}>24h</Button>
              <Button variant="ghost" className={styles.timeBtn}>Last 24 Hours</Button>
              <div className={styles.dateRange}>
                {formatDateRange()
                  .split('\n')
                  .map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
              </div>
            </div>
            <Button variant="primary" className={styles.saveBtn} onClick={onSaveAsWidget}>
              Save as Widget
            </Button>
            <Button variant="ghost" className={styles.closeBtn} onClick={onClose}>
              <Icon icon="mdi:close" width={20} height={20} />
            </Button>
          </div>
        </div>

        <div className={styles.chartArea}>
          {hasData ? (
            <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
          ) : (
            <div style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', color: '#9ca3af' }}>
              {metric.message || 'No data available for this metric yet.'}
            </div>
          )}
        </div>

        <div className={styles.chartStats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Metric</span>
            <span className={styles.statValue}>{name}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Monitor</span>
            <span className={styles.statValue} style={{ color: 'var(--color-chart-cyan)' }}>
              {monitor || 'N/A'}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Value</span>
            <span className={styles.statValue}>{formatValue(currentValue)}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Min</span>
            <span className={styles.statValue}>{formatValue(min)}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Max</span>
            <span className={styles.statValue}>{formatValue(max)}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Avg</span>
            <span className={styles.statValue}>{formatValue(avg)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
