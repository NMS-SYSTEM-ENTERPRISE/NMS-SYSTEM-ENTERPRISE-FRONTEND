'use client';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnalyticsAccordion } from './components/AnalyticsAccordion';
import { ExplorerAccordion } from './components/ExplorerAccordion';
import { ServiceAccordion } from './components/ServiceAccordion';
import styles from './styles.module.css';

// Helper to generate smooth trend data
const generateTrend = (baseValue, count = 20) => {
  return Array.from({ length: count }, (_, i) => {
    // Add some randomness and a sine wave for a natural "monitoring" look
    const random = (Math.random() - 0.5) * baseValue * 0.1;
    const sine = Math.sin(i / 3) * baseValue * 0.05;
    return Math.max(0, baseValue + random + sine);
  });
};

// Mock APM Services Data with Trend Data
const APM_SERVICES = [
  {
    id: 'notification-core-service',
    name: 'notification-core-service',
    type: 'service',
    icon: 'mdi:web',
    responseTime: 659.8,
    responseTimeTrend: generateTrend(659.8),
    throughput: 112,
    throughputTrend: generateTrend(112),
    errorCount: 5834,
    errorTrend: generateTrend(5834),
    status: 'critical',
    language: 'java',
  },
  {
    id: 'postgresql-db',
    name: 'postgresql-db',
    type: 'database',
    icon: 'mdi:database',
    responseTime: 1.2,
    responseTimeTrend: generateTrend(1.2),
    throughput: 105,
    throughputTrend: generateTrend(105),
    errorCount: 88,
    errorTrend: generateTrend(88),
    status: 'warning',
    language: 'postgresql',
  },
  {
    id: 'ft-database-server',
    name: 'ft-database-server',
    type: 'database',
    icon: 'mdi:database',
    responseTime: 0.5,
    responseTimeTrend: generateTrend(0.5),
    throughput: 119,
    throughputTrend: generateTrend(119),
    errorCount: 68,
    errorTrend: generateTrend(68),
    status: 'healthy',
    language: 'mongodb',
  },
  {
    id: 'ft-analytics-server',
    name: 'ft-analytics-server',
    type: 'service',
    icon: 'mdi:chart-line',
    responseTime: 1.23,
    responseTimeTrend: generateTrend(1.23),
    throughput: 112,
    throughputTrend: generateTrend(112),
    errorCount: 72,
    errorTrend: generateTrend(72),
    status: 'healthy',
    language: 'nodejs',
  },
  {
    id: 'ecommerce-app',
    name: 'ecommerce-app',
    type: 'service',
    icon: 'mdi:cart',
    responseTime: 1.38,
    responseTimeTrend: generateTrend(1.38),
    throughput: 126,
    throughputTrend: generateTrend(126),
    errorCount: 70,
    errorTrend: generateTrend(70),
    status: 'healthy',
    language: 'java',
  },
  {
    id: 'spring-boot-app',
    name: 'spring-boot-app',
    type: 'service',
    icon: 'mdi:leaf',
    responseTime: 1.24,
    responseTimeTrend: generateTrend(1.24),
    throughput: 120,
    throughputTrend: generateTrend(120),
    errorCount: 76,
    errorTrend: generateTrend(76),
    status: 'healthy',
    language: 'java',
  },
  {
    id: '13_60_ftmainserver',
    name: '13_60_ftmainserver',
    type: 'service',
    icon: 'mdi:server',
    responseTime: 2109,
    responseTimeTrend: generateTrend(2109),
    throughput: 1064,
    throughputTrend: generateTrend(1064),
    errorCount: 4285,
    errorTrend: generateTrend(4285),
    status: 'critical',
    language: 'java',
  },
  {
    id: 'ftmainserver',
    name: 'ftmainserver',
    type: 'service',
    icon: 'mdi:server',
    responseTime: 1951,
    responseTimeTrend: generateTrend(1951),
    throughput: 2104,
    throughputTrend: generateTrend(2104),
    errorCount: 5783,
    errorTrend: generateTrend(5783),
    status: 'critical',
    language: 'java',
  },
  {
    id: '12_203_ftmainserver',
    name: '12_203_ftmainserver',
    type: 'service',
    icon: 'mdi:server',
    responseTime: 271686,
    responseTimeTrend: generateTrend(271686),
    throughput: 7638,
    throughputTrend: generateTrend(7638),
    errorCount: 1350,
    errorTrend: generateTrend(1350),
    status: 'warning',
    language: 'java',
  },
];

// Mock Trace Data for Explorer
const TRACE_DATA = [
  {
    id: '1',
    serviceName: 'hibernatewithmysql',
    timestamp: 'Mon, Oct 13, 2025 05:03:29 PM',
    duration: 7742,
    resource: 'GET /products',
    spans: 5,
    status: 200,
  },
  {
    id: '2',
    serviceName: 'ProductCatalog_dotnet',
    timestamp: 'Mon, Oct 13, 2025 05:03:21 PM',
    duration: 4149,
    resource: 'GET api/products/{id}',
    spans: 3,
    status: 200,
  },
  {
    id: '3',
    serviceName: 'A',
    timestamp: 'Mon, Oct 13, 2025 05:03:48 PM',
    duration: 758761,
    resource: 'GET /serviceA',
    spans: 2,
    status: 200,
  },
  {
    id: '4',
    serviceName: 'D',
    timestamp: 'Mon, Oct 13, 2025 05:03:09 PM',
    duration: 431504,
    resource: 'GET /serviceD',
    spans: 6,
    status: 200,
  },
  {
    id: '5',
    serviceName: 'hibernatewithmysql',
    timestamp: 'Mon, Oct 13, 2025 05:03:47 PM',
    duration: 12206,
    resource: 'DELETE /delete/{id}',
    spans: 4,
    status: 500,
  },
];

// Sidebar navigation items
const SIDEBAR_ITEMS = [
  { id: 'services', label: 'Services', icon: 'mdi:application' },
  { id: 'explorer', label: 'Explorer', icon: 'mdi:compass' },
  { id: 'analytics', label: 'Analytics', icon: 'mdi:chart-line' },
];

const MiniChart = ({ data, color, height = '40px' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;

    const option = {
      grid: {
        left: 0,
        right: 0,
        top: 2,
        bottom: 2,
      },
      xAxis: {
        type: 'category',
        show: false,
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        show: false,
        min: (value) => value.min * 0.9,
      },
      series: [
        {
          data: data,
          type: 'line',
          smooth: true,
          showSymbol: false,
          lineStyle: {
            color: color,
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: color },
              { offset: 1, color: 'rgba(255, 255, 255, 0)' },
            ]),
            opacity: 0.2,
          },
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [data, color]);

  return <div ref={chartRef} style={{ width: '100%', height }} />;
};

const APM = () => {
  const router = useRouter();
  const [activeView, setActiveView] = useState('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Collapsed by default

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    language: '',
    type: '',
  });

  const filteredServices = APM_SERVICES.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes((filters.search || searchQuery).toLowerCase());
    const matchesStatus = !filters.status || service.status === filters.status;
    const matchesLanguage =
      !filters.language || service.language === filters.language;
    const matchesType = !filters.type || service.type === filters.type;
    return matchesSearch && matchesStatus && matchesLanguage && matchesType;
  });

  const filteredTraces = TRACE_DATA.filter(
    (trace) =>
      trace.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trace.resource.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'critical':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const handleServiceClick = (service) => {
    router.push(`/apm/service/${service.id}`);
  };

  const handleTraceClick = (trace) => {
    router.push(`/apm/trace/${trace.id}`);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: '',
      language: '',
      type: '',
    });
    setSearchQuery('');
  };

  return (
    <div className={styles.apm}>
      {/* Left Sidebar */}
      <div
        className={`${styles.leftSidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}
      >
        <div className={styles.sidebarHeader}>
          <span
            className={`${styles.sidebarTitle} ${!isSidebarOpen ? styles.hidden : ''}`}
          >
            Categories
          </span>
          <button
            className={styles.collapseBtn}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? 'Collapse' : 'Expand'}
          >
            <Icon
              icon={isSidebarOpen ? 'mdi:menu-open' : 'mdi:menu'}
              width={22}
            />
          </button>
        </div>

        <div className={styles.sidebarNav}>
          {/* Root Node */}
          <div className={styles.treeRoot}>
            <Icon
              icon="mdi:server-network"
              width={18}
              className={styles.rootIcon}
            />
            <span className={styles.rootLabel}>Performance</span>
          </div>

          {/* Children */}
          <div className={styles.treeChildren}>
            {SIDEBAR_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`${styles.navItem} ${
                  activeView === item.id ? styles.navItemActive : ''
                }`}
                onClick={() => setActiveView(item.id)}
                title={!isSidebarOpen ? item.label : ''}
              >
                <div className={styles.treeBranch} />
                <div className={styles.itemIconWrapper}>
                  <Icon icon={item.icon} width={18} height={18} />
                </div>
                <span className={styles.navText}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className={styles.mainContentWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {/* Empty - no title needed */}
          </div>

          <div className={styles.headerRight}>
            {/* Search */}
            <div className={styles.headerSearch}>
              <Icon
                icon="mdi:magnify"
                className={styles.headerSearchIcon}
                width={18}
                height={18}
              />
              <input
                type="text"
                placeholder={
                  activeView === 'services'
                    ? 'Search services...'
                    : 'Search traces...'
                }
                className={styles.headerSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className={styles.headerActions}>
              <button
                className={styles.actionBtn}
                onClick={() => setShowFilterSidebar(true)}
                title="Filters"
              >
                <Icon icon="mdi:filter-variant" width={20} height={20} />
              </button>
              <button className={styles.actionBtn} title="Refresh">
                <Icon icon="mdi:refresh" width={20} height={20} />
              </button>
              <button className={styles.actionBtn} title="Export">
                <Icon icon="mdi:download" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.contentArea}>
          {/* Services View */}
          {activeView === 'services' && (
            <ServiceAccordion
              servicesData={filteredServices.map((service) => ({
                name: service.name,
                type: service.type,
                latency: service.responseTime,
                throughput: service.throughput,
                errors: service.errorCount,
                trend: service.responseTimeTrend,
                color: getStatusColor(service.status),
              }))}
              topLatencyData={filteredServices
                .sort((a, b) => b.responseTime - a.responseTime)
                .slice(0, 5)
                .map((service) => ({
                  name: service.name,
                  endpoint: service.type,
                  value: `${service.responseTime.toFixed(2)} ms`,
                  sparkline: service.responseTimeTrend,
                }))}
              topThroughputData={filteredServices
                .sort((a, b) => b.throughput - a.throughput)
                .slice(0, 5)
                .map((service) => ({
                  name: service.name,
                  endpoint: service.type,
                  value: `${service.throughput} tpm`,
                  sparkline: service.throughputTrend,
                }))}
              topErrorsData={filteredServices
                .sort((a, b) => b.errorCount - a.errorCount)
                .slice(0, 5)
                .map((service) => ({
                  name: service.name,
                  endpoint: service.type,
                  value: service.errorCount.toString(),
                  sparkline: service.errorTrend,
                }))}
            />
          )}

          {/* Explorer View */}
          {activeView === 'explorer' && (
            <ExplorerAccordion
              traceMetrics={{
                count: 15420,
                countTrend: [
                  12000, 12500, 13200, 13800, 14200, 14800, 15100, 15420,
                ],
                avgDuration: 1250,
                durationTrend: [1100, 1150, 1200, 1180, 1220, 1240, 1260, 1250],
                errors: 127,
                errorTrend: [95, 102, 110, 115, 120, 125, 128, 127],
              }}
              traces={filteredTraces.map((trace) => ({
                id: trace.id,
                timestamp: trace.timestamp,
                serviceName: trace.serviceName,
                serviceType: trace.type || 'service',
                resource: trace.resource,
                duration: trace.duration,
                spans: trace.spans,
                status:
                  trace.status === 200
                    ? 'success'
                    : trace.status >= 400
                      ? 'error'
                      : 'warning',
              }))}
              onTraceClick={handleTraceClick}
            />
          )}

          {/* Analytics View */}
          {activeView === 'analytics' && (
            <AnalyticsAccordion
              performanceData={{
                requestRate: [
                  8500, 8800, 9200, 9500, 9800, 10200, 10500, 10800,
                ],
                responseTime: [850, 820, 880, 900, 870, 890, 910, 895],
                errorRate: [2.5, 2.3, 2.8, 3.1, 2.9, 2.7, 2.6, 2.4],
              }}
              distributionData={{
                responseTime: [
                  { label: '<100ms', value: 1250 },
                  { label: '100-500ms', value: 3800 },
                  { label: '500ms-1s', value: 2100 },
                  { label: '1s-2s', value: 850 },
                  { label: '>2s', value: 320 },
                ],
                requests: [
                  { label: 'GET', value: 5200 },
                  { label: 'POST', value: 2100 },
                  { label: 'PUT', value: 850 },
                  { label: 'DELETE', value: 420 },
                  { label: 'PATCH', value: 180 },
                ],
                errors: [
                  { label: '4xx', value: 180 },
                  { label: '5xx', value: 95 },
                  { label: 'Timeout', value: 42 },
                  { label: 'Network', value: 28 },
                  { label: 'Other', value: 15 },
                ],
              }}
              topServices={[
                {
                  name: 'notification-core-service',
                  type: 'service',
                  requests: 125420,
                  avgLatency: 659,
                  errorRate: 4.2,
                  throughput: 112,
                },
                {
                  name: 'postgresql-db',
                  type: 'database',
                  requests: 98750,
                  avgLatency: 1.2,
                  errorRate: 0.8,
                  throughput: 105,
                },
                {
                  name: 'ft-database-server',
                  type: 'database',
                  requests: 87320,
                  avgLatency: 0.5,
                  errorRate: 0.6,
                  throughput: 119,
                },
                {
                  name: 'ft-analytics-server',
                  type: 'service',
                  requests: 76540,
                  avgLatency: 1.23,
                  errorRate: 0.9,
                  throughput: 112,
                },
                {
                  name: 'ecommerce-app',
                  type: 'service',
                  requests: 65890,
                  avgLatency: 1.38,
                  errorRate: 1.1,
                  throughput: 126,
                },
              ]}
            />
          )}
        </div>
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={showFilterSidebar}
        onClose={() => setShowFilterSidebar(false)}
        title="APM Filters"
        filters={[
          {
            key: 'search',
            type: 'search',
          },
          {
            key: 'status',
            type: 'select',
            label: 'Status',
            options: [
              { value: '', label: 'All' },
              { value: 'healthy', label: 'Healthy' },
              { value: 'warning', label: 'Warning' },
              { value: 'critical', label: 'Critical' },
            ],
            placeholder: 'Select status',
          },
          {
            key: 'language',
            type: 'select',
            label: 'Language',
            options: [
              { value: '', label: 'All' },
              { value: 'java', label: 'Java' },
              { value: 'nodejs', label: 'Node.js' },
              { value: 'python', label: 'Python' },
              { value: 'dotnet', label: '.NET' },
            ],
            placeholder: 'Select language',
          },
          {
            key: 'type',
            type: 'select',
            label: 'Type',
            options: [
              { value: '', label: 'All' },
              { value: 'service', label: 'Service' },
              { value: 'database', label: 'Database' },
            ],
            placeholder: 'Select type',
          },
        ]}
        filterValues={filters}
        onFilterChange={(key, value) => {
          setFilters((prev) => ({ ...prev, [key]: value }));
        }}
        onApply={(appliedFilters) => {
          setSearchQuery(appliedFilters.search || '');
          console.log('Applied filters:', appliedFilters);
        }}
        onReset={handleResetFilters}
      />
    </div>
  );
};

export default APM;
