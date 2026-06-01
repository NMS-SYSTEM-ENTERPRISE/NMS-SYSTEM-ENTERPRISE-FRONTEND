'use client';

import { useContext } from 'react';
import { NetworkMonitoringContext } from '@/contexts/network-monitoring';

export const useNetworkMonitoring = () => {
  const context = useContext(NetworkMonitoringContext);
  if (!context) {
    throw new Error('useNetworkMonitoring must be used within NetworkMonitoringProvider');
  }
  return context;
};
