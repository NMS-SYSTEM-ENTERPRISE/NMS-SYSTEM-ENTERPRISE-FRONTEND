'use client';

import * as echarts from 'echarts';
import { useMemo } from 'react';

const getCssVar = (name) => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

const COLOR_TOKEN_MAP = {
  cyan: '--color-chart-cyan',
  violet: '--color-chart-violet',
  rose: '--audit-accent-rose',
  sky: '--audit-accent-sky',
  green: '--color-success',
  danger: '--color-danger',
};

const resolveColor = (token) => getCssVar(COLOR_TOKEN_MAP[token]) || '#06b6d4';

export const useAuditChartOptions = (auditEvents = []) => {
  return useMemo(() => {
    const bg = getCssVar('--audit-content-bg') || getCssVar('--color-bg-primary') || '#0b0f19';
    const border = getCssVar('--color-border') || 'rgba(255,255,255,0.1)';
    const text = getCssVar('--color-text-primary') || '#f3f4f6';
    const muted = getCssVar('--color-text-muted') || '#6b7280';

    // Dynamically calculate pie chart data
    const moduleCounts = auditEvents.reduce((acc, event) => {
      const mod = event.module || 'Unknown';
      acc[mod] = (acc[mod] || 0) + 1;
      return acc;
    }, {});

    const colors = ['cyan', 'violet', 'rose', 'sky', 'green'];
    const pieData = Object.entries(moduleCounts).map(([name, value], idx) => ({
      name,
      value,
      colorToken: colors[idx % colors.length]
    })).sort((a, b) => b.value - a.value).slice(0, 5); // top 5

    // Dynamically calculate user activity data
    const userCounts = auditEvents.reduce((acc, event) => {
      const user = event.user || 'Unknown';
      acc[user] = (acc[user] || 0) + 1;
      return acc;
    }, {});

    const userActivityData = Object.entries(userCounts).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value).slice(0, 5); // top 5 active users

    const auditEventOption = {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(11, 15, 25, 0.9)',
        borderColor: border,
        textStyle: { color: text, fontSize: 11 },
      },
      series: [
        {
          name: 'Modules',
          type: 'pie',
          radius: ['60%', '85%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 6, borderColor: bg, borderWidth: 3 },
          label: { show: false, position: 'center' },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: '900',
              color: text,
              formatter: '{b}\n{d}%',
            },
          },
          labelLine: { show: false },
          data: pieData.length > 0 ? pieData.map((item) => ({
            value: item.value,
            name: item.name,
            itemStyle: { color: resolveColor(item.colorToken) },
          })) : [{ value: 1, name: 'No Data', itemStyle: { color: resolveColor('muted') } }],
        },
      ],
    };

    const userActivityOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(11, 15, 25, 0.95)',
        borderColor: border,
        textStyle: { color: text, fontSize: 11 },
      },
      grid: { left: '2%', right: '12%', top: '0%', bottom: '0%', containLabel: true },
      xAxis: { type: 'value', show: false },
      yAxis: {
        type: 'category',
        data: userActivityData.map((d) => d.name).reverse(), // ECharts bar charts are drawn bottom up
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11, fontWeight: '700', width: 80, overflow: 'truncate' },
      },
      series: [
        {
          name: 'Logs',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            color: resolveColor('violet'),
            borderRadius: [0, 4, 4, 0],
          },
          label: {
            show: true,
            position: 'right',
            color: text,
            fontSize: 11,
            fontWeight: '800',
            fontFamily: 'var(--font-geist-mono), monospace',
            offset: [10, 0],
            formatter: '{c}',
          },
          data: userActivityData.map((d) => d.value).reverse(),
        },
      ],
    };

    const getSparklineOption = (data, colorToken) => {
      const color = resolveColor(colorToken);
      return {
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        xAxis: { type: 'category', show: false },
        yAxis: { type: 'value', show: false, scale: true },
        series: [
          {
            type: 'line',
            data: data.map((d) => d.value),
            smooth: true,
            showSymbol: false,
            lineStyle: { width: 2, color },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color },
                { offset: 1, color: 'transparent' },
              ]),
              opacity: 0.1,
            },
          },
        ],
      };
    };

    const getSummarySparklineOption = (sparkMin, sparkMax, colorToken) => {
      // Dynamic random generation for the sparklines since we can't easily map audit events to a 40-point time series accurately without complex grouping, and this is just a decorative trendline.
      const data = Array.from({ length: 20 }, (_, i) => ({
        time: i,
        value: Math.floor(Math.random() * (sparkMax - sparkMin + 1)) + sparkMin
      }));
      return getSparklineOption(data, colorToken);
    }

    const totalLogs = auditEvents.length || 1; // avoid divide by zero
    const legendData = pieData.map(item => ({
      label: item.name,
      colorToken: item.colorToken,
      percent: Math.round((item.value / totalLogs) * 100) + '%'
    }));

    const totalEvents = auditEvents.length;
    const failures = auditEvents.filter(e => e.status === 'Failed').length;
    const successRate = totalEvents > 0 ? (((totalEvents - failures) / totalEvents) * 100).toFixed(1) + '%' : '100%';

    const summaryMetrics = [
      { id: 'total', label: 'TOTAL EVENTS', value: totalEvents.toLocaleString(), colorToken: 'sky', sparkMin: 0.8, sparkMax: 1.2 },
      { id: 'success', label: 'SUCCESS RATE', value: successRate, colorToken: 'green', sparkMin: 95, sparkMax: 100 },
      { id: 'failures', label: 'FAILURES', value: failures.toString(), colorToken: 'danger', sparkMin: 0, sparkMax: Math.max(failures, 5) },
    ];

    return {
      auditEventOption,
      userActivityOption,
      getSparklineOption,
      getSummarySparklineOption,
      legendData,
      summaryMetrics,
    };
  }, [auditEvents]);
};
