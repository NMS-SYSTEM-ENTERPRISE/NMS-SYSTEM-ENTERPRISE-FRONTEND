import styles from '@/screens/network-monitoring/detail/styles.module.css';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import 'react-grid-layout/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import { MdDragIndicator } from 'react-icons/md';
import 'react-resizable/css/styles.css';

import { getDeviceHistory } from '@/networking/network-monitoring/network-monitoring-apis';
import {
  buildResponsiveLayouts,
  GRID_BREAKPOINTS,
  GRID_COLS,
} from '@/utils/network-monitoring/build-responsive-layouts';

const ResponsiveGridLayout = WidthProvider(Responsive);

// --- Dynamic Chart Rendering Engine ---
// We initialize state inside the component using the `data` prop.

const LG_LAYOUT = [
  { i: 'avail', x: 0, y: 0, w: 6, h: 3 },
  { i: 'ifAvail', x: 6, y: 0, w: 6, h: 3 },
  { i: 'heatmap', x: 0, y: 3, w: 12, h: 3 },
  { i: 'latency', x: 0, y: 6, w: 4, h: 3 },
  { i: 'cpu', x: 4, y: 6, w: 4, h: 3 },
  { i: 'memory', x: 8, y: 6, w: 4, h: 3 },
  { i: 'downtime', x: 0, y: 9, w: 4, h: 3 },
  { i: 'traffic', x: 4, y: 9, w: 4, h: 3 },
  { i: 'packets', x: 8, y: 9, w: 4, h: 3 },
];

const initialLayouts = buildResponsiveLayouts(LG_LAYOUT);

const NetworkDetail = ({ data }) => {
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
  const [historyData, setHistoryData] = useState([]);

  // Fetch History Data
  useEffect(() => {
    if (data?.device_ip) {
      getDeviceHistory(data.device_ip)
        .then((history) => {
          setHistoryData(history || []);
        })
        .catch(console.error);
    }
  }, [data?.device_ip]);

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

    // Process Dynamic Data
    const interfaces = data?.frontend_data?.interfaces || [];
    const interfaceSummary = data?.frontend_data?.interface_summary || {};
    const totalIfaces = interfaceSummary.total_interfaces || interfaces.length || 1;
    const upIfaces = interfaceSummary.interfaces_up !== undefined ? interfaceSummary.interfaces_up : interfaces.filter(
      (i) => (i.oper_status || i.admin_status || i.status || '').toLowerCase() === 'up'
    ).length;
    const downIfaces = interfaceSummary.interfaces_down !== undefined ? interfaceSummary.interfaces_down : interfaces.filter(
      (i) => (i.oper_status || i.admin_status || i.status || '').toLowerCase() !== 'up'
    ).length;

    const availabilityData = [
      { value: upIfaces, name: 'Up', itemStyle: { color: '#22c55e' } },
      { value: downIfaces, name: 'Down', itemStyle: { color: '#ef4444' } },
    ];
    const maxCols = 24;
    const numCols = Math.min(maxCols, totalIfaces || 1);
    const numRows = Math.ceil((totalIfaces || 1) / numCols);

    const heatmapData = [];
    interfaces.forEach((iface, idx) => {
      const col = idx % numCols;
      const row = Math.floor(idx / numCols);
      const isUp = (iface.oper_status || iface.admin_status || iface.status || '').toLowerCase() === 'up';
      const status = isUp ? 0 : 3;
      heatmapData.push([col, row, status]);
    });

    const interfaceAvailabilityData = [
      { label: 'Down', value: downIfaces, color: '#ef4444' },
      { label: 'Up', value: upIfaces, color: '#22c55e' },
    ];


    const historyTimes = historyData.map((h) =>
      new Date(h.time).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
    const latencyData = historyData.map((h) => h.latency_ms || 0);
    const cpuData = historyData.map((h) => parseFloat(h.cpu_load_percent) || 0);
    const memoryData = historyData.map(
      (h) => parseFloat(h.memory_consumption_percent) || 0
    );

    // CPU & Memory usage maps latest data to single device over time
    const topDevicesCPUData = cpuData.map((val, idx) => ({
      name: historyTimes[idx] || `T-${idx}`,
      value: val,
    }));
    const memoryUsageData = memoryData.map((val, idx) => ({
      name: historyTimes[idx] || `T-${idx}`,
      value: val,
    }));

    const interfaceTrafficData = {
      categories: historyTimes.slice(-6),
      series: [
        {
          name: 'In (GB)',
          data: historyData
            .slice(-6)
            .map((h) => parseFloat(h.total_bandwidth_in) || 0),
          color: '#3b82f6',
        },
        {
          name: 'Out (GB)',
          data: historyData
            .slice(-6)
            .map((h) => parseFloat(h.total_bandwidth_out) || 0),
          color: '#22c55e',
        },
      ],
    };

    const downtimeData = [
      {
        device: data?.device_ip || 'Device',
        time: downIfaces > 0 ? `${downIfaces * 5} m` : '0 m',
      },
    ];

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
            formatter: `Total\n${totalIfaces}`,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            lineHeight: 30,
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

      if (yValue % 2 !== 0) {
        point[0] = point[0] + width / 2;
      }

      var r = (Math.min(width, height) / 2) * 0.95;

      var points = [];
      for (var i = 0; i < 6; i++) {
        var angle = (Math.PI / 3) * i;
        points.push([
          point[0] + r * Math.cos(angle),
          point[1] + r * Math.sin(angle),
        ]);
      }

      return {
        type: 'polygon',
        shape: { points: points },
        style: api.style({ stroke: '#1f2937', lineWidth: 1 }),
      };
    };

    chartsRef.current.heatmap = initChart(heatmapRef, {
      tooltip: {
        position: (point, params, dom, rect, size) => {
          // Smart positioning to avoid viewport cutoff
          let x = point[0] + 10;
          let y = point[1] - size.contentSize[1] - 10;

          // Check if tooltip goes off-screen and adjust
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          // Right edge check
          if (x + size.contentSize[0] > viewportWidth - 20) {
            x = viewportWidth - size.contentSize[0] - 20;
          }

          // Left edge check
          if (x < 20) {
            x = 20;
          }

          // Top edge check - if goes above, put below cursor
          if (y < 20) {
            y = point[1] + 10;
          }

          // Bottom edge check
          if (y + size.contentSize[1] > viewportHeight - 20) {
            y = viewportHeight - size.contentSize[1] - 20;
          }

          return [x, y];
        },
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderWidth: 1,
        textStyle: { color: '#fff', fontSize: 12 },
        padding: [10, 14],
        formatter: (params) => {
          if (!params.value) return '';
          const col = params.value[0];
          const row = params.value[1];
          const statusCode = params.value[2];
          const statusMap = ['Up', 'Warning', 'Major', 'Down'];
          const statusColors = ['#22c55e', '#eab308', '#f97316', '#ef4444'];

          // Calculate port index
          const portIdx = row * numCols + col;
          const iface = interfaces[portIdx];

          if (!iface) {
            return `<div style="padding: 4px 0;">Port ${portIdx + 1}: No Data</div>`;
          }

          const status = statusMap[statusCode] || 'Unknown';
          const statusColor = statusColors[statusCode] || '#9ca3af';
          const inPercent = parseFloat(iface.in_percent) || 0;
          const outPercent = parseFloat(iface.out_percent) || 0;

          return `
            <div style="min-width: 200px;">
              <div style="font-weight: bold; margin-bottom: 8px; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px;">
                Port Information
              </div>
              <div style="margin: 6px 0;">
                <span style="color: #9ca3af; min-width: 50px; display: inline-block;">Port:</span>
                <span style="color: #fff; font-weight: 500;">${iface.description || `Port ${portIdx + 1}`}</span>
              </div>
              <div style="margin: 6px 0;">
                <span style="color: #9ca3af; min-width: 50px; display: inline-block;">Status:</span>
                <span style="color: ${statusColor}; font-weight: 600;">${status.toUpperCase()}</span>
              </div>
              ${iface.ip_address
              ? `<div style="margin: 6px 0;">
                <span style="color: #9ca3af; min-width: 50px; display: inline-block;">IP:</span>
                <span style="color: #3b82f6;">${iface.ip_address}</span>
              </div>`
              : ''
            }
              ${iface.mac_address
              ? `<div style="margin: 6px 0;">
                <span style="color: #9ca3af; min-width: 50px; display: inline-block;">MAC:</span>
                <span style="color: #fff; font-size: 11px; font-family: monospace;">${iface.mac_address}</span>
              </div>`
              : ''
            }
              ${iface.port_type
              ? `<div style="margin: 6px 0;">
                <span style="color: #9ca3af; min-width: 50px; display: inline-block;">Type:</span>
                <span style="color: #fff;">${iface.port_type}</span>
              </div>`
              : ''
            }
              <div style="margin: 6px 0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 6px;">
                <div style="margin: 4px 0;">
                  <span style="color: #9ca3af; min-width: 50px; display: inline-block;">IN:</span>
                  <span style="color: #3b82f6; font-weight: 500;">${inPercent.toFixed(2)}%</span>
                </div>
                <div style="margin: 4px 0;">
                  <span style="color: #9ca3af; min-width: 50px; display: inline-block;">OUT:</span>
                  <span style="color: #22c55e; font-weight: 500;">${outPercent.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          `;
        },
      },
      grid: { top: 20, bottom: 20, left: 20, right: 20 },
      xAxis: {
        show: false,
        type: 'category',
        data: Array.from({ length: numCols }, (_, i) => i),
        boundaryGap: false,
      },
      yAxis: {
        show: false,
        type: 'category',
        data: Array.from({ length: numRows }, (_, i) => i),
        boundaryGap: false,
        inverse: true,
      },
      visualMap: {
        min: 0,
        max: 3,
        calculable: false,
        show: false,
        inRange: { color: ['#22c55e', '#eab308', '#f97316', '#ef4444'] },
      },
      series: [
        {
          type: 'custom',
          renderItem: renderHexagon,
          data: heatmapData,
          animation: false,
        },
      ],
    });

    // 3. Network Device Latency (Bar)
    chartsRef.current.latency = initChart(latencyRef, {
      tooltip: commonTooltip,
      grid: commonGrid,
      xAxis: {
        type: 'category',
        data: historyTimes.length
          ? historyTimes
          : Array.from({ length: 50 }, (_, i) => i),
        axisLabel: { color: '#9ca3af' },
        axisLine: { lineStyle: { color: '#374151' } },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af', formatter: '{value} ms' },
        splitLine: { show: false },
      },
      series: [
        {
          type: 'bar',
          data: latencyData,
          itemStyle: {
            color: (params) => {
              if (params.value > 80) return '#ef4444';
              if (params.value > 50) return '#f97316';
              if (params.value > 30) return '#eab308';
              return '#22c55e';
            },
          },
          barCategoryGap: '10%',
        },
      ],
    });

    // 4. CPU Usage Over Time (Line instead of Pie to show history correctly)
    chartsRef.current.cpu = initChart(cpuRef, {
      tooltip: { ...commonTooltip, formatter: '{b}<br/>{a}: {c}%' },
      grid: commonGrid,
      xAxis: {
        type: 'category',
        data: historyTimes,
        axisLabel: { color: '#9ca3af' },
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: { color: '#9ca3af' },
        splitLine: { lineStyle: { color: '#374151', type: 'dashed' } },
      },
      series: [
        {
          name: 'CPU Usage',
          type: 'line',
          data: cpuData,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(249, 115, 22, 0.8)' },
              { offset: 1, color: 'rgba(249, 115, 22, 0.05)' },
            ]),
          },
          itemStyle: { color: '#f97316' },
          lineStyle: { width: 2 },
          showSymbol: false,
          smooth: true,
        },
      ],
    });

    // 5. Memory Usage Over Time (Line instead of Bar to show history)
    chartsRef.current.memory = initChart(memoryRef, {
      tooltip: { ...commonTooltip, formatter: '{b}<br/>{a}: {c}%' },
      grid: commonGrid,
      xAxis: {
        type: 'category',
        data: historyTimes,
        axisLabel: { color: '#9ca3af' },
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: { color: '#9ca3af' },
        splitLine: { lineStyle: { color: '#374151', type: 'dashed' } },
      },
      series: [
        {
          name: 'Memory Usage',
          type: 'line',
          data: memoryData,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(249, 115, 22, 0.8)' },
              { offset: 1, color: 'rgba(249, 115, 22, 0.05)' },
            ]),
          },
          itemStyle: { color: '#f97316' },
          lineStyle: { width: 2 },
          showSymbol: false,
          smooth: true,
        },
      ],
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
      series: interfaceTrafficData.series.map((s) => ({
        name: s.name,
        type: 'bar',
        stack: 'total',
        data: s.data,
        itemStyle: { color: s.color },
        barWidth: '40%',
      })),
    });

    // 7. Network Interface In/Out Packets (Reusing Traffic for now, or just line)
    chartsRef.current.packets = initChart(packetsRef, {
      tooltip: commonTooltip,
      grid: commonGrid,
      xAxis: {
        type: 'category',
        data: interfaceTrafficData.categories,
        axisLabel: { color: '#9ca3af' },
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af' },
        splitLine: { lineStyle: { color: '#374151', type: 'dashed' } },
      },
      series: interfaceTrafficData.series.map((s, idx) => ({
        name: s.name,
        type: 'line',
        data: s.data,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color:
                idx === 0
                  ? 'rgba(59, 130, 246, 0.8)'
                  : 'rgba(34, 197, 94, 0.8)',
            },
            {
              offset: 1,
              color:
                idx === 0
                  ? 'rgba(59, 130, 246, 0.05)'
                  : 'rgba(34, 197, 94, 0.05)',
            },
          ]),
        },
        itemStyle: { color: idx === 0 ? '#3b82f6' : '#22c55e' },
        lineStyle: { width: 2 },
        showSymbol: false,
        smooth: true,
      })),
    });

    // Attach dynamic stats to refs so they can be read by render function if needed
    chartsRef.current.interfaceAvailabilityData = interfaceAvailabilityData;
    chartsRef.current.downtimeData = downtimeData;
    chartsRef.current.heatmapStats = { up: upIfaces, down: downIfaces };

    const handleResize = () => {
      Object.values(chartsRef.current).forEach((item) => {
        if (item && typeof item.resize === 'function') item.resize();
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Object.values(chartsRef.current).forEach((chart) => {
        if (chart && typeof chart.dispose === 'function') chart.dispose();
      });
    };
  }, [data, historyData]);

  // Helper for small gauges/donuts
  const renderSmallGauge = (item, size = 80) => {
    const radius = size / 2 - 5;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (100 / 100) * circumference; // Full circle for now

    return (
      <div
        className={styles.smallGaugeItem}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '18px',
              fontWeight: 'bold',
              color: item.color,
            }}
          >
            {item.value}
          </div>
        </div>
        <span style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
          {item.label}
        </span>
      </div>
    );
  };

  const onLayoutChange = (currentLayout, allLayouts) => {
    setLayouts(allLayouts);
    setTimeout(() => {
      Object.values(chartsRef.current).forEach((item) => {
        if (item && typeof item.resize === 'function') item.resize();
      });
    }, 300);
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={GRID_BREAKPOINTS}
      cols={GRID_COLS}
      rowHeight={100}
      margin={[16, 16]}
      containerPadding={[0, 0]}
      compactType="vertical"
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
            <span style={{ color: '#ef4444' }}>
              {chartsRef.current?.heatmapStats?.down || 0} Down
            </span>
            <span style={{ color: '#22c55e' }}>
              {chartsRef.current?.heatmapStats?.up || 0} Up
            </span>
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {(chartsRef.current?.interfaceAvailabilityData || []).map(
            (item, idx) => (
              <div key={idx}>{renderSmallGauge(item)}</div>
            )
          )}
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
            <h3 className={styles.widgetTitle}>CPU Usage Trend</h3>
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
            <h3 className={styles.widgetTitle}>Memory Usage Trend</h3>
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
                <th>Estimated Downtime</th>
              </tr>
            </thead>
            <tbody>
              {(chartsRef.current?.downtimeData || []).map((row, idx) => (
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
            <h3 className={styles.widgetTitle}>
              Interface Traffic Utilization
            </h3>
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
            <h3 className={styles.widgetTitle}>
              Network Interface In/Out Packets
            </h3>
          </div>
        </div>
        <div ref={packetsRef} className={styles.chartContainer}></div>
      </div>
    </ResponsiveGridLayout>
  );
};

export default NetworkDetail;
