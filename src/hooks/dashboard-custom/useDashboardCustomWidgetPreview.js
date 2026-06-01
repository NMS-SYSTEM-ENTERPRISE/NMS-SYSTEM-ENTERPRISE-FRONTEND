'use client';

import { TABLE_PREVIEW_TABS } from '@/utils/constants/dashboard-custom';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const getDummyData = () => {
  const times = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const values = Array.from({ length: 24 }, () => Math.floor(Math.random() * 100));
  const series2 = Array.from({ length: 24 }, () => Math.floor(Math.random() * 100));
  return { times, values, series2 };
};

export const useDashboardCustomWidgetPreview = (activeTab, widgetForm) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const isTablePreview = TABLE_PREVIEW_TABS.includes(activeTab);

  useEffect(() => {
    if (isTablePreview) {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
      return undefined;
    }

    if (!chartRef.current) return undefined;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const { times, values, series2 } = getDummyData();
    let option = {};

    const commonGrid = { left: 40, right: 40, top: 40, bottom: 40, containLabel: true };
    const commonTooltip = {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#fff' },
    };
    const commonXAxis = {
      type: 'category',
      data: times,
      axisLine: { lineStyle: { color: '#4b5563' } },
      axisLabel: { color: '#9ca3af' },
      name: widgetForm.xAxisTitle ? 'Time' : '',
      nameTextStyle: { color: '#9ca3af' },
    };
    const commonYAxis = {
      type: 'value',
      splitLine: { lineStyle: { color: '#374151', type: 'dashed' } },
      axisLabel: { color: '#9ca3af' },
      name: widgetForm.yAxisTitle ? 'Value' : '',
      nameTextStyle: { color: '#9ca3af' },
    };

    switch (activeTab) {
      case 'Chart':
      case 'Stream':
        option = {
          backgroundColor: 'transparent',
          tooltip: commonTooltip,
          legend: { show: widgetForm.legend, textStyle: { color: '#9ca3af' }, bottom: 0 },
          grid: commonGrid,
          xAxis: commonXAxis,
          yAxis: commonYAxis,
          series: [
            {
              name: 'Metric A',
              type: widgetForm.style === 'bar' || widgetForm.style === 'column' ? 'bar' : 'line',
              data: values,
              smooth: true,
              showSymbol: widgetForm.showMarkers,
              lineStyle: { width: widgetForm.lineWidth, color: '#06b6d4' },
              areaStyle: widgetForm.area ? { opacity: 0.2, color: '#06b6d4' } : null,
              itemStyle: { color: '#06b6d4' },
            },
            {
              name: 'Metric B',
              type: widgetForm.style === 'bar' || widgetForm.style === 'column' ? 'bar' : 'line',
              data: series2,
              smooth: true,
              showSymbol: widgetForm.showMarkers,
              lineStyle: { width: widgetForm.lineWidth, color: '#8b5cf6' },
              areaStyle: widgetForm.area ? { opacity: 0.2, color: '#8b5cf6' } : null,
              itemStyle: { color: '#8b5cf6' },
            },
          ],
        };
        break;

      case 'Top N': {
        const topNData = [
          { name: 'Host A', value: 95 },
          { name: 'Host B', value: 82 },
          { name: 'Host C', value: 74 },
          { name: 'Host D', value: 65 },
          { name: 'Host E', value: 43 },
        ];
        option = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            borderColor: '#374151',
            textStyle: { color: '#fff' },
          },
          grid: commonGrid,
          xAxis: { type: 'value', splitLine: { show: false }, axisLabel: { color: '#9ca3af' } },
          yAxis: {
            type: 'category',
            data: topNData.map((d) => d.name),
            axisLabel: { color: '#9ca3af' },
          },
          series: [
            {
              type: 'bar',
              data: topNData.map((d) => d.value),
              itemStyle: {
                borderRadius: [0, 4, 4, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: '#06b6d4' },
                  { offset: 1, color: '#3b82f6' },
                ]),
              },
              label: { show: true, position: 'right', color: '#fff' },
            },
          ],
        };
        break;
      }

      case 'Gauge':
        option = {
          backgroundColor: 'transparent',
          series: [
            {
              type: 'gauge',
              startAngle: 180,
              endAngle: 0,
              min: 0,
              max: 100,
              splitNumber: 5,
              itemStyle: { color: '#06b6d4' },
              progress: { show: true, width: 18 },
              pointer: { show: false },
              axisLine: { lineStyle: { width: 18, color: [[1, '#374151']] } },
              axisTick: { show: false },
              splitLine: { length: 12, lineStyle: { width: 2, color: '#999' } },
              axisLabel: { distance: 20, color: '#999', fontSize: 10 },
              title: { show: false },
              detail: {
                valueAnimation: true,
                fontSize: 40,
                color: '#fff',
                offsetCenter: [0, '30%'],
                formatter: '{value}%',
              },
              data: [{ value: 75 }],
            },
          ],
        };
        break;

      case 'Heat Map': {
        const hours = [
          '12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a',
          '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p',
        ];
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const heatData = [];
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 24; j++) {
            heatData.push([j, i, Math.floor(Math.random() * 100)]);
          }
        }
        option = {
          backgroundColor: 'transparent',
          tooltip: {
            position: 'top',
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            borderColor: '#374151',
            textStyle: { color: '#fff' },
          },
          grid: { height: '70%', top: '10%' },
          xAxis: {
            type: 'category',
            data: hours,
            splitArea: { show: true },
            axisLabel: { color: '#9ca3af' },
          },
          yAxis: {
            type: 'category',
            data: days,
            splitArea: { show: true },
            axisLabel: { color: '#9ca3af' },
          },
          visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '0%',
            inRange: { color: ['#374151', '#06b6d4', '#ef4444'] },
            textStyle: { color: '#9ca3af' },
          },
          series: [
            {
              type: 'heatmap',
              data: heatData,
              label: { show: false },
              itemStyle: { borderColor: '#1f2937' },
            },
          ],
        };
        break;
      }

      case 'Sankey':
        option = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            borderColor: '#374151',
            textStyle: { color: '#fff' },
          },
          series: [
            {
              type: 'sankey',
              data: [{ name: 'Source' }, { name: 'Process A' }, { name: 'Process B' }, { name: 'Target' }],
              links: [
                { source: 'Source', target: 'Process A', value: 5 },
                { source: 'Source', target: 'Process B', value: 3 },
                { source: 'Process A', target: 'Target', value: 5 },
                { source: 'Process B', target: 'Target', value: 3 },
              ],
              emphasis: { focus: 'adjacency' },
              lineStyle: { color: 'gradient', curveness: 0.5 },
              label: { color: '#fff' },
            },
          ],
        };
        break;

      case 'Anomaly': {
        const anomalyData = values.map((v, i) => {
          if (i === 10 || i === 18) {
            return { value: v + 50, itemStyle: { color: '#ef4444' }, symbolSize: 10 };
          }
          return v;
        });
        option = {
          backgroundColor: 'transparent',
          tooltip: commonTooltip,
          xAxis: commonXAxis,
          yAxis: commonYAxis,
          series: [
            {
              type: 'line',
              data: anomalyData,
              smooth: true,
              lineStyle: { color: '#06b6d4' },
              markPoint: {
                data: [{ type: 'max', name: 'Max' }, { type: 'min', name: 'Min' }],
              },
            },
          ],
        };
        break;
      }

      case 'Forecast': {
        const history = values.slice(0, 18);
        const forecast = [...Array(18).fill(null), values[17], ...values.slice(18)];
        option = {
          backgroundColor: 'transparent',
          tooltip: commonTooltip,
          xAxis: commonXAxis,
          yAxis: commonYAxis,
          legend: { data: ['History', 'Forecast'], textStyle: { color: '#9ca3af' }, bottom: 0 },
          series: [
            { name: 'History', type: 'line', data: history, smooth: true, lineStyle: { color: '#06b6d4' } },
            {
              name: 'Forecast',
              type: 'line',
              data: forecast,
              smooth: true,
              lineStyle: { type: 'dashed', color: '#f59e0b' },
            },
          ],
        };
        break;
      }

      case 'Pie':
        option = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            borderColor: '#374151',
            textStyle: { color: '#fff' },
          },
          legend: { top: '5%', left: 'center', textStyle: { color: '#9ca3af' } },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: { borderRadius: 10, borderColor: '#1f2937', borderWidth: 2 },
              label: { show: false, position: 'center' },
              emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold', color: '#fff' } },
              labelLine: { show: false },
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' },
              ],
            },
          ],
        };
        break;

      default:
        option = {
          backgroundColor: 'transparent',
          xAxis: commonXAxis,
          yAxis: commonYAxis,
          series: [{ type: 'line', data: values, lineStyle: { color: '#06b6d4' } }],
        };
    }

    chartInstance.current.setOption(option);

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab, widgetForm, isTablePreview]);

  return { chartRef, isTablePreview };
};
