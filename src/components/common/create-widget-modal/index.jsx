import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

const WIDGET_TABS = [
  'Chart',
  'Grid',
  'Top N',
  'Gauge',
  'Heat Map',
  'Sankey',
  'Map',
  'Stream',
  'Anomaly',
  'Forecast',
  'Active Alerts',
  'Event History',
];

const CHART_STYLES = [
  { id: 'area', icon: 'area' },
  { id: 'line', icon: 'line' },
  { id: 'bar', icon: 'bar' },
  { id: 'column', icon: 'column' },
  { id: 'spline', icon: 'spline' },
  { id: 'step', icon: 'step' },
  { id: 'stacked', icon: 'stacked' },
  { id: 'percentage', icon: 'percentage' },
];

const GAUGE_STYLES = [
  { id: 'text', label: '123' },
  { id: 'gauge', icon: 'gauge' },
];

const GRID_STYLES = [
  { id: 'grid', label: '12', icon: 'lines' },
  { id: 'table', icon: 'table' },
];

const CATEGORY_BUTTONS = [
  'Metric',
  'Availability',
  'Log',
  'Flow',
  'Alert',
  'APM',
  'NetRoute',
];

const MOCK_GRID_DATA = [
  { monitor: 'cisco_core.snr-edatas.local', value: '1.56%' },
  { monitor: 'cisco841.snr-edatas.local', value: '4.30%' },
  { monitor: '192.168.243.1 Router', value: '0%' },
  { monitor: 'snr-edatas', value: '23.53%' },
  { monitor: 'snr-edatas72-Windows', value: '1.60%' },
  { monitor: '192.168.241.2 Router', value: '0%' },
  { monitor: '192.168.240.1PMG1test.com', value: '0%' },
  { monitor: '172.16.9.41 PMG-Router.test.com', value: '0%' },
  { monitor: 'ciscostack1.test.com', value: '8.06%' },
  { monitor: 'cisco2950.snr-edatas.local', value: '8.94%' },
];

const MOCK_EVENT_DATA = [
  {
    timestamp: 'Wed, Oct 04, 2023 09:39:09 AM',
    message:
      '<30> serviceapp.app login[688391]: [sudo] password for flotomate; Sorry, try again;',
    city: 'Mumbai',
  },
  {
    timestamp: 'Wed, Oct 04, 2023 09:39:07 AM',
    message:
      '<181> serviceapp.app sudo flotomate: 3 incorrect password attempts ; PWD=/ ; USER=root ; COMMAND=/usr/bin/...',
    city: 'Mumbai',
  },
  {
    timestamp: 'Wed, Oct 04, 2023 09:39:07 AM',
    message:
      '<30> serviceapp.app login[688391]: [sudo] password for flotomate sudo: 3 incorrect password attempts',
    city: 'Mumbai',
  },
  {
    timestamp: 'Wed, Oct 04, 2023 09:39:07 AM',
    message: '<30> serviceapp.app login[688391]: Bad port @',
    city: 'Mumbai',
  },
  {
    timestamp: 'Wed, Oct 04, 2023 09:39:07 AM',
    message: '<30> serviceapp.app login[688390]: Bad port @',
    city: 'Mumbai',
  },
  {
    timestamp: 'Wed, Oct 04, 2023 09:39:07 AM',
    message:
      '<30> serviceapp.app login[688391]: rsync: connection unexpectedly closed (0 bytes received so far) [sender]',
    city: 'Mumbai',
  },
  {
    timestamp: 'Wed, Oct 04, 2023 09:39:07 AM',
    message:
      '<30> serviceapp.app login[688391]: rsync: error: unexplained error (code 255) at io.c(231) [sender=3.2.7]',
    city: 'Mumbai',
  },
  {
    timestamp: 'Wed, Oct 04, 2023 09:39:07 AM',
    message: '<30> serviceapp.app login[688394]: load port *p',
    city: 'Mumbai',
  },
  {
    timestamp: 'Wed, Oct 04, 2023 09:39:07 AM',
    message:
      '<30> serviceapp.app login[688394]: rsync: connection unexpectedly closed (0 bytes received so far) [sender]',
    city: 'Mumbai',
  },
  {
    timestamp: 'Wed, Oct 04, 2023 09:39:07 AM',
    message:
      '<30> serviceapp.app login[688394]: rsync: error: unexplained error (code 255) at io.c(231) [sender=3.2.7]',
    city: 'Mumbai',
  },
];

// Generate mock data functions
const generateChartData = () => {
  return Array.from({ length: 10 }, (_, i) => Math.random() * 100);
};

const generatePieData = () => {
  return [
    { name: 'Item 1', value: 40, color: '#3b82f6' },
    { name: 'Item 2', value: 30, color: '#22c55e' },
    { name: 'Item 3', value: 20, color: '#fbbf24' },
    { name: 'Item 4', value: 10, color: '#ef4444' },
  ];
};

const generateTopNData = () => {
  return [
    { name: 'WIN-SQLSVR2025', value: 82.08 },
    { name: 'moduledata01928', value: 54.99 },
    { name: 'WIN-SQLSVR2011', value: 43.76 },
    { name: 'WIN-crmTempServ01U', value: 40.73 },
    { name: 'WL3.ML', value: 89.72 },
  ];
};

const CreateWidgetModal = ({ onClose, onAddWidget, initialTab = 'Chart' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeStyleTab, setActiveStyleTab] = useState('Style');
  const [selectedChartStyle, setSelectedChartStyle] = useState('area');
  const [selectedGaugeStyle, setSelectedGaugeStyle] = useState('gauge');
  const [selectedGridStyle, setSelectedGridStyle] = useState('table');
  const [selectedTopNStyle, setSelectedTopNStyle] = useState('bubble');
  const [selectedMapStyle, setSelectedMapStyle] = useState('world');
  const [rotation, setRotation] = useState(0);
  const [legend, setLegend] = useState(false);
  const [xAxisTitle, setXAxisTitle] = useState(false);
  const [yAxisTitle, setYAxisTitle] = useState(false);
  const [zAxisTitle, setZAxisTitle] = useState(false);
  const [fontSize, setFontSize] = useState('Small');
  const [lineWidth, setLineWidth] = useState(2);
  const [counter, setCounter] = useState('system.cpu.percent');
  const [aggregation, setAggregation] = useState('Avg');
  const [sourceFilter, setSourceFilter] = useState('Everywhere');
  const [resultBy, setResultBy] = useState('Monitor');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);

  const chartPreviewRef = useRef(null);
  const gaugePreviewRef = useRef(null);
  const topNPreviewRef = useRef(null);
  const chartPreviewInstance = useRef(null);
  const gaugePreviewInstance = useRef(null);
  const topNPreviewInstance = useRef(null);

  const renderChartStyleIcon = (styleId) => {
    const icons = {
      area: (
        <svg width="30" height="30" viewBox="0 0 30 30">
          <path
            d="M 2 20 L 8 15 L 14 18 L 20 12 L 26 16 L 26 24 L 2 24 Z"
            fill="currentColor"
            opacity="0.6"
          />
          <path
            d="M 2 20 L 8 15 L 14 18 L 20 12 L 26 16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      ),
      line: (
        <svg width="30" height="30" viewBox="0 0 30 30">
          <path
            d="M 2 20 L 8 12 L 14 16 L 20 8 L 26 14"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      ),
      bar: (
        <svg width="30" height="30" viewBox="0 0 30 30">
          <rect x="4" y="18" width="3" height="6" fill="currentColor" />
          <rect x="10" y="12" width="3" height="12" fill="currentColor" />
          <rect x="16" y="15" width="3" height="9" fill="currentColor" />
          <rect x="22" y="10" width="3" height="14" fill="currentColor" />
        </svg>
      ),
      column: (
        <svg width="30" height="30" viewBox="0 0 30 30">
          <rect x="6" y="10" width="4" height="14" fill="currentColor" />
          <rect x="12" y="6" width="4" height="18" fill="currentColor" />
          <rect x="18" y="12" width="4" height="12" fill="currentColor" />
        </svg>
      ),
      spline: (
        <svg width="30" height="30" viewBox="0 0 30 30">
          <path
            d="M 2 20 Q 8 10 14 16 T 26 12"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      ),
      step: (
        <svg width="30" height="30" viewBox="0 0 30 30">
          <path
            d="M 2 20 L 8 20 L 8 14 L 14 14 L 14 18 L 20 18 L 20 10 L 26 10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      ),
      stacked: (
        <svg width="30" height="30" viewBox="0 0 30 30">
          <rect x="4" y="16" width="4" height="8" fill="currentColor" />
          <rect
            x="4"
            y="12"
            width="4"
            height="4"
            fill="currentColor"
            opacity="0.6"
          />
          <rect x="10" y="14" width="4" height="10" fill="currentColor" />
          <rect
            x="10"
            y="8"
            width="4"
            height="6"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>
      ),
      percentage: (
        <svg width="30" height="30" viewBox="0 0 30 30">
          <rect x="4" y="6" width="4" height="18" fill="currentColor" />
          <rect
            x="10"
            y="10"
            width="4"
            height="14"
            fill="currentColor"
            opacity="0.7"
          />
          <rect
            x="16"
            y="12"
            width="4"
            height="12"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      ),
    };
    return icons[styleId] || null;
  };

  const handleChartMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Simulate tooltip data based on mouse position
    setShowTooltip(true);
    setTooltipData({
      x: e.clientX - rect.left + 10,
      y: e.clientY - rect.top - 60,
      location: 'Fri, Nov 07, 2025 01:30:00 PM',
      metric: 'system.cpu.percent.avg',
      value: '55.54%',
    });
  };

  const handleChartMouseLeave = () => {
    setShowTooltip(false);
    setTooltipData(null);
  };

  useEffect(() => {
    if (activeTab === 'Chart' && chartPreviewRef.current) {
      if (chartPreviewInstance.current) {
        chartPreviewInstance.current.dispose();
      }
      const chart = echarts.init(chartPreviewRef.current);
      chartPreviewInstance.current = chart;

      const option = {
        grid: { left: 50, right: 20, top: 20, bottom: 50 },
        xAxis: {
          type: 'category',
          data: ['26. Oct', '02:00', '04:00', '06:00', '08:00', '12:00'],
          axisLabel: { color: '#888', fontSize: 11 },
          axisLine: { show: false },
          axisTick: { show: false },
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: '#888', fontSize: 12, formatter: '{value} ms' },
          axisLine: { show: false },
          splitLine: { lineStyle: { color: '#3a3a3a' } },
        },
        series: [
          {
            name: 'Layer 1',
            type: 'line',
            data: [20, 40, 0, 30, 10, -10],
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(6, 182, 212, 0.8)' },
                  { offset: 1, color: 'rgba(6, 182, 212, 0.1)' },
                ],
              },
            },
            lineStyle: { color: '#06b6d4', width: 2 },
            symbol: 'none',
            stack: 'total',
          },
          {
            name: 'Layer 2',
            type: 'line',
            data: [40, 40, 40, 40, 40, 20],
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(139, 92, 246, 0.6)' },
                  { offset: 1, color: 'rgba(139, 92, 246, 0.1)' },
                ],
              },
            },
            lineStyle: { color: '#8b5cf6', width: 2 },
            symbol: 'none',
            stack: 'total',
          },
          {
            name: 'Layer 3',
            type: 'line',
            data: [40, 40, 50, 40, 50, 60],
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(234, 179, 8, 0.6)' },
                  { offset: 1, color: 'rgba(234, 179, 8, 0.1)' },
                ],
              },
            },
            lineStyle: { color: '#eab308', width: 2 },
            symbol: 'none',
            stack: 'total',
          },
        ],
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            const point = params[0];
            return `${point.axisValue}<br/>${point.seriesName}: ${point.value} ms`;
          },
        },
      };
      chart.setOption(option);

      chart.on('mousemove', (params) => {
        if (params.dataIndex !== undefined) {
          setShowTooltip(true);
          setTooltipData({
            x: params.offsetX + 10,
            y: params.offsetY - 60,
            location: 'Fri, Nov 07, 2025 01:30:00 PM',
            metric: 'system.cpu.percent.avg',
            value: '55.54%',
          });
        }
      });

      chart.on('mouseleave', () => {
        setShowTooltip(false);
        setTooltipData(null);
      });

      return () => {
        if (chartPreviewInstance.current) {
          chartPreviewInstance.current.dispose();
        }
      };
    }
  }, [activeTab, selectedChartStyle]);

  useEffect(() => {
    if (activeTab === 'Gauge' && gaugePreviewRef.current) {
      if (gaugePreviewInstance.current) {
        gaugePreviewInstance.current.dispose();
      }
      const chart = echarts.init(gaugePreviewRef.current);
      gaugePreviewInstance.current = chart;

      const option = {
        series: [
          {
            type: 'gauge',
            radius: '80%',
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                width: 20,
                color: [[1, '#2a2a2a']],
              },
            },
            pointer: {
              itemStyle: {
                color: '#06b6d4',
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              fontSize: 56,
              fontWeight: 'bold',
              offsetCenter: [0, '20%'],
              valueAnimation: true,
              formatter: '15.65%',
              color: '#fff',
            },
            data: [
              {
                value: 15.65,
                name: '',
              },
            ],
          },
        ],
      };
      chart.setOption(option);

      return () => {
        if (gaugePreviewInstance.current) {
          gaugePreviewInstance.current.dispose();
        }
      };
    }
  }, [activeTab, selectedGaugeStyle]);

  useEffect(() => {
    if (
      activeTab === 'Top N' &&
      topNPreviewRef.current &&
      selectedTopNStyle === 'bubble'
    ) {
      if (topNPreviewInstance.current) {
        topNPreviewInstance.current.dispose();
      }
      const chart = echarts.init(topNPreviewRef.current);
      topNPreviewInstance.current = chart;

      const option = {
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        xAxis: { show: false },
        yAxis: { show: false },
        series: [
          {
            type: 'scatter',
            data: [
              { value: [200, 150], name: 'WIN...', symbolSize: 60 },
              { value: [300, 200], name: 'rhal-7.5', symbolSize: 50 },
              { value: [450, 180], name: 'sqlnode1', symbolSize: 70 },
              { value: [360, 280], name: 'OERP...', symbolSize: 45 },
              { value: [230, 320], name: 'snr-edatas', symbolSize: 55 },
              { value: [520, 300], name: 'snr-edatas', symbolSize: 48 },
              { value: [300, 100], name: 'hub...', symbolSize: 40 },
              { value: [600, 220], name: 'site1.test1.com', symbolSize: 52 },
              { value: [380, 110], name: 'site2.test2.c...', symbolSize: 60 },
            ],
            itemStyle: {
              color: (params) => {
                const colors = [
                  '#ef4444',
                  '#8b5cf6',
                  '#06b6d4',
                  '#3b82f6',
                  '#f97316',
                  '#a855f7',
                  '#64748b',
                  '#84cc16',
                  '#eab308',
                ];
                return colors[params.dataIndex % colors.length];
              },
              opacity: 0.8,
            },
            label: {
              show: true,
              position: 'inside',
              formatter: '{b}',
              color: '#fff',
              fontSize: 12,
            },
          },
        ],
      };
      chart.setOption(option);

      return () => {
        if (topNPreviewInstance.current) {
          topNPreviewInstance.current.dispose();
        }
      };
    }
  }, [activeTab, selectedTopNStyle]);

  const renderVisualization = () => {
    switch (activeTab) {
      case 'Chart':
        return (
          <div className={styles.chartPreview}>
            <div
              ref={chartPreviewRef}
              style={{ width: '100%', height: '350px' }}
            />
            <defs>
              <linearGradient id="chartGradient1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="chartGradient2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="chartGradient3" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#eab308" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#eab308" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {showTooltip && tooltipData && (
              <div
                className={styles.chartTooltip}
                style={{
                  position: 'absolute',
                  top: `${tooltipData.y}px`,
                  left: `${tooltipData.x}px`,
                }}
              >
                <div className={styles.tooltipDate}>{tooltipData.location}</div>
                <div className={styles.tooltipMetric}>{tooltipData.metric}</div>
                <div className={styles.tooltipValue}>{tooltipData.value}</div>
              </div>
            )}

            {/* Stats Table */}
            <div className={styles.statsTable}>
              <table>
                <thead>
                  <tr>
                    <th>METRIC</th>
                    <th>AVG</th>
                    <th>SUM</th>
                    <th>MIN</th>
                    <th>MAX</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>system.cpu.percent</td>
                    <td>39.39%</td>
                    <td>1536.38%</td>
                    <td>3.53%</td>
                    <td>55.72%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Gauge':
        return (
          <div className={styles.gaugePreview}>
            <div
              ref={gaugePreviewRef}
              style={{ width: '400px', height: '400px' }}
            />
          </div>
        );

      case 'Grid':
        return (
          <div className={styles.gridPreview}>
            <table className={styles.gridTable}>
              <thead>
                <tr>
                  <th>MONITOR</th>
                  <th>SYSTEM.CPU.PERCENT.AVG</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_GRID_DATA.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <span className={styles.monitorLink}>{row.monitor}</span>
                    </td>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'Top N':
        return (
          <div className={styles.topNPreview}>
            {selectedTopNStyle === 'bubble' ? (
              <div
                ref={topNPreviewRef}
                style={{ width: '100%', height: '400px' }}
              />
            ) : (
              <div
                style={{ padding: '20px', textAlign: 'center', color: '#888' }}
              >
                Select bubble style to view chart
              </div>
            )}
          </div>
        );

      case 'Event History':
        return (
          <div className={styles.eventHistoryPreview}>
            <table className={styles.eventTable}>
              <thead>
                <tr>
                  <th>TIMESTAMP</th>
                  <th>MESSAGE</th>
                  <th>REMOTE CITY</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_EVENT_DATA.map((row, index) => (
                  <tr key={index}>
                    <td>{row.timestamp}</td>
                    <td className={styles.messageCell}>{row.message}</td>
                    <td>{row.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'Map':
        return (
          <div className={styles.mapPreview}>
            {selectedMapStyle === 'treemap' ? (
              /* Treemap visualization */
              <svg width="100%" height="400" viewBox="0 0 850 400">
                {/* Country blocks */}
                <rect
                  x="25"
                  y="20"
                  width="180"
                  height="150"
                  fill="#8b5cf6"
                  stroke="#000"
                  strokeWidth="2"
                />
                <text
                  x="115"
                  y="100"
                  fill="#fff"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  Colombia
                </text>

                <rect
                  x="205"
                  y="20"
                  width="200"
                  height="150"
                  fill="#eab308"
                  stroke="#000"
                  strokeWidth="2"
                />
                <text
                  x="305"
                  y="100"
                  fill="#fff"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  The Netherlands
                </text>

                <rect
                  x="405"
                  y="20"
                  width="180"
                  height="150"
                  fill="#a0522d"
                  stroke="#000"
                  strokeWidth="2"
                />
                <text
                  x="495"
                  y="100"
                  fill="#fff"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  Canada
                </text>

                <rect
                  x="585"
                  y="20"
                  width="170"
                  height="150"
                  fill="#22c55e"
                  stroke="#000"
                  strokeWidth="2"
                />
                <text
                  x="670"
                  y="100"
                  fill="#fff"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  United States
                </text>

                <rect
                  x="755"
                  y="20"
                  width="95"
                  height="150"
                  fill="#3b5998"
                  stroke="#000"
                  strokeWidth="2"
                />
                <text
                  x="802"
                  y="100"
                  fill="#fff"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  Denmark
                </text>

                <rect
                  x="25"
                  y="170"
                  width="180"
                  height="210"
                  fill="#06b6d4"
                  stroke="#000"
                  strokeWidth="2"
                />
                <text
                  x="115"
                  y="280"
                  fill="#fff"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  Australia
                </text>

                <rect
                  x="205"
                  y="170"
                  width="170"
                  height="210"
                  fill="#6b8e23"
                  stroke="#000"
                  strokeWidth="2"
                />
                <text
                  x="290"
                  y="280"
                  fill="#fff"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  China
                </text>

                <rect
                  x="375"
                  y="170"
                  width="150"
                  height="210"
                  fill="#8b4513"
                  stroke="#000"
                  strokeWidth="2"
                />
                <text
                  x="450"
                  y="280"
                  fill="#fff"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  Türkiye
                </text>

                <rect
                  x="525"
                  y="170"
                  width="150"
                  height="210"
                  fill="#1e3a5f"
                  stroke="#000"
                  strokeWidth="2"
                />
                <text
                  x="600"
                  y="280"
                  fill="#fff"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  Japan
                </text>

                <rect
                  x="675"
                  y="170"
                  width="175"
                  height="210"
                  fill="#8b2942"
                  stroke="#000"
                  strokeWidth="2"
                />
                <text
                  x="762"
                  y="280"
                  fill="#fff"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  Kazakhstan
                </text>
              </svg>
            ) : (
              /* World Map with markers */
              <>
                <svg
                  width="100%"
                  height="400"
                  viewBox="0 0 900 400"
                  className={styles.worldMap}
                >
                  {/* Simplified world map silhouette */}
                  <path
                    d="M100,150 L150,140 L180,160 L220,155 L250,170 L280,165 L300,150 L350,160 L400,155 L450,170 L500,160 L550,175 L600,165 L650,180 L700,170 L750,185 L800,175 L820,160 L850,170 L870,180 M100,150 L90,180 L95,210 L110,230 L130,250 L150,260 L180,265 L220,260 L250,270 L280,265 L320,275 L360,270 L400,280 L450,275 L500,285 L550,280 L600,290 L650,285 L700,295 L750,290 L800,300 L850,295 L870,280"
                    fill="#2a2a2a"
                    stroke="#3a3a3a"
                    strokeWidth="1"
                  />
                  {/* Location markers */}
                  <circle
                    cx="150"
                    cy="180"
                    r="30"
                    fill="#06b6d4"
                    opacity="0.8"
                  />
                  <circle
                    cx="280"
                    cy="220"
                    r="40"
                    fill="#06b6d4"
                    opacity="0.8"
                  />
                  <circle
                    cx="450"
                    cy="200"
                    r="25"
                    fill="#06b6d4"
                    opacity="0.8"
                  />
                  <circle
                    cx="600"
                    cy="250"
                    r="50"
                    fill="#06b6d4"
                    opacity="0.8"
                  />
                  <circle
                    cx="750"
                    cy="230"
                    r="35"
                    fill="#06b6d4"
                    opacity="0.8"
                  />
                  <circle
                    cx="350"
                    cy="270"
                    r="20"
                    fill="#06b6d4"
                    opacity="0.8"
                  />
                </svg>
                {showTooltip && tooltipData && (
                  <div
                    className={styles.tooltip}
                    style={{ top: tooltipData.y, left: tooltipData.x }}
                  >
                    <div className={styles.tooltipTitle}>
                      {tooltipData.location}
                    </div>
                    <div className={styles.tooltipMetric}>
                      {tooltipData.metric}
                    </div>
                    <div className={styles.tooltipValue}>
                      {tooltipData.value}
                    </div>
                  </div>
                )}
                <div className={styles.mapControls}>
                  <button className={styles.zoomBtn}>+</button>
                  <button className={styles.zoomBtn}>−</button>
                </div>
              </>
            )}
          </div>
        );

      case 'Sankey':
        return (
          <div className={styles.sankeyPreview}>
            <svg width="100%" height="400" viewBox="0 0 850 400">
              {/* Sankey flow diagram */}
              <defs>
                <linearGradient id="flow1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="flow2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="flow3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="flow4" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="flow5" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Flow bands */}
              <path
                d="M 40,50 L 40,90 L 810,120 L 810,140"
                fill="url(#flow1)"
              />
              <path
                d="M 40,90 L 40,140 L 810,140 L 810,180"
                fill="url(#flow2)"
              />
              <path
                d="M 40,140 L 40,190 L 810,180 L 810,240"
                fill="url(#flow3)"
              />
              <path
                d="M 40,190 L 40,260 L 810,240 L 810,300"
                fill="url(#flow4)"
              />
              <path
                d="M 40,260 L 40,320 L 810,300 L 810,350"
                fill="url(#flow5)"
              />

              {/* Labels */}
              <text x="10" y="75" fill="#fff" fontSize="11">
                192.168.1.18
              </text>
              <text x="10" y="125" fill="#fff" fontSize="11">
                192.168.1.236
              </text>
              <text x="10" y="175" fill="#fff" fontSize="11">
                192.168.1.190
              </text>
              <text x="10" y="235" fill="#fff" fontSize="11">
                192.168.1.99
              </text>
              <text x="10" y="300" fill="#fff" fontSize="11">
                192.168.1.187
              </text>

              <text x="820" y="135" fill="#06b6d4" fontSize="11">
                192.168.1.212
              </text>
              <text x="820" y="165" fill="#fbbf24" fontSize="11">
                192.168.1.81
              </text>
              <text x="820" y="215" fill="#ef4444" fontSize="11">
                192.168.1.191
              </text>
              <text x="820" y="275" fill="#8b5cf6" fontSize="11">
                192.168.1.243
              </text>
              <text x="820" y="335" fill="#22c55e" fontSize="11">
                192.168.1.190
              </text>
              <text x="820" y="365" fill="#06b6d4" fontSize="11">
                192.168.1.66
              </text>
              <text x="820" y="390" fill="#06b6d4" fontSize="11">
                192.168.1.50
              </text>
            </svg>
          </div>
        );

      default:
        return (
          <div className={styles.placeholderPreview}>
            <p>{activeTab} visualization will be displayed here</p>
          </div>
        );
    }
  };

  const renderConfigPanel = () => {
    switch (activeTab) {
      case 'Chart':
        return (
          <>
            <div className={styles.configSection}>
              <div className={styles.configTabs}>
                {['Style', 'Sorting', 'Markers', 'Timeline Preference'].map(
                  (tab) => (
                    <button
                      key={tab}
                      className={`${styles.configTab} ${
                        activeStyleTab === tab ? styles.configTabActive : ''
                      }`}
                      onClick={() => setActiveStyleTab(tab)}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>

              {activeStyleTab === 'Style' && (
                <>
                  <div className={styles.styleIcons}>
                    {CHART_STYLES.map((style) => (
                      <button
                        key={style.id}
                        className={`${styles.styleIcon} ${
                          selectedChartStyle === style.id
                            ? styles.styleIconActive
                            : ''
                        }`}
                        onClick={() => setSelectedChartStyle(style.id)}
                      >
                        {renderChartStyleIcon(style.icon)}
                      </button>
                    ))}
                  </div>

                  <div className={styles.configRow}>
                    <div className={styles.configItem}>
                      <label>Rotation</label>
                      <div className={styles.rotationControl}>
                        <Icon icon="mdi:refresh" width={16} height={16} />
                        <input
                          type="number"
                          value={rotation}
                          onChange={(e) => setRotation(e.target.value)}
                          className={styles.rotationInput}
                        />
                        <span>°</span>
                      </div>
                    </div>
                    <div className={styles.configItem}>
                      <label>Legend</label>
                      <label className={styles.toggle}>
                        <input
                          type="checkbox"
                          checked={legend}
                          onChange={(e) => setLegend(e.target.checked)}
                        />
                        <span className={styles.toggleSlider}></span>
                        <span className={styles.toggleLabel}>
                          {legend ? 'ON' : 'OFF'}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className={styles.configItem}>
                    <label>X-Axis Title</label>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={xAxisTitle}
                        onChange={(e) => setXAxisTitle(e.target.checked)}
                      />
                      <span className={styles.toggleSlider}></span>
                      <span className={styles.toggleLabel}>
                        {xAxisTitle ? 'ON' : 'OFF'}
                      </span>
                    </label>
                  </div>

                  <div className={styles.configItem}>
                    <label>Y-Axis Title</label>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={yAxisTitle}
                        onChange={(e) => setYAxisTitle(e.target.checked)}
                      />
                      <span className={styles.toggleSlider}></span>
                      <span className={styles.toggleLabel}>
                        {yAxisTitle ? 'ON' : 'OFF'}
                      </span>
                    </label>
                  </div>

                  <div className={styles.configItem}>
                    <label>Z-Axis Title</label>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={zAxisTitle}
                        onChange={(e) => setZAxisTitle(e.target.checked)}
                      />
                      <span className={styles.toggleSlider}></span>
                      <span className={styles.toggleLabel}>
                        {zAxisTitle ? 'ON' : 'OFF'}
                      </span>
                    </label>
                  </div>

                  <div className={styles.configItem}>
                    <label>Line Width</label>
                    <div className={styles.sliderControl}>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={lineWidth}
                        onChange={(e) => setLineWidth(e.target.value)}
                        className={styles.slider}
                      />
                      <span className={styles.sliderValue}>{lineWidth}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        );

      case 'Gauge':
        return (
          <>
            <div className={styles.configSection}>
              <div className={styles.configTabs}>
                {['Style', 'Threshold'].map((tab) => (
                  <button
                    key={tab}
                    className={`${styles.configTab} ${
                      activeStyleTab === tab ? styles.configTabActive : ''
                    }`}
                    onClick={() => setActiveStyleTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeStyleTab === 'Style' && (
                <>
                  <div className={styles.gaugeStyleIcons}>
                    {GAUGE_STYLES.map((style) => (
                      <button
                        key={style.id}
                        className={`${styles.gaugeStyleIcon} ${
                          selectedGaugeStyle === style.id
                            ? styles.styleIconActive
                            : ''
                        }`}
                        onClick={() => setSelectedGaugeStyle(style.id)}
                      >
                        {style.label || '⊙'}
                      </button>
                    ))}
                  </div>

                  <div className={styles.configItem}>
                    <label>Font Size</label>
                    <div className={styles.fontSizeButtons}>
                      {['Small', 'Medium', 'Large'].map((size) => (
                        <button
                          key={size}
                          className={`${styles.fontSizeBtn} ${
                            fontSize === size ? styles.fontSizeBtnActive : ''
                          }`}
                          onClick={() => setFontSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        );

      case 'Grid':
        return (
          <>
            <div className={styles.configSection}>
              <div className={styles.configTabs}>
                {['Style', 'Column Setting'].map((tab) => (
                  <button
                    key={tab}
                    className={`${styles.configTab} ${
                      activeStyleTab === tab ? styles.configTabActive : ''
                    }`}
                    onClick={() => setActiveStyleTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeStyleTab === 'Style' && (
                <>
                  <div className={styles.gridStyleIcons}>
                    {GRID_STYLES.map((style) => (
                      <button
                        key={style.id}
                        className={`${styles.gridStyleIcon} ${
                          selectedGridStyle === style.id
                            ? styles.styleIconActive
                            : ''
                        }`}
                        onClick={() => setSelectedGridStyle(style.id)}
                      >
                        {style.label || style.icon}
                      </button>
                    ))}
                  </div>

                  <div className={styles.configItem}>
                    <label>Header Font Size</label>
                    <div className={styles.fontSizeButtons}>
                      {['Small', 'Medium', 'Large'].map((size) => (
                        <button
                          key={size}
                          className={`${styles.fontSizeBtn} ${
                            fontSize === size ? styles.fontSizeBtnActive : ''
                          }`}
                          onClick={() => setFontSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        );

      case 'Top N':
        return (
          <>
            <div className={styles.configSection}>
              <div className={styles.configTabs}>
                {['Style', 'Sorting'].map((tab) => (
                  <button
                    key={tab}
                    className={`${styles.configTab} ${
                      activeStyleTab === tab ? styles.configTabActive : ''
                    }`}
                    onClick={() => setActiveStyleTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeStyleTab === 'Style' && (
                <>
                  <div className={styles.topNStyleIcons}>
                    {[
                      'line',
                      'spline',
                      'bar',
                      'column',
                      'pie',
                      'donut',
                      'stacked',
                      'percentage',
                      'bubble',
                    ].map((style, index) => (
                      <button
                        key={style}
                        className={`${styles.topNStyleIcon} ${
                          selectedTopNStyle === style
                            ? styles.styleIconActive
                            : ''
                        }`}
                        onClick={() => setSelectedTopNStyle(style)}
                      >
                        {renderChartStyleIcon(style) || '○'}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        );

      case 'Map':
        return (
          <>
            <div className={styles.configSection}>
              <div className={styles.configTabs}>
                {['Style', 'Timeline Preference'].map((tab) => (
                  <button
                    key={tab}
                    className={`${styles.configTab} ${
                      activeStyleTab === tab ? styles.configTabActive : ''
                    }`}
                    onClick={() => setActiveStyleTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeStyleTab === 'Style' && (
                <>
                  <div className={styles.mapStyleIcons}>
                    <button
                      className={`${styles.mapStyleIcon} ${
                        selectedMapStyle === 'world'
                          ? styles.styleIconActive
                          : ''
                      }`}
                      onClick={() => setSelectedMapStyle('world')}
                      title="World Map"
                    >
                      <Icon icon="mdi:map" width={20} height={20} />
                    </button>
                    <button
                      className={`${styles.mapStyleIcon} ${
                        selectedMapStyle === 'grid'
                          ? styles.styleIconActive
                          : ''
                      }`}
                      onClick={() => setSelectedMapStyle('grid')}
                      title="Grid Map"
                    >
                      ⊞
                    </button>
                    <button
                      className={`${styles.mapStyleIcon} ${
                        selectedMapStyle === 'treemap'
                          ? styles.styleIconActive
                          : ''
                      }`}
                      onClick={() => setSelectedMapStyle('treemap')}
                      title="Treemap"
                    >
                      ▦
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        );

      case 'Sankey':
        return (
          <>
            <div className={styles.configSection}>
              <div className={styles.configTabs}>
                {['Style', 'Timeline Preference'].map((tab) => (
                  <button
                    key={tab}
                    className={`${styles.configTab} ${
                      activeStyleTab === tab ? styles.configTabActive : ''
                    }`}
                    onClick={() => setActiveStyleTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.createWidgetModal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2>Create Widget</h2>
          <div className={styles.headerRight}>
            <div className={styles.timeBadges}>
              <span className={styles.todayBadge}>today</span>
              <span className={styles.currentTime}>Today</span>
            </div>
            <div className={styles.timestamps}>
              <div>Fri, Jun 13, 2025 12:00:00 AM</div>
              <div>Fri, Jun 13, 2025 05:32:22 PM</div>
            </div>
            <button className={styles.closeBtn} onClick={onClose}>
              <Icon icon="mdi:close" width={20} height={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.widgetTabs}>
          {WIDGET_TABS.map((tab) => (
            <button
              key={tab}
              className={`${styles.widgetTab} ${
                activeTab === tab ? styles.widgetTabActive : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className={styles.modalContent}>
          {/* Visualization Area */}
          <div className={styles.visualizationArea}>
            {renderVisualization()}
          </div>

          {/* Config Panel */}
          <div className={styles.configPanel}>
            <div className={styles.configHeader}>
              <input
                type="text"
                placeholder="Widget Name"
                className={styles.widgetNameInput}
              />
              <input
                type="text"
                placeholder="Widget Description"
                className={styles.widgetDescInput}
              />
            </div>
            {renderConfigPanel()}
          </div>
        </div>

        {/* Metric Configuration */}
        <div className={styles.metricConfig}>
          <div className={styles.metricLabel}>Metric</div>
          <div className={styles.metricControls}>
            <div className={styles.metricField}>
              <label>
                Counter <span className={styles.required}>*</span>
              </label>
              <SelectComponent
                value={counter}
                onChange={(e) => setCounter(e.target.value)}
                options={[
                  { value: 'system.cpu.percent', label: 'system.cpu.percent' },
                  {
                    value: 'esxi.disk.latency.ms',
                    label: 'esxi.disk.latency.ms',
                  },
                ]}
                placeholder="Select counter"
              />
            </div>
            <div className={styles.metricField}>
              <label>
                Aggregation <span className={styles.required}>*</span>
              </label>
              <SelectComponent
                value={aggregation}
                onChange={(e) => setAggregation(e.target.value)}
                options={[
                  { value: 'Avg', label: 'Avg' },
                  { value: 'Sum', label: 'Sum' },
                  { value: 'Min', label: 'Min' },
                  { value: 'Max', label: 'Max' },
                ]}
                placeholder="Select aggregation"
              />
            </div>
            <div className={styles.metricField}>
              <label>Source Filter</label>
              <SelectComponent
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                options={[{ value: 'Everywhere', label: 'Everywhere' }]}
                placeholder="Select"
              />
            </div>
            <div className={styles.metricField}>
              <label>Source</label>
              <input type="text" placeholder="Source" />
            </div>
            <div className={styles.metricField}>
              <label>Result By</label>
              <SelectComponent
                value={resultBy}
                onChange={(e) => setResultBy(e.target.value)}
                options={[
                  { value: 'Monitor', label: 'Monitor' },
                  { value: 'esxi.disk', label: 'esxi.disk' },
                ]}
                placeholder="Select"
              />
            </div>
            <button className={styles.addMetricBtn}>
              <Icon icon="mdi:plus" width={18} height={18} />
            </button>
          </div>

          <button className={styles.filtersBtn}>
            <Icon icon="mdi:filter" width={16} height={16} /> Filters
          </button>
        </div>

        {/* Category Buttons */}
        <div className={styles.categoryButtons}>
          {CATEGORY_BUTTONS.map((category) => (
            <button key={category} className={styles.categoryBtn}>
              {category}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <button className={styles.resetBtn}>Reset</button>
          <button className={styles.createBtn}>Create Widget</button>
          <button
            className={styles.createAddBtn}
            onClick={() => {
              const widgetTypeMap = {
                Chart: 'chart',
                'Top N': 'topn',
                Gauge: 'gauge',
                Grid: 'grid',
                'Heat Map': 'heatmap',
                Sankey: 'sankey',
                Map: 'map',
                Stream: 'stream',
                Anomaly: 'anomaly',
                Forecast: 'forecast',
                'Active Alerts': 'activealert',
                'Event History': 'stream',
              };

              const widgetType = widgetTypeMap[activeTab] || 'chart';
              const widgetConfig = {
                type: widgetType,
                title: `${activeTab} Widget`,
                data:
                  activeTab === 'Chart'
                    ? generateChartData()
                    : activeTab === 'Top N'
                    ? generateTopNData()
                    : activeTab === 'Gauge'
                    ? { value: '15.09%' }
                    : undefined,
              };
              if (onAddWidget) {
                onAddWidget(widgetConfig);
              }
            }}
          >
            Create & Add Widget
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWidgetModal;
