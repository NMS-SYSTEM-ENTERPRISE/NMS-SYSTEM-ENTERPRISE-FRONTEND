'use client';

import * as echarts from 'echarts';
import { useMemo } from 'react';
import {
  AUDIT_PIE_CHART_DATA,
  AUDIT_USER_CHART_DATA,
  generateTimeSeriesData,
} from '@/utils/dummy-data/audit';

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

export const useAuditChartOptions = () => {
  return useMemo(() => {
    const bg = getCssVar('--audit-content-bg') || getCssVar('--color-bg-primary') || '#0b0f19';
    const border = getCssVar('--color-border') || 'rgba(255,255,255,0.1)';
    const text = getCssVar('--color-text-primary') || '#f3f4f6';
    const muted = getCssVar('--color-text-muted') || '#6b7280';
    const textSecondary = getCssVar('--color-text-secondary') || '#9ca3af';

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
          data: AUDIT_PIE_CHART_DATA.map((item) => ({
            value: item.value,
            name: item.name,
            itemStyle: { color: resolveColor(item.colorToken) },
          })),
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
        data: AUDIT_USER_CHART_DATA.map((d) => d.name),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11, fontWeight: '700' },
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
            fontFamily: 'JetBrains Mono',
            offset: [10, 0],
            formatter: '{c}',
          },
          data: AUDIT_USER_CHART_DATA.map((d) => d.value),
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

    const getSummarySparklineOption = (sparkMin, sparkMax, colorToken) =>
      getSparklineOption(generateTimeSeriesData(40, sparkMin, sparkMax), colorToken);

    return {
      auditEventOption,
      userActivityOption,
      getSparklineOption,
      getSummarySparklineOption,
    };
  }, []);
};
