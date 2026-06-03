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

    const lineChartOption = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        borderColor: border,
        textStyle: { color: text },
      },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
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
        axisLabel: { color: muted },
        splitLine: {
          lineStyle: { type: 'dashed', color: 'rgba(255,255,255,0.05)' },
        },
      },
      series: [
        {
          name: 'Events',
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: { color: accentCyan, width: 3 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(6, 182, 212, 0.2)' },
              { offset: 1, color: 'rgba(6, 182, 212, 0)' },
            ]),
          },
          data: [], // Removed dummy statistics data
        },
      ],
    };

    const getSparklineOption = (data, colorToken) => {
      const color = resolveColor(colorToken);
      return {
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        xAxis: { type: 'category', show: false },
        yAxis: { type: 'value', show: false },
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

    const getSummarySparklineOption = (data = [], colorToken) =>
      getSparklineOption(data.length ? data : [{value: 0}, {value: 0}], colorToken);

    return { lineChartOption, getSummarySparklineOption };
  }, []);
};
