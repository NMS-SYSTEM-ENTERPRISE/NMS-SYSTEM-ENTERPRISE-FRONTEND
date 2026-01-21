"use client";
import { PerformanceAccordion } from '@/components/features/dashboard/performance-accordion';
import { ResourceAccordion } from '@/components/features/dashboard/resource-accordion';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

const cpuMonitorData = [
  {
    monitor: 'WIN-SQLSVR2025',
    value: '82.08%',
    sparkline: [45, 52, 48, 60, 58, 65, 70, 68, 75, 82, 80, 85, 82, 80, 78, 82],
    color: 'var(--color-chart-orange)',
  },
  {
    monitor: 'moduledata01928',
    value: '54.99%',
    sparkline: [30, 35, 32, 40, 45, 48, 52, 50, 54, 55, 52, 58, 54, 52, 50, 54],
    color: 'var(--color-chart-orange-light)',
  },
  {
    monitor: 'WIN-SQLSVR2011',
    value: '43.76%',
    sparkline: [25, 28, 30, 35, 38, 40, 42, 45, 43, 46, 44, 48, 43, 42, 40, 43],
    color: 'var(--color-chart-orange)',
  },
  {
    monitor: 'WIN-crmTempServ01U',
    value: '40.73%',
    sparkline: [20, 25, 28, 32, 35, 38, 40, 42, 40, 43, 41, 45, 40, 38, 36, 40],
    color: 'var(--color-chart-orange-light)',
  },
];

const memoryMonitorData = [
  {
    monitor: 'WL3.ML',
    value: '89.72%',
    sparkline: [65, 70, 68, 72, 75, 78, 80, 82, 85, 87, 89, 90, 89, 88, 87, 89],
    color: 'var(--color-chart-purple)',
  },
  {
    monitor: 'indmediaapp2',
    value: '89.23%',
    sparkline: [60, 65, 68, 70, 72, 75, 78, 80, 83, 85, 87, 90, 89, 87, 86, 89],
    color: 'var(--color-chart-purple-light)',
  },
  {
    monitor: 'WIN-LISPSAD0001',
    value: '89.23%',
    sparkline: [55, 60, 63, 67, 70, 73, 76, 78, 81, 84, 86, 88, 89, 88, 87, 89],
    color: 'var(--color-chart-purple)',
  },
  {
    monitor: 'crm-web',
    value: '--------',
    sparkline: [],
  },
];

const droppedPacketsData = [
  { monitor: 'disputed-42', interface: 'wir0/0', packets: '0', sparkline: [5, 2, 8, 4, 9, 3, 7, 2, 6, 4], color: '#ef4444' },
  { monitor: 'isbaon', interface: 'wir0/0', packets: '0', sparkline: [3, 6, 2, 8, 4, 7, 3, 5, 2, 6], color: '#ef4444' },
  {
    monitor: 'WIN-crmTendServ01U',
    interface: 'useDock2 Pseudo-Int...',
    packets: '0',
    sparkline: [2, 4, 6, 3, 7, 2, 5, 8, 3, 4],
    color: '#ef4444'
  },
  { monitor: 'ethernet5', interface: '<Ethernet [Drvdli]>', packets: '0', sparkline: [4, 2, 7, 3, 6, 8, 2, 5, 3, 7], color: '#ef4444' },
];

const latencyMonitorData = [
  {
    monitor: '8.8.8.8',
    value: '12 ms',
    sparkline: [8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 12, 11, 10, 12],
    color: '#ef4444',
  },
  {
    monitor: 'WIN-crmTempServ01U',
    value: '12 ms',
    sparkline: [7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 12, 11, 10, 12],
    color: '#ef4444',
  },
  {
    monitor: 'ultra-db',
    value: '7 ms',
    sparkline: [4, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 7, 6, 5, 7],
    color: '#ef4444',
  },
  {
    monitor: 'mgpi.mwbd.com',
    value: '8 ms',
    sparkline: [5, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 8, 7, 6, 8],
    color: '#ef4444',
  },
];

const diskIOPSData = [
  {
    monitor: 'mcsyspchs2028',
    value: '2387',
    sparkline: [
      1800, 1900, 2000, 2100, 2200, 2300, 2400, 2350, 2300, 2250, 2300, 2350,
      2387,
    ],
    color: '#8b5cf6',
  },
  {
    monitor: 'eqmodel',
    value: '476',
    sparkline: [
      350, 380, 400, 420, 440, 460, 476, 470, 465, 460, 465, 470, 476,
    ],
    color: '#8b5cf6',
  },
  {
    monitor: 'ecmasansbsnp',
    value: '362',
    sparkline: [
      280, 300, 320, 340, 350, 360, 362, 360, 358, 355, 358, 360, 362,
    ],
    color: '#8b5cf6',
  },
  {
    monitor: 'deut640',
    value: '283',
    sparkline: [
      220, 240, 250, 260, 270, 280, 283, 282, 280, 278, 280, 282, 283,
    ],
    color: '#8b5cf6',
  },
  {
    monitor: 'mcsdepehs2020',
    value: '145',
    sparkline: [
      100, 110, 120, 130, 140, 145, 143, 142, 140, 138, 140, 143, 145,
    ],
    color: '#8b5cf6',
  },
];

const networkPacketsData = [
  {
    monitor: 'disputed-42',
    interface: 'wir0/0',
    packets: '2907920',
    sparkline: [
      2000000, 2200000, 2400000, 2600000, 2700000, 2800000, 2850000, 2900000,
      2907920,
    ],
    color: 'var(--color-chart-green)',
  },
  {
    monitor: 'isbaon',
    interface: 'useDock2 Pseudo-Int...',
    packets: '0',
    sparkline: [],
  },
  {
    monitor: 'WIN-crmTendServ01U',
    interface: '<Ethernet [Drvdli]>',
    packets: '0',
    sparkline: [],
  },
  {
    monitor: 'ethernet5',
    interface: 'in',
    packets: '0',
    sparkline: [],
  },
];

const bytesPerSecData = [
  {
    monitor: 'disputed-42',
    value: '1.2 MB/s',
    sparkline: [800, 900, 850, 1000, 1100, 1050, 1200, 1150, 1250, 1200],
    color: '#06b6d4',
  },
  {
    monitor: 'isbaon',
    value: '850 KB/s',
    sparkline: [600, 700, 650, 750, 800, 780, 820, 800, 850, 840],
    color: '#06b6d4',
  },
  {
    monitor: 'WIN-crmTendServ01U',
    value: '500 KB/s',
    sparkline: [300, 400, 350, 450, 480, 460, 500, 490, 510, 500],
    color: '#06b6d4',
  },
  {
    monitor: 'ethernet5',
    value: '120 KB/s',
    sparkline: [80, 100, 90, 110, 115, 110, 120, 118, 122, 120],
    color: '#06b6d4',
  },
];

const diskUsageData = [
  { name: 'sqlvm 60.6%', value: 606, color: '#ef4444' },
  { name: 'bangalore 37.6%', value: 376, color: '#f97316' },
  { name: 'bngdevhyp01 14.98%', value: 1498, color: '#22c55e' },
  { name: 'mediahouse 10.45%', value: 1045, color: '#eab308' },
  { name: 'WIN-IIS2A00005 24.85%', value: 2485, color: '#a855f7' },
  { name: 'devmachine01 8.84%', value: 884, color: '#ec4899' },
  { name: 'EFSN1-SS 58.43%', value: 5843, color: '#3b82f6' },
];

const diskSpaceData = [
  { name: 'www.corpTendServ 4.76%', value: 43, color: '#ef4444' },
  { name: 'chennai-web 39.43%', value: 39, color: '#f97316' },
  { name: 'sqlvm 22.48%', value: 22, color: '#22c55e' },
  { name: 'bngdevhyp01 30.49%', value: 30, color: '#eab308' },
  { name: 'mediahouse 28.48%', value: 28, color: '#a855f7' },
  { name: 'devadmin-corp 38.33%', value: 38, color: '#06b6d4' },
];

// Network Infrastructure Widgets Data (kept for reference)

const networkAlertSummary = [
  { label: 'Down', count: 54, color: '#ef4444', percentage: 25 },
  { label: 'Up', count: 322, color: '#22c55e', percentage: 75 },
  { label: 'Down', count: 6, color: '#ef4444', percentage: 15 },
  { label: 'Major', count: 6, color: '#f97316', percentage: 15 },
  { label: 'Warning', count: 4, color: '#fbbf24', percentage: 10 },
  { label: 'Clear', count: 502, color: '#22c55e', percentage: 90 },
];

const deviceAvailabilityData = [
  { monitor: 'Up Devices', value: 45, color: '#22c55e' },
  { monitor: 'Down Devices', value: 2, color: '#ef4444' },
  { monitor: 'Warning Devices', value: 5, color: '#f97316' },
];

const networkDeviceDowntime = [
  {
    monitor: '10.10.20.5',
    downtime: '2d 4h 12m',
    sparkline: [10, 15, 12, 18, 20, 25, 22, 28, 30, 35],
    color: '#ef4444',
  },
  {
    monitor: '192.168.1.100',
    downtime: '1d 2h 30m',
    sparkline: [5, 8, 6, 10, 12, 15, 14, 18, 20, 22],
    color: '#ef4444',
  },
  {
    monitor: 'Switch-Core-01',
    downtime: '5h 45m',
    sparkline: [2, 4, 3, 5, 6, 8, 7, 9, 10, 12],
    color: '#ef4444',
  },
  {
    monitor: 'Firewall-Main',
    downtime: '1h 20m',
    sparkline: [1, 2, 1, 3, 2, 4, 3, 5, 4, 6],
    color: '#ef4444',
  },
];

const topNetworkDevicesByCPU = [
  { name: '18ke2.like2: 24.83%', value: 2483, color: '#06b6d4' },
  { name: 'HB2.HB2.com: 23.92%', value: 2392, color: '#eab308' },
  { name: 'HB3.hb3.com: 23.83%', value: 2383, color: '#84cc16' },
  { name: 'cisco2960.snr-edatas.local: 19.61%', value: 1961, color: '#f97316' },
  { name: 'bgp2.bgp2.com: 18.59%', value: 1859, color: '#ef4444' },
  { name: 'bgp1.bgp1.com: 18.56%', value: 1856, color: '#a855f7' },
  { name: 'rsl.hb1.com: 18.24%', value: 1824, color: '#3b82f6' },
  { name: 'fg_firewall.miotdanny.com: 3.08%', value: 308, color: '#22c55e' },
  { name: 'cisco_core.snr-edatas.local: 1.84%', value: 184, color: '#64748b' },
];

const networkMemoryUsage = [
  {
    label: '90%',
    segments: [
      { value: 5, color: '#ec4899' },
      { value: 3, color: '#8b5cf6' },
      { value: 2, color: '#06b6d4' },
      { value: 90, color: 'transparent' },
    ],
  },
  {
    label: '85%',
    segments: [
      { value: 5, color: '#ec4899' },
      { value: 5, color: '#8b5cf6' },
      { value: 5, color: '#f97316' },
      { value: 70, color: 'transparent' },
    ],
  },
  {
    label: '80%',
    segments: [
      { value: 1, color: '#8b5cf6' },
      { value: 99, color: 'transparent' },
    ],
  },
  {
    label: '75%',
    segments: [{ value: 100, color: 'transparent' }],
  },
];

const Index = () => {
  const router = useRouter();

  // Chart refs
  const diskUsageChartRef = useRef(null);
  const diskSpaceChartRef = useRef(null);
  const deviceAvailabilityChartRef = useRef(null);
  const deviceLatencyChartRef = useRef(null);
  const deviceCPUChartRef = useRef(null);

  // Chart instances
  const diskUsageChartInstance = useRef(null);
  const diskSpaceChartInstance = useRef(null);
  const deviceAvailabilityChartInstance = useRef(null);
  const deviceLatencyChartInstance = useRef(null);
  const deviceCPUChartInstance = useRef(null);

  const createArc = (percentage) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const dashArray = `${(percentage / 100) * circumference} ${circumference}`;
    return dashArray;
  };

  // Disk Usage Pie Chart
  function initDiskUsageChart() {
    if (!diskUsageChartRef.current) return;
    if (diskUsageChartInstance.current)
      diskUsageChartInstance.current.dispose();

    const chart = echarts.init(diskUsageChartRef.current);
    diskUsageChartInstance.current = chart;

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        borderColor: '#374151',
        borderWidth: 1,
        textStyle: { color: '#f3f4f6', fontSize: 12 },
        padding: [8, 12],
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: '5%',
        top: 'middle',
        height: '80%',
        textStyle: {
          color: '#9ca3af',
          fontSize: 12,
        },
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 12,
        icon: 'circle',
        pageIconColor: '#06b6d4',
        pageIconInactiveColor: '#4b5563',
        pageTextStyle: { color: '#9ca3af' },
        formatter: (name) => {
          const maxLength = 18;
          return name.length > maxLength
            ? name.substring(0, maxLength) + '...'
            : name;
        },
      },
      series: [
        {
          name: 'Disk Usage',
          type: 'pie',
          radius: ['45%', '70%'], // Donut chart
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 4,
            borderColor: '#111827',
            borderWidth: 2,
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold',
              color: '#fff',
              formatter: '{d}%'
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
            scale: true,
            scaleSize: 5,
          },
          data: diskUsageData.map((item) => ({
            name: item.name,
            value: item.value,
            itemStyle: { color: item.color },
          })),
        },
      ],
    };

    chart.setOption(option);
    const resizeHandler = () => chart.resize();
    window.addEventListener('resize', resizeHandler);
  }

  // Disk Space Pie Chart
  function initDiskSpaceChart() {
    if (!diskSpaceChartRef.current) return;
    if (diskSpaceChartInstance.current)
      diskSpaceChartInstance.current.dispose();

    const chart = echarts.init(diskSpaceChartRef.current);
    diskSpaceChartInstance.current = chart;

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderColor: '#444',
        borderWidth: 1,
        textStyle: { color: '#fff', fontSize: 12 },
        padding: [8, 12],
      },
      legend: {
        orient: 'vertical',
        right: '5%',
        top: 'center',
        textStyle: {
          color: '#999',
          fontSize: 11,
          lineHeight: 16,
        },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 8,
        icon: 'circle',
        formatter: (name) => {
          const maxLength = 22;
          return name.length > maxLength
            ? name.substring(0, maxLength) + '...'
            : name;
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '75%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 6,
            borderColor: '#1a1a1a',
            borderWidth: 2,
          },
          label: { show: false },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#fff',
            },
            itemStyle: {
              shadowBlur: 15,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
            },
            scale: true,
            scaleSize: 8,
          },
          data: diskSpaceData.map((item) => ({
            name: item.name,
            value: item.value,
            itemStyle: { color: item.color },
          })),
        },
      ],
    };

    chart.setOption(option);
    const resizeHandler = () => chart.resize();
    window.addEventListener('resize', resizeHandler);
  }

  // Network Device Availability Chart
  function initDeviceAvailabilityChart() {
    if (!deviceAvailabilityChartRef.current) return;
    if (deviceAvailabilityChartInstance.current)
      deviceAvailabilityChartInstance.current.dispose();

    const chart = echarts.init(deviceAvailabilityChartRef.current);
    deviceAvailabilityChartInstance.current = chart;

    const data = [
      { value: 45, name: 'Up', itemStyle: { color: '#22c55e' } },
      { value: 2, name: 'Down', itemStyle: { color: '#ef4444' } },
      { value: 5, name: 'Warning', itemStyle: { color: '#f97316' } },
    ];
    const total = data.reduce((sum, item) => sum + item.value, 0);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        borderColor: '#374151',
        textStyle: { color: '#f3f4f6' }
      },
      legend: {
        bottom: '5%',
        left: 'center',
        textStyle: { color: '#9ca3af' },
        itemWidth: 10,
        itemHeight: 10,
        icon: 'circle'
      },
      series: [
        {
          name: 'Availability',
          type: 'pie',
          radius: ['60%', '80%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
              color: '#f3f4f6',
              formatter: '{b}\n{c}'
            },
            scale: true,
            scaleSize: 5
          },
          labelLine: { show: false },
          data: data
        },
        // Inner text for total
        {
          type: 'pie',
          radius: ['0%', '0%'],
          center: ['50%', '45%'],
          silent: true,
          label: {
            show: true,
            position: 'center',
            formatter: `{total|${total}}\n{text|Total}`,
            rich: {
              total: {
                fontSize: 24,
                fontWeight: 'bold',
                color: '#f3f4f6',
                lineHeight: 30
              },
              text: {
                fontSize: 12,
                color: '#9ca3af'
              }
            }
          },
          data: [{ value: 0 }]
        }
      ]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
  }

  // Network Device Latency Chart (Punch Card / Bubble Heatmap)
  function initDeviceLatencyChart() {
    if (!deviceLatencyChartRef.current) return;
    if (deviceLatencyChartInstance.current)
      deviceLatencyChartInstance.current.dispose();

    const chart = echarts.init(deviceLatencyChartRef.current);
    deviceLatencyChartInstance.current = chart;

    const hours = ['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p'];
    const days = ['Dev-01', 'Dev-02', 'Dev-03', 'Dev-04', 'Dev-05', 'Dev-06', 'Dev-07'];

    const data = [];
    for (let i = 0; i < days.length; i++) {
      for (let j = 0; j < hours.length; j++) {
        const latency = Math.floor(Math.random() * 80 + 10); // 10-90ms
        data.push([j, i, latency]);
      }
    }

    const option = {
      tooltip: {
        position: 'top',
        formatter: function (params) {
          return (
            days[params.value[1]] +
            ' @ ' +
            hours[params.value[0]] +
            '<br/>Latency: ' +
            params.value[2] +
            ' ms'
          );
        },
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        borderColor: '#374151',
        textStyle: { color: '#f3f4f6' }
      },
      grid: {
        left: '2%',
        bottom: '5%',
        right: '5%',
        top: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: hours,
        boundaryGap: false,
        splitLine: {
          show: true,
          lineStyle: { color: '#374151', type: 'dashed' }
        },
        axisLine: { show: false },
        axisLabel: { color: '#9ca3af' }
      },
      yAxis: {
        type: 'category',
        data: days,
        axisLine: { show: false },
        axisLabel: { color: '#9ca3af' },
        splitLine: { show: false }
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '0%',
        show: false, // Hide the visual map control for a cleaner look
        inRange: {
          color: ['#22c55e', '#eab308', '#ef4444'] // Green -> Yellow -> Red
        }
      },
      series: [
        {
          name: 'Latency',
          type: 'scatter',
          symbolSize: function (val) {
            return val[2] / 3; // Scale bubble size
          },
          data: data,
          animationDelay: function (idx) {
            return idx * 5;
          },
          itemStyle: {
             shadowBlur: 10,
             shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        }
      ]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
  }

  // Top Network Devices by CPU Chart
  function initDeviceCPUChart() {
    if (!deviceCPUChartRef.current) return;
    if (deviceCPUChartInstance.current)
      deviceCPUChartInstance.current.dispose();

    const chart = echarts.init(deviceCPUChartRef.current);
    deviceCPUChartInstance.current = chart;

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderColor: '#444',
        borderWidth: 1,
        textStyle: { color: '#fff', fontSize: 12 },
        padding: [8, 12],
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: '3%',
        top: 'center',
        height: '80%',
        textStyle: {
          color: '#999',
          fontSize: 10,
          lineHeight: 14,
        },
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 6,
        icon: 'circle',
        pageIconColor: '#06b6d4',
        pageIconInactiveColor: '#555',
        pageTextStyle: {
          color: '#999',
          fontSize: 10,
        },
        formatter: (name) => {
          const maxLength = 20;
          return name.length > maxLength
            ? name.substring(0, maxLength) + '...'
            : name;
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['32%', '50%'],
          itemStyle: {
            borderRadius: 6,
            borderColor: '#1a1a1a',
            borderWidth: 2,
          },
          label: { show: false },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold',
              color: '#fff',
            },
            itemStyle: {
              shadowBlur: 15,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
            },
            scale: true,
            scaleSize: 8,
          },
          data: topNetworkDevicesByCPU.map((item) => ({
            name: item.name,
            value: item.value,
            itemStyle: { color: item.color },
          })),
        },
      ],
    };

    chart.setOption(option);
    const resizeHandler = () => chart.resize();
    window.addEventListener('resize', resizeHandler);
  }

  const packetsChartRef = useRef(null);
  const packetsChartInstance = useRef(null);

  // Network Interface In/Out Packets Chart (Bi-directional Area)
  function initPacketsChart() {
    if (!packetsChartRef.current) return;
    if (packetsChartInstance.current)
      packetsChartInstance.current.dispose();

    const chart = echarts.init(packetsChartRef.current);
    packetsChartInstance.current = chart;

    const categories = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    // Generate realistic traffic pattern
    const inData = categories.map(() => Math.floor(Math.random() * 50 + 20));
    const outData = categories.map(() => -Math.floor(Math.random() * 40 + 15)); // Negative for mirroring

    const option = {
      color: ['#10b981', '#06b6d4'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: { color: '#9ca3af', type: 'dashed' }
        },
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        borderColor: '#374151',
        textStyle: { color: '#f3f4f6' },
        formatter: (params) => {
          let result = `${params[0].name}<br/>`;
          params.forEach((item) => {
            const value = Math.abs(item.value); // Show positive value
            const color = item.color;
            result += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>`;
            result += `${item.seriesName}: <b>${value} MB</b><br/>`;
          });
          return result;
        }
      },
      legend: {
        data: ['In Traffic', 'Out Traffic'],
        bottom: '0%',
        textStyle: { color: '#9ca3af' },
        icon: 'roundRect'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '5%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: categories,
          axisLine: { lineStyle: { color: '#374151' } },
          axisLabel: { color: '#9ca3af' }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            color: '#9ca3af',
            formatter: (value) => Math.abs(value) // Show absolute values on axis
          },
          splitLine: {
            lineStyle: { color: '#374151', type: 'dashed', opacity: 0.5 }
          }
        }
      ],
      series: [
        {
          name: 'In Traffic',
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: { color: '#10b981' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(16, 185, 129, 0.8)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.1)' }
            ])
          },
          data: inData
        },
        {
          name: 'Out Traffic',
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: { color: '#06b6d4' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(6, 182, 212, 0.1)' },
              { offset: 1, color: 'rgba(6, 182, 212, 0.8)' }
            ])
          },
          data: outData
        }
      ]
    };

    chart.setOption(option);
    const resizeHandler = () => chart.resize();
    window.addEventListener('resize', resizeHandler);
  }

  const interfaceAvailabilityChartRef = useRef(null);
  const interfaceAvailabilityChartInstance = useRef(null);
  const networkAlertSummaryChartRef = useRef(null);
  const networkAlertSummaryChartInstance = useRef(null);

  // Network Interface Availability Chart
  function initInterfaceAvailabilityChart() {
    if (!interfaceAvailabilityChartRef.current) return;
    if (interfaceAvailabilityChartInstance.current)
      interfaceAvailabilityChartInstance.current.dispose();

    const chart = echarts.init(interfaceAvailabilityChartRef.current);
    interfaceAvailabilityChartInstance.current = chart;

    const data = [
      { value: 85, name: 'Up', itemStyle: { color: '#22c55e' } },
      { value: 10, name: 'Down', itemStyle: { color: '#ef4444' } },
      { value: 5, name: 'Warning', itemStyle: { color: '#f97316' } },
    ];
    const total = data.reduce((sum, item) => sum + item.value, 0);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        borderColor: '#374151',
        textStyle: { color: '#f3f4f6' }
      },
      legend: {
        bottom: '5%',
        left: 'center',
        textStyle: { color: '#9ca3af' },
        itemWidth: 10,
        itemHeight: 10,
        icon: 'circle'
      },
      series: [
        {
          name: 'Interface Availability',
          type: 'pie',
          radius: ['60%', '80%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          data: data
        },
        {
          type: 'pie',
          radius: ['0%', '0%'],
          center: ['50%', '45%'],
          silent: true,
          label: {
            show: true,
            position: 'center',
            formatter: `{total|${total}}\n{text|Total}`,
            rich: {
              total: { fontSize: 24, fontWeight: 'bold', color: '#f3f4f6', lineHeight: 30 },
              text: { fontSize: 12, color: '#9ca3af' }
            }
          },
          data: [{ value: 0 }]
        }
      ]
    };

    chart.setOption(option);
    const resizeHandler = () => chart.resize();
    window.addEventListener('resize', resizeHandler);
  }

  // Network Alert Summary Chart
  function initNetworkAlertSummaryChart() {
    if (!networkAlertSummaryChartRef.current) return;
    if (networkAlertSummaryChartInstance.current)
      networkAlertSummaryChartInstance.current.dispose();

    const chart = echarts.init(networkAlertSummaryChartRef.current);
    networkAlertSummaryChartInstance.current = chart;

    const data = [
      { value: 12, name: 'Critical', itemStyle: { color: '#ef4444' } },
      { value: 25, name: 'Major', itemStyle: { color: '#f97316' } },
      { value: 45, name: 'Minor', itemStyle: { color: '#eab308' } },
      { value: 80, name: 'Warning', itemStyle: { color: '#3b82f6' } },
    ];
    const total = data.reduce((sum, item) => sum + item.value, 0);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        borderColor: '#374151',
        textStyle: { color: '#f3f4f6' }
      },
      legend: {
        bottom: '5%',
        left: 'center',
        textStyle: { color: '#9ca3af' },
        itemWidth: 10,
        itemHeight: 10,
        icon: 'circle'
      },
      series: [
        {
          name: 'Alert Summary',
          type: 'pie',
          radius: ['60%', '80%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          data: data
        },
        {
          type: 'pie',
          radius: ['0%', '0%'],
          center: ['50%', '45%'],
          silent: true,
          label: {
            show: true,
            position: 'center',
            formatter: `{total|${total}}\n{text|Total}`,
            rich: {
              total: { fontSize: 24, fontWeight: 'bold', color: '#f3f4f6', lineHeight: 30 },
              text: { fontSize: 12, color: '#9ca3af' }
            }
          },
          data: [{ value: 0 }]
        }
      ]
    };

    chart.setOption(option);
    const resizeHandler = () => chart.resize();
    window.addEventListener('resize', resizeHandler);
  }

  // Initialize all ECharts
  useEffect(() => {
    initDiskUsageChart();
    initDiskSpaceChart();
    initDeviceAvailabilityChart();
    initDeviceLatencyChart();
    initDeviceCPUChart();
    initPacketsChart();
    initInterfaceAvailabilityChart();
    initNetworkAlertSummaryChart();

    // Cleanup
    return () => {
      if (diskUsageChartInstance.current)
        diskUsageChartInstance.current.dispose();
      if (diskSpaceChartInstance.current)
        diskSpaceChartInstance.current.dispose();
      if (deviceAvailabilityChartInstance.current)
        deviceAvailabilityChartInstance.current.dispose();
      if (deviceLatencyChartInstance.current)
        deviceLatencyChartInstance.current.dispose();
      if (deviceCPUChartInstance.current)
        deviceCPUChartInstance.current.dispose();
      if (packetsChartInstance.current) packetsChartInstance.current.dispose();
      if (interfaceAvailabilityChartInstance.current) interfaceAvailabilityChartInstance.current.dispose();
      if (networkAlertSummaryChartInstance.current) networkAlertSummaryChartInstance.current.dispose();
    };
  }, []);

  return (
    <div className={styles.dashboard}>
      <main className={styles.dashboard_content}>
        {/* First Row - CPU, Tables, Memory */}
        {/* Unified Performance Matrix */}
        <div className={styles.dashboard_performance_wrapper} style={{ marginBottom: 'var(--gap-md)' }}>
           <PerformanceAccordion 
             cpuGroupData={[
               { label: 'SQL Server', value: 79.07 },
               { label: 'Server + Windows', value: 70.56 },
               { label: 'Windows IIS', value: 69.65 },
               { label: 'Microsoft IIS', value: 55.7 },
               { label: 'Active Directory', value: 55.7 },
               { label: 'Network Core', value: 17.3 },
               { label: 'Switch Stack A', value: 14.26 },
               { label: 'Switch Stack B', value: 13.08 },
             ]}
             cpuTopData={cpuMonitorData}
             memoryGroupData={[
               { label: 'Active Directory', value: 12.62 },
               { label: 'Microsoft IIS', value: 12.62 },
               { label: 'Server + Linux', value: 12.5 },
               { label: 'Server', value: 12.36 },
               { label: 'Server + Windows', value: 6.00 },
               { label: 'Windows IIS', value: 5.33 },
               { label: 'SQL Server', value: 5.23 },
               { label: 'Server + Solaris', value: 4.11 },
             ]}
             memoryTopData={memoryMonitorData}
             droppedPacketsData={droppedPacketsData}
             latencyData={latencyMonitorData}
           />
        </div>

        {/* Unified Resource Metrics */}
        <div className={styles.dashboard_performance_wrapper}>
          <ResourceAccordion 
            diskUsageData={diskUsageData}
            lowDiskSpaceData={diskSpaceData}
            errorPacketsData={droppedPacketsData}
            networkPacketsData={networkPacketsData}
            networkBytesData={bytesPerSecData}
            deviceAvailabilityData={deviceAvailabilityData}
            deviceDowntimeData={networkDeviceDowntime}
          />
        </div>


      </main>

      {/* Add Widget Button */}
      <button
        className={styles.addWidgetBtn}
        onClick={() => router.push('/dashboard/custom')}
        title="Create Custom Dashboard"
      >
        <FiPlus size={24} />
      </button>
    </div>
  );
};

export default Index;
