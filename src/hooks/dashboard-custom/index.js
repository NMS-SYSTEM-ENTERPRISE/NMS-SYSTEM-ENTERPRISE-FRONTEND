'use client';

import { useContext } from 'react';
import { DashboardCustomContext } from '@/contexts/dashboard-custom';

export const useDashboardCustom = () => {
  const context = useContext(DashboardCustomContext);
  if (!context) {
    throw new Error('useDashboardCustom must be used within DashboardCustomProvider');
  }
  return context;
};

export { useDashboardCustomWidgetPreview } from './useDashboardCustomWidgetPreview';
