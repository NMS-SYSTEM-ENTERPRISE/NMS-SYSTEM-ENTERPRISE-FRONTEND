'use client';
import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

// Mock data for alerts
const MOCK_ALERTS = [
  {
    id: '1',
    alert: 'Interface Availability',
    type: 'Availability',
    monitor: 'ciscostack1.test.com',
    metric: 'interface.status',
    instance: 'Gi2/0/14-10814',
    incidentDetails: '',
    lastSeen: 'Mon, Jun 23, 2025 12:21:18 PM',
    value: 'Down',
    duration: '5 days 23 hours 39 minutes',
    severity: 'down',
    category: 'Network',
  },
  {
    id: '2',
    alert: 'Interface Availability',
    type: 'Availability',
    monitor: 'moxa-switch',
    metric: 'interface.status',
    instance: 'Ethernet Port Gi2-12',
    incidentDetails: '',
    lastSeen: 'Sun, Jun 22, 2025 03:01:18 PM',
    value: 'Down',
    duration: '5 days 23 hours 39 minutes',
    severity: 'down',
    category: 'Network',
  },
  {
    id: '3',
    alert: 'Availability',
    type: 'Availability',
    monitor: 'gF.g9.com',
    metric: 'status',
    instance: '',
    incidentDetails: 'INC0010065',
    lastSeen: 'Mon, Jun 23, 2025 12:30:18 PM',
    value: 'Down',
    duration: '5 days 23 hours 48 minutes',
    severity: 'down',
    category: 'Server',
  },
  {
    id: '4',
    alert: 'Interface Availability',
    type: 'Availability',
    monitor: 'ciscostack1.test.com',
    metric: 'interface.status',
    instance: 'Gi11/0/4-11104',
    incidentDetails: '',
    lastSeen: 'Mon, Jun 23, 2025 12:21:18 PM',
    value: 'Down',
    duration: '5 days 23 hours 39 minutes',
    severity: 'down',
    category: 'Network',
  },
  {
    id: '5',
    alert: 'Interface Availability',
    type: 'Availability',
    monitor: 'moxa-switch',
    metric: 'interface.status',
    instance: 'Ethernet Port Gi2-12',
    incidentDetails: '',
    lastSeen: 'Sun, Jun 22, 2025 03:01:18 PM',
    value: 'Unreachable',
    duration: '5 days 23 hours 39 minutes',
    severity: 'unreachable',
    category: 'Network',
  },
  {
    id: '6',
    alert: 'CPU Utilization',
    type: 'Performance',
    monitor: 'server-01',
    metric: 'cpu.percent',
    instance: 'eth4-4',
    incidentDetails: '',
    lastSeen: 'Sun, Jun 22, 2025 03:01:18 PM',
    value: 'Critical',
    duration: '2 hours 15 minutes',
    severity: 'critical',
    category: 'Server',
  },
  {
    id: '7',
    alert: 'Memory Usage',
    type: 'Performance',
    monitor: 'router-core-01',
    metric: 'memory.percent',
    instance: '',
    incidentDetails: '',
    lastSeen: 'Sun, Jun 22, 2025 03:01:18 PM',
    value: 'Warning',
    duration: '1 hour 30 minutes',
    severity: 'warning',
    category: 'Network',
  },
  {
    id: '8',
    alert: 'Interface Availability Correlation Policy',
    type: 'Availability',
    monitor: '192.168.2.4:1',
    metric: 'interface.status',
    instance: 'Et0/1-2',
    incidentDetails: '',
    lastSeen: 'Mon, Jun 23, 2025 12:21:18 PM',
    value: 'Down',
    duration: '2 minutes 40 seconds',
    severity: 'critical',
    category: 'Server',
    correlatedAlerts: 2,
  },
];

const ALERT_CATEGORIES = [
  { id: 'metric', name: 'Metric', icon: 'mdi:chart-line' },
  { id: 'log', name: 'Log', icon: 'mdi:text-box' },
  { id: 'flow', name: 'Flow', icon: 'mdi:chart-timeline-variant' },
  { id: 'trap', name: 'Trap', icon: 'mdi:alert-octagon' },
  { id: 'netroute', name: 'NetRoute', icon: 'mdi:routes', beta: true },
  { id: 'flap', name: 'Flap View', icon: 'mdi:swap-vertical' },
];

const AccordionSection = ({
  title,
  icon,
  badge,
  isOpen,
  onToggle,
  children,
}) => (
  <div className={styles.accordionSection} data-open={isOpen}>
    <div className={styles.accordionHeader} onClick={onToggle}>
      <div className={styles.headerLabel}>
        <div className={styles.sectionIcon}>
          <Icon icon={icon} width={18} />
        </div>
        <span className={styles.sectionTitle}>{title}</span>
        {badge && <span className={styles.sectionBadge}>{badge}</span>}
      </div>
      <Icon icon="mdi:chevron-down" className={styles.chevron} width={20} />
    </div>
    {isOpen && <div className={styles.accordionContent}>{children}</div>}
  </div>
);

const Alerts = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('metric');
  const [view, setView] = useState('overview');
  const [severityFilter, setSeverityFilter] = useState(null);
  const [expandedRows, setExpandedRows] = useState(
    new Set([MOCK_ALERTS[0].id])
  );
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);

  const overviewPieRef = useRef(null);
  const policyBarRef = useRef(null);
  const trendLineRef = useRef(null);

  const [openSections, setOpenSections] = useState({
    summary: true,
    analytics: true,
    categories: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleRow = (id) => {
    const next = new Set(expandedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedRows(next);
  };

  const getAlertCounts = () => {
    return {
      total: MOCK_ALERTS.length,
      down: MOCK_ALERTS.filter((a) => a.severity === 'down').length,
      unreachable: MOCK_ALERTS.filter((a) => a.severity === 'unreachable')
        .length,
      critical: MOCK_ALERTS.filter((a) => a.severity === 'critical').length,
      major: MOCK_ALERTS.filter((a) => a.severity === 'major').length,
      warning: MOCK_ALERTS.filter((a) => a.severity === 'warning').length,
    };
  };

  const counts = getAlertCounts();

  const getCategoryStats = () => {
    const categories = ['Network', 'Server', 'Application', 'Cloud'];
    return categories.map((cat) => ({
      name: cat,
      total: MOCK_ALERTS.filter((a) => a.category === cat).length,
      down: MOCK_ALERTS.filter(
        (a) => a.category === cat && a.severity === 'down'
      ).length,
      critical: MOCK_ALERTS.filter(
        (a) => a.category === cat && a.severity === 'critical'
      ).length,
      warning: MOCK_ALERTS.filter(
        (a) => a.category === cat && a.severity === 'warning'
      ).length,
    }));
  };

  const catStats = getCategoryStats();

  useEffect(() => {
    if (view === 'overview' && openSections.analytics) {
      initCharts();
    }
  }, [view, openSections.analytics]);

  const initCharts = () => {
    if (overviewPieRef.current) {
      const chart = echarts.init(overviewPieRef.current);
      chart.setOption({
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          backgroundColor: '#0b0f19',
          borderColor: 'rgba(255,255,255,0.1)',
          textStyle: { color: '#f3f4f6', fontSize: 11 },
        },
        series: [
          {
            type: 'pie',
            radius: ['62%', '88%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 6,
              borderColor: '#0b0f19',
              borderWidth: 3,
            },
            label: { show: false },
            data: [
              {
                value: 207,
                name: 'Availability',
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#06b6d4' },
                    { offset: 1, color: '#0891b2' },
                  ]),
                },
              },
              {
                value: 31,
                name: 'Metric Threshold',
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#818cf8' },
                    { offset: 1, color: '#4f46e5' },
                  ]),
                },
              },
              {
                value: 4,
                name: 'Metric Baseline',
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#34d399' },
                    { offset: 1, color: '#059669' },
                  ]),
                },
              },
            ],
          },
        ],
      });
    }

    if (policyBarRef.current) {
      const chart = echarts.init(policyBarRef.current);
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          backgroundColor: '#0b0f19',
          borderColor: 'rgba(255,255,255,0.1)',
          textStyle: { color: '#f3f4f6', fontSize: 11 },
        },
        grid: {
          left: '0',
          right: '0',
          bottom: '0',
          top: '20',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: ['AV-POL', 'MT-POL', 'BS-POL'],
          axisLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
          axisLabel: { color: '#94a3b8', fontSize: 10, fontWeight: 600 },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' },
          },
          axisLabel: { color: '#94a3b8', fontSize: 10 },
        },
        series: [
          {
            name: 'Critical',
            type: 'bar',
            stack: 'total',
            barWidth: 32,
            data: [120, 10, 2],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#fb7185' },
                { offset: 1, color: '#e11d48' },
              ]),
              borderRadius: [0, 0, 0, 0],
            },
          },
          {
            name: 'Major',
            type: 'bar',
            stack: 'total',
            data: [50, 15, 1],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#fbbf24' },
                { offset: 1, color: '#d97706' },
              ]),
            },
          },
          {
            name: 'Warning',
            type: 'bar',
            stack: 'total',
            data: [37, 6, 1],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#fde047' },
                { offset: 1, color: '#ca8a04' },
              ]),
              borderRadius: [4, 4, 0, 0],
            },
          },
        ],
      });
    }
  };

  const filteredAlerts = MOCK_ALERTS.filter((alert) => {
    if (severityFilter && alert.severity !== severityFilter) return false;
    return true;
  });

  return (
    <div className={styles.alerts}>
      {/* Sidebar - Collapsed by Default */}
      <aside
        className={`${styles.leftSidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}
      >
        <div className={styles.sidebarHeader}>
          <span
            className={`${styles.sidebarTitle} ${!isSidebarOpen ? styles.hidden : ''}`}
          >
            Alert Types
          </span>
          <button
            className={styles.collapseBtn}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Icon
              icon={isSidebarOpen ? 'mdi:menu-open' : 'mdi:menu'}
              width={20}
            />
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          <div className={styles.treeRoot}>
            <Icon
              icon="mdi:bell-alert"
              className={styles.rootIcon}
              width={18}
            />
            <span className={styles.rootLabel}>Management</span>
          </div>

          <div className={styles.treeChildren}>
            {ALERT_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className={`${styles.categoryItem} ${activeTab === cat.id ? styles.categoryItemActive : ''}`}
                onClick={() => setActiveTab(cat.id)}
                title={!isSidebarOpen ? cat.name : ''}
              >
                <div className={styles.treeBranch} />
                <div className={styles.itemIconWrapper}>
                  <Icon icon={cat.icon} width={18} />
                </div>
                <span className={styles.navText}>{cat.name}</span>
                {cat.beta && isSidebarOpen && (
                  <span className={styles.betaBadge}>BETA</span>
                )}
              </div>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={styles.mainContentWrapper}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <Icon icon="mdi:bell-ring" width={22} />
            </div>
            <h1 className={styles.headerTitle}>Active Alerts</h1>
          </div>

          <div className={styles.headerRight}>
            {view === 'overview' && (
              <div className={styles.severityTabs}>
                {[
                  { id: null, label: 'All', count: counts.total },
                  { id: 'down', label: 'Down', count: counts.down },
                  { id: 'critical', label: 'Critical', count: counts.critical },
                  { id: 'warning', label: 'Warning', count: counts.warning },
                ].map((s) => (
                  <button
                    key={s.id}
                    className={`${styles.severityTab} ${severityFilter === s.id ? styles.severityTabActive : ''}`}
                    onClick={() => setSeverityFilter(s.id)}
                  >
                    {s.label}{' '}
                    <span className={styles.countBadge}>{s.count}</span>
                  </button>
                ))}
              </div>
            )}

            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewToggleBtn} ${view === 'overview' ? styles.viewToggleBtnActive : ''}`}
                onClick={() => setView('overview')}
              >
                <Icon icon="mdi:view-dashboard" width={16} /> Overview
              </button>
              <button
                className={`${styles.viewToggleBtn} ${view === 'list' ? styles.viewToggleBtnActive : ''}`}
                onClick={() => setView('list')}
              >
                <Icon icon="mdi:format-list-bulleted" width={16} /> List
              </button>
            </div>

            <div className={styles.headerActions}>
              <button
                className={styles.actionBtn}
                onClick={() => setShowFilterSidebar(true)}
              >
                <Icon icon="mdi:filter-variant" width={20} />
              </button>
              <button className={styles.actionBtn}>
                <Icon icon="mdi:refresh" width={20} />
              </button>
            </div>
          </div>
        </header>

        <div className={styles.contentArea}>
          {view === 'overview' ? (
            <div className={styles.accordionContainer}>
              {/* Section 1: Stats Summary */}
              <AccordionSection
                title="Operational Health Summary"
                icon="mdi:pulse"
                badge="LIVE"
                isOpen={openSections.summary}
                onToggle={() => toggleSection('summary')}
              >
                <div className={styles.statsRow}>
                  <div className={styles.metricTile}>
                    <span className={styles.metricLabel}>TOTAL ALERTS</span>
                    <span className={styles.metricValue}>{counts.total}</span>
                  </div>
                  <div className={styles.metricTile}>
                    <span
                      className={styles.metricLabel}
                      style={{ color: '#ef4444' }}
                    >
                      DOWN NODES
                    </span>
                    <span
                      className={styles.metricValue}
                      style={{ color: '#ef4444' }}
                    >
                      {counts.down}
                    </span>
                  </div>
                  <div className={styles.metricTile}>
                    <span
                      className={styles.metricLabel}
                      style={{ color: '#f97316' }}
                    >
                      CRITICAL ISSUES
                    </span>
                    <span
                      className={styles.metricValue}
                      style={{ color: '#f97316' }}
                    >
                      {counts.critical}
                    </span>
                  </div>
                  <div className={styles.metricTile}>
                    <span
                      className={styles.metricLabel}
                      style={{ color: '#10b981' }}
                    >
                      ACK RATE
                    </span>
                    <span
                      className={styles.metricValue}
                      style={{ color: '#10b981' }}
                    >
                      94.2%
                    </span>
                  </div>
                </div>
              </AccordionSection>

              {/* Section 2: Analytics */}
              <AccordionSection
                title="Alert Intelligence & Distribution"
                icon="mdi:chart-arc"
                badge="ANALYTICS"
                isOpen={openSections.analytics}
                onToggle={() => toggleSection('analytics')}
              >
                <div className={styles.chartsGrid}>
                  <div className={styles.chartGroup}>
                    <span className={styles.chartSubHeader}>
                      ALERT CLASSIFICATION
                    </span>
                    <div
                      ref={overviewPieRef}
                      style={{ width: '100%', height: '240px' }}
                    />
                  </div>
                  <div className={styles.chartGroup}>
                    <span className={styles.chartSubHeader}>
                      POLICY PERFORMANCE
                    </span>
                    <div
                      ref={policyBarRef}
                      style={{ width: '100%', height: '240px' }}
                    />
                  </div>
                </div>
              </AccordionSection>

              {/* Section 3: Categories Grid */}
              <AccordionSection
                title="Alert Density by Environment"
                icon="mdi:grid"
                badge="ZONES"
                isOpen={openSections.categories}
                onToggle={() => toggleSection('categories')}
              >
                <div className={styles.categoriesGrid}>
                  {catStats.map((stat) => (
                    <div key={stat.name} className={styles.categoryTile}>
                      <div className={styles.catHeader}>
                        <span className={styles.catName}>{stat.name}</span>
                        <span className={styles.catTotal}>{stat.total}</span>
                      </div>
                      <div className={styles.envTimeline}>
                        <div className={styles.envNode}>
                          <div
                            className={styles.nodeMarker}
                            style={{ borderColor: '#ef4444' }}
                          />
                          <span className={styles.label}>Down</span>
                          <span className={styles.val}>{stat.down}</span>
                        </div>
                        <div className={styles.envNode}>
                          <div
                            className={styles.nodeMarker}
                            style={{ borderColor: '#dc2626' }}
                          />
                          <span className={styles.label}>Critical</span>
                          <span className={styles.val}>{stat.critical}</span>
                        </div>
                        <div className={styles.envNode}>
                          <div
                            className={styles.nodeMarker}
                            style={{ borderColor: '#eab308' }}
                          />
                          <span className={styles.label}>Warning</span>
                          <span className={styles.val}>{stat.warning}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionSection>
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <div className={styles.tableHeaderRow}>
                <span>#</span>
                <span>ALERT NAME & SEVERITY</span>
                <span>TYPE</span>
                <span>MONITOR / SOURCE</span>
                <span>INSTANCE</span>
                <span>VALUE</span>
                <span>DURATION</span>
                <span></span>
              </div>
              <div className={styles.tableBody}>
                {filteredAlerts.map((alert, i) => (
                  <div
                    key={alert.id}
                    className={styles.accordionRow}
                    data-expanded={expandedRows.has(alert.id)}
                  >
                    <div
                      className={styles.rowMain}
                      onClick={() => toggleRow(alert.id)}
                    >
                      <span className={styles.monitorText}>{i + 1}</span>
                      <div className={styles.alertIdentity}>
                        <div
                          className={`${styles.severityCircle} ${styles[`severity${alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}`]}`}
                        />
                        <span className={styles.alertName}>{alert.alert}</span>
                      </div>
                      <span className={styles.typeTag}>{alert.type}</span>
                      <span className={styles.monitorText}>
                        {alert.monitor}
                      </span>
                      <span className={styles.monitorText}>
                        {alert.instance || '-'}
                      </span>
                      <span
                        className={`${styles.badgeVal} ${styles[`val${alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}`]}`}
                      >
                        {alert.value}
                      </span>
                      <span className={styles.durationText}>
                        {alert.duration}
                      </span>
                      <div
                        className={styles.linkBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/alerts/${alert.id}`);
                        }}
                        title="View Detailed Analytics"
                      >
                        <Icon icon="mdi:open-in-new" width={18} />
                      </div>
                      <Icon
                        icon="mdi:chevron-down"
                        style={{
                          transform: expandedRows.has(alert.id)
                            ? 'rotate(180deg)'
                            : '',
                        }}
                        width={20}
                        className={styles.chevron}
                      />
                    </div>
                    {expandedRows.has(alert.id) && (
                      <div className={styles.rowDetails}>
                        <div className={styles.detailsGrid}>
                          <div className={styles.detailSection}>
                            <span className={styles.detailTitle}>
                              Contextual Analysis
                            </span>
                            <div className={styles.metaGrid}>
                              <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>
                                  Metric Path
                                </span>
                                <span className={styles.metaValue}>
                                  {alert.metric}
                                </span>
                              </div>
                              <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>
                                  Last Captured
                                </span>
                                <span className={styles.metaValue}>
                                  {alert.lastSeen}
                                </span>
                              </div>
                              <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>
                                  Category
                                </span>
                                <span className={styles.metaValue}>
                                  {alert.category}
                                </span>
                              </div>
                              <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>
                                  Threshold
                                </span>
                                <span className={styles.metaValue}>
                                  90% Static
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.detailSection}>
                            <span className={styles.detailTitle}>
                              Incident Mapping
                            </span>
                            <div className={styles.metaGrid}>
                              <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>
                                  Incident ID
                                </span>
                                <span className={styles.metaValue}>
                                  {alert.incidentDetails || 'N/A'}
                                </span>
                              </div>
                              <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>
                                  Assignment Group
                                </span>
                                <span className={styles.metaValue}>
                                  Network_NOC_L1
                                </span>
                              </div>
                              <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>
                                  Correlation
                                </span>
                                <span className={styles.metaValue}>
                                  {alert.correlatedAlerts || 'Single Event'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.detailSection}>
                            <span className={styles.detailTitle}>
                              Quick Actions
                            </span>
                            <div
                              style={{
                                display: 'flex',
                                gap: '8px',
                                marginTop: '4px',
                              }}
                            >
                              <button
                                className={styles.typeTag}
                                style={{ cursor: 'pointer' }}
                              >
                                ACKNOWLEDGE
                              </button>
                              <button
                                className={styles.typeTag}
                                style={{ cursor: 'pointer' }}
                              >
                                VIEW GRAPH
                              </button>
                              <button
                                className={styles.typeTag}
                                style={{ cursor: 'pointer' }}
                              >
                                CREATE INCIDENT
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
