'use client';

import { useContext } from 'react';
import { AlertsContext } from '@/contexts/alerts';

export const useAlerts = () => {
  const context = useContext(AlertsContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertsProvider');
  }
  return context;
};
