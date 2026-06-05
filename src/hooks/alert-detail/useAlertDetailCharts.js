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

    const bg = getCssVar('--color-bg-primary') || '#0b0f19';
    const border = getCssVar('--color-border') || 'rgba(255,255,255,0.05)';
    const text = getCssVar('--color-text-primary') || '#f3f4f6';
    const muted = getCssVar('--color-text-muted') || '#94a3b8';

    chart.setOption({
      tooltip: {
        trigger: 'item',
        backgroundColor: bg,
        borderColor: border,
        textStyle: { color: text, fontSize: 11 },
      },
      legend: {
        bottom: '0%',
        left: 'center',
        textStyle: { color: muted, fontSize: 10 },
        itemWidth: 10,
        itemHeight: 10,
        icon: 'circle',
      },
      series: [
        {
          name: 'Alert Classification',
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          itemStyle: {
            borderColor: bg,
            borderWidth: 2,
          },
          data: [
            { value: 735, name: 'Network', itemStyle: { color: '#06b6d4' } },
            { value: 180, name: 'Hardware', itemStyle: { color: '#8b5cf6' } },
            { value: 85, name: 'Security', itemStyle: { color: '#22c55e' } },
          ],
        },
      ],
    });
  };

  const drawCountChart = () => {
    if (!countChartRef.current) return;
    charts.current.count?.dispose();

    const chart = echarts.init(countChartRef.current);
    charts.current.count = chart;

    const bg = getCssVar('--color-bg-primary') || '#0b0f19';
    const border = getCssVar('--color-border') || 'rgba(255,255,255,0.05)';
    const text = getCssVar('--color-text-primary') || '#f3f4f6';
    const muted = getCssVar('--color-text-muted') || '#94a3b8';

    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: bg,
        borderColor: border,
        textStyle: { color: text, fontSize: 11 },
      },
      legend: {
        bottom: '0%',
        left: 'center',
        textStyle: { color: muted, fontSize: 10 },
        itemWidth: 10,
        itemHeight: 10,
        icon: 'circle',
      },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['AV-POL', 'MT-POL', 'BS-POL'],
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
          name: 'Critical',
          type: 'bar',
          stack: 'total',
          barWidth: '20%',
          itemStyle: { color: '#ef4444' },
          data: [120, 10, 2],
        },
        {
          name: 'Warning',
          type: 'bar',
          stack: 'total',
          itemStyle: { color: '#f59e0b' },
          data: [50, 20, 1],
        },
        {
          name: 'Info',
          type: 'bar',
          stack: 'total',
          itemStyle: { color: '#3b82f6', borderRadius: [4, 4, 0, 0] },
          data: [35, 5, 0],
        },
      ],
    });
  };

  return { trendChartRef, countChartRef };
};
