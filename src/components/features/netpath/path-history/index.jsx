import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

const HistoryChart = ({ type, data, times }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data || !times) return;
    if (chartInstance.current) chartInstance.current.dispose();
    
    const chart = echarts.init(chartRef.current, null, { renderer: 'canvas' });
    chartInstance.current = chart;

    let seriesData = [];
    let color = '#38bdf8';
    
    if (type === 'availability') {
      seriesData = data.map(v => v === 1 ? 100 : 0);
      color = '#c084fc'; // Match Pink/Purple Title
    } else if (type === 'errorPackets') {
      seriesData = data;
      color = '#f59e0b'; // Amber for Errors
    } else {
      seriesData = data;
      color = type === 'packetLoss' ? '#f43f5e' : '#22d3ee';
    }

    chart.group = 'pathHistoryGroup';
    
    chart.setOption({
      grid: { left: 0, right: 0, top: 20, bottom: 20 },
      xAxis: {
        type: 'category',
        data: times,
        show: false
      },
      yAxis: {
        type: 'value',
        show: false,
        max: type === 'availability' ? 100 : 'dataMax'
      },
      dataZoom: [
        {
          type: 'inside',
          start: 80, // View last 20% of data (approx "2 hours" window)
          end: 100,
          zoomLock: false
        }
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#111827',
        borderColor: 'rgba(255,255,255,0.1)',
        textStyle: { color: '#fff', fontSize: 10 },
        formatter: (params) => {
          const val = params[0].value;
          const unit = type === 'packetLoss' ? '%' : type === 'latency' ? 'ms' : type === 'errorPackets' ? ' Pkts' : '%';
          return `${params[0].name}: ${val}${unit}`;
        }
      },
      series: [{
        data: seriesData,
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          color: color,
          borderRadius: [2, 2, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: '#fff',
            shadowBlur: 10,
            shadowColor: color
          }
        }
      }]
    });

    // Ensure connection happens
    echarts.connect('pathHistoryGroup');

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [type, data, times]);

  return <div ref={chartRef} className={styles.chartCanvas} />;
};

export const PathHistory = ({ historyData }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!historyData) return null;

  return (
    <div className={styles.pathHistory}>
      <div 
        className={styles.historyHeader} 
        onClick={() => setIsOpen(!isOpen)}
        data-open={isOpen}
      >
        <div className={styles.headerLeft}>
          <div className={styles.iconWrapper}>
            <Icon icon="mdi:history" width={20} height={20} />
          </div>
          <span className={styles.historyTitle}>
            Path History 
            <span className={styles.titleBadge}>24 HOURS</span>
          </span>
        </div>
        <div className={styles.headerRight}>
          <Icon 
            icon="mdi:chevron-down" 
            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} 
            width={20} 
          />
        </div>
      </div>

      {isOpen && (
        <div className={styles.chartsContainer}>
          {/* Availability Graph */}
          <div className={styles.chartRow}>
            <div className={styles.chartLabel}>
              <span className={styles.chartTitle}>Availability</span>
              <div className={styles.chartScale}>
                <span>100% OK</span>
                <span>UPTIME</span>
              </div>
            </div>
            <HistoryChart type="availability" data={historyData.availability} times={historyData.times} />
          </div>

          {/* Latency Graph */}
          <div className={styles.chartRow}>
            <div className={`${styles.chartLabel} ${styles.blueTitle}`}>
              <span className={`${styles.chartTitle} ${styles.blueTitle}`}>Latency (ms)</span>
              <div className={styles.chartScale}>
                <span className={styles.highlightCyan}>AVG 0.44ms</span>
                <span>FLUCTUATION</span>
              </div>
            </div>
            <HistoryChart type="latency" data={historyData.latency} times={historyData.times} />
          </div>

          {/* Packet Loss Graph */}
          <div className={styles.chartRow}>
            <div className={`${styles.chartLabel} ${styles.redTitle}`}>
              <span className={`${styles.chartTitle} ${styles.redTitle}`}>Packet Loss (%)</span>
              <div className={styles.chartScale}>
                <span className={styles.highlightDanger}>0.0% LOSS</span>
                <span>CRITICAL</span>
              </div>
            </div>
            <HistoryChart type="packetLoss" data={historyData.packetLoss} times={historyData.times} />
          </div>

          {/* Error Packets Graph */}
          <div className={styles.chartRow}>
            <div className={`${styles.chartLabel} ${styles.warningTitle}`}>
              <span className={`${styles.chartTitle} ${styles.warningTitle}`}>Error Packets</span>
              <div className={styles.chartScale}>
                <span className={styles.highlightWarning}>0 TOTAL</span>
                <span>WARNINGS</span>
              </div>
            </div>
            <HistoryChart type="errorPackets" data={historyData.errorPackets} times={historyData.times} />
          </div>

          <div className={styles.timeAxis}>
            <span className={styles.timeLabel}>24H AGO</span>
            <span className={styles.timeLabel}>12H AGO</span>
            <span className={styles.timeLabel}>6H AGO</span>
            <span className={styles.timeLabel}>NOW</span>
          </div>
        </div>
      )}
    </div>
  );
};
