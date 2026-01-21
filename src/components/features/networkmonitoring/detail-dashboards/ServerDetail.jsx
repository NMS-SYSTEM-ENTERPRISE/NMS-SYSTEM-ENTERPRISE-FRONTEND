import styles from '@/screens/network-monitoring/detail.module.css';
import * as echarts from 'echarts';
import { Activity, BarChart3, ChevronDown, Server, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MdBarChart, MdDns, MdMemory, MdNetworkCheck, MdSpeed, MdStorage } from 'react-icons/md';

// --- Accordion Item Component ---
// --- Accordion Item Component ---
const AccordionItem = ({ title, icon: Icon, group, isOpen, onToggle, children, badge }) => {
  return (
    <div className={styles.accordionItem} data-open={isOpen} data-group={group}>
      <div className={styles.accordionHeader} onClick={onToggle}>
        <div className={styles.headerLeft}>
          <div className={styles.iconWrapper}>
            <Icon size={20} />
          </div>
          <span className={styles.headerTitle}>{title}</span>
        </div>
        <div className={styles.headerRight}>
          {badge && (
            <span className={styles.statBadge}>
              {badge}
            </span>
          )}
          <ChevronDown 
            size={18} 
            className={styles.chevron}
          />
        </div>
      </div>
      {isOpen && (
        <div className={styles.accordionContent}>
          {children}
        </div>
      )}
    </div>
  );
};

// --- Mock Data (Refined Colors) ---
const topNServerCPUData = [
  { name: '172.16.10.225', value: 95.55, color: '#3b82f6' }, // Primary Blue
  { name: '172.16.8.75', value: 53.42, color: '#6366f1' },  // Indigo
  { name: '172.16.8.34', value: 15.32, color: '#8b5cf6' },  // Violet
  { name: '172.16.8.165', value: 9.17, color: '#a855f7' },  // Purple
  { name: '172.16.10.1', value: 6.72, color: '#d946ef' },   // Fuchsia
  { name: '172.16.8.202', value: 1.91, color: '#ec4899' },  // Pink
  { name: '172.16.8.2', value: 1.47, color: '#f43f5e' },    // Rose
  { name: '172.16.9.156', value: 0.87, color: '#0ea5e9' },  // Sky
  { name: '172.16.8.87', value: 0.83, color: '#06b6d4' },   // Cyan
];

const serverDiskUsedData = [
  { name: '172.16.8.202', value: 20 },
  { name: '172.16.8.87', value: 35 },
  { name: '172.16.9.156', value: 45 },
  { name: '172.16.8.75', value: 120 },
  { name: '172.16.8.165', value: 210 },
  { name: '172.16.10.225', value: 280 },
];

const serverMemoryUsedData = [
  { name: '172.16.10.225', value: 74.06, color: '#f59e0b' }, // Amber
  { name: '172.16.8.202', value: 69.48, color: '#ea580c' }, // Orange
  { name: '172.16.8.75', value: 64.39, color: '#d97706' },  // Dark Amber
  { name: '172.16.8.87', value: 52.12, color: '#ca8a04' },  // Yellow-Gold
  { name: '172.16.9.156', value: 17.5, color: '#a16207' },  // Brown-Gold
  { name: '172.16.8.165', value: 9.25, color: '#854d0e' },  // Dark Gold
];

const cpuPercentData = {
  categories: ['11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00'],
  series: [
    { name: 'User', data: [40, 45, 35, 50, 48, 42, 46, 44], color: '#3b82f6' },
    { name: 'System', data: [20, 25, 15, 22, 20, 18, 21, 19], color: '#6366f1' },
    { name: 'Wait', data: [10, 8, 12, 9, 11, 13, 10, 12], color: '#8b5cf6' },
    { name: 'Idle', data: [5, 4, 6, 5, 4, 5, 6, 5], color: '#1e293b' }, // Dark slate for idle
  ]
};

const serverNetworkTrafficData = [
  { monitor: '172.16.8.165', interface: 'ens160', bytes: '798.04 GB' },
  { monitor: '172.16.8.165', interface: 'docker0', bytes: '509.64 GB' },
  { monitor: '172.16.8.87', interface: 'ens160', bytes: '70.83 GB' },
  { monitor: '172.16.8.165', interface: 'br-3e46c93d3d36', bytes: '18.84 GB' },
  { monitor: '172.16.9.156', interface: 'ens160', bytes: '12.47 GB' },
];

const ServerDetail = () => {
  // Accordion State
  const [openSections, setOpenSections] = useState({
    resource: true,
    performance: true,
    deepdive: true,
    network: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Chart Refs
  const topNServerCPURef = useRef(null);
  const serverDiskUsedRef = useRef(null);
  const serverMemoryUsedRef = useRef(null);
  const cpuPercentRef = useRef(null);
  const serverMemoryUsageRef = useRef(null);
  const cpuUsageByProcessRef = useRef(null);
  const systemHealthRef = useRef(null);


  // Chart Instances
  const chartsRef = useRef({});

  const initChart = (ref, option) => {
    if (ref.current) {
      if (chartsRef.current[ref.current]) chartsRef.current[ref.current].dispose();
      const chart = echarts.init(ref.current);
      chart.setOption(option);
      return chart;
    }
    return null;
  };

  useEffect(() => {
    const commonTooltip = {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      borderColor: '#374151',
      textStyle: { color: '#f3f4f6' },
      padding: [12, 16],
      borderRadius: 8,
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      borderWidth: 1
    };

    const commonGrid = {
      left: '2%',
      right: '3%',
      bottom: '2%',
      containLabel: true,
      top: '15%'
    };

    // 1. Top N Server by CPU Usage (Pie)
    chartsRef.current.topNServerCPU = initChart(topNServerCPURef, {
      tooltip: { ...commonTooltip, trigger: 'item' },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 0,
        top: 'middle',
        textStyle: { color: '#9ca3af', fontSize: 11 },
        pageIconColor: '#06b6d4',
        pageTextStyle: { color: '#9ca3af' },
        icon: 'circle'
      },
      series: [
        {
          name: 'CPU Usage',
          type: 'pie',
          radius: ['55%', '75%'],
          center: ['30%', '50%'],
          data: topNServerCPUData,
          label: { show: false },
          itemStyle: {
            borderRadius: 6,
            borderColor: '#1f2937',
            borderWidth: 3,
          },
        },
      ],
    });

    // 2. Server Disk Used (Bar)
    chartsRef.current.serverDiskUsed = initChart(serverDiskUsedRef, {
      tooltip: commonTooltip,
      grid: commonGrid,
      xAxis: {
        type: 'category',
        data: serverDiskUsedData.map(d => d.name),
        axisLabel: { color: '#9ca3af', fontSize: 10, rotate: 0 },
        axisLine: { lineStyle: { color: '#374151' } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af' },
        splitLine: { lineStyle: { color: '#374151', type: 'dashed', opacity: 0.5 } },
      },
      series: [
        {
          data: serverDiskUsedData.map(d => ({
            value: d.value,
            itemStyle: { 
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#10b981' }, // Emerald
                { offset: 1, color: '#059669' }
              ])
            }
          })),
          type: 'bar',
          barWidth: '35%',
          itemStyle: { borderRadius: [4, 4, 0, 0] },
          showBackground: true,
          backgroundStyle: { color: 'rgba(255, 255, 255, 0.02)' }
        },
      ],
    });

    // 3. Server Memory Used (Pie)
    chartsRef.current.serverMemoryUsed = initChart(serverMemoryUsedRef, {
       tooltip: { ...commonTooltip, trigger: 'item' },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 0,
        top: 'middle',
        textStyle: { color: '#9ca3af', fontSize: 11 },
        icon: 'circle'
      },
      series: [
        {
          name: 'Memory Used',
          type: 'pie',
          radius: ['55%', '75%'],
          center: ['30%', '50%'],
          data: serverMemoryUsedData,
          label: { show: false },
          itemStyle: {
            borderRadius: 6,
            borderColor: '#1f2937',
            borderWidth: 3,
          },
        },
      ],
    });

    // 4. CPU Percent (Stacked Bar)
    chartsRef.current.cpuPercent = initChart(cpuPercentRef, {
      tooltip: commonTooltip,
      legend: { textStyle: { color: '#9ca3af' }, top: 0, icon:'circle', itemGap: 16 },
      grid: { ...commonGrid, top: 35 },
      xAxis: {
        type: 'category',
        data: cpuPercentData.categories,
        axisLabel: { color: '#9ca3af', fontSize: 10 },
        axisLine: { lineStyle: { color: '#374151' } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af' },
        splitLine: { lineStyle: { color: '#374151', type: 'dashed', opacity: 0.5 } },
      },
      series: cpuPercentData.series.map(s => ({
        name: s.name,
        type: 'bar',
        stack: 'total',
        data: s.data,
        itemStyle: { color: s.color },
        barWidth: '40%'
      })),
    });

    // 5. Server Memory Usage (Stacked Area)
    chartsRef.current.serverMemoryUsage = initChart(serverMemoryUsageRef, {
      tooltip: commonTooltip,
      legend: { textStyle: { color: '#9ca3af' }, top: 0, icon:'circle' },
      grid: { ...commonGrid, top: 35 },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00'],
        axisLabel: { color: '#9ca3af', fontSize: 10 },
        axisLine: { lineStyle: { color: '#374151' } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af' },
        splitLine: { show: false },
      },
      series: [
        {
          name: 'Used',
          type: 'line',
          stack: 'Total',
          areaStyle: { opacity: 0.8 },
          emphasis: { focus: 'series' },
          data: [120, 132, 101, 134, 90, 230, 210, 180],
          itemStyle: { color: '#3b82f6' },
          showSymbol: false,
          smooth: true,
          lineStyle: { width: 0 }
        },
        {
          name: 'Cache',
          type: 'line',
          stack: 'Total',
          areaStyle: { opacity: 0.5 },
          emphasis: { focus: 'series' },
          data: [150, 232, 201, 154, 190, 330, 410, 350],
          itemStyle: { color: '#0ea5e9' },
          showSymbol: false,
          smooth: true,
           lineStyle: { width: 0 }
        },
         {
          name: 'Free',
          type: 'line',
          stack: 'Total',
          areaStyle: { opacity: 0.3 },
          emphasis: { focus: 'series' },
          data: [220, 182, 191, 234, 290, 330, 310, 320],
          itemStyle: { color: '#6366f1' },
          showSymbol: false,
          smooth: true,
           lineStyle: { width: 0 }
        },
      ],
    });

    // 6. Process CPU Usage (Multi-line)
    chartsRef.current.cpuUsageByProcess = initChart(cpuUsageByProcessRef, {
      tooltip: commonTooltip,
      legend: { textStyle: { color: '#9ca3af' }, top: 0, icon:'circle' },
      grid: { ...commonGrid, top: 35 },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00'],
        axisLabel: { color: '#9ca3af', fontSize: 10 },
        axisLine: { lineStyle: { color: '#374151' } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af' },
        splitLine: { lineStyle: { color: '#374151', type: 'dashed', opacity: 0.5 } },
      },
      series: [
        {
          name: 'java',
          type: 'line',
          data: [10, 15, 30, 12, 40, 20, 15, 10],
          itemStyle: { color: '#f59e0b' }, // Amber
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 2 }
        },
        {
          name: 'python',
          type: 'line',
          data: [5, 8, 20, 40, 15, 30, 25, 15],
          itemStyle: { color: '#ef4444' }, // Red
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 2 }
        },
        {
          name: 'node',
          type: 'line',
          data: [20, 30, 10, 5, 10, 15, 10, 5],
          itemStyle: { color: '#10b981' }, // Green
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 2 }
        },
      ],
    });

    // 7. System Health Trends
    chartsRef.current.systemHealth = initChart(systemHealthRef, {
      tooltip: commonTooltip,
      grid: { ...commonGrid, top: 30, bottom: 20 },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00'],
        axisLabel: { show: false },
        axisLine: { lineStyle: { color: '#374151' } },
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: { show: false },
        splitLine: { show: false },
      },
      series: [
        {
          name: 'Health Score',
          type: 'line',
          smooth: true,
          showSymbol: false,
          areaStyle: {
             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(34, 197, 94, 0.5)' },
              { offset: 1, color: 'rgba(34, 197, 94, 0.05)' }
            ])
          },
          lineStyle: { width: 3, color: '#22c55e' },
          data: [95, 94, 96, 92, 98, 97, 95, 99],
        },
      ],
    });

    const handleResize = () => {
      Object.values(chartsRef.current).forEach(chart => chart && chart.resize());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Object.values(chartsRef.current).forEach(chart => chart && chart.dispose());
    };
  }, [openSections]); 


  // Helper for Title with Highlighted Icon
  const WidgetTitle = ({ icon: Icon, title, color }) => (
    <div className={styles.cardHeader}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div 
          className={styles.widgetIconBox} 
          style={{ 
            color: color, 
            background: `rgba(${parseInt(color.slice(1,3),16)}, ${parseInt(color.slice(3,5),16)}, ${parseInt(color.slice(5,7),16)}, 0.1)` 
          }}
        >
          <Icon size={20} />
        </div>
        <h3 className={styles.widgetTitle} style={{ color: '#f3f4f6' }}>{title}</h3>
      </div>
    </div>
  );

  return (
    <div className={styles.accordionContainer}>
      
      {/* 1. Resource Overview */}
      <AccordionItem 
        title="System Resources Overview" 
        icon={Server} 
        group="resource"
        isOpen={openSections.resource} 
        onToggle={() => toggleSection('resource')}
        badge="Healthy"
      >
          <div className={styles.widgetCard}>
            <WidgetTitle icon={MdBarChart} title="Top N Server by CPU" color="#3b82f6" />
            <div ref={topNServerCPURef} className={styles.chartContainer}></div>
          </div>

          <div className={styles.widgetCard}>
             <WidgetTitle icon={MdStorage} title="Disk Usage" color="#10b981" />
            <div ref={serverDiskUsedRef} className={styles.chartContainer}></div>
          </div>

          <div className={styles.widgetCard}>
            <WidgetTitle icon={MdMemory} title="Memory Distribution" color="#f59e0b" />
            <div ref={serverMemoryUsedRef} className={styles.chartContainer}></div>
          </div>
      </AccordionItem>

      {/* 2. Performance Metrics */}
      <AccordionItem 
        title="Performance Metrics" 
        icon={Zap} 
        group="performance"
        isOpen={openSections.performance} 
        onToggle={() => toggleSection('performance')}
        badge="Active"
      >
          <div className={styles.widgetCard}>
            <WidgetTitle icon={MdSpeed} title="CPU Trends" color="#6366f1" />
            <div ref={cpuPercentRef} className={styles.chartContainer}></div>
          </div>

          <div className={styles.widgetCard} style={{ display: 'flex', flexDirection: 'column' }}>
            <WidgetTitle icon={MdDns} title="Service Statistics" color="#ec4899" />
            
            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <span className={styles.statBoxLabel}>Postgres Sessions</span>
                <div className={styles.statBoxValue} style={{ color: '#0ea5e9' }}>
                   8 <span className={styles.statBoxSub}>active</span>
                </div>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statBoxLabel}>MySQL Write Ops</span>
                <div className={styles.statBoxValue} style={{ color: '#8b5cf6' }}>
                   883 <span className={styles.statBoxSub}>/s</span>
                </div>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statBoxLabel}>MySQL Read Ops</span>
                <div className={styles.statBoxValue} style={{ color: '#22c55e' }}>
                   276k <span className={styles.statBoxSub}>/s</span>
                </div>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statBoxLabel}>Waiting Queries</span>
                <div className={styles.statBoxValue} style={{ color: '#f97316' }}>
                   0 <span className={styles.statBoxSub}>pending</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.widgetCard}>
            <WidgetTitle icon={Activity} title="System Health Score" color="#22c55e" />
            <div ref={systemHealthRef} className={styles.chartContainer}></div>
          </div>
      </AccordionItem>

      {/* 3. Deep Dive Analysis */}
      <AccordionItem 
        title="Deep Dive Analysis" 
        icon={BarChart3} 
        group="deepdive"
        isOpen={openSections.deepdive} 
        onToggle={() => toggleSection('deepdive')}
        badge="Detail"
      >
          <div className={styles.widgetCard} style={{gridColumn: 'span 2'}}>
             <WidgetTitle icon={MdMemory} title="Process CPU Usage & Load" color="#f97316" />
            <div ref={cpuUsageByProcessRef} className={styles.chartContainer}></div>
          </div>

          <div className={styles.widgetCard}>
            <WidgetTitle icon={MdStorage} title="Memory Usage Over Time" color="#06b6d4" />
            <div ref={serverMemoryUsageRef} className={styles.chartContainer}></div>
          </div>
      </AccordionItem>

      {/* 4. Network Traffic */}
      <AccordionItem 
        title="Network & Traffic" 
        icon={Activity} 
        group="network"
        isOpen={openSections.network} 
        onToggle={() => toggleSection('network')}
        badge="Stable"
      >
          <div className={styles.widgetCard} style={{ gridColumn: 'span 3'}}>
             <WidgetTitle icon={MdNetworkCheck} title="Network Traffic Overview" color="#8b5cf6" />
            
            <div className={styles.tableContainer} style={{maxHeight:'250px', overflowY:'auto'}}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Monitor</th>
                    <th>Interface</th>
                    <th>Bytes</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {serverNetworkTrafficData.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ color: '#0ea5e9', fontWeight: 'bold' }}>{row.monitor}</td>
                      <td>{row.interface}</td>
                      <td>{row.bytes}</td>
                      <td><span style={{color: '#22c55e', fontSize:'11px'}}>● Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      </AccordionItem>

    </div>
  );
};

export default ServerDetail;
