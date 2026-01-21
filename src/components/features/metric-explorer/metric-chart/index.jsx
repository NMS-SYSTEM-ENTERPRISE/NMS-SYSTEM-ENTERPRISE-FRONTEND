import { Modal } from '@/components/ui/modal';
import { Popup } from '@/components/ui/popup';
import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { TimeRangeSelector } from '../time-range-selector';
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

  const { data, name, monitor, timeRange } = metric;
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(name);

  // Calculate statistics
  const values = data.map((d) => d.value);
  const currentValue = values[values.length - 1];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;

  useEffect(() => {
    // ... stats logic same as before ... 
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
        axisLabel: { color: '#9ca3af', fontSize: 11, fontFamily: 'Inter' },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af', fontSize: 11, fontFamily: 'Inter', formatter: '{value}%' },
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
        backgroundColor: 'rgba(31, 41, 55, 0.95)', // Gray 800 with opacity
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
        textStyle: {
          color: '#f3f4f6',
          fontFamily: 'Inter',
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
                <span style="color: #e5e7eb;">${name}</span>
              </span>
              <span style="font-weight: 600; font-feature-settings: 'tnum'; color: #fff;">${point.value.toFixed(2)}%</span>
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
  }, [data, name]);

  const handleRename = () => {
    if (newName.trim()) {
      onUpdate({ name: newName.trim() });
      setIsRenaming(false);
    }
  };

  return (
    <div className={styles.chartCard} ref={containerRef}>
      <div className={styles.chartHeader}>
        <div className={styles.chartTitle}>
          <Icon icon="mdi:clipboard-text" className={styles.metricIcon} width={16} height={16} />
          <span className={styles.metricName}>{name}</span>
          <button className={styles.removeMetric} onClick={onRemove}>
            <Icon icon="mdi:close" width={16} height={16} />
          </button>
        </div>
        <div className={styles.chartActions}>
          <TimeRangeSelector
            value={timeRange}
            onChange={(value) => onUpdate({ timeRange: value })}
          />
          <button className={styles.actionBtn} onClick={onExpand}>
            <Icon icon="mdi:fullscreen" width={16} height={16} />
          </button>
          <button className={styles.actionBtn} onClick={onShare}>
            <Icon icon="mdi:share-variant" width={16} height={16} />
          </button>
          
          <Popup
            placement="bottom-end"
            trigger={
              <button className={styles.actionBtn}>
                <Icon icon="mdi:dots-vertical" width={16} height={16} />
              </button>
            }
            content={
              <div className={styles.menuContent}>
                <button 
                  className={styles.menuItem} 
                  onClick={() => {
                    setNewName(name);
                    setIsRenaming(true);
                  }}
                >
                  <Icon icon="mdi:pencil" width={14} />
                  Rename Metric
                </button>
                 <button 
                  className={styles.menuItem} 
                  onClick={() => {
                    alert('Exporting data as CSV...');
                  }}
                >
                  <Icon icon="mdi:download" width={14} />
                  Export Data
                </button>
                <div style={{ height: 1, background: '#374151', margin: '4px 0' }} />
                <button 
                  className={`${styles.menuItem} ${styles.menuItemDanger}`} 
                  onClick={onRemove}
                   style={{ color: '#ef4444' }}
                >
                  <Icon icon="mdi:close-circle" width={14} />
                  Remove
                </button>
              </div>
            }
          />
        </div>
      </div>

      <div className={styles.chartBody}>
        <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
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

      {/* Rename Modal */}
      <Modal
        isOpen={isRenaming}
        onClose={() => setIsRenaming(false)}
        title="Rename Metric"
        className={styles.modalContent}
      >
        <div className={styles.modalBody}>
          <label className={styles.statLabel} style={{ marginBottom: 8, display: 'block' }}>Metric Alias</label>
          <input
            type="text"
            className={styles.modalInput}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus
          />
          <div className={styles.modalActions}>
            <button 
              className={`${styles.modalBtn} ${styles.modalBtnCancel}`}
              onClick={() => setIsRenaming(false)}
            >
              Cancel
            </button>
            <button 
              className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
              onClick={handleRename}
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
