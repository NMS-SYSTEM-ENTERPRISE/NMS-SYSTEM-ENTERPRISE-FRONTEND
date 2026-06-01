'use client';

import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { ALERT_PIE_CHART_DATA, ALERT_POLICY_BAR_DATA } from '@/utils/dummy-data/alerts';

const getCssVar = (name) => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

const getPieColor = (token) => {
  const map = {
    cyan: ['--color-chart-cyan', '--color-chart-teal'],
    indigo: ['--color-chart-indigo', '--color-chart-purple'],
    success: ['--color-chart-green', '--color-success'],
  };
  const [from, to] = map[token] || map.cyan;
  return [getCssVar(from) || '#06b6d4', getCssVar(to) || '#0891b2'];
};

export const useAlertsCharts = (analyticsOpen) => {
  const overviewPieRef = useRef(null);
  const policyBarRef = useRef(null);
  const charts = useRef({});

  useEffect(() => {
    if (!analyticsOpen) return undefined;

    const timer = setTimeout(() => {
      drawPieChart();
      drawBarChart();
    }, 200);

    const handleResize = () => {
      Object.values(charts.current).forEach((c) => c?.resize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      Object.values(charts.current).forEach((c) => c?.dispose());
      charts.current = {};
    };
  }, [analyticsOpen]);

  const drawPieChart = () => {
    if (!overviewPieRef.current) return;
    charts.current.pie?.dispose();

    const chart = echarts.init(overviewPieRef.current);
    charts.current.pie = chart;

    const bg = getCssVar('--color-bg-primary') || '#0b0f19';
    const border = getCssVar('--color-border') || 'rgba(255,255,255,0.1)';
    const text = getCssVar('--color-text-primary') || '#f3f4f6';

    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: bg,
        borderColor: border,
        textStyle: { color: text, fontSize: 11 },
      },
      series: [
        {
          type: 'pie',
          radius: ['62%', '88%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 6, borderColor: bg, borderWidth: 3 },
          label: { show: false },
          data: ALERT_PIE_CHART_DATA.map((item) => {
            const [c1, c2] = getPieColor(item.colorToken);
            return {
              value: item.value,
              name: item.name,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: c1 },
                  { offset: 1, color: c2 },
                ]),
              },
            };
          }),
        },
      ],
    });
  };

  const drawBarChart = () => {
    if (!policyBarRef.current) return;
    charts.current.bar?.dispose();

    const chart = echarts.init(policyBarRef.current);
    charts.current.bar = chart;

    const bg = getCssVar('--color-bg-primary') || '#0b0f19';
    const border = getCssVar('--color-border') || 'rgba(255,255,255,0.1)';
    const muted = getCssVar('--color-text-muted') || '#94a3b8';
    const danger = getCssVar('--color-danger') || '#e11d48';
    const warning = getCssVar('--color-warning') || '#d97706';
    const warnLight = getCssVar('--color-chart-yellow') || '#ca8a04';

    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: bg,
        borderColor: border,
        textStyle: { color: getCssVar('--color-text-primary'), fontSize: 11 },
      },
      grid: { left: '0', right: '0', bottom: '0', top: '20', containLabel: true },
      xAxis: {
        type: 'category',
        data: ALERT_POLICY_BAR_DATA.categories,
        axisLine: { lineStyle: { color: border } },
        axisLabel: { color: muted, fontSize: 10, fontWeight: 600 },
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: border, type: 'dashed' } },
        axisLabel: { color: muted, fontSize: 10 },
      },
      series: [
        {
          name: 'Critical',
          type: 'bar',
          stack: 'total',
          barWidth: 32,
          data: ALERT_POLICY_BAR_DATA.critical,
          itemStyle: { color: danger },
        },
        {
          name: 'Major',
          type: 'bar',
          stack: 'total',
          data: ALERT_POLICY_BAR_DATA.major,
          itemStyle: { color: warning },
        },
        {
          name: 'Warning',
          type: 'bar',
          stack: 'total',
          data: ALERT_POLICY_BAR_DATA.warning,
          itemStyle: { color: warnLight, borderRadius: [4, 4, 0, 0] },
        },
      ],
    });
  };

  return { overviewPieRef, policyBarRef };
};
