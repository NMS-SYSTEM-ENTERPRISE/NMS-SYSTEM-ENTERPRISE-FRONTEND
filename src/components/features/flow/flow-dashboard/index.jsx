import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

// Generate mock data for charts
const generateTimeSeriesData = (count, min, max) => {
  const data = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - (count - i) * 60000);
    // Add some randomness and a sine wave for "neat" look
    const value =
      min +
      Math.random() * (max - min) * 0.5 +
      (Math.sin(i / 5) * (max - min)) * 0.25;
    data.push({
      time,
      value: Math.max(min, value), // Ensure no negative values if min is 0
    });
  }
  return data;
};

// Mock data for applications
const APPLICATIONS = [
  { name: 'HTTPS', size: 71.81, color: '#06b6d4' },
  { name: 'steam', size: 2.57, color: '#10b981' },
  { name: 'xns-mail', size: 2, color: '#eab308' },
  { name: 'ntp', size: 1.72, color: '#f97316' },
  { name: 'pipe', size: 1.72, color: '#ef4444' },
  { name: 'http-rpc-epmap', size: 1.72, color: '#a855f7' },
];

const SUMMARY_DATA = [
  {
    sourceIp: '192.168.1.64',
    destinationIp: '192.168.1.140',
    application: 'HTTPS',
    volumeBytesSum: '585.94 KB',
    ingressVolumeBytesSum: '585.94 KB',
    egressVolumeBytesSum: '0 Bytes',
  },
  {
    sourceIp: '192.168.1.220',
    destinationIp: '192.168.1.3',
    application: 'sntp-heartbeat',
    volumeBytesSum: '292.97 KB',
    ingressVolumeBytesSum: '292.97 KB',
    egressVolumeBytesSum: '0 Bytes',
  },
  {
    sourceIp: '192.168.1.209',
    destinationIp: '192.168.1.253',
    application: 'maplestory',
    volumeBytesSum: '292.97 KB',
    ingressVolumeBytesSum: '292.97 KB',
    egressVolumeBytesSum: '0 Bytes',
  },
  {
    sourceIp: '192.168.1.17',
    destinationIp: '192.168.1.165',
    application: 'HTTPS',
    volumeBytesSum: '292.97 KB',
    ingressVolumeBytesSum: '292.97 KB',
    egressVolumeBytesSum: '0 Bytes',
  },
];

export const FlowDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    realtime: true,
    distribution: true,
    conversations: true,
    protocols: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const eventsPerSecondChartRef = useRef(null);
  const flowEventsChartRef = useRef(null);
  const flowVolumeChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const protocolsChartRef = useRef(null);
  const eventsPerSecondChartInstance = useRef(null);
  const flowEventsChartInstance = useRef(null);
  const flowVolumeChartInstance = useRef(null);
  const pieChartInstance = useRef(null);
  const protocolsChartInstance = useRef(null);

  const [eventsPerSecondData] = useState(() => generateTimeSeriesData(60, 0.5, 1.5));
  const [flowEventsData] = useState(() => generateTimeSeriesData(60, 1.2, 2.5));
  const [flowVolumeData] = useState(() => generateTimeSeriesData(60, 150, 300));

  useEffect(() => {
    drawLineCharts();
    drawPieChart();
    drawProtocolsChart();

    const handleResize = () => {
      eventsPerSecondChartInstance.current?.resize();
      flowEventsChartInstance.current?.resize();
      flowVolumeChartInstance.current?.resize();
      pieChartInstance.current?.resize();
      protocolsChartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      eventsPerSecondChartInstance.current?.dispose();
      flowEventsChartInstance.current?.dispose();
      flowVolumeChartInstance.current?.dispose();
      pieChartInstance.current?.dispose();
      protocolsChartInstance.current?.dispose();
    };
  }, [expandedSections]);

  const getCommonChartOption = (data, color, title) => {
    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(11, 15, 25, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        textStyle: { color: '#f3f4f6', fontSize: 11 },
        padding: [8, 12],
        formatter: (params) => {
          const item = params[0];
          return `<div style="font-family: 'JetBrains Mono', monospace;">
            <div style="color: #9ca3af; margin-bottom: 4px;">${item.name}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background-color: ${color}"></span>
              <span style="font-weight: 600; color: #f3f4f6;">${item.value.toFixed(2)}</span>
            </div>
          </div>`;
        },
      },
      grid: { left: '2%', right: '2%', top: '10', bottom: '0', containLabel: false },
      xAxis: { type: 'category', data: data.map(d => d.time.toLocaleTimeString()), show: false },
      yAxis: { type: 'value', show: false },
      series: [{
        name: title,
        type: 'line',
        data: data.map((d) => d.value),
        smooth: true,
        showSymbol: false,
        lineStyle: { color: color, width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: color },
            { offset: 1, color: 'rgba(0,0,0,0)' },
          ]),
          opacity: 0.1,
        },
      }],
    };
  };

  const drawLineCharts = () => {
    if (eventsPerSecondChartRef.current) {
      if (eventsPerSecondChartInstance.current) eventsPerSecondChartInstance.current.dispose();
      const chart = echarts.init(eventsPerSecondChartRef.current);
      eventsPerSecondChartInstance.current = chart;
      chart.setOption(getCommonChartOption(eventsPerSecondData, '#22d3ee', 'Events/Sec'));
    }
    if (flowEventsChartRef.current) {
      if (flowEventsChartInstance.current) flowEventsChartInstance.current.dispose();
      const chart = echarts.init(flowEventsChartRef.current);
      flowEventsChartInstance.current = chart;
      chart.setOption(getCommonChartOption(flowEventsData, '#c084fc', 'Flow Events'));
    }
    if (flowVolumeChartRef.current) {
      if (flowVolumeChartInstance.current) flowVolumeChartInstance.current.dispose();
      const chart = echarts.init(flowVolumeChartRef.current);
      flowVolumeChartInstance.current = chart;
      chart.setOption(getCommonChartOption(flowVolumeData, '#f43f5e', 'Flow Volume'));
    }
  };

  const drawPieChart = () => {
    if (!pieChartRef.current) return;
    if (pieChartInstance.current) pieChartInstance.current.dispose();
    const chart = echarts.init(pieChartRef.current);
    pieChartInstance.current = chart;
    chart.setOption({
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: ['60%', '85%'],
        center: ['50%', '50%'],
        itemStyle: { borderRadius: 4, borderColor: '#0b0f19', borderWidth: 2 },
        label: { show: false },
        data: APPLICATIONS.map(app => ({ value: app.size, name: app.name, itemStyle: { color: app.color } })),
      }],
    });
  };

  const drawProtocolsChart = () => {
    if (!protocolsChartRef.current) return;
    if (protocolsChartInstance.current) protocolsChartInstance.current.dispose();
    const chart = echarts.init(protocolsChartRef.current);
    protocolsChartInstance.current = chart;
    chart.setOption({
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: ['60%', '85%'],
        center: ['50%', '50%'],
        itemStyle: { borderRadius: 4, borderColor: '#0b0f19', borderWidth: 2 },
        label: { show: false },
        data: [
          { name: 'HTTPS', value: 60, itemStyle: { color: '#22d3ee' } },
          { name: 'HTTP', value: 25, itemStyle: { color: '#c084fc' } },
          { name: 'FTP', value: 10, itemStyle: { color: '#f43f5e' } },
          { name: 'SSH', value: 5, itemStyle: { color: '#3b82f6' } },
        ],
      }],
    });
  };

  const filteredSummary = SUMMARY_DATA.filter(
    (item) =>
      item.sourceIp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destinationIp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.application.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.dashboard}>
      {/* Accordion Container */}
      <div className={styles.accordionContainer}>
        {/* Section 0: Real-time Live Analytics */}
        <div className={styles.accordion}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('realtime')}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper} style={{ color: '#22d3ee' }}>
                <Icon icon="mdi:pulse" width={20} />
              </div>
              <span className={styles.headerTitle}>Real-time Analytics <span className={styles.badge}>LIVE</span></span>
            </div>
            <Icon icon="mdi:chevron-down" className={`${styles.chevron} ${expandedSections.realtime ? styles.chevronOpen : ''}`} />
          </div>
          {expandedSections.realtime && (
            <div className={styles.accordionContent}>
              <div className={styles.timelineSection}>
                <div className={styles.timelineMetric}>
                  <div className={styles.metricInfo}>
                    <span className={styles.metricLabel}>EVENTS / SEC</span>
                    <span className={styles.metricVal} style={{ color: '#22d3ee' }}>1.24</span>
                  </div>
                  <div className={styles.sparklineBody}>
                    <div ref={eventsPerSecondChartRef} className={styles.miniChart} />
                  </div>
                </div>
                <div className={styles.timelineMetric}>
                  <div className={styles.metricInfo}>
                    <span className={styles.metricLabel}>FLOW EVENTS</span>
                    <span className={styles.metricVal} style={{ color: '#c084fc' }}>1.67K</span>
                  </div>
                  <div className={styles.sparklineBody}>
                    <div ref={flowEventsChartRef} className={styles.miniChart} />
                  </div>
                </div>
                <div className={styles.timelineMetric}>
                  <div className={styles.metricInfo}>
                    <span className={styles.metricLabel}>FLOW VOLUME</span>
                    <span className={styles.metricVal} style={{ color: '#f43f5e' }}>611.97KB</span>
                  </div>
                  <div className={styles.sparklineBody}>
                    <div ref={flowVolumeChartRef} className={styles.miniChart} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 1: Traffic Distribution */}
        <div className={styles.accordion}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('distribution')}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper}>
                <Icon icon="mdi:chart-arc" width={20} />
              </div>
              <span className={styles.headerTitle}>Traffic Distribution <span className={styles.badge}>ANALYTICS</span></span>
            </div>
            <Icon icon="mdi:chevron-down" className={`${styles.chevron} ${expandedSections.distribution ? styles.chevronOpen : ''}`} />
          </div>
          {expandedSections.distribution && (
            <div className={styles.accordionContent}>
              <div className={styles.distributionGrid}>
                <div className={styles.distributionCard}>
                  <span className={styles.subHeader}>APPLICATIONS</span>
                  <div className={styles.pieWrap}>
                    <div ref={pieChartRef} className={styles.pieChart} />
                    <div className={styles.customLegend}>
                      {APPLICATIONS.map(app => (
                        <div key={app.name} className={styles.legendRow}>
                          <div className={styles.legendColor} style={{ background: app.color }} />
                          <span className={styles.legendName}>{app.name}</span>
                          <span className={styles.legendVal}>{app.size}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.distributionCard}>
                  <span className={styles.subHeader}>PROTOCOLS</span>
                  <div className={styles.pieWrap}>
                    <div ref={protocolsChartRef} className={styles.pieChart} />
                    <div className={styles.customLegend}>
                      <div className={styles.legendRow}><div className={styles.legendColor} style={{ background: '#22d3ee' }} /><span className={styles.legendName}>HTTPS</span><span className={styles.legendVal}>60%</span></div>
                      <div className={styles.legendRow}><div className={styles.legendColor} style={{ background: '#c084fc' }} /><span className={styles.legendName}>HTTP</span><span className={styles.legendVal}>25%</span></div>
                      <div className={styles.legendRow}><div className={styles.legendColor} style={{ background: '#f43f5e' }} /><span className={styles.legendName}>FTP</span><span className={styles.legendVal}>10%</span></div>
                      <div className={styles.legendRow}><div className={styles.legendColor} style={{ background: '#3b82f6' }} /><span className={styles.legendName}>SSH</span><span className={styles.legendVal}>5%</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Top Conversations */}
        <div className={styles.accordion}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('conversations')}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper}>
                <Icon icon="mdi:swap-horizontal" width={20} />
              </div>
              <span className={styles.headerTitle}>Top Conversations <span className={styles.badge}>SUMMARY</span></span>
            </div>
            <Icon icon="mdi:chevron-down" className={`${styles.chevron} ${expandedSections.conversations ? styles.chevronOpen : ''}`} />
          </div>
          {expandedSections.conversations && (
            <div className={styles.accordionContent}>
              <div className={styles.premiumTable}>
                <div className={styles.tableHeaderRow}>
                  <span>SOURCE IP</span>
                  <span>DESTINATION IP</span>
                  <span>APPLICATION</span>
                  <span>VOLUME</span>
                  <span>INGRESS</span>
                  <span>EGRESS</span>
                </div>
                <div className={styles.tableBodyScroll}>
                  {filteredSummary.map((item, i) => (
                    <div key={i} className={styles.premiumRow}>
                      <span className={styles.accentText}>{item.sourceIp}</span>
                      <span className={styles.accentText}>{item.destinationIp}</span>
                      <span className={styles.tagBadge}>{item.application}</span>
                      <span className={styles.monoText}>{item.volumeBytesSum}</span>
                      <span className={styles.monoText}>{item.ingressVolumeBytesSum}</span>
                      <span className={styles.monoText}>{item.egressVolumeBytesSum}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Protocol Statistics */}
        <div className={styles.accordion}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('protocols')}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper}>
                <Icon icon="mdi:chart-timeline-variant-shimmer" width={20} />
              </div>
              <span className={styles.headerTitle}>Protocol Statistics <span className={styles.badge}>DENSITY</span></span>
            </div>
            <Icon icon="mdi:chevron-down" className={`${styles.chevron} ${expandedSections.protocols ? styles.chevronOpen : ''}`} />
          </div>
          {expandedSections.protocols && (
            <div className={styles.accordionContent}>
              <div className={styles.protocolWorkspace}>
                {/* Detailed Stats Grid */}
                <div className={styles.protocolStatsGrid}>
                  {[
                    { name: 'HTTPS', vol: '1.2 GB', p: '60%', flows: '850K', color: '#22d3ee', icon: 'mdi:lock-outline' },
                    { name: 'HTTP', vol: '500 MB', p: '25%', flows: '350K', color: '#c084fc', icon: 'mdi:web' },
                    { name: 'FTP', vol: '200 MB', p: '10%', flows: '120K', color: '#f43f5e', icon: 'mdi:folder-swap-outline' },
                    { name: 'SSH', vol: '100 MB', p: '5%', flows: '50K', color: '#3b82f6', icon: 'mdi:terminal' },
                  ].map((s, i) => (
                    <div key={i} className={styles.protocolTile}>
                      <div className={styles.tileHeader}>
                        <div className={styles.tileIcon} style={{ color: s.color }}>
                          <Icon icon={s.icon} width={18} />
                        </div>
                        <span className={styles.tileName}>{s.name}</span>
                        <span className={styles.tilePercent} style={{ color: s.color }}>{s.p}</span>
                      </div>
                      <div className={styles.tileBody}>
                        <div className={styles.tileValue}>{s.vol}</div>
                        <div className={styles.tileSubText}>{s.flows} Flows</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
