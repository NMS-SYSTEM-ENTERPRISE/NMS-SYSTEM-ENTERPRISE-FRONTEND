import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { TopTalkersWidget } from '../top-talkers-widget';
import styles from './styles.module.css';



import { getFlowAnalytics, getFlowDashboard } from '@/networking/network-monitoring/network-monitoring-apis';
import { useFlow } from '@/hooks/flow';
import { FlowViewSkeleton } from '@/components/ui/skeleton-loaders/flow-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

export const FlowAnalytics = () => {
  const { selectedEventSource, selectedInterface } = useFlow();
  
  const [expandedSections, setExpandedSections] = useState({
    summary: true,
    topTalkers: true,
    distribution: true,
    performance: true,
    insights: true
  });

  const [analyticsData, setAnalyticsData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const trendChartRef = useRef(null);
  const distChartRef = useRef(null);
  const trendInstance = useRef(null);
  const distInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const params = { eventSource: selectedEventSource, interface: selectedInterface };
        const [analytics, dashboard] = await Promise.all([
          getFlowAnalytics(params),
          getFlowDashboard(params)
        ]);
        setAnalyticsData(analytics);
        setDashboardData(dashboard);
      } catch (error) {
        console.error("Failed to fetch flow analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedEventSource, selectedInterface]);

  useEffect(() => {
    if (!analyticsData) return;

    if (expandedSections.performance) drawTrendChart();
    if (expandedSections.distribution) drawDistChart();

    const handleResize = () => {
      trendInstance.current?.resize();
      distInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      trendInstance.current?.dispose();
      distInstance.current?.dispose();
    };
  }, [expandedSections.performance, expandedSections.distribution, analyticsData]);

  const drawTrendChart = () => {
    if (!trendChartRef.current) return;
    if (trendInstance.current) trendInstance.current.dispose();
    const chart = echarts.init(trendChartRef.current);
    trendInstance.current = chart;

    chart.setOption({
      grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
        axisLabel: { color: 'var(--color-text-muted)', fontSize: 10, fontFamily: 'var(--font-geist-mono), monospace' }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.03)' } },
        axisLabel: { color: 'var(--color-text-muted)', fontSize: 10, fontFamily: 'var(--font-geist-mono), monospace' }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#111827',
        borderColor: 'rgba(255,255,255,0.1)',
        textStyle: { color: '#fff', fontSize: 11, fontFamily: 'var(--font-geist-mono), monospace' }
      },
      legend: {
        data: ['Total Throughput'],
        bottom: 0,
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { color: '#9ca3af', fontSize: 11, fontFamily: 'var(--font-geist-mono), monospace' }
      },
      series: [{
        name: 'Total Throughput',
        data: analyticsData.trend,
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 3, color: 'var(--color-chart-purple-light)' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(192, 132, 252, 0.5)' },
            { offset: 1, color: 'rgba(192, 132, 252, 0.05)' }
          ])
        }
      }]
    });
  };

  const drawDistChart = () => {
    if (!distChartRef.current) return;
    if (distInstance.current) distInstance.current.dispose();
    const chart = echarts.init(distChartRef.current);
    distInstance.current = chart;

    chart.setOption({
      tooltip: {
        trigger: 'item',
        backgroundColor: '#111827',
        borderColor: 'rgba(255,255,255,0.1)',
        textStyle: { color: '#fff', fontSize: 11, fontFamily: 'var(--font-geist-mono), monospace' }
      },
      series: [{
        type: 'pie',
        radius: ['60%', '85%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 6, borderColor: 'var(--color-bg-primary)', borderWidth: 2 },
        label: { show: false },
        data: analyticsData.appData.map(d => ({ value: d.size, name: d.name, itemStyle: { color: d.color } })),
        color: analyticsData.appData.map(d => d.color)
      }]
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (isLoading) {
    return <FlowViewSkeleton />;
  }

  if (!analyticsData || !dashboardData) {
    return (
      <div style={{ padding: '40px' }}>
        <NoDataFound 
          title="Analytics Data Unavailable" 
          description="Unable to load flow analytics trends and pattern recognition." 
          icon="mdi:chart-arc"
        />
      </div>
    );
  }

  return (
    <div className={styles.analytics}>
      <div className={styles.accordionContainer}>
        {/* Section 0: Summary Analytics */}
        <div className={styles.accordion}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('summary')}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper} style={{ color: 'var(--color-success)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                <Icon icon="mdi:buffer" width={20} />
              </div>
              <span className={styles.headerTitle}>Flow Overview <span className={styles.badge} style={{ color: 'var(--color-success)', background: 'rgba(16, 185, 129, 0.1)' }}>REAL-TIME</span></span>
            </div>
            <Icon icon="mdi:chevron-down" className={`${styles.chevron} ${expandedSections.summary ? styles.chevronOpen : ''}`} />
          </div>
          {expandedSections.summary && (
            <div className={styles.accordionContent} style={{ padding: 0 }}>
              <div className={styles.summaryRibbon}>
                {analyticsData.ribbonStats.map((stat, idx) => (
                  <div key={idx} className={styles.ribbonItem}>
                    <div className={styles.ribbonHeader}>
                      <span className={styles.ribbonLabel}>{stat.label}</span>
                      <Icon icon={stat.icon} className={styles.ribbonIcon} />
                    </div>
                    <span className={styles.ribbonValue}>
                      {stat.value.includes('Mbps') ? (
                        <>
                          {stat.value.split(' ')[0]} <small>Mbps</small>
                        </>
                      ) : stat.value}
                    </span>
                    <span className={`${styles.ribbonSub} ${stat.trend === 'up' ? styles.trendUp : stat.trend === 'down' ? styles.trendDown : ''}`}>
                      {stat.trend === 'up' && <Icon icon="mdi:trending-up" />}
                      {stat.trend === 'down' && <Icon icon="mdi:trending-down" />}
                      {stat.trend === 'neutral' && <span className={styles.statusDot} />}
                      {stat.trend !== 'neutral' && ` `}
                      {stat.subValue.split(' ')[0]} <span className={styles.trendLabel}>{stat.subValue.substring(stat.subValue.indexOf(' ') + 1)}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 1: Top Talkers */}
        <div className={styles.accordion}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('topTalkers')}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper} style={{ color: 'var(--color-chart-cyan)', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
                <Icon icon="mdi:network-strength-4" width={20} />
              </div>
              <span className={styles.headerTitle}>Top Talkers <span className={styles.badge} style={{ color: 'var(--color-chart-cyan)', background: 'rgba(6, 182, 212, 0.1)' }}>BANDWIDTH</span></span>
            </div>
            <Icon icon="mdi:chevron-down" className={`${styles.chevron} ${expandedSections.topTalkers ? styles.chevronOpen : ''}`} />
          </div>
          {expandedSections.topTalkers && (
            <div className={styles.accordionContent}>
              <TopTalkersWidget data={dashboardData.topTalkers} />
            </div>
          )}
        </div>

        {/* Section 2: Traffic Distribution Analysis */}
        <div className={styles.accordion}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('distribution')}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper}>
                <Icon icon="mdi:chart-pie" width={20} />
              </div>
              <span className={styles.headerTitle}>Traffic Distribution <span className={styles.badge}>SEGMENTATION</span></span>
            </div>
            <Icon icon="mdi:chevron-down" className={`${styles.chevron} ${expandedSections.distribution ? styles.chevronOpen : ''}`} />
          </div>
          {expandedSections.distribution && (
            <div className={styles.accordionContent}>
              <div className={styles.analyticsGrid}>
                {/* Chart with Legend Split View */}
                <div className={styles.widgetBox}>
                  <div className={styles.widgetHeader}>
                    <span className={styles.widgetTitle}>Application Mix</span>
                  </div>
                  <div className={styles.chartSplitView}>
                    <div ref={distChartRef} className={styles.chartWrap} />
                    <div className={styles.chartDetails}>
                      {analyticsData.appData.map((item, idx) => (
                        <div key={idx} className={styles.detailItem}>
                          <div className={styles.detailLabel}>
                            <div className={styles.colorIndicator} style={{ backgroundColor: item.color }} />
                            {item.name}
                          </div>
                          <div className={styles.detailValue}>{item.size}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.widgetBox}>
                  <div className={styles.widgetHeader}>
                    <span className={styles.widgetTitle}>Pattern Recognition</span>
                  </div>
                  <div className={styles.insightsSmallList}>
                    {analyticsData.patternInsights.map((item, idx) => (
                      <div key={idx} className={styles.insightListItem}>
                        <Icon icon={item.icon} className={styles.listIcon} />
                        <span className={styles.listTitle}>{item.title}</span>
                        <span className={styles.listValue}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Pattern Insights */}
        <div className={styles.accordion}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('insights')}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper}>
                <Icon icon="mdi:auto-fix" width={20} />
              </div>
              <span className={styles.headerTitle}>Intelligent Insights <span className={styles.badge}>ANOMALIES</span></span>
            </div>
            <Icon icon="mdi:chevron-down" className={`${styles.chevron} ${expandedSections.insights ? styles.chevronOpen : ''}`} />
          </div>
          {expandedSections.insights && (
            <div className={styles.accordionContent}>
              <div className={styles.insightsStrip}>
                {analyticsData.anomalyInsights.map((insight, idx) => (
                  <div key={idx} className={styles.insightBlock}>
                    <div className={styles.insightHeader}>
                      <Icon icon={insight.icon} /> {insight.title}
                    </div>
                    <p className={styles.insightText}>{insight.text}</p>
                    <div className={styles.insightMeta}>{insight.meta}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Historical Performance Trends */}
        <div className={styles.accordion}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('performance')}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper}>
                <Icon icon="mdi:chart-timeline-variant" width={20} />
              </div>
              <span className={styles.headerTitle}>Performance Trends <span className={styles.badge}>HISTORICAL</span></span>
            </div>
            <Icon icon="mdi:chevron-down" className={`${styles.chevron} ${expandedSections.performance ? styles.chevronOpen : ''}`} />
          </div>
          {expandedSections.performance && (
            <div className={styles.accordionContent}>
              <div className={styles.widgetBox}>
                <div className={styles.widgetHeader}>
                  <span className={styles.widgetTitle}>Network Throughput over time (Mbps)</span>
                </div>
                <div ref={trendChartRef} className={styles.widgetChart} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
