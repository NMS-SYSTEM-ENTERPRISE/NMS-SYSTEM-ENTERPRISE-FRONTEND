import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

const TREND_DATA = [120, 150, 180, 170, 210, 250, 280, 260, 290, 320, 310, 350];
const APP_DATA = [
  { value: 45, name: 'HTTPS', color: '#c084fc' },
  { value: 25, name: 'Google Cloud', color: '#22d3ee' },
  { value: 15, name: 'AWS Services', color: '#f43f5e' },
  { value: 10, name: 'DNS', color: '#3b82f6' },
  { value: 5, name: 'Other', color: '#10b981' }
];

export const FlowAnalytics = () => {
  const [expandedSections, setExpandedSections] = useState({
    summary: true,
    distribution: true,
    performance: true,
    insights: true
  });

  const trendChartRef = useRef(null);
  const distChartRef = useRef(null);
  const trendInstance = useRef(null);
  const distInstance = useRef(null);

  useEffect(() => {
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
  }, [expandedSections.performance, expandedSections.distribution]);

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
        axisLabel: { color: '#64748b', fontSize: 10, fontFamily: 'JetBrains Mono' }
      },
      yAxis: { 
        type: 'value', 
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.03)' } },
        axisLabel: { color: '#64748b', fontSize: 10, fontFamily: 'JetBrains Mono' }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#111827',
        borderColor: 'rgba(255,255,255,0.1)',
        textStyle: { color: '#fff', fontSize: 11, fontFamily: 'JetBrains Mono' }
      },
      series: [{
        data: TREND_DATA,
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 3, color: '#c084fc' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(192, 132, 252, 0.25)' },
            { offset: 1, color: 'transparent' }
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
        textStyle: { color: '#fff', fontSize: 11, fontFamily: 'JetBrains Mono' }
      },
      series: [{
        type: 'pie',
        radius: ['60%', '85%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 6, borderColor: '#0b0f19', borderWidth: 2 },
        label: { show: false },
        data: APP_DATA,
        color: APP_DATA.map(d => d.color)
      }]
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className={styles.analytics}>
      <div className={styles.accordionContainer}>
        {/* Section 0: Summary Analytics */}
        <div className={styles.accordion}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('summary')}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper} style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                <Icon icon="mdi:buffer" width={20} />
              </div>
              <span className={styles.headerTitle}>Flow Overview <span className={styles.badge} style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}>REAL-TIME</span></span>
            </div>
            <Icon icon="mdi:chevron-down" className={`${styles.chevron} ${expandedSections.summary ? styles.chevronOpen : ''}`} />
          </div>
          {expandedSections.summary && (
            <div className={styles.accordionContent} style={{ padding: 0 }}>
              <div className={styles.summaryRibbon}>
                <div className={styles.ribbonItem}>
                  <div className={styles.ribbonHeader}>
                    <span className={styles.ribbonLabel}>TOTAL FLOWS</span>
                    <Icon icon="mdi:swap-horizontal" className={styles.ribbonIcon} />
                  </div>
                  <span className={styles.ribbonValue}>8.42M</span>
                  <span className={`${styles.ribbonSub} ${styles.trendUp}`}>
                    <Icon icon="mdi:trending-up" /> +12.4% <span className={styles.trendLabel}>vs last week</span>
                  </span>
                </div>
                <div className={styles.ribbonItem}>
                  <div className={styles.ribbonHeader}>
                    <span className={styles.ribbonLabel}>AVG THROUGHPUT</span>
                    <Icon icon="mdi:speedometer" className={styles.ribbonIcon} />
                  </div>
                  <span className={styles.ribbonValue}>154.8 <small>Mbps</small></span>
                  <span className={`${styles.ribbonSub} ${styles.trendDown}`}>
                    <Icon icon="mdi:trending-down" /> -2.1% <span className={styles.trendLabel}>steady</span>
                  </span>
                </div>
                <div className={styles.ribbonItem}>
                  <div className={styles.ribbonHeader}>
                    <span className={styles.ribbonLabel}>ACTIVE SESSIONS</span>
                    <Icon icon="mdi:connection" className={styles.ribbonIcon} />
                  </div>
                  <span className={styles.ribbonValue}>1,248</span>
                  <span className={`${styles.ribbonSub} ${styles.trendUp}`}>
                    <Icon icon="mdi:trending-up" /> +5.7% <span className={styles.trendLabel}>peak load</span>
                  </span>
                </div>
                <div className={styles.ribbonItem}>
                  <div className={styles.ribbonHeader}>
                    <span className={styles.ribbonLabel}>UNIQUE ASSETS</span>
                    <Icon icon="mdi:server-network" className={styles.ribbonIcon} />
                  </div>
                  <span className={styles.ribbonValue}>429</span>
                  <span className={styles.ribbonSub}>
                    <span className={styles.statusDot} /> MONITORING ACTIVE
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Section 1: Traffic Distribution Analysis */}
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
                      {APP_DATA.map((item, idx) => (
                        <div key={idx} className={styles.detailItem}>
                          <div className={styles.detailLabel}>
                            <div className={styles.colorIndicator} style={{ backgroundColor: item.color }} />
                            {item.name}
                          </div>
                          <div className={styles.detailValue}>{item.value}%</div>
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
                    {[
                      { icon: 'mdi:shield-alert', title: 'Top Port: 443 (HTTPS)', val: '64.2%' },
                      { icon: 'mdi:account-network', title: 'User: admin-ops', val: 'Low Latency' },
                      { icon: 'mdi:map-marker-radius', title: 'Region: AS-East', val: '12ms Avg' },
                    ].map((item, idx) => (
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
                <div className={styles.insightBlock}>
                  <div className={styles.insightHeader}>
                    <Icon icon="mdi:alert-circle-outline" /> High UDP Activity
                  </div>
                  <p className={styles.insightText}>Unusual spike in UDP traffic detected from Subnet 172.16.x. Potential streaming or DDoS pattern.</p>
                  <div className={styles.insightMeta}>DETECTED: 12 MIN AGO</div>
                </div>
                <div className={styles.insightBlock}>
                   <div className={styles.insightHeader}>
                    <Icon icon="mdi:chart-bell-curve" /> Normalizing Trend
                  </div>
                  <p className={styles.insightText}>Throughput on Interface Index-4 has returned to baseline after a 48-hour peak period.</p>
                  <div className={styles.insightMeta}>DETECTED: 1 HOUR AGO</div>
                </div>
                <div className={styles.insightBlock}>
                   <div className={styles.insightHeader}>
                    <Icon icon="mdi:shield-check-outline" /> Safe Protocols
                  </div>
                  <p className={styles.insightText}>98% of total volume is currently encrypted via TLS 1.3 or higher. Network security is optimal.</p>
                  <div className={styles.insightMeta}>STATUS: HEALTHY</div>
                </div>
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
