import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

export const ChartModal = ({ metric, onClose, onSaveAsWidget }) => {
  const [timeRange, setTimeRange] = useState(metric.timeRange || '24h');
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const modalRef = useRef(null);

  const { data, name, monitor } = metric;

  // Calculate statistics
  const values = data.map((d) => d.value);
  const currentValue = values[values.length - 1];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;

  useEffect(() => {
    if (!chartRef.current) return;
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
        axisLabel: { color: '#9ca3af', fontSize: 14, formatter: '{value}%' },
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
          return `${weekday}, ${month} ${day}, ${year} ${hours}:${minutes}:${seconds} ${period}<br/>${name}: <strong>${point.value.toFixed(2)}%</strong>`;
        },
      },
    };
    chart.setOption(option);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [data, name]);

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
              <button className={styles.timeBtn}>24h</button>
              <button className={styles.timeBtn}>Last 24 Hours</button>
              <div className={styles.dateRange}>
                {formatDateRange()
                  .split('\n')
                  .map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
              </div>
            </div>
            <button className={styles.saveBtn} onClick={onSaveAsWidget}>
              Save as Widget
            </button>
            <button className={styles.closeBtn} onClick={onClose}>
              <Icon icon="mdi:close" width={20} height={20} />
            </button>
          </div>
        </div>

        <div className={styles.chartArea}>
          <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
        </div>

        <div className={styles.chartStats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Metric</span>
            <span className={styles.statValue}>{name}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Monitor</span>
            <span className={styles.statValue} style={{ color: '#06b6d4' }}>
              {monitor || 'N/A'}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Value</span>
            <span className={styles.statValue}>{currentValue.toFixed(2)}%</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Min</span>
            <span className={styles.statValue}>{min.toFixed(2)}%</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Max</span>
            <span className={styles.statValue}>{max.toFixed(2)}%</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Avg</span>
            <span className={styles.statValue}>{avg.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
