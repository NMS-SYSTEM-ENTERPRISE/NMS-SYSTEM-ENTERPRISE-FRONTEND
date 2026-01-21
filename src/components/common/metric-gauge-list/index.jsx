import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import styles from './styles.module.css';

const GaugeItem = ({ value, color, max = 100 }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;

    const option = {
      series: [
        {
          type: 'pie',
          radius: ['70%', '90%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          label: { show: false },
          hoverAnimation: false,
          data: [
            {
              value: value,
              itemStyle: {
                color: color,
              }
            },
            {
              value: max - value,
              itemStyle: {
                color: 'rgba(255, 255, 255, 0.1)',
              }
            }
          ]
        }
      ]
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [value, color, max]);

  return <div ref={chartRef} className={styles.gaugeContainer} />;
};

export const MetricGaugeList = ({ title, data, valueFormatter = (v) => `${v}%` }) => {
  return (
    <div className={styles.widgetContainer}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.list}>
        {data.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.labelContainer}>
              <span className={styles.label}>{item.label}</span>
            </div>
            <div className={styles.rightSide}>
              <span className={styles.value} style={{ color: item.color || '#fff' }}>
                {valueFormatter(item.value)}
              </span>
              <GaugeItem 
                value={item.value} 
                max={item.max || 100} 
                color={item.color || '#06b6d4'} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
