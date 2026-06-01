'use client';

import { useContext } from 'react';
import { DashboardContext } from '@/contexts/dashboard';

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
