'use client';

import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import {
  TRAP_SEVERITY_CHART_DATA,
  TRAP_VOLUME_CHART_DATA,
  TRAP_VOLUME_CHART_LABELS,
} from '@/utils/dummy-data/trap-explorer';

const getCssVar = (name) => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

const getSeverityColor = (token) => {
  const map = {
    critical: '--color-danger',
    major: '--color-chart-orange',
    minor: '--color-warning',
    warning: '--color-accent-blue',
    info: '--color-success',
  };
  return getCssVar(map[token] || '--color-text-muted') || '#6b7280';
};

export const useTrapDashboardCharts = (trendsOpen) => {
  const volumeChartRef = useRef(null);
  const severityChartRef = useRef(null);
  const charts = useRef({});

  useEffect(() => {
    if (!trendsOpen) return undefined;

    const timer = setTimeout(() => {
      drawVolumeChart();
      drawSeverityChart();
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
  }, [trendsOpen]);

  const drawVolumeChart = () => {
    if (!volumeChartRef.current) return;
    charts.current.volume?.dispose();

    const chart = echarts.init(volumeChartRef.current);
    charts.current.volume = chart;

    const cyan = getCssVar('--color-chart-cyan') || '#22d3ee';
    const border = getCssVar('--color-border') || 'rgba(255,255,255,0.05)';
    const muted = getCssVar('--color-text-muted') || '#94a3b8';
    const bgSecondary = getCssVar('--color-bg-secondary') || '#0b0f19';
    const textPrimary = getCssVar('--color-text-primary') || '#f3f4f6';

    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: bgSecondary,
        borderColor: border,
        textStyle: { color: textPrimary, fontSize: 11 },
      },
      grid: { left: '0%', right: '0%', bottom: '0%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: TRAP_VOLUME_CHART_LABELS,
        axisLine: { lineStyle: { color: border } },
        axisLabel: { color: muted, fontSize: 10 },
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: border, type: 'dashed' } },
        axisLabel: { color: muted, fontSize: 10 },
      },
      series: [
        {
          name: 'Traps',
          type: 'line',
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 2, color: cyan },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(var(--color-accent-cyan-rgb), 0.15)' },
              { offset: 1, color: 'transparent' },
            ]),
          },
          data: TRAP_VOLUME_CHART_DATA,
        },
      ],
    });
  };

  const drawSeverityChart = () => {
    if (!severityChartRef.current) return;
    charts.current.severity?.dispose();

    const chart = echarts.init(severityChartRef.current);
    charts.current.severity = chart;

    const bgPrimary = getCssVar('--color-bg-primary') || '#0b0f19';

    chart.setOption({
      tooltip: { trigger: 'item' },
      series: [
        {
          name: 'Severity',
          type: 'pie',
          radius: ['60%', '85%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 4, borderColor: bgPrimary, borderWidth: 2 },
          label: { show: false },
          data: TRAP_SEVERITY_CHART_DATA.map((item) => ({
            value: item.value,
            name: item.name,
            itemStyle: { color: getSeverityColor(item.colorToken) },
          })),
        },
      ],
    });
  };

  return { volumeChartRef, severityChartRef };
};
