
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { Area, AreaChart, Line, LineChart, ResponsiveContainer } from 'recharts';
import styles from './styles.module.css';

const resolveColor = (color) => {
  if (!color) return '#06b6d4';
  if (color.startsWith('var(')) {
    const varName = color.match(/var\(([^)]+)\)/)?.[1];
    if (varName && typeof document !== 'undefined') {
       const resolved = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
       return resolved || color;
    }
  }
  return color;
};

const SemiCircleGauge = ({ value, color, max = 100 }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;

    const resolvedColor = resolveColor(color);
    const ratio = Math.min(Math.max(value / max, 0), 1);

    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: max,
          splitNumber: 1,
          radius: '120%',
          center: ['50%', '75%'],
          axisLine: {
            lineStyle: {
              width: 12,
              color: [
                [ratio, resolvedColor],
                [1, '#1f2937']
              ]
            }
          },
          pointer: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          title: { show: false },
          detail: { show: false }
        }
      ]
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [value, color, max]);

  return <div ref={chartRef} style={{ width: '60px', height: '35px' }} />;
};

export const MonitorTable = ({ title, columns, data, chartType = 'gauge' }) => {
  const generateSparklineData = (values) => {
    if (!values || !Array.isArray(values)) return [];
    return values.map((value, index) => ({ value, index }));
  };

  return (
    <div className={styles.monitorTable}>
      <h3 className={styles.monitorTable_title}>{title}</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={styles.tableHeader}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              // Parse value for gauge
              let numericValue = 0;
              let maxValue = 100;
              
              if (typeof row.value === 'string') {
                if (row.value.includes('%')) {
                   numericValue = parseFloat(row.value.replace('%', ''));
                } else if (row.value.includes('ms')) {
                   numericValue = parseFloat(row.value.replace(' ms', ''));
                   maxValue = 50;
                } else {
                   numericValue = parseFloat(row.value);
                }
              } else if (typeof row.value === 'number') {
                numericValue = row.value;
              }

              if (row.packets) {
                 numericValue = parseFloat(row.packets);
                 maxValue = 1000;
              }

              const resolvedRowColor = resolveColor(row.color || '#06b6d4');

              return (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>{row.monitor}</td>
                  {row.interface !== undefined && (
                    <td className={styles.tableCell}>{row.interface}</td>
                  )}
                  {row.value !== undefined && !row.interface && (
                    <td className={styles.tableCell}>{row.value}</td>
                  )}
                  {row.packets !== undefined && (
                    <td className={styles.tableCell}>{row.packets}</td>
                  )}
                  {row.downtime !== undefined && (
                    <td className={styles.tableCell}>{row.downtime}</td>
                  )}
                  {columns.some((col) => col.key === 'sparkline') && (
                    <td className={styles.tableCell_sparkline}>
                      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '40px' }}>
                        {chartType === 'gauge' ? (
                          <SemiCircleGauge 
                            value={numericValue || 0} 
                            max={maxValue} 
                            color={row.color || '#06b6d4'} 
                          />
                        ) : chartType === 'area' ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={generateSparklineData(row.sparkline)}>
                              <defs>
                                <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={resolvedRowColor} stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor={resolvedRowColor} stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke={resolvedRowColor} 
                                fill={`url(#gradient-${index})`}
                                fillOpacity={1} 
                                strokeWidth={2}
                                isAnimationActive={true}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={generateSparklineData(row.sparkline)}>
                              <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke={resolvedRowColor} 
                                strokeWidth={2}
                                dot={false}
                                isAnimationActive={true}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
