"use client";
import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

// --- MOCK DATA ---
const SLO_DETAILS = {
  1: {
    name: 'Monitor-SLO-Weekly-Perf-Windows',
    businessServiceName: 'Aashil Construction',
    status: 'Ok',
    frequency: 'Daily',
    type: 'Performance',
    sloMetric: 'system.memory.free.bytes',
    startDateTime: 'Thu, Aug 28, 2025 12:00:00 AM',
    elapsedTime: '19 hours 58 minutes 24 seconds',
    remainingTime: '4 hours 1 minute 36 seconds',
    achieved: 98.42,
    target: 90,
    violation: 0,
    errorBudgetLeft: 84.5,
    violatedTime: '0',
    acceptableViolationTime: '2 h 24 m',
    burnRate: '1.2x',
  }
};

const HISTORY_DATA = [
  { name: 'Period 2025/09/01 - 2025/09/07', target: 90, achieved: 100, status: 'Ok', sparkline: [100, 100, 95, 100, 100, 100, 100] },
  { name: 'Period 2025/08/25 - 2025/08/31', target: 90, achieved: 94.2, status: 'Ok', sparkline: [90, 92, 85, 95, 98, 100, 94] },
  { name: 'Period 2025/08/18 - 2025/08/24', target: 90, achieved: 82.5, status: 'Breached', sparkline: [80, 85, 75, 82, 88, 85, 82] },
  { name: 'Period 2025/08/11 - 2025/08/17', target: 90, achieved: 91.8, status: 'Warning', sparkline: [90, 88, 92, 95, 88, 90, 91] },
];

const MONITOR_DATA = [
  { name: 'WIN-SQLSVR2025', status: 'Healthy', availability: '99.98%' },
  { name: 'moduledata01928', status: 'Warning', availability: '97.45%' },
  { name: 'WIN-crmTempServ01U', status: 'Breached', availability: '84.22%' },
];

// --- SUB-COMPONENTS ---

const AccordionItem = ({ title, icon, isOpen, onToggle, children, badge, badgeColor }) => (
  <div className={styles.accordionItem} data-open={isOpen}>
    <div className={styles.accordionHeader} onClick={onToggle}>
      <div className={styles.headerLeft}>
        <div className={styles.iconWrapper}>
          <Icon icon={icon} width={20} />
        </div>
        <span className={styles.headerTitle}>{title}</span>
      </div>
      <div className={styles.headerRight}>
        {badge && (
          <span className={styles.statBadge} style={{ backgroundColor: badgeColor, border: `1px solid ${badgeColor}33` }}>
            {badge}
          </span>
        )}
        <Icon icon="ph:caret-down-bold" className={styles.chevron} width={16} />
      </div>
    </div>
    {isOpen && <div className={styles.accordionContent}>{children}</div>}
  </div>
);

const CircularGauge = ({ value, color, label }) => {
  const radius = 22;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={styles.gaugeItem}>
      <div className={styles.gaugeWrapper}>
        <svg width="60" height="60">
          <circle cx="30" cy="30" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
          <circle 
            cx="30" cy="30" r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} 
            strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
            transform="rotate(-90 30 30)"
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <span className={styles.gaugeText} style={{ color }}>{Math.round(value)}%</span>
      </div>
      <div className={styles.gaugeInfo}>
        <span className={styles.gaugeLabel}>{label}</span>
        <span className={styles.gaugeValue}>{value}% Achieved</span>
      </div>
    </div>
  );
};

const SLODetail = () => {
  const { sloId } = useParams();
  const router = useRouter();
  const [openSections, setOpenSections] = useState({
    overview: true,
    metrics: true,
    monitors: true,
    history: true
  });

  const trendChartRef = useRef(null);
  const burndownChartRef = useRef(null);
  const burnRateChartRef = useRef(null);
  const charts = useRef({});

  const sloData = SLO_DETAILS[sloId] || SLO_DETAILS[1];

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      initCharts();
    }, 200);

    const handleResize = () => {
      Object.values(charts.current).forEach(c => c?.resize());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Object.values(charts.current).forEach(c => c?.dispose());
    };
  }, [openSections, sloData]);

  const initCharts = () => {
    if (openSections.overview) drawTrendChart();
    if (openSections.metrics) {
       drawBurndownChart();
       drawBurnRateChart();
    }
  };

  const drawTrendChart = () => {
    if (!trendChartRef.current) return;
    if (charts.current.trend) charts.current.trend.dispose();
    const chart = echarts.init(trendChartRef.current);
    charts.current.trend = chart;

    const dataCount = 24;
    const times = Array.from({ length: dataCount + 4 }, (_, i) => `${String(i % 24).padStart(2, '0')}:00`);
    const values = Array.from({ length: dataCount }, () => parseFloat((92 + Math.random() * 7).toFixed(2)));
    const forecastValues = new Array(dataCount + 4).fill(null);
    forecastValues[dataCount - 1] = values[dataCount - 1];
    let lastVal = values[dataCount - 1];
    for (let i = 0; i < 4; i++) {
        lastVal = lastVal + (Math.random() - 0.5) * 1.2;
        forecastValues[dataCount + i] = parseFloat(Math.min(100, lastVal).toFixed(2));
    }

    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross', label: { backgroundColor: '#1f2937' } },
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        borderColor: '#374151',
        textStyle: { color: '#f3f4f6', fontSize: 11 },
        formatter: (params) => {
            let res = `<div style="font-weight:bold;margin-bottom:8px;color:#9ca3af;border-bottom:1px solid #374151;padding-bottom:4px">${params[0].axisValue}</div>`;
            params.forEach(param => {
                if (param.value !== null) {
                    res += `<div style="display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:4px">
                        <div style="display:flex;align-items:center;gap:8px">
                            <span style="width:8px;height:8px;border-radius:20%;background:${param.color}"></span>
                            <span style="color:#d1d5db">${param.seriesName}</span>
                        </div>
                        <span style="font-weight:bold;color:#fff">${param.value}%</span>
                    </div>`;
                }
            });
            return res;
        }
      },
      legend: { data: ['Current SLI', 'Forecast'], right: 0, top: 0, textStyle: { color: '#9ca3af', fontSize: 10 }, icon: 'rect', itemWidth: 12, itemHeight: 2 },
      grid: { left: 0, right: 10, top: 40, bottom: 20, containLabel: true },
      xAxis: { type: 'category', data: times, axisLabel: { color: '#6b7280', fontSize: 9 }, axisLine: { lineStyle: { color: '#1f2937' } }, boundaryGap: false },
      yAxis: { type: 'value', min: 85, max: 100, splitLine: { lineStyle: { color: '#1f2937', type: 'dashed' } }, axisLabel: { color: '#6b7280', fontSize: 9, formatter: '{value}%' } },
      series: [
        {
          name: 'Current SLI', type: 'line', smooth: true, showSymbol: false, data: values, lineStyle: { width: 3, color: '#06b6d4' },
          areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(6, 182, 212, 0.2)' }, { offset: 1, color: 'transparent' }]) },
          markLine: {
            symbol: 'none',
            data: [{ yAxis: sloData.target, name: 'Target' }],
            lineStyle: { color: '#f59e0b', type: 'dashed', opacity: 0.6 },
            label: { position: 'end', formatter: 'Target ({yAxis}%)', fontSize: 9, color: '#f59e0b' }
          }
        },
        {
          name: 'Forecast', type: 'line', smooth: true, showSymbol: false, data: forecastValues, lineStyle: { width: 2, type: 'dotted', color: '#8b5cf6' },
          areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(139, 92, 246, 0.1)' }, { offset: 1, color: 'transparent' }]) }
        }
      ]
    });
  };

  const drawBurndownChart = () => {
    if (!burndownChartRef.current) return;
    if (charts.current.burndown) charts.current.burndown.dispose();
    const chart = echarts.init(burndownChartRef.current);
    charts.current.burndown = chart;

    const dataCount = 12;
    const labels = Array.from({ length: dataCount }, (_, i) => `Day ${i + 1}`);
    const values = [100, 98, 95, 96, 92, 88, 85, 84, 80, 82, 78, 75];
    const ideal = labels.map((_, i) => (100 - (i * 100/dataCount)).toFixed(2));

    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: '#374151', textStyle: { color: '#fff', fontSize: 10 } },
      grid: { left: 5, right: 5, top: 10, bottom: 0, containLabel: true },
      xAxis: { type: 'category', data: labels, axisLabel: { color: '#6b7280', fontSize: 8 }, axisLine: { lineStyle: { color: '#1f2937' } } },
      yAxis: { type: 'value', splitLine: { show: false }, axisLabel: { color: '#6b7280', fontSize: 8 } },
      series: [
        { name: 'Ideal', type: 'line', data: ideal, symbol: 'none', lineStyle: { type: 'dashed', width: 1, color: '#4b5563' } },
        { name: 'Actual', type: 'line', smooth: true, data: values, symbol: 'none', lineStyle: { width: 2, color: '#10b981' }, areaStyle: { color: 'rgba(16, 185, 129, 0.1)' } }
      ]
    });
  };

  const drawBurnRateChart = () => {
    if (!burnRateChartRef.current) return;
    if (charts.current.burnrate) charts.current.burnrate.dispose();
    const chart = echarts.init(burnRateChartRef.current);
    charts.current.burnrate = chart;

    const data = [1.2, 0.8, 2.4, 4.5, 1.1, 0.9, 3.2, 1.4, 0.7, 1.2, 0.9, 1.1];
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: '#374151', textStyle: { color: '#fff', fontSize: 10 } },
      grid: { left: 5, right: 5, top: 10, bottom: 0, containLabel: true },
      xAxis: { type: 'category', data: Array.from({length:12}, (_,i)=>i), axisLabel: { show: false }, axisLine: { show: false } },
      yAxis: { type: 'value', splitLine: { show: false }, axisLabel: { show: false } },
      series: [
        { type: 'bar', data: data, itemStyle: { borderRadius: [2, 2, 0, 0], color: (p) => p.data > 3 ? '#ef4444' : '#6366f1' }, barWidth: '60%' }
      ]
    });
  };

  return (
    <div className={styles.sloDetail}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.push('/slo')}>
          <Icon icon="ph:arrow-left-bold" />
        </button>
        <h1 className={styles.title}>{sloData.name}</h1>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <span className={`${styles.statusBadge} ${styles[`status-${sloData.status}`]}`}>
            {sloData.status}
          </span>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.accordionContainer}>
          
          {/* SECTION 1: OVERVIEW */}
          <AccordionItem 
            title="Service Configuration & Trends" 
            icon="ph:info-bold" 
            isOpen={openSections.overview}
            onToggle={() => toggleSection('overview')}
            badge={sloData.type}
            badgeColor="#3b82f6"
          >
            <div className={styles.splitLayout}>
              <div className={styles.column}>
                <div className={styles.columnHeader}><Icon icon="ph:list-bullets-bold" /> SLO Details</div>
                <div className={styles.summaryColumn}>
                  {[
                    { label: 'Business Service', value: sloData.businessServiceName },
                    { label: 'Frequency', value: sloData.frequency },
                    { label: 'Metric', value: sloData.sloMetric },
                    { label: 'Elapsed', value: sloData.elapsedTime },
                    { label: 'Remaining', value: sloData.remainingTime },
                    { label: 'Burn Rate', value: sloData.burnRate }
                  ].map((item, idx) => (
                    <div key={idx} className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>{item.label}</span>
                      <span className={styles.summaryValue}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.verticalDivider}></div>
              <div className={styles.column}>
                <div className={styles.columnHeader}><Icon icon="ph:trend-up-bold" /> SLO Trend & Forecast (24h)</div>
                <div ref={trendChartRef} style={{ height: '220px', width: '100%' }} />
              </div>
            </div>
          </AccordionItem>

          {/* SECTION 2: PERFORMANCE & ERROR BUDGET */}
          <AccordionItem 
            title="Performance & Error Budget" 
            icon="ph:gauge-bold" 
            isOpen={openSections.metrics}
            onToggle={() => toggleSection('metrics')}
            badge={`${sloData.achieved}% Achieved`}
            badgeColor={sloData.achieved >= sloData.target ? '#10b981' : '#ef4444'}
          >
            <div className={styles.splitLayout}>
              {/* Left Col: Objective Achievement */}
              <div className={styles.column}>
                <div className={styles.columnHeader}><Icon icon="ph:chart-bar-bold" /> Objective Achievement</div>
                <div className={styles.gaugeGrid}>
                  {/* Achieved Card */}
                  <div className={styles.metricCard}>
                    <div className={styles.metricCardHeader}>
                      <span className={styles.metricCardLabel}>Current SLO Achieved</span>
                      <span className={`${styles.metricCardValue} ${sloData.achieved >= sloData.target ? 'text-success' : 'text-danger'}`} style={{ color: '#10b981' }}>
                        {sloData.achieved}%
                      </span>
                    </div>
                    <div className={styles.progressContainer}>
                      <div className={styles.progressFill} style={{ width: `${Math.min(sloData.achieved, 100)}%` }} />
                      <div className={styles.targetLine} style={{ left: `${sloData.target}%` }}>
                        <div className={styles.targetTooltip}>Target: {sloData.target}%</div>
                      </div>
                    </div>
                    <div className={styles.metricCardFooter}>
                       <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Violated</span>
                          <span className={styles.infoValue}>{sloData.violatedTime}</span>
                       </div>
                       <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Budget</span>
                          <span className={styles.infoValue}>2h 24m</span>
                       </div>
                    </div>
                  </div>

                  {/* Error Budget Card */}
                  <div className={styles.metricCard}>
                    <div className={styles.metricCardHeader}>
                      <span className={styles.metricCardLabel}>Error Budget Left</span>
                      <span className={styles.metricCardValue} style={{ color: '#8b5cf6' }}>{sloData.errorBudgetLeft}%</span>
                    </div>
                    <div className={styles.progressContainer}>
                      <div className={styles.progressFill} style={{ width: `${Math.max(0, sloData.errorBudgetLeft)}%`, background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' }} />
                    </div>
                    <div className={styles.metricCardFooter}>
                       <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Status</span>
                          <span className={styles.infoValue} style={{ color: '#10b981' }}>Within Budget</span>
                       </div>
                       <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Burn Rate</span>
                          <span className={styles.infoValue}>{sloData.burnRate}</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.verticalDivider}></div>

              {/* Right Col: Rate Analysis */}
              <div className={styles.column}>
                <div className={styles.columnHeader}><Icon icon="ph:activity-bold" /> Rate Analysis</div>
                <div className={styles.rateGrid}>
                   <div className={styles.rateCard}>
                      <div className={styles.rateCardHeader}><Icon icon="ph:chart-line-down-bold" /> Burndown</div>
                      <div style={{ flex: 1, width: '100%', minHeight: '120px' }} ref={burndownChartRef} />
                   </div>
                   <div className={styles.rateCard}>
                      <div className={styles.rateCardHeader}><Icon icon="ph:fire-bold" /> Burn Rate</div>
                      <div style={{ flex: 1, width: '100%', minHeight: '120px' }} ref={burnRateChartRef} />
                   </div>
                </div>
                <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '12px', background: 'transparent' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Icon icon="ph:info-bold" width={18} style={{ color: 'var(--color-accent-cyan)' }} />
                      <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0 }}>
                        Burn rate is calculated based on error budget consumption over the current window.
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </AccordionItem>

          {/* SECTION 3: INFRASTRUCTURE MONITORS */}
          <AccordionItem 
            title="Associated Infrastructure" 
            icon="ph:desktop-bold" 
            isOpen={openSections.monitors}
            onToggle={() => toggleSection('monitors')}
            badge={`${MONITOR_DATA.length} Monitors`}
            badgeColor="#f59e0b"
          >
            <div className={styles.timelineStrip}>
              {MONITOR_DATA.map((mon, idx) => (
                <div key={idx} className={styles.historyRow}>
                  <div className={styles.iconWrapper} style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                    <Icon icon="ph:monitor-bold" width={18} />
                  </div>
                  <div className={styles.historyInfo}>
                    <span className={styles.historyTitle}>{mon.name}</span>
                    <span className={styles.historySub}>System Performance Monitor</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                       <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{mon.availability}</div>
                       <div style={{ fontSize: '9px', color: 'var(--color-text-muted)' }}>AVAILABILITY</div>
                    </div>
                    <span className={styles.statusBadge} style={{ 
                      backgroundColor: mon.status === 'Healthy' ? 'rgba(16,185,129,0.1)' : (mon.status === 'Warning' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)'),
                      color: mon.status === 'Healthy' ? '#10b981' : (mon.status === 'Warning' ? '#f59e0b' : '#ef4444')
                    }}>
                      {mon.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AccordionItem>

          {/* SECTION 4: HISTORICAL TIMELINE */}
          <AccordionItem 
            title="SLO Period History" 
            icon="ph:clock-counter-clockwise-bold" 
            isOpen={openSections.history}
            onToggle={() => toggleSection('history')}
            badge="Last 4 Periods"
          >
            <div className={styles.timelineStrip}>
              {HISTORY_DATA.map((item, idx) => (
                <div key={idx} className={styles.historyRow}>
                  <div className={styles.historyInfo}>
                    <span className={styles.historyTitle}>{item.name}</span>
                    <span className={styles.historySub}>Target: {item.target}% • Result: {item.achieved}%</span>
                  </div>
                  <div className={styles.historyViz}>
                    {item.sparkline.map((val, i) => (
                      <div 
                        key={i} 
                        className={styles.historyBlock} 
                        style={{ 
                          backgroundColor: val >= item.target ? '#10b981' : (val > 80 ? '#f59e0b' : '#ef4444'),
                          height: `${12 + (val - 70) / 2}px` 
                        }} 
                      />
                    ))}
                  </div>
                  <div style={{ minWidth: '80px', textAlign: 'right' }}>
                     <span className={styles.statusBadge} style={{ 
                        backgroundColor: item.status === 'Ok' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                        color: item.status === 'Ok' ? '#10b981' : '#ef4444'
                     }}>
                        {item.status}
                     </span>
                  </div>
                </div>
              ))}
            </div>
          </AccordionItem>

        </div>
      </main>
    </div>
  );
};

export default SLODetail;
