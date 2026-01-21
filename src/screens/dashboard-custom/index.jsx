"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

// All Widget Categories with colors for visual recognition
const WIDGET_CATEGORIES = [
  {
    category: 'Graph',
    widgets: [
      { id: 'chart', name: 'Chart', icon: 'mdi:chart-line', color: '#06b6d4' },
      {
        id: 'topN',
        name: 'Top N',
        icon: 'mdi:format-list-numbered',
        color: '#3b82f6',
      },
      { id: 'gauge', name: 'Gauge', icon: 'mdi:gauge', color: '#8b5cf6' },
      {
        id: 'sunburst',
        name: 'Sunburst',
        icon: 'mdi:chart-donut-variant',
        color: '#f59e0b',
      },
      { id: 'pie', name: 'Pie', icon: 'mdi:chart-pie', color: '#f59e0b' },
      {
        id: 'queryValue',
        name: 'Query Value',
        icon: 'mdi:numeric-1-box',
        color: '#10b981',
      },
      {
        id: 'themeRiver',
        name: 'ThemeRiver',
        icon: 'mdi:chart-bell-curve-cumulative',
        color: '#14b8a6',
      },
      {
        id: 'sankey',
        name: 'Sankey',
        icon: 'mdi:chart-sankey',
        color: '#6366f1',
      },
    ],
  },
  {
    category: 'Alert / Availability',
    widgets: [
      { id: 'heatMap', name: 'Heat Map', icon: 'mdi:grid', color: '#ef4444' },
      {
        id: 'stream',
        name: 'Stream',
        icon: 'mdi:chart-timeline-variant',
        color: '#f97316',
      },
      {
        id: 'activeAlert',
        name: 'Active Alert',
        icon: 'mdi:alert-circle',
        color: '#dc2626',
      },
    ],
  },
  {
    category: 'Map',
    widgets: [
      {
        id: 'treeMap',
        name: 'Tree Map',
        icon: 'mdi:file-tree',
        color: '#84cc16',
      },
      { id: 'map', name: 'Map', icon: 'mdi:map-marker', color: '#22c55e' },
    ],
  },
  {
    category: 'AI / ML',
    widgets: [
      {
        id: 'anomaly',
        name: 'Anomaly',
        icon: 'mdi:chart-bell-curve',
        color: '#a855f7',
      },
      {
        id: 'forecast',
        name: 'Forecast',
        icon: 'mdi:chart-timeline-variant-shimmer',
        color: '#d946ef',
      },
    ],
  },
];

// Chart Styles (8 types)
const CHART_STYLES = [
  { id: 'area', name: 'Area', icon: 'mdi:chart-areaspline' },
  { id: 'line', name: 'Line', icon: 'mdi:chart-line' },
  { id: 'bar', name: 'Bar', icon: 'mdi:chart-bar' },
  { id: 'column', name: 'Column', icon: 'mdi:chart-bar' },
  { id: 'spline', name: 'Spline', icon: 'mdi:chart-line-variant' },
  { id: 'step', name: 'Step', icon: 'mdi:chart-line-stacked' },
  { id: 'stacked', name: 'Stacked', icon: 'mdi:chart-areaspline' },
  {
    id: 'percentage',
    name: 'Percentage',
    icon: 'mdi:chart-areaspline-variant',
  },
];

// Sunburst Styles
const SUNBURST_STYLES = [
  { id: 'basic', name: 'Basic Sunburst', icon: 'mdi:chart-donut' },
  { id: 'rounded', name: 'Rounded Corner', icon: 'mdi:chart-donut-variant' },
  { id: 'rotate', name: 'Label Rotate', icon: 'mdi:format-rotate-90' },
  { id: 'monochrome', name: 'Monochrome', icon: 'mdi:palette-outline' },
  { id: 'visualMap', name: 'VisualMap', icon: 'mdi:gradient' },
];

// Top N Styles
const TOP_N_STYLES = [
  { id: 'bar', name: 'Bar Chart', icon: 'mdi:chart-bar' },
  { id: 'horizontalBar', name: 'Horizontal Bar', icon: 'mdi:chart-bar-stacked' },
  { id: 'lollipop', name: 'Lollipop', icon: 'mdi:chart-scatter-plot' },
  { id: 'funnel', name: 'Funnel', icon: 'mdi:filter-variant' },
];

// Grid Styles
const GRID_STYLES = [
  { id: 'grid', name: '12/16', icon: 'mdi:grid' },
  { id: 'table', name: 'Table', icon: 'mdi:table' },
];

// Map Styles
const MAP_STYLES = [
  { id: 'bubble', name: 'Bubble', icon: 'mdi:circle-multiple' },
  { id: 'heat', name: 'Heat', icon: 'mdi:fire' },
  { id: 'marker', name: 'Marker', icon: 'mdi:map-marker' },
];

// Tree Map Styles
const TREE_MAP_STYLES = [
  { id: 'diskUsage', name: 'Disk Usage', icon: 'mdi:harddisk' },
  { id: 'sunburst', name: 'Transition to Sunburst', icon: 'mdi:chart-donut-variant' },
  { id: 'moneySpent', name: 'How $3.7 Trillion is Spent', icon: 'mdi:cash-multiple' },
  { id: 'parentLabels', name: 'Show Parent Labels', icon: 'mdi:label-outline' },
  { id: 'basic', name: 'Basic Treemap', icon: 'mdi:file-tree' },
];

// Heat Map Styles
const HEAT_MAP_STYLES = [
  { id: 'heatmapCartesian', name: 'Heatmap on Cartesian', icon: 'mdi:grid' },
  { id: 'heatmap20k', name: 'Heatmap - 20K data', icon: 'mdi:chart-scatter-plot-hexbin' },
  { id: 'heatmapDiscrete', name: 'Discrete Mapping', icon: 'mdi:gradient' },
  { id: 'calendarHeatmap', name: 'Calendar Heatmap', icon: 'mdi:calendar-month' },
  { id: 'calendarVertical', name: 'Calendar Vertical', icon: 'mdi:calendar-range' },
];

// Pie Styles
const PIE_STYLES = [
  { id: 'pie', name: 'Pie Chart', icon: 'mdi:chart-pie' },
  { id: 'doughnut', name: 'Doughnut Chart', icon: 'mdi:chart-donut' },
  { id: 'rose', name: 'Nightingale Rose', icon: 'mdi:chart-bubble' },
];

// ThemeRiver Styles
const THEME_RIVER_STYLES = [
  { id: 'themeRiver', name: 'ThemeRiver', icon: 'mdi:chart-bell-curve-cumulative' },
];

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

const CATEGORY_BUTTONS = [
  'Metric',
  'Availability',
  'Log',
  'Flow',
  'Alert',
  'APM',
  'NetRoute',
];

// Widget Preview Component
const WidgetPreview = ({ activeTab, widgetForm }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Generate Dummy Data based on activeTab
  const getDummyData = () => {
    const times = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const values = Array.from({ length: 24 }, () => Math.floor(Math.random() * 100));
    
    // For Multi-series
    const series2 = Array.from({ length: 24 }, () => Math.floor(Math.random() * 100));
    
    return { times, values, series2 };
  };

  useEffect(() => {
    // Handle Grid/Table views separately (non-ECharts)
    if (['Grid', 'Active Alerts', 'Event History'].includes(activeTab)) {
        if (chartInstance.current) {
            chartInstance.current.dispose();
            chartInstance.current = null;
        }
        return;
    }

    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const { times, values, series2 } = getDummyData();
    let option = {};

    // Common Chart Configuration
    const commonGrid = { left: 40, right: 40, top: 40, bottom: 40, containLabel: true };
    const commonTooltip = { trigger: 'axis', backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: '#374151', textStyle: { color: '#fff' } };
    const commonXAxis = { 
        type: 'category', 
        data: times, 
        axisLine: { lineStyle: { color: '#4b5563' } },
        axisLabel: { color: '#9ca3af' },
        name: widgetForm.xAxisTitle ? 'Time' : '',
        nameTextStyle: { color: '#9ca3af' }
    };
    const commonYAxis = { 
        type: 'value', 
        splitLine: { lineStyle: { color: '#374151', type: 'dashed' } },
        axisLabel: { color: '#9ca3af' },
        name: widgetForm.yAxisTitle ? 'Value' : '',
        nameTextStyle: { color: '#9ca3af' }
    };

    switch (activeTab) {
      case 'Chart':
      case 'Stream': // Simplified as area chart for now
        option = {
          backgroundColor: 'transparent',
          tooltip: commonTooltip,
          legend: { show: widgetForm.legend, textStyle: { color: '#9ca3af' }, bottom: 0 },
          grid: commonGrid,
          xAxis: commonXAxis,
          yAxis: commonYAxis,
          series: [
            {
              name: 'Metric A',
              type: widgetForm.style === 'bar' || widgetForm.style === 'column' ? 'bar' : 'line',
              data: values,
              smooth: true,
              showSymbol: widgetForm.showMarkers,
              lineStyle: { width: widgetForm.lineWidth, color: '#06b6d4' },
              areaStyle: widgetForm.area ? { opacity: 0.2, color: '#06b6d4' } : null,
              itemStyle: { color: '#06b6d4' }
            },
            {
              name: 'Metric B',
              type: widgetForm.style === 'bar' || widgetForm.style === 'column' ? 'bar' : 'line',
              data: series2,
              smooth: true,
              showSymbol: widgetForm.showMarkers,
              lineStyle: { width: widgetForm.lineWidth, color: '#8b5cf6' },
              areaStyle: widgetForm.area ? { opacity: 0.2, color: '#8b5cf6' } : null,
              itemStyle: { color: '#8b5cf6' }
            }
          ]
        };
        break;

      case 'Top N':
        const topNData = [
            { name: 'Host A', value: 95 },
            { name: 'Host B', value: 82 },
            { name: 'Host C', value: 74 },
            { name: 'Host D', value: 65 },
            { name: 'Host E', value: 43 },
        ];
        option = {
            backgroundColor: 'transparent',
            tooltip: { trigger: 'item', backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: '#374151', textStyle: { color: '#fff' } },
            grid: commonGrid,
            xAxis: { type: 'value', splitLine: { show: false }, axisLabel: { color: '#9ca3af' } },
            yAxis: { type: 'category', data: topNData.map(d => d.name), axisLabel: { color: '#9ca3af' } },
            series: [{
                type: 'bar',
                data: topNData.map(d => d.value),
                itemStyle: { borderRadius: [0, 4, 4, 0], color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: '#06b6d4' }, { offset: 1, color: '#3b82f6' }]) },
                label: { show: true, position: 'right', color: '#fff' }
            }]
        };
        break;

      case 'Gauge':
        option = {
            backgroundColor: 'transparent',
            series: [{
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 100,
                splitNumber: 5,
                itemStyle: { color: '#06b6d4' },
                progress: { show: true, width: 18 },
                pointer: { show: false },
                axisLine: { lineStyle: { width: 18, color: [[1, '#374151']] } },
                axisTick: { show: false },
                splitLine: { length: 12, lineStyle: { width: 2, color: '#999' } },
                axisLabel: { distance: 20, color: '#999', fontSize: 10 },
                title: { show: false },
                detail: { valueAnimation: true, fontSize: 40, color: '#fff', offsetCenter: [0, '30%'], formatter: '{value}%' },
                data: [{ value: 75 }]
            }]
        };
        break;

      case 'Heat Map':
        const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const heatData = [];
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 24; j++) {
                heatData.push([j, i, Math.floor(Math.random() * 100)]);
            }
        }
        option = {
            backgroundColor: 'transparent',
            tooltip: { position: 'top', backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: '#374151', textStyle: { color: '#fff' } },
            grid: { height: '70%', top: '10%' },
            xAxis: { type: 'category', data: hours, splitArea: { show: true }, axisLabel: { color: '#9ca3af' } },
            yAxis: { type: 'category', data: days, splitArea: { show: true }, axisLabel: { color: '#9ca3af' } },
            visualMap: { min: 0, max: 100, calculable: true, orient: 'horizontal', left: 'center', bottom: '0%', inRange: { color: ['#374151', '#06b6d4', '#ef4444'] }, textStyle: { color: '#9ca3af' } },
            series: [{ type: 'heatmap', data: heatData, label: { show: false }, itemStyle: { borderColor: '#1f2937' } }]
        };
        break;

      case 'Sankey':
        option = {
            backgroundColor: 'transparent',
            tooltip: { trigger: 'item', triggerOn: 'mousemove', backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: '#374151', textStyle: { color: '#fff' } },
            series: [{
                type: 'sankey',
                data: [{ name: 'Source' }, { name: 'Process A' }, { name: 'Process B' }, { name: 'Target' }],
                links: [
                    { source: 'Source', target: 'Process A', value: 5 },
                    { source: 'Source', target: 'Process B', value: 3 },
                    { source: 'Process A', target: 'Target', value: 5 },
                    { source: 'Process B', target: 'Target', value: 3 }
                ],
                emphasis: { focus: 'adjacency' },
                lineStyle: { color: 'gradient', curveness: 0.5 },
                label: { color: '#fff' }
            }]
        };
        break;

      case 'Anomaly':
        const anomalyData = values.map((v, i) => {
            if (i === 10 || i === 18) return { value: v + 50, itemStyle: { color: '#ef4444' }, symbolSize: 10 };
            return v;
        });
        option = {
            backgroundColor: 'transparent',
            tooltip: commonTooltip,
            xAxis: commonXAxis,
            yAxis: commonYAxis,
            series: [{
                type: 'line',
                data: anomalyData,
                smooth: true,
                lineStyle: { color: '#06b6d4' },
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                }
            }]
        };
        break;

      case 'Forecast':
        const history = values.slice(0, 18);
        const forecast = [...Array(18).fill(null), values[17], ...values.slice(18)];
        option = {
            backgroundColor: 'transparent',
            tooltip: commonTooltip,
            xAxis: commonXAxis,
            yAxis: commonYAxis,
            legend: { data: ['History', 'Forecast'], textStyle: { color: '#9ca3af' }, bottom: 0 },
            series: [
                { name: 'History', type: 'line', data: history, smooth: true, lineStyle: { color: '#06b6d4' } },
                { name: 'Forecast', type: 'line', data: forecast, smooth: true, lineStyle: { type: 'dashed', color: '#f59e0b' } }
            ]
        };
        break;
        
      case 'Pie':
        option = {
            backgroundColor: 'transparent',
            tooltip: { trigger: 'item', backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: '#374151', textStyle: { color: '#fff' } },
            legend: { top: '5%', left: 'center', textStyle: { color: '#9ca3af' } },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: { borderRadius: 10, borderColor: '#1f2937', borderWidth: 2 },
                    label: { show: false, position: 'center' },
                    emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold', color: '#fff' } },
                    labelLine: { show: false },
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ]
                }
            ]
        };
        break;

      default:
        // Default to simple line chart
        option = {
            backgroundColor: 'transparent',
            xAxis: commonXAxis,
            yAxis: commonYAxis,
            series: [{ type: 'line', data: values, lineStyle: { color: '#06b6d4' } }]
        };
    }

    chartInstance.current.setOption(option);

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, [activeTab, widgetForm]);

  // Render Table for Grid types
  if (['Grid', 'Active Alerts', 'Event History'].includes(activeTab)) {
      return (
          <div className={styles.previewTableContainer}>
              <table className={styles.previewTable}>
                  <thead>
                      <tr>
                          <th>Severity</th>
                          <th>Time</th>
                          <th>Source</th>
                          <th>Message</th>
                      </tr>
                  </thead>
                  <tbody>
                      {[1, 2, 3, 4, 5].map(i => (
                          <tr key={i}>
                              <td>
                                  <span className={styles.statusBadge} style={{backgroundColor: i === 1 ? '#ef4444' : i === 2 ? '#f97316' : '#22c55e'}}>
                                      {i === 1 ? 'Critical' : i === 2 ? 'Major' : 'Normal'}
                                  </span>
                              </td>
                              <td>2025-12-05 10:30:{i}0</td>
                              <td>192.168.1.{100+i}</td>
                              <td>CPU usage high on server-0{i}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      );
  }

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

const DashboardCustom = () => {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [activeTab, setActiveTab] = useState('Chart');
  const [configTab, setConfigTab] = useState('Style');
  const [widgets, setWidgets] = useState([]);
  const [activeHeaderAction, setActiveHeaderAction] = useState(null);

  // Comprehensive Widget Configuration State
  const [widgetForm, setWidgetForm] = useState({
    // Common
    name: '',
    description: '',
    counter: 'system.cpu.percent',
    aggregation: 'avg',
    sourceFilter: 'everywhere',
    source: '',
    resultBy: '',
    selectedCategory: 'Metric',

    // Chart specific
    style: 'area',
    rotation: 0,
    xAxisTitle: false,
    yAxisTitle: false,
    zAxisTitle: false,
    legend: false,
    lineWidth: 2,
    showMarkers: true,
    area: true,
    timelinePreference: 'default',

    // Grid specific
    gridStyle: 'grid',
    headerFontSize: 'Small',
    resizable: true,
    sortable: true,
    orderable: true,
    columnWidth: 0,
    
    // Gauge specific
    thresholds: [
      { type: 'critical', operator: 'gt', value: 0, color: '#ef4444' },
      { type: 'major', operator: 'gt', value: 0, color: '#f97316' },
      { type: 'warning', operator: 'gt', value: 0, color: '#eab308' },
    ],

    // Map specific
    mapStyle: 'bubble',
    showZoomControls: true,

    // Sankey specific
    sankeyOrientation: 'horizontal',
  });

  const handleAddWidget = (widget) => {
    setSelectedWidget(widget);
    setActiveTab(widget.name);
    setShowCreateModal(true);
    resetForm();
  };

  const handleCreateWidget = () => {
    const newWidget = {
      id: Date.now(),
      type: activeTab, // Use the active tab name as the type (e.g., 'Chart', 'Top N')
      title: widgetForm.name || `New ${activeTab}`,
      config: { ...widgetForm },
    };
    setWidgets([...widgets, newWidget]);
    setShowCreateModal(false);
    resetForm();
  };

  const handleDeleteWidget = (widgetId) => {
    setWidgets(widgets.filter((w) => w.id !== widgetId));
  };

  const resetForm = () => {
    setWidgetForm({
      name: '',
      description: '',
      counter: 'system.cpu.percent',
      aggregation: 'avg',
      sourceFilter: 'everywhere',
      source: '',
      resultBy: '',
      selectedCategory: 'Metric',
      style: 'area',
      rotation: 0,
      xAxisTitle: false,
      yAxisTitle: false,
      zAxisTitle: false,
      legend: false,
      lineWidth: 2,
      showMarkers: true,
      area: true,
      timelinePreference: 'default',
      gridStyle: 'grid',
      headerFontSize: 'Small',
      resizable: true,
      sortable: true,
      orderable: true,
      columnWidth: 0,
      thresholds: [
        { type: 'critical', operator: 'gt', value: 0, color: '#ef4444' },
        { type: 'major', operator: 'gt', value: 0, color: '#f97316' },
        { type: 'warning', operator: 'gt', value: 0, color: '#eab308' },
      ],
      mapStyle: 'bubble',
      showZoomControls: true,
      sankeyOrientation: 'horizontal',
    });
    setConfigTab('Style');
  };

  const updateFormField = (field, value) => {
    setWidgetForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.dashboardCustom}>
      {/* Left Sidebar for Widgets */}
      <div className={styles.dashboardSidebar}>
        <div className={styles.sidebarHeader}>
          <Icon icon="mdi:view-grid-plus" width={24} />
          <span>Widgets</span>
        </div>
        <div className={styles.sidebarContent}>
          {WIDGET_CATEGORIES.map((category) => (
            <div key={category.category} className={styles.sidebarCategory}>
              <h3>{category.category}</h3>
              <div className={styles.sidebarGrid}>
                {category.widgets.map((widget) => (
                  <button
                    key={widget.id}
                    className={styles.sidebarWidgetBtn}
                    onClick={() => handleAddWidget(widget)}
                    title={widget.name}
                  >
                    <Icon
                      icon={widget.icon}
                      width={24}
                      style={{ color: widget.color }}
                    />
                    <span>{widget.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Dashboard Area */}
      <div className={styles.mainArea}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.backBtn} onClick={() => router.push('/')}>
              <Icon icon="mdi:arrow-left" width={20} />
            </button>
            <div className={styles.breadcrumb}>
              <Icon icon="mdi:view-dashboard" width={20} />
              <span>pmg_test</span>
              <Icon icon="mdi:star-outline" width={16} />
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.timeRange}>
              <span className={styles.todayBadge}>today</span>
              <span>Today</span>
            </div>
            <button className={styles.iconBtn}>
              <Icon icon="mdi:calendar" width={20} />
            </button>
            <button 
              className={`${styles.iconBtn} ${activeHeaderAction === 'edit' ? styles.iconBtnActive : ''}`}
              onClick={() => setActiveHeaderAction('edit')}
            >
              <Icon icon="mdi:pencil" width={20} />
            </button>
            <button 
              className={`${styles.iconBtn} ${activeHeaderAction === 'share' ? styles.iconBtnActive : ''}`}
              onClick={() => setActiveHeaderAction('share')}
            >
              <Icon icon="mdi:share-variant" width={20} />
            </button>
            <button 
              className={`${styles.iconBtn} ${activeHeaderAction === 'more' ? styles.iconBtnActive : ''}`}
              onClick={() => setActiveHeaderAction('more')}
            >
              <Icon icon="mdi:dots-vertical" width={20} />
            </button>
          </div>
        </header>

        {/* Timeline */}
        <div className={styles.timeline}>
          <div className={styles.timelineBar}></div>
        </div>

        {/* Canvas */}
        <div className={styles.canvas}>
          {widgets.length === 0 ? (
            <div className={styles.emptyState}>
              <Icon icon="mdi:widgets-outline" width={80} />
              <h3>No widgets added yet</h3>
              <p>Select a widget from the sidebar to get started</p>
            </div>
          ) : (
            <div className={styles.widgetGrid}>
              {widgets.map((widget) => (
                <div key={widget.id} className={styles.widgetCard}>
                    <div className={styles.widgetHeader}>
                        <h3>{widget.title}</h3>
                        <div className={styles.widgetActions}>
                            <button onClick={() => handleDeleteWidget(widget.id)}>
                                <Icon icon="mdi:close" width={16} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.widgetBody}>
                        <WidgetPreview activeTab={widget.type} widgetForm={widget.config} />
                    </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Widget Modal */}
      {showCreateModal && (
        <CreateWidgetModal
          selectedWidget={selectedWidget}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          configTab={configTab}
          setConfigTab={setConfigTab}
          widgetForm={widgetForm}
          updateFormField={updateFormField}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateWidget}
          onReset={resetForm}
        />
      )}
    </div>
  );
};

// Create Widget Modal Component
const CreateWidgetModal = ({
  selectedWidget,
  activeTab,
  setActiveTab,
  configTab,
  setConfigTab,
  widgetForm,
  updateFormField,
  onClose,
  onCreate,
  onReset,
}) => {
  const getStyleOptions = () => {
    switch (activeTab) {
      case 'Chart': return CHART_STYLES;
      case 'Top N': return TOP_N_STYLES;
      case 'Grid': return GRID_STYLES;
      case 'Map': return MAP_STYLES;
      case 'Heat Map': return HEAT_MAP_STYLES;
      case 'Tree Map': return TREE_MAP_STYLES;
      case 'Pie': return PIE_STYLES;
      case 'ThemeRiver': return THEME_RIVER_STYLES;
      case 'Sunburst': return SUNBURST_STYLES;
      default: return CHART_STYLES;
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.createModal}>
        <div className={styles.modalHeader}>
          <h2>Create Widget</h2>
          <div className={styles.modalHeaderRight}>
            <button className={styles.closeBtn} onClick={onClose}>
              <Icon icon="mdi:close" width={24} />
            </button>
          </div>
        </div>

        {/* Widget Type Tabs */}
        <div className={styles.modalTabs}>
          {WIDGET_TABS.map((tab) => (
            <button
              key={tab}
              className={`${styles.modalTab} ${
                activeTab === tab ? styles.modalTabActive : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.modalBody}>
          {/* Left: Preview */}
          <div className={styles.previewSection}>
            <div className={styles.chartPreview}>
               <WidgetPreview activeTab={activeTab} widgetForm={widgetForm} />
            </div>
          </div>

          {/* Right: Configuration */}
          <div className={styles.configSection}>
            <div className={styles.configTabs}>
              {['Style', 'Data', 'Settings'].map((tab) => (
                <button
                  key={tab}
                  className={`${styles.configTab} ${
                    configTab === tab ? styles.configTabActive : ''
                  }`}
                  onClick={() => setConfigTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className={styles.configContent}>
              {configTab === 'Style' && (
                <div className={styles.configOptions}>
                  <div className={styles.formGroup}>
                    <label>Widget Style</label>
                    <div className={styles.styleGrid}>
                      {getStyleOptions().map((style) => (
                        <button
                          key={style.id}
                          className={`${styles.styleCard} ${
                            widgetForm.style === style.id ? styles.styleCardActive : ''
                          }`}
                          onClick={() => updateFormField('style', style.id)}
                        >
                          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'}}>
                            <Icon icon={style.icon} width={24} />
                            <span style={{fontSize: '10px'}}>{style.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Rotation</label>
                    <div className={styles.rotationControl}>
                        <input 
                            type="number" 
                            value={widgetForm.rotation} 
                            onChange={(e) => updateFormField('rotation', parseInt(e.target.value))}
                            className={styles.numberInput}
                        />
                        <div className={styles.sliderControl}>
                            <input 
                                type="range" 
                                min="0" 
                                max="360" 
                                value={widgetForm.rotation} 
                                onChange={(e) => updateFormField('rotation', parseInt(e.target.value))}
                                className={styles.slider}
                            />
                        </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Line Width</label>
                    <div className={styles.sliderControl}>
                        <input 
                            type="range" 
                            min="1" 
                            max="10" 
                            value={widgetForm.lineWidth} 
                            onChange={(e) => updateFormField('lineWidth', parseInt(e.target.value))}
                            className={styles.slider}
                        />
                        <span>{widgetForm.lineWidth}px</span>
                    </div>
                  </div>

                  <div className={styles.togglesGrid}>
                    <label className={styles.toggle}>
                        <input 
                            type="checkbox" 
                            checked={widgetForm.legend} 
                            onChange={(e) => updateFormField('legend', e.target.checked)} 
                        />
                        <span className={styles.toggleSlider}></span>
                        <span className={styles.toggleLabel}>Legend</span>
                    </label>
                    <label className={styles.toggle}>
                        <input 
                            type="checkbox" 
                            checked={widgetForm.xAxisTitle} 
                            onChange={(e) => updateFormField('xAxisTitle', e.target.checked)} 
                        />
                        <span className={styles.toggleSlider}></span>
                        <span className={styles.toggleLabel}>X-Axis Title</span>
                    </label>
                    <label className={styles.toggle}>
                        <input 
                            type="checkbox" 
                            checked={widgetForm.yAxisTitle} 
                            onChange={(e) => updateFormField('yAxisTitle', e.target.checked)} 
                        />
                        <span className={styles.toggleSlider}></span>
                        <span className={styles.toggleLabel}>Y-Axis Title</span>
                    </label>
                    <label className={styles.toggle}>
                        <input 
                            type="checkbox" 
                            checked={widgetForm.zAxisTitle} 
                            onChange={(e) => updateFormField('zAxisTitle', e.target.checked)} 
                        />
                        <span className={styles.toggleSlider}></span>
                        <span className={styles.toggleLabel}>Z-Axis Title</span>
                    </label>
                    <label className={styles.toggle}>
                        <input 
                            type="checkbox" 
                            checked={widgetForm.showMarkers} 
                            onChange={(e) => updateFormField('showMarkers', e.target.checked)} 
                        />
                        <span className={styles.toggleSlider}></span>
                        <span className={styles.toggleLabel}>Markers</span>
                    </label>
                    <label className={styles.toggle}>
                        <input 
                            type="checkbox" 
                            checked={widgetForm.area} 
                            onChange={(e) => updateFormField('area', e.target.checked)} 
                        />
                        <span className={styles.toggleSlider}></span>
                        <span className={styles.toggleLabel}>Area</span>
                    </label>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Timeline Preference</label>
                    <SelectComponent
                        options={[
                            { value: 'default', label: 'Default' },
                            { value: 'custom', label: 'Custom' }
                        ]}
                        value={widgetForm.timelinePreference}
                        onChange={(e) => updateFormField('timelinePreference', e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Sorting</label>
                    <SelectComponent
                        options={[
                            { value: 'none', label: 'None' },
                            { value: 'asc', label: 'Ascending' },
                            { value: 'desc', label: 'Descending' }
                        ]}
                        value={widgetForm.sorting || 'none'}
                        onChange={(e) => updateFormField('sorting', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {configTab === 'Data' && (
                <div className={styles.configOptions}>
                  <div className={styles.formGroup}>
                    <label>Metric <span className={styles.required}>*</span></label>
                    <input 
                        type="text" 
                        value={widgetForm.counter} 
                        onChange={(e) => updateFormField('counter', e.target.value)}
                        className={styles.input}
                        placeholder="Search metric..."
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Aggregation <span className={styles.required}>*</span></label>
                    <SelectComponent
                        options={[
                            { value: 'avg', label: 'Avg' },
                            { value: 'max', label: 'Max' },
                            { value: 'min', label: 'Min' },
                            { value: 'sum', label: 'Sum' }
                        ]}
                        value={widgetForm.aggregation}
                        onChange={(e) => updateFormField('aggregation', e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Source Filter</label>
                    <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input 
                                type="radio" 
                                name="sourceFilter" 
                                value="everywhere"
                                checked={widgetForm.sourceFilter === 'everywhere'}
                                onChange={(e) => updateFormField('sourceFilter', e.target.value)}
                            />
                            Everywhere
                        </label>
                        <label className={styles.radioLabel}>
                            <input 
                                type="radio" 
                                name="sourceFilter" 
                                value="source"
                                checked={widgetForm.sourceFilter === 'source'}
                                onChange={(e) => updateFormField('sourceFilter', e.target.value)}
                            />
                            Source
                        </label>
                    </div>
                  </div>

                  {widgetForm.sourceFilter === 'source' && (
                      <div className={styles.formGroup}>
                        <label>Source</label>
                        <input 
                            type="text" 
                            value={widgetForm.source} 
                            onChange={(e) => updateFormField('source', e.target.value)}
                            className={styles.input}
                            placeholder="Enter source..."
                        />
                      </div>
                  )}

                  <div className={styles.formGroup}>
                    <label>Result By</label>
                    <SelectComponent
                        options={[
                            { value: 'host', label: 'Host' },
                            { value: 'service', label: 'Service' }
                        ]}
                        value={widgetForm.resultBy}
                        onChange={(e) => updateFormField('resultBy', e.target.value)}
                        placeholder="Select result by"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Filters</label>
                    <div className={styles.filterTags}>
                        {CATEGORY_BUTTONS.map(cat => (
                            <button 
                                key={cat} 
                                className={`${styles.filterTag} ${widgetForm.selectedCategory === cat ? styles.filterTagActive : ''}`}
                                onClick={() => updateFormField('selectedCategory', cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {configTab === 'Settings' && (
                <div className={styles.configOptions}>
                  <div className={styles.formGroup}>
                    <label>Widget Name</label>
                    <input 
                        type="text" 
                        value={widgetForm.name} 
                        onChange={(e) => updateFormField('name', e.target.value)}
                        className={styles.input}
                        placeholder="Enter widget name"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Widget Description</label>
                    <textarea 
                        value={widgetForm.description} 
                        onChange={(e) => updateFormField('description', e.target.value)}
                        className={styles.textarea}
                        placeholder="Enter widget description"
                        rows={4}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.modalBottom}>
            <button className={styles.secondaryBtn} onClick={onReset}>Reset</button>
            <button className={styles.primaryBtn} onClick={onCreate}>Create Widget</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCustom;
