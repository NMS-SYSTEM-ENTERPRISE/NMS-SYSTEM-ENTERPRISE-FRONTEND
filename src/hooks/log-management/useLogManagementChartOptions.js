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
  green: '--color-success',
};

const resolveColor = (token) => getCssVar(COLOR_TOKEN_MAP[token]) || '#06b6d4';

export const useLogManagementChartOptions = () => {
  return useMemo(() => {
    const muted = getCssVar('--color-text-secondary') || '#9ca3af';
    const border = getCssVar('--color-border') || '#374151';
    const text = getCssVar('--color-text-primary') || '#f3f4f6';
    const accentCyan = resolveColor('cyan');

    const generateVibrantData = (points, variance, base) => {
      let current = base;
      return Array.from({ length: points }, () => {
        current = current + (Math.random() * variance * 2 - variance);
        if (current < 10) current = 10;
        return Math.floor(current);
      });
    };

    const lineChartOption = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        borderColor: border,
        textStyle: { color: text },
      },
      grid: { left: '2%', right: '2%', bottom: '2%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        axisLabel: { color: muted, fontSize: 10 },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLabel: { show: false },
        splitLine: {
          lineStyle: { type: 'dashed', color: 'rgba(255,255,255,0.05)' },
        },
      },
      series: [
        {
          name: 'Events',
          type: 'line',
          smooth: 0.4,
          symbol: 'none',
          lineStyle: { color: accentCyan, width: 3 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(6, 182, 212, 0.6)' },
              { offset: 1, color: 'rgba(6, 182, 212, 0.01)' },
            ]),
          },
          data: generateVibrantData(24, 20, 80),
        },
        {
          name: 'Warnings',
          type: 'line',
          smooth: 0.4,
          symbol: 'none',
          lineStyle: { color: resolveColor('green'), width: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(16, 185, 129, 0.4)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.01)' },
            ]),
          },
          data: generateVibrantData(24, 10, 30),
        },
        {
          name: 'Critical',
          type: 'line',
          smooth: 0.4,
          symbol: 'none',
          lineStyle: { color: resolveColor('violet'), width: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(192, 132, 252, 0.4)' },
              { offset: 1, color: 'rgba(192, 132, 252, 0.01)' },
            ]),
          },
          data: generateVibrantData(24, 5, 15),
        }
      ],
    };

    const getSparklineOption = (data, colorToken) => {
      let color = resolveColor(colorToken);
      if (colorToken === 'cyan') color = '#06b6d4';
      if (colorToken === 'violet') color = '#c084fc';
      if (colorToken === 'green') color = '#10b981';

      return {
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        xAxis: { type: 'category', show: false },
        yAxis: { type: 'value', show: false, min: 'dataMin' },
        series: [
          {
            type: 'line',
            data: data.map((d) => d.value),
            smooth: 0.4,
            showSymbol: false,
            lineStyle: { width: 3, color },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color },
                { offset: 1, color: 'transparent' },
              ]),
              opacity: 0.4,
            },
          },
        ],
      };
    };

    const getSummarySparklineOption = (data = [], colorToken) => {
      const mockData = generateVibrantData(15, 10, 50).map(v => ({ value: v }));
      return getSparklineOption(data.length > 2 ? data : mockData, colorToken);
    };

    return { lineChartOption, getSummarySparklineOption };
  }, []);
};
