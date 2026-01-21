"use client";
import { AuditActionSidebar } from '@/components/features/audit/audit-action-sidebar';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

// Mock data
const AUDIT_EVENTS = [
  {
    id: '1',
    timestamp: 'Mon, Jun 23, 2025 08:16:20 PM',
    module: 'Monitors',
    operationType: 'Update',
    user: 'system',
    remoteIp: '127.0.0.1',
    message: 'ubuntu8165 Monitor modified successfully',
    status: 'Success',
  },
  {
    id: '2',
    timestamp: 'Mon, Jun 23, 2025 08:16:18 PM',
    module: 'Monitors',
    operationType: 'Update',
    user: 'system',
    remoteIp: '127.0.0.1',
    message: 'ubuntu8165 Monitor modified successfully',
    status: 'Success',
  },
  {
    id: '3',
    timestamp: 'Mon, Jun 23, 2025 08:11:20 PM',
    module: 'Monitors',
    operationType: 'Update',
    user: 'system',
    remoteIp: '127.0.0.1',
    message: 'ubuntu8165 Monitor modified successfully',
    status: 'Success',
  },
];

const MODULE_CHART_DATA = [
  { name: 'Metric', value: 515 },
  { name: 'Monitor', value: 512 },
  { name: 'Dependency Mapper', value: 32 },
  { name: 'Configuration', value: 28 },
  { name: 'User', value: 5 },
];

const USER_CHART_DATA = [
  { name: 'system', value: 1080 },
  { name: 'admin', value: 12 },
];

const TREND_DATA = Array.from({ length: 24 }, (_, i) => ({
  time:
    i === 0
      ? '23:00'
      : i === 1
      ? '23. Jun'
      : `${String(i - 1).padStart(2, '0')}:00`,
  succeed: Math.floor(Math.random() * 80) + 40,
  fail: Math.floor(Math.random() * 10),
}));

// Helper to generate sparkline data
const generateTimeSeriesData = (count, min, max) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      value: Math.floor(Math.random() * (max - min + 1)) + min
    });
  }
  return data;
};

// Sidebar navigation items
const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Overview', icon: 'mdi:view-dashboard', color: '#06b6d4' },
  { id: 'events', label: 'Events', icon: 'mdi:format-list-bulleted', color: '#8b5cf6' },
];

const Chart = ({ option, height = '220px' }) => {
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

const Audit = () => {
  const [activeView, setActiveView] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [showActionSidebar, setShowActionSidebar] = useState(false);
  const [activeActionTab, setActiveActionTab] = useState('details');
  const [expandedSections, setExpandedSections] = useState(new Set(['summary', 'analytics', 'events']));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Helper for sparklines
  const getCommonChartOption = (data, color) => ({
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
    xAxis: { type: 'category', show: false },
    yAxis: { type: 'value', show: false },
    series: [{
      type: 'line',
      data: data.map(d => d.value),
      smooth: true,
      showSymbol: false,
      lineStyle: { width: 2, color },
      areaStyle: { 
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: color },
          { offset: 1, color: 'transparent' }
        ]),
        opacity: 0.1 
      }
    }]
  });

  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    module: '',
    operationType: 'All',
    user: '',
    remoteIp: '',
    status: 'All',
  });

  const toggleSection = (sectionId) => {
    const next = new Set(expandedSections);
    if (next.has(sectionId)) next.delete(sectionId);
    else next.add(sectionId);
    setExpandedSections(next);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      module: '',
      operationType: 'All',
      user: '',
      remoteIp: '',
      status: 'All',
    });
    setSearchQuery('');
  };

  const handleApplyFilters = (appliedFilters) => {
    setSearchQuery(appliedFilters.search || '');
    console.log('Applied filters:', appliedFilters);
  };

  const handleOpenActionSidebar = (tab) => {
    setActiveActionTab(tab);
    setShowActionSidebar(true);
  };

  // Chart Options
  const auditEventOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(11, 15, 25, 0.9)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#f3f4f6', fontSize: 11 },
    },
    series: [
      {
        name: 'Modules',
        type: 'pie',
        radius: ['60%', '85%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#0b0f19',
          borderWidth: 3,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: '900',
            color: '#fff',
            formatter: '{b}\n{d}%',
          },
        },
        labelLine: { show: false },
        data: [
          { value: 512, name: 'Metric Explorer', itemStyle: { color: '#06b6d4' } },
          { value: 480, name: 'Configuration', itemStyle: { color: '#8b5cf6' } },
          { value: 98, name: 'Security & Auth', itemStyle: { color: '#f43f5e' } },
        ],
      },
    ],
  };

  const userActivityOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(11, 15, 25, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#f3f4f6', fontSize: 11 },
    },
    grid: { left: '2%', right: '12%', top: '0%', bottom: '0%', containLabel: true },
    xAxis: {
      type: 'value',
      show: false,
    },
    yAxis: {
      type: 'category',
      data: USER_CHART_DATA.map((d) => d.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#6b7280', fontSize: 11, fontWeight: '700' },
    },
    series: [
      {
        name: 'Logs',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          color: '#c084fc', /* Solid professional purple */
          borderRadius: [0, 4, 4, 0],
        },
        label: {
          show: true,
          position: 'right',
          color: '#e5e7eb',
          fontSize: 11,
          fontWeight: '800',
          fontFamily: 'JetBrains Mono',
          offset: [10, 0],
          formatter: '{c}',
        },
        data: USER_CHART_DATA.map((d) => d.value),
      },
    ],
  };

  const userChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#f3f4f6' },
    },
    grid: { left: 10, right: 10, top: 10, bottom: 20, containLabel: true },
    xAxis: {
      type: 'category',
      data: USER_CHART_DATA.map((d) => d.name),
      axisLabel: { color: '#9ca3af', fontSize: 10 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#9ca3af' },
      splitLine: { lineStyle: { type: 'dashed', color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        data: USER_CHART_DATA.map((d) => d.value),
        type: 'bar',
        barWidth: '30%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#8b5cf6' },
            { offset: 1, color: '#7c3aed' },
          ]),
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  const trendChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#f3f4f6' },
    },
    legend: {
      data: ['Succeed', 'Fail'],
      textStyle: { color: '#9ca3af' },
      bottom: 0,
    },
    grid: { left: 10, right: 10, top: 10, bottom: 30, containLabel: true },
    xAxis: {
      type: 'category',
      data: TREND_DATA.map((d) => d.time),
      axisLabel: { color: '#9ca3af', fontSize: 10 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#9ca3af' },
      splitLine: { lineStyle: { type: 'dashed', color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        name: 'Succeed',
        type: 'bar',
        stack: 'total',
        data: TREND_DATA.map((d) => d.succeed),
        itemStyle: { color: '#10b981' },
      },
      {
        name: 'Fail',
        type: 'bar',
        stack: 'total',
        data: TREND_DATA.map((d) => d.fail),
        itemStyle: { color: '#ef4444' },
      },
    ],
  };

  return (
    <div className={styles.audit}>
      {/* Left Sidebar */}
      <div className={`${styles.leftSidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          <span className={`${styles.sidebarTitle} ${!isSidebarOpen ? styles.hidden : ''}`}>
             Audit Logs
          </span>
          <button 
            className={styles.collapseBtn}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Icon icon={isSidebarOpen ? "mdi:menu-open" : "mdi:menu"} width={20} />
          </button>
        </div>
        
        <nav className={styles.sidebarNav}>
          <div className={styles.treeRoot}>
            <Icon icon="mdi:security" className={styles.rootIcon} />
            <span className={styles.rootLabel}>Audit Management</span>
          </div>

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
                  <Icon
                    icon={item.icon}
                    width={18}
                    style={{ 
                      color: activeView === item.id ? 'inherit' : item.color 
                    }}
                  />
                </div>
                <span className={styles.navText}>{item.label}</span>
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content Wrapper */}
      <div className={styles.mainContentWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <Icon icon="mdi:file-document" width={24} height={24} />
            </div>
            <div className={styles.headerText}>
              <h1 className={styles.headerTitle}>Audit Logs</h1>
              <span className={styles.headerSubtitle}>System Activity Monitor</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            {/* Inline Filters like Flow */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Module:</label>
              <SelectComponent
                className={styles.select}
                variant="borderless"
                value={filters.module}
                onChange={(e) => setFilters(prev => ({ ...prev, module: e.target.value }))}
                options={[
                  { value: '', label: 'All Modules' },
                  { value: 'Monitors', label: 'Monitors' },
                  { value: 'Metric', label: 'Metric' },
                  { value: 'User', label: 'User' },
                  { value: 'Configuration', label: 'Configuration' },
                ]}
                placeholder="All"
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Status:</label>
              <SelectComponent
                className={styles.select}
                variant="borderless"
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                options={[
                  { value: 'All', label: 'All' },
                  { value: 'Success', label: 'Success' },
                  { value: 'Failed', label: 'Failed' },
                ]}
                placeholder="Status"
              />
            </div>

            <div className={styles.headerSearch}>
              <Icon icon="mdi:magnify" className={styles.headerSearchIcon} width={18} height={18} />
              <input
                type="text"
                placeholder="Search logs..."
                className={styles.headerSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.headerActions}>
              <button className={styles.actionBtn} title="Refresh">
                <Icon icon="mdi:refresh" width={20} height={20} />
              </button>
              <button
                className={styles.actionBtn}
                title="Advanced Filters"
                onClick={() => setShowFilterSidebar(true)}
              >
                <Icon icon="mdi:filter-variant" width={20} height={20} />
              </button>
              <button
                className={styles.actionBtn}
                title="Export"
                onClick={() => handleOpenActionSidebar('export')}
              >
                <Icon icon="mdi:download" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area - Timeline/Accordion Design matching Flow */}
        <div className={styles.contentArea}>
          <div className={styles.timelineContainer}>
            {/* 1. Statistics Summary Section (Pattern: Real-time Analytics) */}
            {(activeView === 'overview') && (
              <div className={styles.accordionGroup} data-open={expandedSections.has('summary')}>
                <div className={styles.accordionHeader} onClick={() => toggleSection('summary')}>
                  <div className={styles.headerNode} style={{ '--accent-color': '#22d3ee' }}>
                    <Icon icon="mdi:pulse" width={18} />
                  </div>
                  <div className={styles.headerInfo}>
                    <h3 className={styles.sectionTitle}>Real-time Analytics <span className={styles.badge} data-type="live">LIVE</span></h3>
                  </div>
                  <Icon 
                    icon="mdi:chevron-down" 
                    className={styles.accordionChevron}
                    style={{ transform: expandedSections.has('summary') ? 'rotate(180deg)' : 'none' }}
                  />
                </div>
                
                {expandedSections.has('summary') && (
                  <div className={styles.accordionContent}>
                    <div className={styles.realtimeGrid}>
                      <div className={styles.metricWidget}>
                        <div className={styles.metricMeta}>
                          <span className={styles.metricLabel}>TOTAL EVENTS</span>
                          <span className={styles.metricValue} style={{ color: '#22d3ee' }}>1,090</span>
                        </div>
                        <div className={styles.sparklineWrap}>
                           <Chart option={getCommonChartOption(generateTimeSeriesData(40, 0.8, 1.2), '#22d3ee')} height="60px" />
                        </div>
                      </div>
                      <div className={styles.metricWidget}>
                        <div className={styles.metricMeta}>
                          <span className={styles.metricLabel}>SUCCESS RATE</span>
                          <span className={styles.metricValue} style={{ color: '#10b981' }}>98.2%</span>
                        </div>
                        <div className={styles.sparklineWrap}>
                           <Chart option={getCommonChartOption(generateTimeSeriesData(40, 95, 100), '#10b981')} height="60px" />
                        </div>
                      </div>
                      <div className={styles.metricWidget}>
                        <div className={styles.metricMeta}>
                          <span className={styles.metricLabel}>FAILURES</span>
                          <span className={styles.metricValue} style={{ color: '#ef4444' }}>12</span>
                        </div>
                        <div className={styles.sparklineWrap}>
                           <Chart option={getCommonChartOption(generateTimeSeriesData(40, 0, 5), '#ef4444')} height="60px" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. Global Distribution Section (Pattern: Traffic Distribution) */}
            {(activeView === 'overview') && (
              <div className={styles.accordionGroup} data-open={expandedSections.has('analytics')}>
                <div className={styles.accordionHeader} onClick={() => toggleSection('analytics')}>
                  <div className={styles.headerNode} style={{ '--accent-color': '#c084fc' }}>
                    <Icon icon="mdi:chart-arc" width={18} />
                  </div>
                  <div className={styles.headerInfo}>
                    <h3 className={styles.sectionTitle}>Traffic Distribution <span className={styles.badge} data-type="analytics">ANALYTICS</span></h3>
                  </div>
                  <Icon 
                    icon="mdi:chevron-down" 
                    className={styles.accordionChevron}
                    style={{ transform: expandedSections.has('analytics') ? 'rotate(180deg)' : 'none' }}
                  />
                </div>
                
                {expandedSections.has('analytics') && (
                  <div className={styles.accordionContent}>
                    <div className={styles.distributionGrid}>
                      <div className={styles.distributionCard}>
                        <span className={styles.subHeader}>MODULES DISTRIBUTION</span>
                        <div className={styles.chartFlex}>
                           <Chart option={auditEventOption} height="160px" />
                           <div className={styles.simpleLegend}>
                              <div className={styles.legendRow}><span className={styles.dot} style={{ background: '#22d3ee' }}></span> Metric <span className={styles.val}>47%</span></div>
                              <div className={styles.legendRow}><span className={styles.dot} style={{ background: '#c084fc' }}></span> Config <span className={styles.val}>44%</span></div>
                              <div className={styles.legendRow}><span className={styles.dot} style={{ background: '#f43f5e' }}></span> Security <span className={styles.val}>9%</span></div>
                           </div>
                        </div>
                      </div>
                      <div className={styles.distributionCard}>
                        <span className={styles.subHeader}>USER ACTIVITY (TOP LOGS)</span>
                        <div className={styles.horizontalBarWrap}>
                           <Chart option={userActivityOption} height="160px" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Audit Logs Section (Pattern: Top Conversations) */}
            {(activeView === 'overview' || activeView === 'events') && (
              <div className={styles.accordionGroup} data-open={expandedSections.has('events')}>
                <div className={styles.accordionHeader} onClick={() => toggleSection('events')}>
                  <div className={styles.headerNode} style={{ '--accent-color': '#f43f5e' }}>
                    <Icon icon="mdi:format-list-bulleted" width={18} />
                  </div>
                  <div className={styles.headerInfo}>
                    <h3 className={styles.sectionTitle}>Top Conversations <span className={styles.badge} data-type="summary">SUMMARY</span></h3>
                  </div>
                  <Icon 
                    icon="mdi:chevron-down" 
                    className={styles.accordionChevron}
                    style={{ transform: expandedSections.has('events') ? 'rotate(180deg)' : 'none' }}
                  />
                </div>

                {expandedSections.has('events') && (
                  <div className={styles.accordionContent}>
                    
                    <div className={styles.tableWrapper}>
                      <table className={styles.eventsTable}>
                        <thead>
                          <tr>
                            <th>TIMESTAMP</th>
                            <th>MODULE</th>
                            <th>OPERATION</th>
                            <th>USER</th>
                            <th>REMOTE IP</th>
                            <th>MESSAGE</th>
                            <th>STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {AUDIT_EVENTS.map((event) => (
                            <tr key={event.id} onClick={() => handleOpenActionSidebar('details')}>
                              <td className={styles.timeCell}>{event.timestamp}</td>
                              <td>{event.module}</td>
                              <td>
                                <span className={styles.opBadge}>
                                  {event.operationType}
                                </span>
                              </td>
                              <td className={styles.userCell}>{event.user}</td>
                              <td className={styles.ipCell}>{event.remoteIp}</td>
                              <td className={styles.msgCell} title={event.message}>{event.message}</td>
                              <td>
                                <span className={styles.statusBadge} data-status={event.status.toLowerCase()}>
                                  {event.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={showFilterSidebar}
        onClose={() => setShowFilterSidebar(false)}
        title="Audit Filters"
        filters={[
          {
            key: 'search',
            type: 'search',
          },
          {
            key: 'module',
            type: 'select',
            label: 'Module',
            options: [
              { value: '', label: 'All' },
              { value: 'Monitors', label: 'Monitors' },
              { value: 'Metric', label: 'Metric' },
              { value: 'User', label: 'User' },
              { value: 'Configuration', label: 'Configuration' },
              { value: 'Dependency Mapper', label: 'Dependency Mapper' },
            ],
            placeholder: 'Select module',
          },
          {
            key: 'operationType',
            type: 'select',
            label: 'Operation Type',
            options: [
              { value: 'All', label: 'All' },
              { value: 'Create', label: 'Create' },
              { value: 'Update', label: 'Update' },
              { value: 'Delete', label: 'Delete' },
              { value: 'Login', label: 'Login' },
              { value: 'Logout', label: 'Logout' },
            ],
            placeholder: 'Select operation type',
          },
          {
            key: 'user',
            type: 'input',
            label: 'User',
            placeholder: 'Enter username',
          },
          {
            key: 'remoteIp',
            type: 'input',
            label: 'Remote IP',
            placeholder: 'Enter IP address',
          },
          {
            key: 'status',
            type: 'select',
            label: 'Status',
            options: [
              { value: 'All', label: 'All' },
              { value: 'Success', label: 'Success' },
              { value: 'Failed', label: 'Failed' },
            ],
            placeholder: 'Select status',
          },
        ]}
        filterValues={filters}
        onFilterChange={(key, value) => {
          setFilters((prev) => ({ ...prev, [key]: value }));
        }}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {/* Audit Action Sidebar */}
      <AuditActionSidebar
        isOpen={showActionSidebar}
        onClose={() => setShowActionSidebar(false)}
        activeTab={activeActionTab}
        auditData={AUDIT_EVENTS}
      />
    </div>
  );
};

export default Audit;
