'use client';

import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const getCssVar = (name) => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

const withAlpha = (color, alpha) => {
  if (!color) return `rgba(0, 0, 0, ${alpha})`;
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const normalized = hex.length === 3
      ? hex.split('').map((char) => char + char).join('')
      : hex;
    const value = Number.parseInt(normalized, 16);
    const red = (value >> 16) & 255;
    const green = (value >> 8) & 255;
    const blue = value & 255;
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  }
  return color;
};

export const useAlertDetailCharts = (analyticsOpen) => {
  const trendChartRef = useRef(null);
  const countChartRef = useRef(null);
  const charts = useRef({});

  useEffect(() => {
    if (!analyticsOpen) return undefined;

    const timer = setTimeout(() => {
      drawTrendChart();
      drawCountChart();
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

  const drawTrendChart = () => {
    if (!trendChartRef.current) return;
    charts.current.trend?.dispose();

    const chart = echarts.init(trendChartRef.current);
    charts.current.trend = chart;

    const border = getCssVar('--color-border') || 'rgba(255,255,255,0.05)';
    const muted = getCssVar('--color-text-muted') || '#94a3b8';
    const cyan = getCssVar('--color-chart-cyan') || '#06b6d4';
    const danger = getCssVar('--color-danger') || '#ef4444';
    const bg = getCssVar('--color-bg-primary') || '#0b0f19';
    const text = getCssVar('--color-text-primary') || '#f3f4f6';

    chart.setOption({
      tooltip: {
        trigger: 'axis',
        backgroundColor: bg,
        borderColor: border,
        textStyle: { color: text, fontSize: 11 },
      },
      grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['18:00', '21:00', '00:00', '03:00', '06:00', '09:00', '12:00'],
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
          name: 'Flow Value',
          type: 'line',
          smooth: true,
          showSymbol: false,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: withAlpha(cyan, 0.2) },
              { offset: 1, color: 'transparent' },
            ]),
          },
          itemStyle: { color: cyan },
          data: [15, 12, 4, 3, 2, 5, 4],
        },
        {
          name: 'Threshold',
          type: 'line',
          step: 'start',
          lineStyle: { type: 'dashed', color: danger, opacity: 0.5 },
          data: [5, 5, 5, 5, 5, 5, 5],
        },
      ],
    });
  };

  const drawCountChart = () => {
    if (!countChartRef.current) return;
    charts.current.count?.dispose();

    const chart = echarts.init(countChartRef.current);
    charts.current.count = chart;

    const border = getCssVar('--color-border') || 'rgba(255,255,255,0.05)';
    const muted = getCssVar('--color-text-muted') || '#94a3b8';
    const danger = getCssVar('--color-danger') || '#e11d48';

    chart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
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
          type: 'bar',
          barWidth: '20%',
          itemStyle: { color: danger, borderRadius: [4, 4, 0, 0] },
          data: [120, 200, 150, 80, 70, 110, 130],
        },
      ],
    });
  };

  return { trendChartRef, countChartRef };
};
