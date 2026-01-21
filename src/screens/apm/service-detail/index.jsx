"use client";
import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

// Mock service data
const SERVICE_DATA = {
  'notification-core-service': {
    name: 'notification-core-service',
    type: 'service',
    language: 'java',
    responseTime: 37.51,
    p99ResponseTime: 66.81,
    totalRequests: 121,
    throughput: 2,
    errorCount: 39,
    errorPercentage: 31,
  },
  'hibernatewithmysql': {
    name: 'hibernateWithMySQL',
    type: 'service',
    language: 'java',
    responseTime: 37.51,
    p99ResponseTime: 66.81,
    totalRequests: 121,
    throughput: 2,
    errorCount: 39,
    errorPercentage: 31,
  },
};

// Mock trace data
const TRACE_DATA = [
  {
    id: '1',
    rootSpan: 'GET /products',
    traces: '2.48 K',
    spans: '12.37 K',
    traceDuration: '11.461 ms',
    errorCount: 0,
  },
  {
    id: '2',
    rootSpan: 'GET /product/{name}',
    traces: '2.48 K',
    spans: '9.92 K',
    traceDuration: '7.043 ms',
    errorCount: 0,
  },
  {
    id: '3',
    rootSpan: 'DELETE /delete/{id}',
    traces: '7.43 K',
    spans: '29.67 K',
    traceDuration: '16.938 ms',
    errorCount: 14846,
  },
  {
    id: '4',
    rootSpan: 'GET /productById/{id}',
    traces: '12.4 K',
    spans: '61.96 K',
    traceDuration: '10.72 ms',
    errorCount: 0,
  },
];

const Chart = ({ option, height = '300px' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;
    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [option]);

  return <div ref={chartRef} style={{ width: '100%', height }} />;
};

const ServiceDetail = () => {
  const router = useRouter();
  const { serviceId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('1h');

  const service = SERVICE_DATA[serviceId] || SERVICE_DATA['hibernatewithmysql'];

  const handleBack = () => {
    router.push('/apm');
  };

  // Chart Options
  const responseTimeOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#f3f4f6' },
    },
    grid: { left: 10, right: 10, top: 10, bottom: 20, containLabel: true },
    xAxis: {
      type: 'category',
      data: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6b7280' },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { type: 'dashed', color: '#374151' } },
      axisLabel: { color: '#6b7280' },
    },
    series: [
      {
        name: 'Avg Response Time',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: [35, 38, 36, 42, 40, 45, 37, 39, 41, 38, 36, 37],
        lineStyle: { color: '#06b6d4', width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(6, 182, 212, 0.2)' },
            { offset: 1, color: 'rgba(6, 182, 212, 0)' },
          ]),
        },
      },
    ],
  };

  const throughputOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#f3f4f6' },
    },
    grid: { left: 10, right: 10, top: 10, bottom: 20, containLabel: true },
    xAxis: {
      type: 'category',
      data: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6b7280' },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { type: 'dashed', color: '#374151' } },
      axisLabel: { color: '#6b7280' },
    },
    series: [
      {
        name: 'Throughput',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: [100, 120, 115, 130, 125, 140, 135, 120, 110, 115, 125, 130],
        lineStyle: { color: '#eab308', width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(234, 179, 8, 0.2)' },
            { offset: 1, color: 'rgba(234, 179, 8, 0)' },
          ]),
        },
      },
    ],
  };

  const requestsErrorsOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#f3f4f6' },
    },
    legend: {
      data: ['Requests', 'Errors'],
      textStyle: { color: '#9ca3af' },
      bottom: 0,
    },
    grid: { left: 10, right: 10, top: 10, bottom: 30, containLabel: true },
    xAxis: {
      type: 'category',
      data: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6b7280' },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { type: 'dashed', color: '#374151' } },
      axisLabel: { color: '#6b7280' },
    },
    series: [
      {
        name: 'Requests',
        type: 'bar',
        stack: 'total',
        data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90],
        itemStyle: { color: '#3b82f6' },
      },
      {
        name: 'Errors',
        type: 'bar',
        stack: 'total',
        data: [2, 5, 1, 4, 2, 10, 5, 2, 5, 1, 4, 2],
        itemStyle: { color: '#ef4444' },
      },
    ],
  };

  const serviceMapOption = {
    tooltip: {},
    series: [
      {
        type: 'graph',
        layout: 'force',
        symbolSize: 50,
        roam: true,
        label: {
          show: true,
          color: '#fff',
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 12,
        },
        data: [
          {
            name: service.name,
            symbolSize: 60,
            itemStyle: { color: '#06b6d4' },
          },
          {
            name: 'PostgreSQL',
            symbolSize: 45,
            itemStyle: { color: '#8b5cf6' },
          },
          {
            name: 'Redis',
            symbolSize: 40,
            itemStyle: { color: '#ef4444' },
          },
          {
            name: 'User Service',
            symbolSize: 45,
            itemStyle: { color: '#10b981' },
          },
        ],
        links: [
          {
            source: 'User Service',
            target: service.name,
          },
          {
            source: service.name,
            target: 'PostgreSQL',
          },
          {
            source: service.name,
            target: 'Redis',
          },
        ],
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0,
          color: '#6b7280',
        },
        force: {
          repulsion: 200,
          edgeLength: 120,
        },
      },
    ],
  };

  const latencyOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#f3f4f6' },
    },
    grid: { left: 10, right: 10, top: 10, bottom: 20, containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6b7280' },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { type: 'dashed', color: '#374151' } },
      axisLabel: { color: '#6b7280' },
    },
    series: [
      {
        name: 'Latency',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: [20, 22, 21, 25, 24, 28, 26, 23, 22, 24, 25, 23],
        lineStyle: { color: '#8b5cf6', width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(139, 92, 246, 0.2)' },
            { offset: 1, color: 'rgba(139, 92, 246, 0)' },
          ]),
        },
      },
    ],
  };

  const errorCountOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#f3f4f6' },
    },
    grid: { left: 10, right: 10, top: 10, bottom: 20, containLabel: true },
    xAxis: {
      type: 'category',
      data: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6b7280' },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { type: 'dashed', color: '#374151' } },
      axisLabel: { color: '#6b7280' },
    },
    series: [
      {
        name: 'Errors',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: [2, 5, 1, 4, 2, 10, 5, 2, 5, 1, 4, 2],
        lineStyle: { color: '#ef4444', width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(239, 68, 68, 0.2)' },
            { offset: 1, color: 'rgba(239, 68, 68, 0)' },
          ]),
        },
      },
    ],
  };

  return (
    <div className={styles.serviceDetail}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={handleBack}>
            <Icon icon="mdi:chevron-left" width={20} height={20} />
          </button>
          <div className={styles.serviceIcon}>
            <Icon icon="mdi:web" width={20} height={20} />
          </div>
          <h1 className={styles.title}>{service.name}</h1>
          <div className={styles.languageBadge}>
            <Icon icon="mdi:language-java" width={16} height={16} />
          </div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.timeRangeSelector}>
            <button className={styles.timeRangeBtn}>
              <Icon icon="mdi:clock-outline" width={16} height={16} />
              {timeRange === '1h' && 'Last 1 Hour'}
              {timeRange === '24h' && 'Last 24 Hours'}
              {timeRange === '48h' && 'Last 48 Hours'}
            </button>
          </div>
          <span className={styles.timestamp}>
            {new Date().toLocaleString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'overview' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'transactions' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'logs' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          Logs
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'jvm' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('jvm')}
        >
          JVM
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'database' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('database')}
        >
          Database
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {activeTab === 'overview' && (
          <>
            {/* KPI Cards */}
            <div className={styles.kpiRow}>
              <div className={styles.kpiCard}>
                <div className={styles.kpiLabel}>Response Time</div>
                <div className={styles.kpiValue}>
                  {service.responseTime}
                  <span className={styles.kpiUnit}>ms</span>
                </div>
              </div>

              <div className={styles.kpiCard}>
                <div className={styles.kpiLabel}>P99 Response Time</div>
                <div className={styles.kpiValue}>
                  {service.p99ResponseTime}
                  <span className={styles.kpiUnit}>ms</span>
                </div>
              </div>

              <div className={styles.kpiCard}>
                <div className={styles.kpiLabel}>Total Requests</div>
                <div className={styles.kpiValue}>{service.totalRequests}</div>
              </div>

              <div className={styles.kpiCard}>
                <div className={styles.kpiLabel}>Request Throughput</div>
                <div className={styles.kpiValue}>
                  {service.throughput}
                  <span className={styles.kpiUnit}>tpm</span>
                </div>
              </div>

              <div className={styles.kpiCard}>
                <div className={styles.kpiLabel}>Error Count</div>
                <div className={styles.kpiValue} style={{ color: '#ef4444' }}>
                  {service.errorCount}
                </div>
              </div>

              <div className={styles.kpiCard}>
                <div className={styles.kpiLabel}>Error Percentage</div>
                <div className={styles.kpiValue} style={{ color: '#ef4444' }}>
                  {service.errorPercentage}
                  <span className={styles.kpiUnit}>%</span>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className={styles.chartsRow}>
              <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}>Response Time</h3>
                <div className={styles.chartContainer}>
                  <Chart option={responseTimeOption} />
                </div>
              </div>

              <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}>Request Throughput</h3>
                <div className={styles.chartContainer}>
                  <Chart option={throughputOption} />
                </div>
              </div>
            </div>

            {/* Second Charts Row */}
            <div className={styles.chartsRow}>
              <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}>Requests & Errors</h3>
                <div className={styles.chartContainer}>
                  <Chart option={requestsErrorsOption} />
                </div>
              </div>

              <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}>Service Map</h3>
                <div className={styles.chartContainer}>
                  <Chart option={serviceMapOption} />
                </div>
              </div>
            </div>

            {/* Latency Chart */}
            <div className={styles.fullWidthChartCard}>
              <h3 className={styles.chartTitle}>Latency</h3>
              <div className={styles.chartContainer}>
                <Chart option={latencyOption} />
              </div>
            </div>

            {/* Error Count Chart */}
            <div className={styles.fullWidthChartCard}>
              <h3 className={styles.chartTitle}>Error Count</h3>
              <div className={styles.chartContainer}>
                <Chart option={errorCountOption} />
              </div>
            </div>
          </>
        )}

        {activeTab === 'transactions' && (
          <>
            <div className={styles.searchBar}>
              <Icon icon="mdi:magnify" width={18} height={18} />
              <input type="text" placeholder="Search" />
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ROOT SPAN</th>
                    <th>TRACES</th>
                    <th>SPANS</th>
                    <th>TRACE DURATION</th>
                    <th>ERROR COUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {TRACE_DATA.map((trace) => (
                    <tr key={trace.id}>
                      <td className={styles.rootSpanCell}>
                        <Icon icon="mdi:chevron-right" width={16} height={16} />
                        {trace.rootSpan}
                      </td>
                      <td>{trace.traces}</td>
                      <td>{trace.spans}</td>
                      <td>{trace.traceDuration}</td>
                      <td style={{ color: trace.errorCount > 0 ? '#ef4444' : undefined }}>
                        {trace.errorCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'jvm' && (
          <div className={styles.tabPlaceholder}>
            <Icon icon="mdi:language-java" width={64} height={64} />
            <p>JVM Monitoring - Coming Soon</p>
          </div>
        )}

        {activeTab === 'database' && (
          <div className={styles.tabPlaceholder}>
            <Icon icon="mdi:database" width={64} height={64} />
            <p>Database Monitoring - Coming Soon</p>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className={styles.tabPlaceholder}>
            <Icon icon="mdi:file-document-outline" width={64} height={64} />
            <p>Logs - Coming Soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;
