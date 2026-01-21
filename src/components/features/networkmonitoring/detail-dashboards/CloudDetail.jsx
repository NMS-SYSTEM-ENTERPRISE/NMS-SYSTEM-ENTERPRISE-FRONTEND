import styles from '@/screens/network-monitoring/detail.module.css';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import 'react-grid-layout/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import { FiActivity, FiCpu, FiDatabase, FiHardDrive, FiLayers, FiServer, FiShare2 } from 'react-icons/fi';
import { MdDragIndicator } from 'react-icons/md';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

// --- Icons Map ---
const ICONS = {
  server: <FiServer size={20} />,
  database: <FiDatabase size={20} />,
  'hard-drive': <FiHardDrive size={20} />,
  'share-2': <FiShare2 size={20} />,
  table: <FiActivity size={20} />, // Placeholder for table
  layers: <FiLayers size={20} />,
};

// --- Mock Data ---

const topStats = [
  { id: 'stat1', label: 'Total EC2 Instances', value: 4, icon: 'server', color: '#0ea5e9' },
  { id: 'stat2', label: 'Total RDS Instances', value: 7, icon: 'database', color: '#eab308' },
  { id: 'stat3', label: 'Total S3 Bucket Size', value: '5.23 GB', icon: 'hard-drive', color: '#22c55e' },
  { id: 'stat4', label: 'Total ELB Instances', value: 1, icon: 'share-2', color: '#3b82f6' },
  { id: 'stat5', label: 'DynamoDB Tables', value: 2, icon: 'table', color: '#f97316' },
  { id: 'stat6', label: 'Application ELB Instances', value: 1, icon: 'layers', color: '#a855f7' },
];

const heatmapData = [];
// Generate mock heatmap data (wider grid: 20x5)
for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 5; j++) {
    // Random status: 0=Green, 1=Yellow, 2=Orange, 3=Red
    const rand = Math.random();
    let status = 0;
    if (rand > 0.9) status = 3;
    else if (rand > 0.8) status = 2;
    else if (rand > 0.7) status = 1;
    heatmapData.push([i, j, status]);
  }
}

const cloudWatchData = [
  { label: 'EC2', value: 4, total: 4, color: '#f97316' },
  { label: 'RDS', value: 7, total: 7, color: '#eab308' },
  { label: 'S3', value: 12, total: 12, color: '#22c55e' },
  { label: 'ELB', value: 2, total: 2, color: '#3b82f6' },
];

const topEC2Data = [
  { name: 'i-0a1b2c3d4e5f6g7h8', value: '214.76MB' },
  { name: 'i-1a2b3c4d5e6f7g8h9', value: '136.2MB' },
  { name: 'i-2a3b4c5d6e7f8g9h0', value: '36.54MB' },
  { name: 'i-3a4b5c6d7e8f9g0h1', value: '26.22MB' },
  { name: 'i-4a5b6c7d8e9f0g1h2', value: '25.08MB' },
  { name: 'i-5a6b7c8d9e0f1g2h3', value: '18.45MB' },
];

const initialLayouts = {
  lg: [
    { i: 'stat1', x: 0, y: 0, w: 2, h: 1 },
    { i: 'stat2', x: 2, y: 0, w: 2, h: 1 },
    { i: 'stat3', x: 4, y: 0, w: 2, h: 1 },
    { i: 'stat4', x: 6, y: 0, w: 2, h: 1 },
    { i: 'stat5', x: 8, y: 0, w: 2, h: 1 },
    { i: 'stat6', x: 10, y: 0, w: 2, h: 1 },
    { i: 'heatmap', x: 0, y: 1, w: 8, h: 3 },
    { i: 'cloudWatch', x: 8, y: 1, w: 4, h: 3 },
    { i: 'cpu', x: 0, y: 4, w: 4, h: 3 },
    { i: 'topEC2', x: 4, y: 4, w: 4, h: 3 },
    { i: 'network', x: 8, y: 4, w: 4, h: 3 },
  ],
};

const CloudDetail = () => {
  // Chart Refs
  const heatmapRef = useRef(null);
  const cpuRef = useRef(null);
  const networkRef = useRef(null);

  // Chart Instances
  const chartsRef = useRef({});

  const [layouts, setLayouts] = useState(initialLayouts);
  const [cpuCurrent, setCpuCurrent] = useState(45);
  const [netCurrent, setNetCurrent] = useState(25);

  const initChart = (ref, option) => {
    if (ref.current) {
      const chart = echarts.init(ref.current);
      chart.setOption(option);
      return chart;
    }
    return null;
  };

  useEffect(() => {
    const commonTooltip = {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#f3f4f6' },
      axisPointer: { type: 'cross', label: { backgroundColor: '#374151' } }
    };

    const commonGrid = {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true,
    };

    // 1. Health Overview (Hexagonal Heatmap)
    const renderHexagon = (params, api) => {
      var xValue = api.value(0);
      var yValue = api.value(1);
      var point = api.coord([xValue, yValue]);
      var size = api.size([1, 1]);
      var width = size[0];
      var height = size[1];
      
      // Shift odd rows
      if (yValue % 2 !== 0) {
        point[0] = point[0] + width / 2;
      }
      
      // Hexagon radius
      var r = Math.min(width, height) / 2 * 0.9;
      
      var points = [];
      // Flat-topped hexagon
      for (var i = 0; i < 6; i++) {
        var angle = (Math.PI / 3) * i;
        points.push([
          point[0] + r * Math.cos(angle),
          point[1] + r * Math.sin(angle)
        ]);
      }
      
      return {
        type: 'polygon',
        shape: {
          points: points
        },
        style: api.style({
          stroke: '#111827',
          lineWidth: 2,
          fill: api.visual('color')
        })
      };
    };

    chartsRef.current.heatmap = initChart(heatmapRef, {
      tooltip: { 
        position: 'top',
        formatter: (params) => {
          const statusMap = ['Clear', 'Warning', 'Major', 'Critical'];
          return `Node: ${params.value[0]},${params.value[1]}<br/>Status: ${statusMap[params.value[2]]}`;
        },
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        borderColor: '#374151',
        textStyle: { color: '#f3f4f6' }
      },
      grid: { top: 10, bottom: 10, left: 10, right: 10 },
      xAxis: { 
        show: false, 
        type: 'category', 
        data: Array.from({ length: 20 }, (_, i) => i),
        boundaryGap: false 
      },
      yAxis: { 
        show: false, 
        type: 'category', 
        data: [0,1,2,3,4],
        boundaryGap: false
      },
      visualMap: {
        min: 0,
        max: 3,
        calculable: false,
        show: false,
        inRange: {
          color: ['#22c55e', '#eab308', '#f97316', '#ef4444']
        }
      },
      series: [{
        type: 'custom',
        renderItem: renderHexagon,
        data: heatmapData,
        animation: false
      }]
    });

    // Initial Data for Line Charts
    const generateData = (count) => {
      let data = [];
      let now = new Date();
      let value = Math.random() * 100;
      for (let i = 0; i < count; i++) {
        data.push({
          name: now.toString(),
          value: [
            [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
            Math.round(value)
          ]
        });
        now = new Date(+now - 2000);
        value = Math.max(0, Math.min(100, value + Math.random() * 20 - 10));
      }
      return data.reverse();
    };

    let cpuData = generateData(50);
    let netData = generateData(50);

    // 2. Total EC2 CPU Usage (Line)
    chartsRef.current.cpu = initChart(cpuRef, {
      tooltip: commonTooltip,
      grid: commonGrid,
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: { show: false },
        axisLine: { lineStyle: { color: '#374151' } },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        axisLabel: { color: '#9ca3af' },
        splitLine: { show: true, lineStyle: { color: '#374151', type: 'dashed' } },
        max: 100
      },
      series: [{
        name: 'CPU',
        type: 'line',
        data: cpuData,
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#22c55e', width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(34, 197, 94, 0.4)' },
            { offset: 1, color: 'rgba(34, 197, 94, 0.01)' }
          ])
        },
        markPoint: {
          data: [{ type: 'max', name: 'Max' }],
          itemStyle: { color: '#ef4444' }
        }
      }]
    });

    // 3. AWS Network In/Out (Line)
    chartsRef.current.network = initChart(networkRef, {
      tooltip: commonTooltip,
      grid: commonGrid,
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: { show: false },
        axisLine: { lineStyle: { color: '#374151' } },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        axisLabel: { color: '#9ca3af' },
        splitLine: { show: true, lineStyle: { color: '#374151', type: 'dashed' } },
        max: 100
      },
      series: [{
        name: 'Network',
        type: 'line',
        data: netData,
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#0ea5e9', width: 2 },
        areaStyle: {
           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(14, 165, 233, 0.4)' },
            { offset: 1, color: 'rgba(14, 165, 233, 0.01)' }
          ])
        },
        markPoint: {
          data: [{ type: 'max', name: 'Max' }],
          itemStyle: { color: '#ef4444' }
        }
      }]
    });

    // Real-time Simulation Interval
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');

      // Update CPU
      const lastCpu = cpuData[cpuData.length - 1].value[1];
      let newCpu = lastCpu + (Math.random() - 0.5) * 15;
      newCpu = Math.max(5, Math.min(95, newCpu));
      cpuData.shift();
      cpuData.push({ name: now.toString(), value: [timeStr, Math.round(newCpu)] });
      setCpuCurrent(Math.round(newCpu));

      chartsRef.current.cpu.setOption({ series: [{ data: cpuData }] });

      // Update Network
      const lastNet = netData[netData.length - 1].value[1];
      let newNet = lastNet + (Math.random() - 0.5) * 20;
      newNet = Math.max(5, Math.min(95, newNet));
      netData.shift();
      netData.push({ name: now.toString(), value: [timeStr, Math.round(newNet)] });
      setNetCurrent(Math.round(newNet));

      chartsRef.current.network.setOption({ series: [{ data: netData }] });

    }, 2000);

    const handleResize = () => {
      Object.values(chartsRef.current).forEach(chart => chart && chart.resize());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      Object.values(chartsRef.current).forEach(chart => chart && chart.dispose());
    };
  }, []);

  // Helper for small donuts
  const renderDonut = (item, size = 80) => {
    const radius = size / 2 - 5;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (item.value / item.total) * circumference;

    return (
      <div className={styles.smallGaugeItem} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#1f2937"
              strokeWidth="6"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="6"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              strokeLinecap="round"
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{item.value}</span>
          </div>
        </div>
        <span style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px', fontWeight: 500 }}>{item.label}</span>
      </div>
    );
  };

  const onLayoutChange = (currentLayout, allLayouts) => {
    setLayouts(allLayouts);
    setTimeout(() => {
      Object.values(chartsRef.current).forEach(chart => chart && chart.resize());
    }, 300);
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={120}
      margin={[16, 16]}
      onLayoutChange={onLayoutChange}
      draggableHandle=".drag-handle"
    >
      {topStats.map((stat) => (
        <div key={stat.id} className={styles.widgetCard} style={{ 
          background: '#111827', 
          border: '1px solid #374151',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div className={`${styles.dragController} drag-handle`} style={{ position: 'absolute', top: 8, left: 8, zIndex: 10, opacity: 0.5 }}>
              <MdDragIndicator size={16} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', marginLeft: '24px' }}>
             <span style={{ color: stat.color }}>{ICONS[stat.icon]}</span>
             <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>{stat.label}</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', paddingLeft: '12px' }}>{stat.value}</div>
        </div>
      ))}

      <div key="heatmap" className={styles.widgetCard} style={{ background: '#111827', border: '1px solid #374151' }}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`${styles.dragController} drag-handle`}>
              <MdDragIndicator />
            </div>
            <h3 className={styles.widgetTitle} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiActivity className="text-green-500" /> Health Overview
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '8px', fontSize: '12px', background: '#1f2937', padding: '4px 8px', borderRadius: '4px' }}>
            <span style={{ fontWeight: 'bold', color: '#ef4444' }}>19</span>
            <span style={{ color: '#9ca3af' }}>Issues Detected</span>
          </div>
        </div>
        <div ref={heatmapRef} className={styles.chartContainer}></div>
      </div>

      <div key="cloudWatch" className={styles.widgetCard} style={{ background: '#111827', border: '1px solid #374151' }}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`${styles.dragController} drag-handle`}>
              <MdDragIndicator />
            </div>
            <h3 className={styles.widgetTitle}>AWS Cloud Watch Overview</h3>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%', flexWrap: 'wrap', gap: '8px', paddingBottom: '16px' }}>
          {cloudWatchData.map((item, idx) => (
            <div key={idx}>{renderDonut(item, 80)}</div>
          ))}
        </div>
      </div>

      <div key="cpu" className={styles.widgetCard} style={{ background: '#111827', border: '1px solid #374151' }}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`${styles.dragController} drag-handle`}>
              <MdDragIndicator />
            </div>
            <h3 className={styles.widgetTitle} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCpu className="text-green-500" /> Total EC2 CPU Usage
            </h3>
          </div>
          <div style={{ fontSize: '12px', color: '#22c55e', fontWeight: 'bold' }}>{cpuCurrent}%</div>
        </div>
        <div ref={cpuRef} className={styles.chartContainer}></div>
      </div>

      <div key="topEC2" className={styles.widgetCard} style={{ background: '#111827', border: '1px solid #374151' }}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`${styles.dragController} drag-handle`}>
              <MdDragIndicator />
            </div>
            <h3 className={styles.widgetTitle}>Top 5 EC2 Instances by I/O</h3>
          </div>
        </div>
        <div className={styles.listContainer} style={{ padding: '0 8px' }}>
          {topEC2Data.map((item, idx) => (
            <div key={idx} className={styles.listItem} style={{ padding: '12px 0', borderBottom: '1px solid #1f2937' }}>
              <span className={styles.listLabel} style={{ fontSize: '13px', color: '#d1d5db', fontFamily: 'monospace' }}>{item.name}</span>
              <span className={styles.listValue} style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div key="network" className={styles.widgetCard} style={{ background: '#111827', border: '1px solid #374151' }}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`${styles.dragController} drag-handle`}>
              <MdDragIndicator />
            </div>
            <h3 className={styles.widgetTitle} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiShare2 className="text-blue-500" /> AWS Network In/Out
            </h3>
          </div>
          <div style={{ fontSize: '12px', color: '#0ea5e9', fontWeight: 'bold' }}>{netCurrent} Mbps</div>
        </div>
        <div ref={networkRef} className={styles.chartContainer}></div>
      </div>
    </ResponsiveGridLayout>
  );
};

export default CloudDetail;
