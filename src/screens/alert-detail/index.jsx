"use client";
import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

const AccordionSection = ({ title, icon, badge, isOpen, onToggle, children }) => (
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

const AlertDetail = () => {
  const router = useRouter();
  const { alertId } = useParams();
  const [openSections, setOpenSections] = useState({
    summary: true,
    intelligence: true,
    analytics: true,
    history: true
  });

  const trendChartRef = useRef(null);
  const countChartRef = useRef(null);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Mock alert data
  const alertData = {
    title: 'Very Low or No Flow Detected',
    alertId: alertId || '10000000000101',
    metric: 'network.interface.flows',
    triggerCondition: 'metric.value <= 5.0 (Static Threshold)',
    severity: 'CRITICAL',
    count: '1,256',
    duration: '2d 14h 22m',
    firstSeen: 'Tue, Sep 19, 2023 04:18:39 PM',
    lastSeen: 'Thu, Sep 28, 2023 04:15:15 PM',
    monitor: 'cisco-catalyst-core-01',
    instance: 'GigabitEthernet1/0/1',
    category: 'Network Availability'
  };

  const historyItems = [
    { timestamp: '09/28/2023 04:16:16 PM', message: 'Flow rate dropped below critical threshold (5 flows/sec). Current: 2.1 flows/sec.' },
    { timestamp: '09/28/2023 04:15:15 PM', message: 'Alert state transitioned from WARNING to CRITICAL.' },
    { timestamp: '09/28/2023 04:14:17 PM', message: 'Low flow detected. Manual check required on Gi1/0/1.' },
    { timestamp: '09/28/2023 04:13:16 PM', message: 'Polling cycle complete. Metric remains in violation.' },
    { timestamp: '09/28/2023 04:12:15 PM', message: 'Initial alarm generation. Policy: Low Flow Correlation.' },
  ];

  useEffect(() => {
    if (openSections.analytics) {
      initCharts();
    }
  }, [openSections.analytics]);

  const initCharts = () => {
    if (trendChartRef.current) {
      const chart = echarts.init(trendChartRef.current);
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#0b0f19',
          borderColor: 'rgba(255,255,255,0.1)',
          textStyle: { color: '#f3f4f6', fontSize: 11 }
        },
        grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['18:00', '21:00', '00:00', '03:00', '06:00', '09:00', '12:00'],
          axisLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
          axisLabel: { color: '#94a3b8', fontSize: 10 }
        },
        yAxis: {
          type: 'value',
          splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } },
          axisLabel: { color: '#94a3b8', fontSize: 10 }
        },
        series: [{
          name: 'Flow Value',
          type: 'line',
          smooth: true,
          showSymbol: false,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(6, 182, 212, 0.2)' },
              { offset: 1, color: 'rgba(6, 182, 212, 0)' }
            ])
          },
          itemStyle: { color: '#06b6d4' },
          data: [15, 12, 4, 3, 2, 5, 4]
        }, {
          name: 'Threshold',
          type: 'line',
          step: 'start',
          lineStyle: { type: 'dashed', color: '#ef4444', opacity: 0.5 },
          data: [5, 5, 5, 5, 5, 5, 5]
        }]
      });
    }

    if (countChartRef.current) {
      const chart = echarts.init(countChartRef.current);
      chart.setOption({
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
        xAxis: {
          type: 'category',
          data: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          axisLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
          axisLabel: { color: '#94a3b8', fontSize: 10 }
        },
        yAxis: {
          type: 'value',
          splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } },
          axisLabel: { color: '#94a3b8', fontSize: 10 }
        },
        series: [{
          type: 'bar',
          barWidth: '20%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#fb7185' },
              { offset: 1, color: '#e11d48' }
            ]),
            borderRadius: [4, 4, 0, 0]
          },
          data: [120, 200, 150, 80, 70, 110, 130]
        }]
      });
    }
  };

  return (
    <div className={styles.alertDetail}>
      {/* Premium Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => router.push('/alerts')}>
            <Icon icon="mdi:arrow-left" width={20} />
          </button>
          <div className={styles.titleSection}>
            <span className={styles.severityBadge}>{alertData.severity}</span>
            <h1 className={styles.title}>{alertData.title}</h1>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className={styles.backBtn} title="Acknowledge"><Icon icon="mdi:check-circle" width={18} /></button>
            <button className={styles.backBtn} title="Assign"><Icon icon="mdi:account-plus" width={18} /></button>
            <button className={styles.backBtn} title="Silence"><Icon icon="mdi:bell-off" width={18} /></button>
            <button className={styles.backBtn} title="History"><Icon icon="mdi:clock-history" width={18} /></button>
          </div>
        </div>
      </header>

      <div className={styles.contentArea}>
        <div className={styles.accordionContainer}>
          {/* Section 1: Operational Summary */}
          <AccordionSection 
            title="Operational Summary" 
            icon="mdi:pulse"
            badge="LIVE"
            isOpen={openSections.summary}
            onToggle={() => toggleSection('summary')}
          >
            <div className={styles.statsRow}>
              <div className={styles.metricTile}>
                <span className={styles.metricLabel}>ID</span>
                <span className={styles.metricValue}>{alertData.alertId}</span>
              </div>
              <div className={styles.metricTile}>
                <span className={styles.metricLabel}>STATUS</span>
                <span className={styles.metricValue} style={{color: '#ef4444'}}>ACTIVE</span>
              </div>
              <div className={styles.metricTile}>
                <span className={styles.metricLabel}>OCCURRENCES</span>
                <span className={styles.metricValue}>{alertData.count}</span>
              </div>
              <div className={styles.metricTile}>
                <span className={styles.metricLabel}>DURATION</span>
                <span className={styles.metricValue}>{alertData.duration}</span>
              </div>
            </div>
          </AccordionSection>

          {/* Section 2: Intelligence Mapping */}
          <AccordionSection 
            title="Intelligence mapping & metadata" 
            icon="mdi:brain"
            badge="CONTEXT"
            isOpen={openSections.intelligence}
            onToggle={() => toggleSection('intelligence')}
          >
            <div className={styles.intelGrid}>
              <div className={styles.intelSection}>
                <span className={styles.intelTitle}>TECHNICAL CONTEXT</span>
                <div className={styles.metaGrid}>
                  <div className={styles.metaItem}><span className={styles.metaLabel}>Source Metric</span><span className={styles.metaValue}>{alertData.metric}</span></div>
                  <div className={styles.metaItem}><span className={styles.metaLabel}>Trigger Condition</span><span className={styles.metaValue}>{alertData.triggerCondition}</span></div>
                  <div className={styles.metaItem}><span className={styles.metaLabel}>Monitor Entity</span><span className={styles.metaValue}>{alertData.monitor}</span></div>
                  <div className={styles.metaItem}><span className={styles.metaLabel}>Component</span><span className={styles.metaValue}>{alertData.instance}</span></div>
                </div>
              </div>
              <div className={styles.intelSection}>
                <span className={styles.intelTitle}>METADATA & TAGS</span>
                <div className={styles.metaGrid}>
                  <div className={styles.metaItem}><span className={styles.metaLabel}>Environment Zone</span><span className={styles.metaValue}>Production-NOC</span></div>
                  <div className={styles.metaItem}><span className={styles.metaLabel}>Correlation ID</span><span className={styles.metaValue}>POL-992-X1</span></div>
                  <div className={styles.metaItem}><span className={styles.metaLabel}>Assignment Group</span><span className={styles.metaValue}>L2_Network_Support</span></div>
                  <div className={styles.metaItem}><span className={styles.metaLabel}>App Business Unit</span><span className={styles.metaValue}>FinTech_Operations</span></div>
                </div>
              </div>
            </div>
          </AccordionSection>

          {/* Section 3: Visual Analytics */}
          <AccordionSection 
            title="Statistical Trend Analytics" 
            icon="mdi:chart-areaspline"
            badge="VISUALS"
            isOpen={openSections.analytics}
            onToggle={() => toggleSection('analytics')}
          >
            <div className={styles.analyticsRow}>
              <div className={styles.chartContainer}>
                <span className={styles.chartName}>Vulnerability Trend (24H)</span>
                <div ref={trendChartRef} style={{ width: '100%', height: '240px' }} />
              </div>
              <div className={styles.chartContainer}>
                <span className={styles.chartName}>Violation Distribution</span>
                <div ref={countChartRef} style={{ width: '100%', height: '240px' }} />
              </div>
            </div>
          </AccordionSection>

          {/* Section 4: Incident Timeline */}
          <AccordionSection 
            title="Incident Response Timeline" 
            icon="mdi:history"
            badge="AUDIT"
            isOpen={openSections.history}
            onToggle={() => toggleSection('history')}
          >
            <div className={styles.historyTimeline}>
              {historyItems.map((item, idx) => (
                <div key={idx} className={styles.historyNode}>
                  {/* Left Track - Timestamp */}
                  <div className={styles.timeTrack}>
                    <div className={styles.timelineMarker}>
                      <div className={styles.nodeDot} />
                      <div className={styles.timelinePulse} />
                    </div>
                    <span className={styles.nodeTime}>{item.timestamp}</span>
                  </div>
                  
                  {/* Right Track - Event Card */}
                  <div className={styles.eventCard}>
                    <div className={styles.eventHeader}>
                      <div className={styles.severityIndicator} />
                      <span className={styles.eventType}>
                        {idx === 0 ? 'THRESHOLD VIOLATION' : idx === 1 ? 'STATE TRANSITION' : idx === 2 ? 'MANUAL REVIEW' : 'POLLING CYCLE'}
                      </span>
                    </div>
                    <div className={styles.nodeMsg}>{item.message}</div>
                    <div className={styles.eventMeta}>
                      <span className={styles.metaBadge}>POLICY: LOW-FLOW-01</span>
                      <span className={styles.metaBadge}>SOURCE: SNMP-POLL</span>
                      {idx < 2 && <span className={styles.metaBadge}>ACTION: ESCALATE</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionSection>
        </div>
      </div>
    </div>
  );
};

export default AlertDetail;
