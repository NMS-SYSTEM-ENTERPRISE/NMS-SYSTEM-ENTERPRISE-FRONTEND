import styles from '@/screens/network-monitoring/detail.module.css';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import 'react-grid-layout/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import { MdDragIndicator } from 'react-icons/md';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

// --- Mock Data ---

const availabilityData = [
  { value: 115, name: 'Up', itemStyle: { color: '#22c55e' } },
  { value: 18, name: 'Down', itemStyle: { color: '#ef4444' } },
];

const heatmapData = [];
// Generate mock heatmap data (7x4 grid)
for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 4; j++) {
    // Random status: 0=Green, 1=Yellow, 2=Orange, 3=Red
    const status = Math.random() > 0.8 ? (Math.random() > 0.5 ? 3 : 2) : 0;
    heatmapData.push([i, j, status]);
  }
}

const interfaceAvailabilityData = [
  { label: 'Down', value: 54, color: '#ef4444' },
  { label: 'Up', value: 322, color: '#22c55e' },
];

const alertSummaryData = [
  { label: 'Down', value: 6, color: '#ef4444' },
  { label: 'Major', value: 6, color: '#f97316' },
  { label: 'Warning', value: 4, color: '#eab308' },
  { label: 'Clear', value: 502, color: '#22c55e' },
];

const latencyData = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));

const topDevicesCPUData = [
  { name: '172.16.10.225', value: 95.55, color: '#3b82f6' },
  { name: '172.16.8.75', value: 53.42, color: '#22c55e' },
  { name: '172.16.8.34', value: 15.32, color: '#eab308' },
  { name: '172.16.8.165', value: 9.17, color: '#f97316' },
  { name: '172.16.10.1', value: 6.72, color: '#ef4444' },
  { name: '172.16.8.202', value: 1.91, color: '#a855f7' },
  { name: '172.16.8.2', value: 1.47, color: '#ec4899' },
  { name: '172.16.9.156', value: 0.87, color: '#6366f1' },
];

const memoryUsageData = [
  { name: '172.16.10.225', value: 90 },
  { name: '172.16.8.75', value: 85 },
  { name: '172.16.8.34', value: 70 },
  { name: '172.16.8.165', value: 65 },
  { name: '172.16.10.1', value: 40 },
];

const downtimeData = [
  { device: '172.16.8.202', time: '2 m' },
  { device: '172.16.8.87', time: '5 m' },
  { device: '172.16.9.156', time: '10 m' },
  { device: '172.16.8.75', time: '15 m' },
  { device: '172.16.8.165', time: '20 m' },
];

const interfaceTrafficData = {
  categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
  series: [
    { name: 'In', data: [120, 132, 101, 134, 90, 230], color: '#3b82f6' },
    { name: 'Out', data: [220, 182, 191, 234, 290, 330], color: '#22c55e' },
  ]
};

const packetsData = {
  categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
  series: [
    { name: 'In', data: [820, 932, 901, 934, 1290, 1330], color: '#0ea5e9' },
    { name: 'Out', data: [620, 732, 701, 734, 1090, 1130], color: '#84cc16' },
  ]
};

const initialLayouts = {
  lg: [
    { i: 'avail', x: 0, y: 0, w: 3, h: 3 },
    { i: 'heatmap', x: 3, y: 0, w: 3, h: 3 },
    { i: 'ifAvail', x: 6, y: 0, w: 3, h: 3 },
    { i: 'alert', x: 9, y: 0, w: 3, h: 3 },
    { i: 'latency', x: 0, y: 3, w: 4, h: 3 },
    { i: 'cpu', x: 4, y: 3, w: 4, h: 3 },
    { i: 'memory', x: 8, y: 3, w: 4, h: 3 },
    { i: 'downtime', x: 0, y: 6, w: 4, h: 3 },
    { i: 'traffic', x: 4, y: 6, w: 4, h: 3 },
    { i: 'packets', x: 8, y: 6, w: 4, h: 3 },
  ],
};

const NetworkDetail = () => {
  // Chart Refs
  const availabilityRef = useRef(null);
  const heatmapRef = useRef(null);
  const latencyRef = useRef(null);
  const cpuRef = useRef(null);
  const memoryRef = useRef(null);
  const trafficRef = useRef(null);
  const packetsRef = useRef(null);

  // Chart Instances
  const chartsRef = useRef({});

  const [layouts, setLayouts] = useState(initialLayouts);

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
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#333',
      textStyle: { color: '#fff' },
    };

    const commonGrid = {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    };

    // 1. Network Device Availability (Donut)
    chartsRef.current.availability = initChart(availabilityRef, {
      tooltip: { trigger: 'item' },
      series: [
        {
          name: 'Availability',
          type: 'pie',
          radius: ['60%', '80%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center',
            formatter: 'Total\n133',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            lineHeight: 30
          },
          labelLine: { show: false },
          data: availabilityData,
        },
      ],
    });

    // 2. Network Heatmap (Hexagonal)
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
      var r = Math.min(width, height) / 2 * 0.95;
      
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
          stroke: '#1f2937',
          lineWidth: 1
        })
      };
    };

    chartsRef.current.heatmap = initChart(heatmapRef, {
      tooltip: { 
        position: 'top',
        formatter: (params) => {
          const statusMap = ['Clear', 'Warning', 'Major', 'Critical'];
          return `Node: ${params.value[0]},${params.value[1]}<br/>Status: ${statusMap[params.value[2]]}`;
        }
      },
      grid: { top: 20, bottom: 20, left: 20, right: 20 },
      xAxis: { 
        show: false, 
        type: 'category', 
        data: [0,1,2,3,4,5,6],
        boundaryGap: false 
      },
      yAxis: { 
        show: false, 
        type: 'category', 
        data: [0,1,2,3],
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

    // 3. Network Device Latency (Bar)
    chartsRef.current.latency = initChart(latencyRef, {
      tooltip: commonTooltip,
      grid: commonGrid,
      xAxis: {
        type: 'category',
        data: Array.from({ length: 50 }, (_, i) => i),
        axisLabel: { show: false },
        axisLine: { lineStyle: { color: '#374151' } },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af' },
        splitLine: { show: false },
      },
      series: [{
        type: 'bar',
        data: latencyData,
        itemStyle: {
          color: (params) => {
            if (params.value > 80) return '#ef4444';
            if (params.value > 50) return '#f97316';
            if (params.value > 30) return '#eab308';
            return '#22c55e';
          }
        },
        barCategoryGap: '10%'
      }]
    });

    // 4. Top Network Devices by CPU (Pie)
    chartsRef.current.cpu = initChart(cpuRef, {
      tooltip: { trigger: 'item' },
      legend: { show: false },
      series: [
        {
          name: 'CPU Usage',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          data: topDevicesCPUData,
          label: { show: false },
          itemStyle: {
            borderRadius: 4,
            borderColor: '#1f2937',
            borderWidth: 2,
          },
        },
      ],
    });

    // 5. Network Monitor by Memory Usage (Bar)
    chartsRef.current.memory = initChart(memoryRef, {
      tooltip: commonTooltip,
      grid: commonGrid,
      xAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af' },
        splitLine: { lineStyle: { color: '#374151', type: 'dashed' } },
      },
      yAxis: {
        type: 'category',
        data: memoryUsageData.map(d => d.name),
        axisLabel: { show: false }, // Hide labels for cleaner look as per image
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [{
        type: 'bar',
        data: memoryUsageData.map(d => d.value),
        itemStyle: {
          color: (params) => {
            const colors = ['#3b82f6', '#22c55e', '#eab308', '#f97316', '#ef4444'];
            return colors[params.dataIndex % colors.length];
          },
          borderRadius: [0, 4, 4, 0]
        },
        barWidth: '20%'
      }]
    });

    // 6. Interface Traffic Utilization (Stacked Bar)
    chartsRef.current.traffic = initChart(trafficRef, {
      tooltip: commonTooltip,
      grid: commonGrid,
      xAxis: {
        type: 'category',
        data: interfaceTrafficData.categories,
        axisLabel: { color: '#9ca3af' },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af' },
        splitLine: { lineStyle: { color: '#374151', type: 'dashed' } },
      },
      series: interfaceTrafficData.series.map(s => ({
        name: s.name,
        type: 'bar',
        stack: 'total',
        data: s.data,
        itemStyle: { color: s.color },
        barWidth: '40%'
      })),
    });

    // 7. Network Interface In/Out Packets (Bar)
    chartsRef.current.packets = initChart(packetsRef, {
      tooltip: commonTooltip,
      grid: commonGrid,
      xAxis: {
        type: 'category',
        data: packetsData.categories,
        axisLabel: { color: '#9ca3af' },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af' },
        splitLine: { lineStyle: { color: '#374151', type: 'dashed' } },
      },
      series: packetsData.series.map(s => ({
        name: s.name,
        type: 'bar',
        data: s.data,
        itemStyle: { color: s.color },
        barWidth: '30%',
        barGap: '10%'
      })),
    });

    const handleResize = () => {
      Object.values(chartsRef.current).forEach(chart => chart && chart.resize());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Object.values(chartsRef.current).forEach(chart => chart && chart.dispose());
    };
  }, []);

  // Helper for small gauges/donuts
  const renderSmallGauge = (item, size = 80) => {
    const radius = size / 2 - 5;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (100 / 100) * circumference; // Full circle for now

    return (
      <div className={styles.smallGaugeItem} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#374151"
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
              strokeDashoffset={0}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '18px',
            fontWeight: 'bold',
            color: item.color
          }}>
            {item.value}
          </div>
        </div>
        <span style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>{item.label}</span>
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
      rowHeight={100}
      onLayoutChange={onLayoutChange}
      draggableHandle=".drag-handle"
    >
      <div key="avail" className={styles.widgetCard}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`${styles.dragController} drag-handle`}>
              <MdDragIndicator />
            </div>
            <h3 className={styles.widgetTitle}>Network Device Availability</h3>
          </div>
        </div>
        <div ref={availabilityRef} className={styles.chartContainer}></div>
      </div>

      <div key="heatmap" className={styles.widgetCard}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`${styles.dragController} drag-handle`}>
              <MdDragIndicator />
            </div>
            <h3 className={styles.widgetTitle}>Network Heatmap</h3>
          </div>
          <div style={{ display: 'flex', gap: '8px', fontSize: '10px' }}>
            <span style={{ color: '#ef4444' }}>18 Down</span>
            <span style={{ color: '#22c55e' }}>234 Up</span>
          </div>
        </div>
        <div ref={heatmapRef} className={styles.chartContainer}></div>
      </div>

      <div key="ifAvail" className={styles.widgetCard}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`${styles.dragController} drag-handle`}>
              <MdDragIndicator />
            </div>
            <h3 className={styles.widgetTitle}>Interface Availability</h3>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
          {interfaceAvailabilityData.map((item, idx) => (
            <div key={idx}>{renderSmallGauge(item)}</div>
          ))}
        </div>
      </div>

      <div key="alert" className={styles.widgetCard}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`${styles.dragController} drag-handle`}>
              <MdDragIndicator />
            </div>
            <h3 className={styles.widgetTitle}>Alert Summary</h3>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
          {alertSummaryData.map((item, idx) => (
            <div key={idx}>{renderSmallGauge(item, 60)}</div>
          ))}
        </div>
      </div>

      <div key="latency" className={styles.widgetCard}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`${styles.dragController} drag-handle`}>
              <MdDragIndicator />
            </div>
            <h3 className={styles.widgetTitle}>Network Device Latency</h3>
          </div>
        </div>
        <div ref={latencyRef} className={styles.chartContainer}></div>
      </div>

      <div key="cpu" className={styles.widgetCard}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`${styles.dragController} drag-handle`}>
              <MdDragIndicator />
            </div>
            <h3 className={styles.widgetTitle}>Top Network Devices by CPU</h3>
          </div>
        </div>
        <div ref={cpuRef} className={styles.chartContainer}></div>
      </div>

      <div key="memory" className={styles.widgetCard}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`${styles.dragController} drag-handle`}>
              <MdDragIndicator />
            </div>
            <h3 className={styles.widgetTitle}>Network Monitor by Memory Usage</h3>
          </div>
        </div>
        <div ref={memoryRef} className={styles.chartContainer}></div>
      </div>

      <div key="downtime" className={styles.widgetCard}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`${styles.dragController} drag-handle`}>
              <MdDragIndicator />
            </div>
            <h3 className={styles.widgetTitle}>Network Device Downtime</h3>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Device</th>
                <th>Downtime</th>
              </tr>
            </thead>
            <tbody>
              {downtimeData.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ color: '#0ea5e9' }}>{row.device}</td>
                  <td>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div key="traffic" className={styles.widgetCard}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`${styles.dragController} drag-handle`}>
              <MdDragIndicator />
            </div>
            <h3 className={styles.widgetTitle}>Interface Traffic Utilization</h3>
          </div>
        </div>
        <div ref={trafficRef} className={styles.chartContainer}></div>
      </div>

      <div key="packets" className={styles.widgetCard}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`${styles.dragController} drag-handle`}>
              <MdDragIndicator />
            </div>
            <h3 className={styles.widgetTitle}>Network Interface In/Out Packets</h3>
          </div>
        </div>
        <div ref={packetsRef} className={styles.chartContainer}></div>
      </div>
    </ResponsiveGridLayout>
  );
};

export default NetworkDetail;
