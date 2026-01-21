import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import styles from './trap-dashboard.module.css';

const Accordion = ({ title, icon, badge, isOpen, onToggle, children }) => (
  <div className={styles.accordion}>
    <div className={styles.accordionHeader} onClick={onToggle}>
      <div className={styles.headerLeft}>
        <div className={styles.iconWrapper}>
          <Icon icon={icon} width={20} />
        </div>
        <span className={styles.headerTitle}>
          {title} {badge && <span className={styles.badge}>{badge}</span>}
        </span>
      </div>
      <Icon 
        icon="mdi:chevron-down" 
        className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} 
      />
    </div>
    {isOpen && <div className={styles.accordionContent}>{children}</div>}
  </div>
);

const TrapDashboard = () => {
  const volumeChartRef = useRef(null);
  const severityChartRef = useRef(null);
  const volumeChartInstance = useRef(null);
  const severityChartInstance = useRef(null);

  const [expandedSections, setExpandedSections] = useState({
    summary: true,
    trends: true,
    sources: true,
    activity: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    if (expandedSections.trends) {
      drawTrendCharts();
    }

    const handleResize = () => {
      volumeChartInstance.current?.resize();
      severityChartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      volumeChartInstance.current?.dispose();
      severityChartInstance.current?.dispose();
    };
  }, [expandedSections.trends]);

  const drawTrendCharts = () => {
    if (volumeChartRef.current) {
      if (volumeChartInstance.current) volumeChartInstance.current.dispose();
      const chart = echarts.init(volumeChartRef.current);
      volumeChartInstance.current = chart;
      
      chart.setOption({
        backgroundColor: 'transparent',
        tooltip: { 
          trigger: 'axis',
          backgroundColor: '#0b0f19',
          borderColor: 'rgba(255,255,255,0.1)',
          textStyle: { color: '#f3f4f6', fontSize: 11 }
        },
        grid: { left: '0%', right: '0%', bottom: '0%', top: '10%', containLabel: true },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
          axisLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
          axisLabel: { color: '#94a3b8', fontSize: 10 }
        },
        yAxis: {
          type: 'value',
          splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } },
          axisLabel: { color: '#94a3b8', fontSize: 10 }
        },
        series: [{
          name: 'Traps',
          type: 'line',
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 2, color: '#22d3ee' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(34, 211, 238, 0.15)' },
              { offset: 1, color: 'transparent' }
            ])
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        }]
      });
    }

    if (severityChartRef.current) {
      if (severityChartInstance.current) severityChartInstance.current.dispose();
      const chart = echarts.init(severityChartRef.current);
      severityChartInstance.current = chart;

      chart.setOption({
        tooltip: { trigger: 'item' },
        series: [{
          name: 'Severity',
          type: 'pie',
          radius: ['60%', '85%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 4, borderColor: '#0b0f19', borderWidth: 2 },
          label: { show: false },
          data: [
            { value: 1048, name: 'Critical', itemStyle: { color: '#ef4444' } },
            { value: 735, name: 'Major', itemStyle: { color: '#f97316' } },
            { value: 580, name: 'Minor', itemStyle: { color: '#eab308' } },
            { value: 484, name: 'Warning', itemStyle: { color: '#3b82f6' } },
            { value: 300, name: 'Info', itemStyle: { color: '#10b981' } }
          ]
        }]
      });
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.accordionContainer}>
        {/* Section 1: Operational Summary */}
        <Accordion 
          title="Operational Summary" 
          icon="mdi:view-dashboard-variant-outline"
          badge="HEALTHY"
          isOpen={expandedSections.summary}
          onToggle={() => toggleSection('summary')}
        >
          <div className={styles.metricGrid}>
            <div className={styles.metricTile}>
              <span className={styles.metricLabel}>CRITICAL TRAPS</span>
              <span className={styles.metricVal} style={{ color: '#ef4444' }}>1,048</span>
            </div>
            <div className={styles.metricTile}>
              <span className={styles.metricLabel}>MAJOR TRAPS</span>
              <span className={styles.metricVal} style={{ color: '#f97316' }}>735</span>
            </div>
            <div className={styles.metricTile}>
              <span className={styles.metricLabel}>TOTAL EVENTS</span>
              <span className={styles.metricVal} style={{ color: '#22d3ee' }}>3,147</span>
            </div>
            <div className={styles.metricTile}>
              <span className={styles.metricLabel}>ACK RATE</span>
              <span className={styles.metricVal} style={{ color: '#10b981' }}>98.2%</span>
            </div>
          </div>
        </Accordion>

        {/* Section 2: Trends & Severity */}
        <Accordion 
          title="Trap Trends & Severity" 
          icon="mdi:chart-timeline-variant"
          badge="ANALYTICS"
          isOpen={expandedSections.trends}
          onToggle={() => toggleSection('trends')}
        >
          <div className={styles.distributionGrid}>
            <div className={styles.distributionCard}>
              <span className={styles.subHeader}>VOLUME (24H)</span>
              <div ref={volumeChartRef} className={styles.mainChart} />
            </div>
            <div className={styles.distributionCard}>
              <span className={styles.subHeader}>SEVERITY DISTRIBUTION</span>
              <div className={styles.chartWrap}>
                <div ref={severityChartRef} className={styles.pieChart} />
                <div className={styles.customLegend}>
                  {[
                    { name: 'Critical', color: '#ef4444', val: '33%' },
                    { name: 'Major', color: '#f97316', val: '23%' },
                    { name: 'Minor', color: '#eab308', val: '18%' },
                    { name: 'Warning', color: '#3b82f6', val: '15%' },
                    { name: 'Info', color: '#10b981', val: '11%' },
                  ].map(item => (
                    <div key={item.name} className={styles.legendRow}>
                      <div className={styles.legendColor} style={{ background: item.color }} />
                      <span className={styles.legendName}>{item.name}</span>
                      <span className={styles.legendVal}>{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Accordion>

        {/* Section 3: Top Sources */}
        <Accordion 
          title="Top Trap Sources" 
          icon="mdi:ip-network"
          badge="INTELLIGENCE"
          isOpen={expandedSections.sources}
          onToggle={() => toggleSection('sources')}
        >
          <div className={styles.sourceGrid}>
            {[
              { ip: '192.168.1.1', count: 320, pct: 85 },
              { ip: '10.0.0.5', count: 284, pct: 72 },
              { ip: '172.16.0.1', count: 215, pct: 60 },
              { ip: '192.168.1.100', count: 180, pct: 45 },
              { ip: '10.0.0.1', count: 142, pct: 30 },
              { ip: '172.16.10.50', count: 98, pct: 20 },
            ].map((src, i) => (
              <div key={i} className={styles.sourceTile}>
                <div className={styles.sourceHeader}>
                  <span className={styles.sourceIP}>{src.ip}</span>
                  <span className={styles.sourceCount}>{src.count}</span>
                </div>
                <div className={styles.sourceBar}>
                  <div className={styles.sourceProgress} style={{ width: `${src.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Accordion>

        {/* Section 4: Incident Stream */}
        <Accordion 
          title="Incident Stream" 
          icon="mdi:history"
          badge="LIVE"
          isOpen={expandedSections.activity}
          onToggle={() => toggleSection('activity')}
        >
          <div className={styles.timeline}>
            {[
              { title: 'BGP Session Down', time: '12:04:22', desc: 'Neighbor relationship lost with 10.255.0.1 on Core-Switch-01', sev: '#ef4444', node: 'Core-SW-01' },
              { title: 'Link Flap Detected', time: '11:58:10', desc: 'Interface TenGigabitEthernet 1/0/1 transition to DOWN state', sev: '#f97316', node: 'Edge-Router-02' },
              { title: 'Threshold Violation', time: '11:45:30', desc: 'CPU usage exceeded 95% threshold for sustained period', sev: '#eab308', node: 'Auth-Server-05' },
              { title: 'Configuration Change', time: '11:32:15', desc: 'New trap community string updated via SNMP write request', sev: '#3b82f6', node: 'Gateway-01' },
            ].map((item, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineNode} style={{ borderColor: item.sev }} />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <span className={styles.timelineTitle}>{item.title}</span>
                    <span className={styles.timelineTime}>{item.time}</span>
                  </div>
                  <div className={styles.timelineDesc}>{item.desc}</div>
                  <div className={styles.timelineMeta}>
                    <span className={styles.tag}>Node: {item.node}</span>
                    <span className={styles.tag}>PDU-ID: #82{i}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default TrapDashboard;
