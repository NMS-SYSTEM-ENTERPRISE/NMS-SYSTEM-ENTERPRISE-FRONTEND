'use client';

import * as echarts from 'echarts';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import sharedStyles from '@/components/features/ticketing/shared/styles.module.css';

const SIZE_CLASS = {
  sm: sharedStyles.chartBoxSm,
  pie: sharedStyles.chartBoxPie,
  bar: sharedStyles.chartBoxBar,
};

export const TicketingChart = ({ option, size = 'sm', className }) => {
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
      className={clsx(sharedStyles.chartBox, SIZE_CLASS[size], className)}
    />
  );
};
