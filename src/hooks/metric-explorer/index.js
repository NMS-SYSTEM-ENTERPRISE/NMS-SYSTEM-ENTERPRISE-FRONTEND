"use client";
import { useContext } from 'react';
import { MetricExplorerContext } from '@/contexts/metric-explorer';

export const useMetricExplorer = () => {
  const context = useContext(MetricExplorerContext);
  if (!context) {
    throw new Error('useMetricExplorer must be used within a MetricExplorerProvider');
  }
  return context;
};
