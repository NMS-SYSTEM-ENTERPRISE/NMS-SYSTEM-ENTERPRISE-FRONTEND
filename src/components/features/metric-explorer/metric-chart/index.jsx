import { Modal } from '@/components/ui/modal';
import { Popup } from '@/components/ui/popup';
import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { TimeRangeSelector } from '../time-range-selector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MetricChartSkeleton } from '@/components/ui/skeleton-loaders/metric-explorer-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';
import styles from './styles.module.css';

export const MetricChart = ({
  metric,
  onRemove,
  onUpdate,
  onExpand,
  onShare,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const containerRef = useRef(null);

  const { data = [], name, displayName, monitor, timeRange, unit = '%', isLoading, message } = metric;
  const displayTitle = displayName || name;
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(displayTitle);

  // Calculate statistics
  const values = data.map((d) => d.value);
  const hasData = values.length > 0;
  const currentValue = hasData ? values[values.length - 1] : 0;
  const min = hasData ? Math.min(...values) : 0;
  const max = hasData ? Math.max(...values) : 0;
  const avg = hasData ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  const formatValue = (value) => `${Number(value || 0).toFixed(2)}${unit === 'bytes' ? ' B' : unit}`;

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }
    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;

    const timeLabels = data.map((d, i) => {
      if (i % Math.ceil(data.length / 8) === 0 || i === data.length - 1) {
        const date = new Date(d.timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      }
      return '';
    });

    const option = {
      grid: { left: 40, right: 30, top: 30, bottom: 40, borderColor: '#1f2937' },
      xAxis: {
        type: 'category',
        data: timeLabels,
        axisLabel: { color: '#9ca3af', fontSize: 11, fontFamily: 'var(--font-manrope), var(--font-geist-sans), sans-serif' },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af', fontSize: 11, fontFamily: 'var(--font-manrope), var(--font-geist-sans), sans-serif', formatter: `{value}${unit === 'bytes' ? ' B' : unit}` },
        splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)', type: 'dashed' } },
      },
      series: [
        {
          type: 'line',
          data: values,
          smooth: true,
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            color: '#0ea5e9',
            width: 3,
            shadowColor: 'rgba(14, 165, 233, 0.5)',
            shadowBlur: 10
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(14, 165, 233, 0.4)' },
                { offset: 1, color: 'rgba(14, 165, 233, 0.0)' },
              ],
            },
          },
          itemStyle: {
            color: '#0b1121',
            borderColor: '#0ea5e9',
            borderWidth: 2
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
        textStyle: {
          color: '#f3f4f6',
          fontFamily: 'var(--font-manrope), var(--font-geist-sans), sans-serif',
          fontSize: 12
        },
        formatter: (params) => {
          const point = data[params[0].dataIndex];
          const date = new Date(point.timestamp);
          const dateStr = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
          const timeStr = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });

          return `
            <div style="font-weight: 500; margin-bottom: 8px; color: #9ca3af;">
              ${dateStr} <span style="opacity: 0.7; margin-left: 4px;">${timeStr}</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
              <span style="display: flex; align-items: center; gap: 6px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #0ea5e9; box-shadow: 0 0 5px rgba(14, 165, 233, 0.5);"></span>
                <span style="color: #e5e7eb;">${displayTitle}</span>
              </span>
              <span style="font-weight: 600; font-feature-settings: 'tnum'; color: #fff;">${formatValue(point.value)}</span>
            </div>
          `;
        },
      },
    };
    chart.setOption(option);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [data, displayTitle, unit]);

  const handleRename = () => {
    if (newName.trim()) {
      onUpdate({ displayName: newName.trim() });
      setIsRenaming(false);
    }
  };

  const handleExportCSV = () => {
    if (!data || data.length === 0) return;
    const header = ['Timestamp', 'Date', 'Time', 'Metric', 'Value', 'Unit'];
    const rows = data.map((d) => {
      const date = new Date(d.timestamp);
      return [
        d.timestamp,
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        displayTitle,
        d.value,
        unit
      ].join(',');
    });
    const csvContent = [header.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${displayTitle.replace(/\\s+/g, '_')}_export.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.chartCard} ref={containerRef}>
      <div className={styles.chartHeader}>
        <div className={styles.chartTitle}>
          <Icon icon="mdi:clipboard-text" className={styles.metricIcon} width={16} height={16} />
          <span className={styles.metricName}>{displayTitle}</span>
          <Button variant="ghost" className={styles.removeMetric} onClick={onRemove}>
            <Icon icon="mdi:close" width={16} height={16} />
          </Button>
        </div>
        <div className={styles.chartActions}>
          <TimeRangeSelector
            value={timeRange}
            onChange={(value) => onUpdate({ timeRange: value })}
          />
          <Button variant="ghost" className={styles.actionBtn} onClick={onExpand}>
            <Icon icon="mdi:fullscreen" width={16} height={16} />
          </Button>
          <Button variant="ghost" className={styles.actionBtn} onClick={onShare}>
            <Icon icon="mdi:share-variant" width={16} height={16} />
          </Button>

          <Popup
            placement="bottom-end"
            trigger={
              <Button variant="ghost" className={styles.actionBtn}>
                <Icon icon="mdi:dots-vertical" width={16} height={16} />
              </Button>
            }
            content={
              <div className={styles.menuContent}>
                <Button
                  variant="ghost"
                  className={styles.menuItem}
                  onClick={() => {
                    setNewName(displayTitle);
                    setIsRenaming(true);
                  }}
                >
                  <Icon icon="mdi:pencil" width={14} />
                  Rename Metric
                </Button>
                <Button
                  variant="ghost"
                  className={styles.menuItem}
                  onClick={handleExportCSV}
                >
                  <Icon icon="mdi:download" width={14} />
                  Export Data
                </Button>
                <div style={{ height: 1, background: 'var(--color-border)', margin: '4px 0' }} />
                <Button
                  variant="ghost"
                  className={`${styles.menuItem} ${styles.menuItemDanger}`}
                  onClick={onRemove}
                >
                  <Icon icon="mdi:close-circle" width={14} />
                  Remove
                </Button>
              </div>
            }
          />
        </div>
      </div>

      <div className={styles.chartBody}>
        {isLoading ? (
          <MetricChartSkeleton />
        ) : !hasData ? (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <NoDataFound 
              title="No Metric Data" 
              description={message || 'No data available for this metric yet.'} 
              icon="mdi:chart-line-variant"
            />
          </div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
        )}
      </div>

      <div className={styles.chartStats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Metric</span>
          <span className={styles.statValue}>{name}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Monitor</span>
          <span className={styles.statValue} style={{ color: '#0ea5e9' }}>
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

      <Modal
        isOpen={isRenaming}
        onClose={() => setIsRenaming(false)}
        title="Rename Metric"
        className={styles.modalContent}
      >
        <div className={styles.modalBody}>
          <label className={styles.statLabel} style={{ marginBottom: 8, display: 'block' }}>Metric Alias</label>
          <Input
            type="text"
            className={styles.modalInput}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus
          />
          <div className={styles.modalActions}>
            <Button
              variant="secondary"
              onClick={() => setIsRenaming(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleRename}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
