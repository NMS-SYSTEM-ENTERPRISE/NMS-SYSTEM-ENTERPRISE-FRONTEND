'use client';

import * as echarts from 'echarts';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import sharedStyles from '@/components/features/log-management/shared/styles.module.css';

const SIZE_CLASS = {
  sm: sharedStyles.chartBoxSm,
  md: sharedStyles.chartBoxMd,
  full: sharedStyles.chartBoxFull,
};

export const LogManagementChart = ({ option, size = 'md' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !option) return undefined;

    chartInstance.current?.dispose();
    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;
    chart.setOption(option);

    const resizeObserver = new ResizeObserver(() => {
      chart.resize();
    });

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      chart.dispose();
      chartInstance.current = null;
    };
  }, [option]);

  return (
    <div
      ref={chartRef}
      className={clsx(sharedStyles.chartBox, SIZE_CLASS[size] || SIZE_CLASS.md)}
    />
  );
};
