'use client';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import styles from './styles.module.css';

const Chart = ({ option, height = '40px' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.dispose();

    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;
    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [option]);

  return <div ref={chartRef} style={{ width: '100%', height }} />;
};

// Helper for sparklines
const getSparklineOption = (color) => ({
  grid: { left: 0, right: 0, top: 0, bottom: 0 },
  xAxis: { type: 'category', show: false },
  yAxis: { type: 'value', show: false },
  series: [
    {
      type: 'line',
      data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 50)),
      smooth: true,
      showSymbol: false,
      lineStyle: { width: 2, color },
      areaStyle: {
        color: color,
        opacity: 0.1,
      },
    },
  ],
});

export const TicketingStats = () => {
  return (
    <div className={styles.realtimeGrid}>
      <div className={styles.metricWidget}>
        <div className={styles.statHeader}>
          <div className={styles.statValue} style={{ color: '#ef4444' }}>
            15
          </div>
        </div>
        <div className={styles.statLabel}>Overdue</div>
        <div className={styles.sparklineWrap}>
          <Chart option={getSparklineOption('#ef4444')} />
        </div>
      </div>
      <div className={styles.metricWidget}>
        <div className={styles.statHeader}>
          <div className={styles.statValue} style={{ color: '#f97316' }}>
            3
          </div>
        </div>
        <div className={styles.statLabel}>Due in 24h</div>
        <div className={styles.sparklineWrap}>
          <Chart option={getSparklineOption('#f97316')} />
        </div>
      </div>
      <div className={styles.metricWidget}>
        <div className={styles.statHeader}>
          <div className={styles.statValue} style={{ color: '#06b6d4' }}>
            24
          </div>
        </div>
        <div className={styles.statLabel}>Open</div>
        <div className={styles.sparklineWrap}>
          <Chart option={getSparklineOption('#06b6d4')} />
        </div>
      </div>
      <div className={styles.metricWidget}>
        <div className={styles.statHeader}>
          <div className={styles.statValue}>4</div>
        </div>
        <div className={styles.statLabel}>Unassigned</div>
        <div className={styles.sparklineWrap}>
          <Chart option={getSparklineOption('#6b7280')} />
        </div>
      </div>
      <div className={styles.metricWidget}>
        <div className={styles.statHeader}>
          <div className={styles.statValue} style={{ color: '#22d3ee' }}>
            12
          </div>
        </div>
        <div className={styles.statLabel}>My Open</div>
        <div className={styles.sparklineWrap}>
          <Chart option={getSparklineOption('#22d3ee')} />
        </div>
      </div>
      <div className={styles.metricWidget}>
        <div className={styles.statHeader}>
          <div className={styles.statValue} style={{ color: '#a855f7' }}>
            2
          </div>
        </div>
        <div className={styles.statLabel}>Urgent</div>
        <div className={styles.sparklineWrap}>
          <Chart option={getSparklineOption('#a855f7')} />
        </div>
      </div>
    </div>
  );
};

export const TicketingCharts = () => {
  const statusDistRef = useRef(null);
  const techLoadRef = useRef(null);

  useEffect(() => {
    if (statusDistRef.current) {
      const chart = echarts.init(statusDistRef.current);
      chart.setOption({
        tooltip: { trigger: 'item' },
        series: [
          {
            name: 'Status',
            type: 'pie',
            radius: ['60%', '85%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 6,
              borderColor: '#0b0f19',
              borderWidth: 3,
            },
            label: { show: false, position: 'center' },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontWeight: 'bold',
                color: '#fff',
              },
            },
            labelLine: { show: false },
            data: [
              { value: 24, name: 'Open', itemStyle: { color: '#06b6d4' } },
              {
                value: 12,
                name: 'In Progress',
                itemStyle: { color: '#eab308' },
              },
              { value: 8, name: 'Resolved', itemStyle: { color: '#10b981' } },
              { value: 4, name: 'Closed', itemStyle: { color: '#6b7280' } },
            ],
          },
        ],
      });
    }

    if (techLoadRef.current) {
      const chart = echarts.init(techLoadRef.current);
      chart.setOption({
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: {
          left: '2%',
          right: '4%',
          top: '5%',
          bottom: '0%',
          containLabel: true,
        },
        xAxis: { type: 'value', show: false },
        yAxis: {
          type: 'category',
          data: ['Rajesh', 'Sagar', 'Arnav', 'System', 'Hamesh'],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: '#9ca3af', fontSize: 11, fontWeight: '600' },
        },
        series: [
          {
            name: 'Tickets',
            type: 'bar',
            barWidth: 12,
            itemStyle: { color: '#c084fc', borderRadius: [0, 4, 4, 0] },
            label: {
              show: true,
              position: 'right',
              color: '#fff',
              fontWeight: 'bold',
            },
            data: [8, 5, 4, 3, 2],
          },
        ],
      });
    }
  }, []);

  return (
    <div className={styles.distributionGrid}>
      <div className={styles.distributionCard}>
        <span className={styles.subHeader}>TICKET DISTRIBUTION</span>
        <div className={styles.chartFlex}>
          <div
            ref={statusDistRef}
            style={{ width: '140px', height: '140px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                color: '#9ca3af',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  background: '#06b6d4',
                  borderRadius: '2px',
                }}
              />{' '}
              Open{' '}
              <span
                style={{
                  color: '#fff',
                  marginLeft: 'auto',
                  fontWeight: 'bold',
                }}
              >
                24
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                color: '#9ca3af',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  background: '#eab308',
                  borderRadius: '2px',
                }}
              />{' '}
              Progress{' '}
              <span
                style={{
                  color: '#fff',
                  marginLeft: 'auto',
                  fontWeight: 'bold',
                }}
              >
                12
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                color: '#9ca3af',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  background: '#10b981',
                  borderRadius: '2px',
                }}
              />{' '}
              Resolved{' '}
              <span
                style={{
                  color: '#fff',
                  marginLeft: 'auto',
                  fontWeight: 'bold',
                }}
              >
                8
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.distributionCard}>
        <span className={styles.subHeader}>TECHNICIAN WORKLOAD</span>
        <div className={styles.horizontalBarWrap}>
          <div ref={techLoadRef} style={{ width: '100%', height: '160px' }} />
        </div>
      </div>
    </div>
  );
};

export const TicketingTables = () => {
  return (
    <div
      className={styles.tablesRow}
      style={{ marginTop: '0', border: 'none' }}
    >
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3 className={styles.cardTitle}>My Open Requests</h3>
          <span className={styles.viewAllLink}>View All</span>
        </div>
        <table className={styles.miniTable}>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Requester</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SR-3262 Leave/Time Off Re...</td>
              <td>darshan</td>
              <td>
                <span className={`${styles.statusBadge} ${styles.statusOpen}`}>
                  Open
                </span>
              </td>
            </tr>
            <tr>
              <td>SR-3262 Leave/Time Off Re...</td>
              <td>darshan</td>
              <td>
                <span className={`${styles.statusBadge} ${styles.statusOpen}`}>
                  Open
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3 className={styles.cardTitle}>My Open Tasks</h3>
          <span className={styles.viewAllLink}>View All</span>
        </div>
        <table className={styles.miniTable}>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Reference</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TA-977 IT - Laptop Rep...</td>
              <td>SR-3071</td>
              <td>
                <span className={`${styles.statusBadge} ${styles.statusOpen}`}>
                  Open
                </span>
              </td>
              <td>
                <span className={`${styles.statusBadge} ${styles.priorityLow}`}>
                  Low
                </span>
              </td>
            </tr>
            <tr>
              <td>TA-980 Admin - Docu...</td>
              <td>SR-3071</td>
              <td>
                <span className={`${styles.statusBadge} ${styles.statusOpen}`}>
                  Open
                </span>
              </td>
              <td>
                <span
                  className={`${styles.statusBadge} ${styles.priorityHigh}`}
                >
                  High
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3 className={styles.cardTitle}>Pending Approvals</h3>
          <span className={styles.viewAllLink}>View All</span>
        </div>
        <table className={styles.miniTable}>
          <thead>
            <tr>
              <th>Requester</th>
              <th>Created Date</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>System</td>
              <td>Sat, Dec 03, 2022</td>
              <td>Unanimous</td>
            </tr>
            <tr>
              <td>Rosy</td>
              <td>Tue, Dec 13, 2022</td>
              <td>Unanimous</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
