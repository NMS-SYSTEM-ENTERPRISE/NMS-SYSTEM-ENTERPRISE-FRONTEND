'use client';

import * as echarts from 'echarts';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import sharedStyles from '@/components/features/audit/shared/styles.module.css';

const SIZE_CLASS = {
  sm: sharedStyles.chartBoxSm,
  md: sharedStyles.chartBoxMd,
  lg: sharedStyles.chartBoxLg,
};

export const AuditChart = ({ option, size = 'md' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !option) return undefined;

    chartInstance.current?.dispose();
    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;
    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
