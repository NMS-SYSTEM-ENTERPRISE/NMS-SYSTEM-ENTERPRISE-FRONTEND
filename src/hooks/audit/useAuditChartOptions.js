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

export const useAuditChartOptions = (auditEvents = [], analyticsData = null) => {
  return useMemo(() => {
    const bg = getCssVar('--audit-content-bg') || getCssVar('--color-bg-primary') || '#0b0f19';
    const border = getCssVar('--color-border') || 'rgba(255,255,255,0.1)';
    const text = getCssVar('--color-text-primary') || '#f3f4f6';
    const muted = getCssVar('--color-text-muted') || '#6b7280';
    const colors = ['cyan', 'violet', 'rose', 'sky', 'green'];

    let pieData = [];
    let userActivityData = [];

    if (analyticsData) {
      pieData = (analyticsData.top_modules || []).map((item, idx) => ({
        name: item.name,
        value: item.count,
        colorToken: colors[idx % colors.length]
      }));

      userActivityData = (analyticsData.top_users || []).map(item => ({
        name: item.name,
        value: item.count
      }));
    } else {
      // Fallback
      const moduleCounts = auditEvents.reduce((acc, event) => {
        const mod = event.module || 'Unknown';
        acc[mod] = (acc[mod] || 0) + 1;
        return acc;
      }, {});

      pieData = Object.entries(moduleCounts).map(([name, value], idx) => ({
        name,
        value,
        colorToken: colors[idx % colors.length]
      })).sort((a, b) => b.value - a.value).slice(0, 5);

      const userCounts = auditEvents.reduce((acc, event) => {
        const user = event.user || 'Unknown';
        acc[user] = (acc[user] || 0) + 1;
        return acc;
      }, {});

      userActivityData = Object.entries(userCounts).map(([name, value]) => ({
        name,
        value
      })).sort((a, b) => b.value - a.value).slice(0, 5);
    }

    let actionData = [];
    if (analyticsData && analyticsData.top_actions) {
      actionData = analyticsData.top_actions.map((item, idx) => ({
        name: item.name,
        value: item.count,
        colorToken: colors[idx % colors.length]
      }));
    }

    let trendData = [];
    if (analyticsData && analyticsData.trend) {
      trendData = analyticsData.trend;
    }

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

    const actionDistributionOption = {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(11, 15, 25, 0.9)',
        borderColor: border,
        textStyle: { color: text, fontSize: 11 },
      },
      series: [
        {
          name: 'Operations',
          type: 'pie',
          radius: ['20%', '85%'],
          roseType: 'area',
          itemStyle: { borderRadius: 6, borderColor: bg, borderWidth: 2 },
          label: {
            show: true,
            color: muted,
            fontSize: 10,
            formatter: '{b}\n{c}',
          },
          labelLine: { length: 10, length2: 10, lineStyle: { color: border } },
          data: actionData.length > 0 ? actionData.map((item) => ({
            value: item.value,
            name: item.name,
            itemStyle: { color: resolveColor(item.colorToken) },
          })) : [{ value: 1, name: 'No Data', itemStyle: { color: resolveColor('muted') } }],
        },
      ],
    };

    const eventTimelineOption = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(11, 15, 25, 0.95)',
        borderColor: border,
        textStyle: { color: text, fontSize: 11 },
      },
      grid: { left: '2%', right: '5%', top: '10%', bottom: '5%', containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: trendData.map(d => new Date(d.timestamp).toLocaleDateString()),
        axisLine: { lineStyle: { color: border } },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 10 },
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: border, type: 'dashed' } },
        axisLabel: { color: muted, fontSize: 10 },
      },
      series: [
        {
          name: 'Events',
          type: 'line',
          smooth: true,
          showSymbol: false,
          itemStyle: { color: resolveColor('cyan') },
          lineStyle: { width: 3, color: resolveColor('cyan') },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: resolveColor('cyan') },
              { offset: 1, color: 'transparent' },
            ]),
            opacity: 0.2,
          },
          data: trendData.map(d => d.count),
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

    const totalLogs = analyticsData ? analyticsData.total_events : (auditEvents.length || 1);
    const legendData = pieData.map(item => ({
      label: item.name,
      colorToken: item.colorToken,
      percent: Math.round((item.value / totalLogs) * 100) + '%'
    }));

    const totalEvents = analyticsData ? analyticsData.total_events : auditEvents.length;
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
      actionDistributionOption,
      eventTimelineOption,
      getSparklineOption,
      getSummarySparklineOption,
      legendData,
      summaryMetrics,
    };
  }, [auditEvents, analyticsData]);
};
