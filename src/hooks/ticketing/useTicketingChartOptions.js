'use client';

import * as echarts from 'echarts';
import { useMemo } from 'react';

const getCssVar = (name) => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

const COLOR_MAP = {
  danger: '--color-danger',
  orange: '--color-chart-orange',
  cyan: '--color-chart-cyan',
  muted: '--color-text-muted',
  sky: '--ticketing-accent-sky',
  purple: '--color-chart-purple',
  amber: '--color-warning',
  green: '--color-success',
};

const resolveColor = (token) => getCssVar(COLOR_MAP[token]) || '#06b6d4';

export const useTicketingChartOptions = () => {
  return useMemo(() => {
    const getSparklineOption = (colorToken) => {
      const color = resolveColor(colorToken);
      return {
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        xAxis: { type: 'category', show: false },
        yAxis: { type: 'value', show: false },
        series: [
          {
            type: 'line',
            data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 50)),
            smooth: true,
            showSymbol: false,
            lineStyle: { width: 2, color },
            areaStyle: { color, opacity: 0.1 },
          },
        ],
      };
    };

    return { getSparklineOption, resolveColor };
  }, []);
};

export const buildStatusPieOption = (data, resolveColor) => {
  const bg = getCssVar('--ticketing-page-bg') || '#0b0f19';
  return {
    tooltip: { trigger: 'item' },
    series: [
      {
        name: 'Status',
        type: 'pie',
        radius: ['60%', '85%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 6, borderColor: bg, borderWidth: 3 },
        label: { show: false, position: 'center' },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold', color: '#fff' },
        },
        labelLine: { show: false },
        data: data.map((item) => ({
          value: item.value,
          name: item.name,
          itemStyle: { color: resolveColor(item.colorToken) },
        })),
      },
    ],
  };
};

export const buildTechWorkloadOption = (workload, resolveColor) => {
  const muted = getCssVar('--color-text-secondary') || '#9ca3af';
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '2%', right: '4%', top: '5%', bottom: '0%', containLabel: true },
    xAxis: { type: 'value', show: false },
    yAxis: {
      type: 'category',
      data: workload.categories,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: muted, fontSize: 11, fontWeight: '600' },
    },
    series: [
      {
        name: 'Tickets',
        type: 'bar',
        barWidth: 12,
        itemStyle: { color: resolveColor('purple'), borderRadius: [0, 4, 4, 0] },
        label: { show: true, position: 'right', color: '#fff', fontWeight: 'bold' },
        data: workload.values,
      },
    ],
  };
};
