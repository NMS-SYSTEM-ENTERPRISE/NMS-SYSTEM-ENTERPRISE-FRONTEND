'use client';

import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const getCssVar = (varName) => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
};

export const useSloDetailCharts = ({ sloData, openSections }) => {
  const trendChartRef = useRef(null);
  const burndownChartRef = useRef(null);
  const burnRateChartRef = useRef(null);
  const charts = useRef({});

  useEffect(() => {
    const timer = setTimeout(() => {
      if (openSections.overview) drawTrendChart();
      if (openSections.metrics) {
        drawBurndownChart();
        drawBurnRateChart();
      }
    }, 200);

    const handleResize = () => {
      Object.values(charts.current).forEach((chart) => chart?.resize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      Object.values(charts.current).forEach((chart) => chart?.dispose());
      charts.current = {};
    };
  }, [openSections, sloData]);

  const drawTrendChart = () => {
    if (!trendChartRef.current) return;
    charts.current.trend?.dispose();

    const chart = echarts.init(trendChartRef.current);
    charts.current.trend = chart;

    const dataCount = 24;
    const times = Array.from({ length: dataCount + 4 }, (_, i) =>
      `${String(i % 24).padStart(2, '0')}:00`
    );
    const values = Array.from({ length: dataCount }, () =>
      parseFloat((92 + Math.random() * 7).toFixed(2))
    );
    const forecastValues = new Array(dataCount + 4).fill(null);
    forecastValues[dataCount - 1] = values[dataCount - 1];
    let lastVal = values[dataCount - 1];
    for (let i = 0; i < 4; i++) {
      lastVal += (Math.random() - 0.5) * 1.2;
      forecastValues[dataCount + i] = parseFloat(Math.min(100, lastVal).toFixed(2));
    }

    const cyanColor = getCssVar('--color-chart-cyan') || '#06b6d4';
    const violetColor = getCssVar('--color-chart-violet') || '#8b5cf6';
    const warningColor = getCssVar('--color-warning') || '#f59e0b';
    const borderColor = getCssVar('--color-border') || '#1f2937';
    const mutedColor = getCssVar('--color-text-muted') || '#6b7280';
    const bgSecondary = getCssVar('--color-bg-secondary') || '#111827';
    const textPrimary = getCssVar('--color-text-primary') || '#e4e7eb';
    const textSecondary = getCssVar('--color-text-secondary') || '#9ca3af';

    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross', label: { backgroundColor: borderColor } },
        backgroundColor: bgSecondary,
        borderColor,
        textStyle: { color: textPrimary, fontSize: 11 },
        formatter: (params) => {
          let res = `<div class="slo-chart-tooltip-header">${params[0].axisValue}</div>`;
          params.forEach((param) => {
            if (param.value !== null) {
              res += `<div class="slo-chart-tooltip-row">
                <span class="slo-chart-tooltip-dot" data-color="${param.color}"></span>
                <span class="slo-chart-tooltip-label">${param.seriesName}</span>
                <span class="slo-chart-tooltip-value">${param.value}%</span>
              </div>`;
            }
          });
          return res;
        },
      },
      legend: {
        data: ['Current SLI', 'Forecast'],
        right: 0,
        top: 0,
        textStyle: { color: mutedColor, fontSize: 10 },
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 2,
      },
      grid: { left: 0, right: 10, top: 40, bottom: 20, containLabel: true },
      xAxis: {
        type: 'category',
        data: times,
        axisLabel: { color: mutedColor, fontSize: 9 },
        axisLine: { lineStyle: { color: borderColor } },
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        min: 85,
        max: 100,
        splitLine: { lineStyle: { color: borderColor, type: 'dashed' } },
        axisLabel: { color: mutedColor, fontSize: 9, formatter: '{value}%' },
      },
      series: [
        {
          name: 'Current SLI',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: values,
          lineStyle: { width: 3, color: cyanColor },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(var(--color-accent-cyan-rgb), 0.2)' },
              { offset: 1, color: 'transparent' },
            ]),
          },
          markLine: {
            symbol: 'none',
            data: [{ yAxis: sloData.target, name: 'Target' }],
            lineStyle: { color: warningColor, type: 'dashed', opacity: 0.6 },
            label: {
              position: 'end',
              formatter: 'Target ({yAxis}%)',
              fontSize: 9,
              color: warningColor,
            },
          },
        },
        {
          name: 'Forecast',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: forecastValues,
          lineStyle: { width: 2, type: 'dotted', color: violetColor },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(139, 92, 246, 0.1)' },
              { offset: 1, color: 'transparent' },
            ]),
          },
        },
      ],
    });
  };

  const drawBurndownChart = () => {
    if (!burndownChartRef.current) return;
    charts.current.burndown?.dispose();

    const chart = echarts.init(burndownChartRef.current);
    charts.current.burndown = chart;

    const dataCount = 12;
    const labels = Array.from({ length: dataCount }, (_, i) => `Day ${i + 1}`);
    const values = [100, 98, 95, 96, 92, 88, 85, 84, 80, 82, 78, 75];
    const ideal = labels.map((_, i) => (100 - (i * 100) / dataCount).toFixed(2));

    const successColor = getCssVar('--color-success') || '#10b981';
    const mutedColor = getCssVar('--color-text-muted') || '#6b7280';
    const borderColor = getCssVar('--color-border') || '#1f2937';
    const bgSecondary = getCssVar('--color-bg-secondary') || '#111827';
    const textPrimary = getCssVar('--color-text-primary') || '#e4e7eb';

    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: bgSecondary,
        borderColor,
        textStyle: { color: textPrimary, fontSize: 10 },
      },
      grid: { left: 5, right: 5, top: 10, bottom: 0, containLabel: true },
      xAxis: {
        type: 'category',
        data: labels,
        axisLabel: { color: mutedColor, fontSize: 8 },
        axisLine: { lineStyle: { color: borderColor } },
      },
      yAxis: {
        type: 'value',
        splitLine: { show: false },
        axisLabel: { color: mutedColor, fontSize: 8 },
      },
      series: [
        {
          name: 'Ideal',
          type: 'line',
          data: ideal,
          symbol: 'none',
          lineStyle: { type: 'dashed', width: 1, color: mutedColor },
        },
        {
          name: 'Actual',
          type: 'line',
          smooth: true,
          data: values,
          symbol: 'none',
          lineStyle: { width: 2, color: successColor },
          areaStyle: { color: 'rgba(var(--color-success-rgb), 0.1)' },
        },
      ],
    });
  };

  const drawBurnRateChart = () => {
    if (!burnRateChartRef.current) return;
    charts.current.burnrate?.dispose();

    const chart = echarts.init(burnRateChartRef.current);
    charts.current.burnrate = chart;

    const dangerColor = getCssVar('--color-danger') || '#ef4444';
    const primaryBlue = getCssVar('--color-accent-blue') || '#3b82f6';
    const bgSecondary = getCssVar('--color-bg-secondary') || '#111827';
    const borderColor = getCssVar('--color-border') || '#1f2937';
    const textPrimary = getCssVar('--color-text-primary') || '#e4e7eb';

    const data = [1.2, 0.8, 2.4, 4.5, 1.1, 0.9, 3.2, 1.4, 0.7, 1.2, 0.9, 1.1];

    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: bgSecondary,
        borderColor,
        textStyle: { color: textPrimary, fontSize: 10 },
      },
      grid: { left: 5, right: 5, top: 10, bottom: 0, containLabel: true },
      xAxis: {
        type: 'category',
        data: Array.from({ length: 12 }, (_, i) => i),
        axisLabel: { show: false },
        axisLine: { show: false },
      },
      yAxis: {
        type: 'value',
        splitLine: { show: false },
        axisLabel: { show: false },
      },
      series: [
        {
          type: 'bar',
          data,
          itemStyle: {
            borderRadius: [2, 2, 0, 0],
            color: (p) => (p.data > 3 ? dangerColor : primaryBlue),
          },
          barWidth: '60%',
        },
      ],
    });
  };

  return { trendChartRef, burndownChartRef, burnRateChartRef };
};
