"use client";
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

// Mock data
const MOCK_LOG_GROUPS = [
  {
    id: 'other',
    name: 'Other',
    count: '277.9 K',
    icon: 'mdi:help-circle',
    color: '#94a3b8',
    expanded: false,
  },
  {
    id: 'router',
    name: 'Router',
    count: '400',
    icon: 'mdi:router',
    color: '#06b6d4',
    expanded: true,
    children: [
      { id: 'cisco-router', name: 'Cisco Router', count: '391' },
      {
        id: 'cisco-device-login',
        name: 'Cisco Device Login Audit',
        count: '8',
      },
    ],
  },
  {
    id: 'linux',
    name: 'Linux',
    count: '40',
    icon: 'mdi:linux',
    color: '#8b5cf6',
    expanded: true,
    children: [{ id: 'linux-syslog', name: 'Linux Syslog', count: '40' }],
  },
  {
    id: 'firewall',
    name: 'Firewall',
    count: '193.45 K',
    icon: 'mdi:security',
    color: '#f43f5e',
    expanded: false,
    children: [
      { id: 'palo-alto-traffic', name: 'Palo Alto Traffic', count: '122.83 K' },
      { id: 'palo-alto-system', name: 'Palo Alto System', count: '574' },
    ],
  },
];

const MOCK_LOG_EVENTS = [
  {
    id: 1,
    timestamp: 'Sat, Nov 08, 2025 08:23:38 PM',
    severity: 'Informational',
    source: '172.16.15.126',
    category: 'Other',
    type: 'Other',
    message:
      '[ event.source: 172.16.15.201, event.category: Other, event.source.type: Other, event.severity: Informational, message: type=CRYPTO_KEY_USER msg=audit(1762613592.322:894073): pid=891278 uid=0 auid=0 uid=0 ouid=0...',
  },
  {
    id: 2,
    timestamp: 'Sat, Nov 08, 2025 08:23:39 PM',
    severity: 'Informational',
    source: '172.16.15.126',
    category: 'Other',
    type: 'Other',
    message:
      '[ event.source: 172.16.15.201, event.category: Other, event.source.type: Other, event.severity: Informational, message: type=LOGIN msg=audit(1762613592.382:894069): pid=891278 uid=0...',
  },
  {
    id: 3,
    timestamp: 'Sat, Nov 08, 2025 08:23:39 PM',
    severity: 'Informational',
    source: '172.16.15.126',
    category: 'Other',
    type: 'Other',
    message:
      '[ event.source: 172.16.15.201, event.category: Other, event.source.type: Other, event.severity: Informational, message: type=CRED_ACQ msg=audit(1762613592.385:894098): pid=891278...',
  },
];

const Chart = ({ option, height = '400px' }) => {
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

const LogManagement = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' or 'search'
  const [activeView, setActiveView] = useState('all'); // Filtering view
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState(new Set(['stats', 'trends', 'events']));
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [showWidgetSidebar, setShowWidgetSidebar] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetail, setShowEventDetail] = useState(false);

  // Helper for sparklines
  const generateTimeSeriesData = (count, min, max) => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({ value: Math.floor(Math.random() * (max - min + 1)) + min });
    }
    return data;
  };

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

  const toggleSection = (sectionId) => {
    const next = new Set(expandedSections);
    if (next.has(sectionId)) next.delete(sectionId);
    else next.add(sectionId);
    setExpandedSections(next);
  };

  // Chart/Search view state
  const [counter, setCounter] = useState('message');
  const [aggregation, setAggregation] = useState('Count');
  const [sourceFilter, setSourceFilter] = useState('Everywhere');
  const [source, setSource] = useState('');
  const [resultBy, setResultBy] = useState('');

  // Filter state
  const [filters, setFilters] = useState({
    counter: 'message',
    aggregation: 'Count',
    sourceFilter: 'Everywhere',
    source: '',
    resultBy: '',
    groupMatching: 'All',
    includeExclude: 'include',
    groupMatchingFilter: '',
    criteriaCounter: '',
    operator: '',
    value: '',
    timeRange: 'today',
    severity: '',
    eventType: '',
    eventCategory: '',
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetail(true);
  };

  // Chart Options
  const bubbleChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#f3f4f6' },
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 1000,
          edgeLength: 50,
        },
        roam: true,
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold',
          formatter: '{b}',
        },
        data: [
          {
            name: 'Linux',
            value: 100,
            symbolSize: 120,
            itemStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                { offset: 0, color: '#60a5fa' },
                { offset: 1, color: '#2563eb' },
              ]),
              shadowBlur: 10,
              shadowColor: 'rgba(37, 99, 235, 0.5)',
            },
          },
          {
            name: 'Linux Login Audit',
            value: 40,
            symbolSize: 80,
            itemStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                { offset: 0, color: '#93c5fd' },
                { offset: 1, color: '#3b82f6' },
              ]),
            },
          },
          {
            name: 'Linux Syslog',
            value: 60,
            symbolSize: 90,
            itemStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                { offset: 0, color: '#3b82f6' },
                { offset: 1, color: '#1d4ed8' },
              ]),
            },
          },
          {
            name: 'Firewall',
            value: 150,
            symbolSize: 140,
            itemStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                { offset: 0, color: '#a3e635' },
                { offset: 1, color: '#65a30d' },
              ]),
              shadowBlur: 10,
              shadowColor: 'rgba(101, 163, 13, 0.5)',
            },
          },
          {
            name: 'Palo Alto System',
            value: 80,
            symbolSize: 100,
            itemStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                { offset: 0, color: '#bef264' },
                { offset: 1, color: '#84cc16' },
              ]),
            },
          },
          {
            name: 'Palo Alto Traffic',
            value: 70,
            symbolSize: 95,
            itemStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                { offset: 0, color: '#84cc16' },
                { offset: 1, color: '#4d7c0f' },
              ]),
            },
          },
        ],
        links: [
          { source: 'Linux', target: 'Linux Login Audit' },
          { source: 'Linux', target: 'Linux Syslog' },
          { source: 'Firewall', target: 'Palo Alto System' },
          { source: 'Firewall', target: 'Palo Alto Traffic' },
        ],
        lineStyle: {
          opacity: 0, // Hide links for bubble look
        },
      },
    ],
  };

  const lineChartOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#f3f4f6' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      axisLabel: { color: '#9ca3af', fontSize: 10 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#9ca3af', fontSize: 10 },
      splitLine: {
        lineStyle: { type: 'dashed', color: 'rgba(255,255,255,0.05)' },
      },
    },
    series: [
      {
        name: 'Events',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: '#06b6d4',
          width: 3,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(6, 182, 212, 0.2)' },
            { offset: 1, color: 'rgba(6, 182, 212, 0)' },
          ]),
        },
        data: Array.from({ length: 24 }, () =>
          Math.floor(Math.random() * 5000 + 1000)
        ),
      },
    ],
  };

  return (
    <div className={styles.logManagement}>
      {/* Left Sidebar - Collapsible Tree */}
      <div className={`${styles.leftSidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          <span className={`${styles.sidebarTitle} ${!isSidebarOpen ? styles.hidden : ''}`}>
             Log Sources
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
            <Icon icon="mdi:database" className={styles.rootIcon} />
            {isSidebarOpen && <span className={styles.rootLabel}>Inventory</span>}
          </div>

          <div className={styles.treeChildren}>
            {MOCK_LOG_GROUPS.map((group) => (
              <div key={group.id} className={styles.groupItemWrap}>
                <div
                  className={`${styles.navItem} ${
                    activeView === group.id ? styles.navItemActive : ''
                  }`}
                  onClick={() => setActiveView(group.id)}
                  title={!isSidebarOpen ? group.name : ''}
                >
                  <div className={styles.treeBranch} />
                  <div className={styles.itemIconWrapper}>
                    <Icon 
                      icon={group.icon} 
                      width={18} 
                      style={{ color: activeView === group.id ? 'inherit' : group.color }}
                    />
                  </div>
                  <span className={styles.navText}>{group.name}</span>
                  {isSidebarOpen && <span className={styles.navCount}>{group.count}</span>}
                </div>
                
                {isSidebarOpen && group.children && (
                  <div className={styles.nestedChildren}>
                    {group.children.map(child => (
                      <div key={child.id} className={styles.nestedItem} onClick={() => setActiveView(child.id)}>
                         <div className={styles.treeBranch} />
                         <span className={styles.nestedText}>{child.name}</span>
                         <span className={styles.nestedCount}>{child.count}</span>
                      </div>
                    ))}
                  </div>
                )}
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
              <Icon icon="mdi:file-document-multiple" width={24} height={24} />
            </div>
            <div className={styles.headerText}>
              <h1 className={styles.headerTitle}>Log Management</h1>
              <span className={styles.headerSubtitle}>Real-time system log stream</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Severity:</label>
              <SelectComponent
                className={styles.select}
                variant="borderless"
                value={filters.severity}
                onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
                options={[
                  { value: '', label: 'All Levels' },
                  { value: 'Critical', label: 'Critical' },
                  { value: 'Warning', label: 'Warning' },
                  { value: 'Informational', label: 'Informational' },
                ]}
                placeholder="All"
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Time:</label>
              <SelectComponent
                className={styles.select}
                variant="borderless"
                value={filters.timeRange}
                onChange={(e) => setFilters(prev => ({ ...prev, timeRange: e.target.value }))}
                options={[
                  { value: 'today', label: 'Today' },
                  { value: 'last_hour', label: 'Last Hour' },
                  { value: 'last_24h', label: 'Last 24 Hours' },
                ]}
                placeholder="Range"
              />
            </div>

            <div className={styles.headerSearch}>
              <Icon icon="mdi:magnify" className={styles.headerSearchIcon} width={18} height={18} />
              <input
                type="text"
                placeholder="Search stream..."
                className={styles.headerSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.headerActions}>
              <button className={styles.actionBtn} title="Refresh Stream">
                <Icon icon="mdi:refresh" width={20} height={20} />
              </button>
              <button 
                className={styles.actionBtn} 
                title="Advanced Filters"
                onClick={() => setShowFilterSidebar(true)}
              >
                <Icon icon="mdi:filter-variant" width={20} height={20} />
              </button>
              <button className={styles.actionBtn} title="Export Logs">
                <Icon icon="mdi:download" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area - Connected Accordions */}
        <div className={styles.contentArea}>
            <div className={styles.timelineContainer}>
                {/* 1. Log Statistics */}
                <div className={styles.accordionGroup} data-open={expandedSections.has('stats')}>
                    <div className={styles.accordionHeader} onClick={() => toggleSection('stats')}>
                        <div className={styles.headerNode} style={{ '--accent-color': '#06b6d4' }}>
                           <Icon icon="mdi:chart-timeline-variant" width={18} />
                        </div>
                        <div className={styles.headerInfo}>
                           <h3 className={styles.sectionTitle}>Performance Overview <span className={styles.badge} data-type="live">LIVE</span></h3>
                        </div>
                        <Icon icon="mdi:chevron-down" className={styles.accordionChevron} 
                              style={{ transform: expandedSections.has('stats') ? 'rotate(180deg)' : 'none' }} />
                    </div>
                    {expandedSections.has('stats') && (
                        <div className={styles.accordionContent}>
                            <div className={styles.realtimeGrid}>
                                <div className={styles.metricWidget}>
                                    <div className={styles.metricMeta}>
                                        <span className={styles.metricLabel}>EVENTS PER SECOND</span>
                                        <span className={styles.metricValue} style={{ color: '#06b6d4' }}>3.2</span>
                                    </div>
                                    <div className={styles.sparklineWrap}>
                                        <Chart option={getCommonChartOption(generateTimeSeriesData(40, 2, 5), '#06b6d4')} height="60px" />
                                    </div>
                                </div>
                                <div className={styles.metricWidget}>
                                    <div className={styles.metricMeta}>
                                        <span className={styles.metricLabel}>TOTAL VOLUME (24H)</span>
                                        <span className={styles.metricValue} style={{ color: '#8b5cf6' }}>325.6 K</span>
                                    </div>
                                    <div className={styles.sparklineWrap}>
                                        <Chart option={getCommonChartOption(generateTimeSeriesData(40, 80, 120), '#8b5cf6')} height="60px" />
                                    </div>
                                </div>
                                <div className={styles.metricWidget}>
                                    <div className={styles.metricMeta}>
                                        <span className={styles.metricLabel}>STORAGE USAGE</span>
                                        <span className={styles.metricValue} style={{ color: '#10b981' }}>84.2 GB</span>
                                    </div>
                                    <div className={styles.sparklineWrap}>
                                        <Chart option={getCommonChartOption(generateTimeSeriesData(40, 80, 85), '#10b981')} height="60px" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 2. Log Distribution & Trends */}
                <div className={styles.accordionGroup} data-open={expandedSections.has('trends')}>
                    <div className={styles.accordionHeader} onClick={() => toggleSection('trends')}>
                        <div className={styles.headerNode} style={{ '--accent-color': '#c084fc' }}>
                           <Icon icon="mdi:trending-up" width={18} />
                        </div>
                        <div className={styles.headerInfo}>
                           <h3 className={styles.sectionTitle}>Stream Analytics <span className={styles.badge} data-type="analytics">ANALYTICS</span></h3>
                        </div>
                        <Icon icon="mdi:chevron-down" className={styles.accordionChevron} 
                              style={{ transform: expandedSections.has('trends') ? 'rotate(180deg)' : 'none' }} />
                    </div>
                    {expandedSections.has('trends') && (
                        <div className={styles.accordionContent}>
                             <div className={styles.analyticsSection}>
                                 <Chart option={lineChartOption} height="300px" />
                             </div>
                        </div>
                    )}
                </div>

                {/* 3. Event Log Table */}
                <div className={styles.accordionGroup} data-open={expandedSections.has('events')}>
                    <div className={styles.accordionHeader} onClick={() => toggleSection('events')}>
                        <div className={styles.headerNode} style={{ '--accent-color': '#f43f5e' }}>
                           <Icon icon="mdi:format-list-bulleted" width={18} />
                        </div>
                        <div className={styles.headerInfo}>
                           <h3 className={styles.sectionTitle}>Event Log Stream <span className={styles.badge} data-type="summary">LOGS</span></h3>
                        </div>
                        <Icon icon="mdi:chevron-down" className={styles.accordionChevron} 
                              style={{ transform: expandedSections.has('events') ? 'rotate(180deg)' : 'none' }} />
                    </div>
                    {expandedSections.has('events') && (
                        <div className={styles.accordionContent}>
                            <div className={styles.tableWrapper}>
                                <table className={styles.eventsTable}>
                                    <thead>
                                        <tr>
                                            <th>TIMESTAMP</th>
                                            <th>SEVERITY</th>
                                            <th>SOURCE</th>
                                            <th>CATEGORY</th>
                                            <th>MESSAGE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MOCK_LOG_EVENTS.map((event) => (
                                            <tr key={event.id} onClick={() => handleEventClick(event)}>
                                                <td className={styles.timeCell}>{event.timestamp}</td>
                                                <td>
                                                    <span className={styles.severityBadge} data-severity={event.severity.toLowerCase()}>
                                                       {event.severity}
                                                    </span>
                                                </td>
                                                <td className={styles.ipCell}>{event.source}</td>
                                                <td>{event.category}</td>
                                                <td className={styles.msgCell} title={event.message}>{event.message}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* Event Detail Right Sidebar */}
      <div className={`${styles.detailSidebar} ${showEventDetail ? styles.detailSidebarOpen : ''}`}>
        <div className={styles.detailSidebarHeader}>
          <div className={styles.detailSidebarTitle}>
            <div className={styles.detailTitleIcon}>
              <Icon icon="mdi:format-list-bulleted-type" width={18} />
            </div>
            <div className={styles.detailTitleText}>
              <h2>Event Detail</h2>
              <span>Inspect log metadata & content</span>
            </div>
          </div>
          <button className={styles.detailSidebarClose} onClick={() => setShowEventDetail(false)}>
            <Icon icon="mdi:close" width={20} height={20} />
          </button>
        </div>

        {showEventDetail && selectedEvent && (
          <div className={styles.detailSidebarBody}>
            {/* Severity & Actions Bar */}
            <div className={styles.detailActionBar}>
              <div className={styles.detailSeverityCard} data-severity={selectedEvent.severity.toLowerCase()}>
                 <Icon icon={
                   selectedEvent.severity.toLowerCase() === 'critical' ? 'mdi:alert-octagon' : 
                   selectedEvent.severity.toLowerCase() === 'warning' ? 'mdi:alert' : 'mdi:information'
                 } width={20} />
                 <span className={styles.severityValue}>{selectedEvent.severity}</span>
              </div>
              <div className={styles.detailQuickActions}>
                <button 
                  className={styles.miniActionBtn} 
                  onClick={() => {
                    navigator.clipboard.writeText(selectedEvent.message);
                    // Feedback handled via CSS/Tooltip typically, but keeping it simple
                  }}
                  title="Copy Log Message"
                >
                  <Icon icon="mdi:content-copy" width={16} />
                </button>
                <button className={styles.miniActionBtn} title="Share Event">
                  <Icon icon="mdi:share-variant" width={16} />
                </button>
              </div>
            </div>

            {/* Core Metadata */}
            <div className={styles.detailSection}>
              <div className={styles.detailHeaderSmall}>
                <Icon icon="mdi:card-account-details-outline" width={16} />
                <span>Core Metadata</span>
              </div>
              <div className={styles.metadataCard}>
                <div className={styles.metaRow}>
                  <label>Timestamp</label>
                  <div className={styles.metaValueText}>{selectedEvent.timestamp}</div>
                </div>
                <div className={styles.metaRow}>
                  <label>Source Host</label>
                  <div className={`${styles.metaValueText} ${styles.highlightText}`}>{selectedEvent.source}</div>
                </div>
                <div className={styles.metaRow}>
                  <label>Category</label>
                  <div className={styles.metaValueText}>{selectedEvent.category}</div>
                </div>
              </div>
            </div>

            {/* Content / Message */}
            <div className={styles.detailSection}>
              <div className={styles.detailHeaderWithTabs}>
                <div className={styles.detailHeaderSmall}>
                  <Icon icon="mdi:text-box-outline" width={16} />
                  <span>Log Message</span>
                </div>
                <div className={styles.viewToggle}>
                  <button className={`${styles.toggleBtn} ${styles.active}`}>Parsed</button>
                  <button className={styles.toggleBtn}>Raw</button>
                </div>
              </div>
              <div className={styles.messageBox}>
                <div className={styles.parsedMessage}>
                  {selectedEvent.message.split(', ').map((part, i) => (
                    <div key={i} className={styles.logPart}>
                      {part.includes(':') ? (
                        <>
                          <span className={styles.partKey}>{part.split(': ')[0]}:</span>
                          <span className={styles.partVal}>{part.split(': ')[1]}</span>
                        </>
                      ) : (
                        <span className={styles.partText}>{part}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Extended Attributes Grid */}
            <div className={styles.detailSection}>
              <div className={styles.detailHeaderSmall}>
                <Icon icon="mdi:xml" width={16} />
                <span>Extended Attributes</span>
              </div>
              <div className={styles.attributesGrid}>
                {[
                  { key: 'facility', val: 'auth' },
                  { key: 'pid', val: '891278' },
                  { key: 'protocol', val: 'udp' },
                  { key: 'log_index', val: 'idx_nms_2025' },
                  { key: 'collector', val: 'main-syslog-01' }
                ].map((attr, idx) => (
                  <div key={idx} className={styles.attrTag}>
                     <span className={styles.attrKey}>{attr.key}:</span>
                     <span className={styles.attrVal}>{attr.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay to close when clicking outside */}
      {showEventDetail && (
        <div className={styles.detailOverlay} onClick={() => setShowEventDetail(false)} />
      )}

      {/* Widget Sidebar */}
      {showWidgetSidebar && (
        <WidgetSidebar onClose={() => setShowWidgetSidebar(false)} />
      )}

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={showFilterSidebar}
        onClose={() => setShowFilterSidebar(false)}
        title="Log Search Filters"
        filters={[
          {
            key: 'severity',
            type: 'select',
            label: 'Severity',
            options: [
              { value: '', label: 'All Levels' },
              { value: 'Critical', label: 'Critical' },
              { value: 'Warning', label: 'Warning' },
              { value: 'Informational', label: 'Informational' },
            ],
          },
          {
            key: 'timeRange',
            type: 'select',
            label: 'Time Range',
            options: [
              { value: 'today', label: 'Today' },
              { value: 'last_hour', label: 'Last Hour' },
              { value: 'last_24h', label: 'Last 24 Hours' },
            ],
          },
        ]}
        filterValues={filters}
        onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
        onApply={() => setShowFilterSidebar(false)}
        onReset={() => setFilters({ severity: '', timeRange: 'today' })}
      />
    </div>
  );
};

// Widget Categories
const WIDGET_CATEGORIES = [
  {
    category: 'Graph',
    widgets: [
      { id: 'chart', name: 'Chart', icon: 'mdi:chart-line', color: '#06b6d4' },
      {
        id: 'topN',
        name: 'Top N',
        icon: 'mdi:format-list-numbered',
        color: '#3b82f6',
      },
      { id: 'gauge', name: 'Gauge', icon: 'mdi:gauge', color: '#8b5cf6' },
      { id: 'grid', name: 'Grid', icon: 'mdi:table', color: '#22c55e' },
      { id: 'pie', name: 'Pie', icon: 'mdi:chart-pie', color: '#f59e0b' },
      {
        id: 'queryValue',
        name: 'Query Value',
        icon: 'mdi:numeric-1-box',
        color: '#10b981',
      },
      {
        id: 'numericGrid',
        name: 'Numeric Grid',
        icon: 'mdi:grid',
        color: '#14b8a6',
      },
      {
        id: 'sankey',
        name: 'Sankey',
        icon: 'mdi:chart-sankey',
        color: '#6366f1',
      },
    ],
  },
  {
    category: 'Alert / Availability',
    widgets: [
      { id: 'heatMap', name: 'Heat Map', icon: 'mdi:grid', color: '#ef4444' },
      {
        id: 'stream',
        name: 'Stream',
        icon: 'mdi:chart-timeline-variant',
        color: '#f97316',
      },
      {
        id: 'activeAlert',
        name: 'Active Alert',
        icon: 'mdi:alert-circle',
        color: '#dc2626',
      },
    ],
  },
  {
    category: 'Map',
    widgets: [
      {
        id: 'treeMap',
        name: 'Tree Map',
        icon: 'mdi:file-tree',
        color: '#84cc16',
      },
      { id: 'map', name: 'Map', icon: 'mdi:map-marker', color: '#22c55e' },
    ],
  },
  {
    category: 'AI / ML',
    widgets: [
      {
        id: 'anomaly',
        name: 'Anomaly',
        icon: 'mdi:chart-bell-curve',
        color: '#a855f7',
      },
      {
        id: 'forecast',
        name: 'Forecast',
        icon: 'mdi:chart-timeline-variant-shimmer',
        color: '#d946ef',
      },
    ],
  },
];

// Widget Sidebar Component
const WidgetSidebar = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Create Widget');

  const handleWidgetSelect = (widget) => {
    console.log('Selected widget:', widget);
    // Here you would typically open a modal to configure the widget
    // For now, we'll just close the sidebar
    onClose();
  };

  return (
    <div className={styles.widgetSidebarOverlay} onClick={onClose}>
      <div
        className={styles.widgetSidebar}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.widgetSidebarHeader}>
          <div className={styles.widgetSidebarTitle}>
            <Icon icon="mdi:widgets" width={20} height={20} />
            <span>Add New Widget</span>
          </div>
          <button className={styles.widgetSidebarClose} onClick={onClose}>
            <Icon icon="mdi:close" width={18} height={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className={styles.widgetSidebarTabs}>
          {['Create Widget', 'Predefined', 'User Define'].map((tab) => (
            <button
              key={tab}
              className={`${styles.widgetSidebarTab} ${
                activeTab === tab ? styles.widgetSidebarTabActive : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className={styles.widgetSidebarSearch}>
          <Icon icon="mdi:magnify" width={16} height={16} />
          <input
            type="text"
            placeholder="Search widgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Content */}
        <div className={styles.widgetSidebarContent}>
          {WIDGET_CATEGORIES.map((category) => (
            <div key={category.category} className={styles.widgetCategory}>
              <h3 className={styles.widgetCategoryTitle}>
                {category.category}
              </h3>
              <div className={styles.widgetGrid}>
                {category.widgets
                  .filter((w) =>
                    w.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((widget) => (
                    <button
                      key={widget.id}
                      className={styles.widgetCard}
                      onClick={() => handleWidgetSelect(widget)}
                    >
                      <Icon
                        icon={widget.icon}
                        width={32}
                        height={32}
                        style={{ color: widget.color }}
                      />
                      <span>{widget.name}</span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogManagement;
