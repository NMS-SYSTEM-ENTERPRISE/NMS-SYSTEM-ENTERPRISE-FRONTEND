'use client';

import { NetworkMonitoringContent } from '@/components/features/network-monitoring/network-monitoring-content';
import { NetworkMonitoringProvider } from '@/contexts/network-monitoring';

export default function NetworkMonitoringPage() {
  return (
    <NetworkMonitoringProvider>
      <NetworkMonitoringContent />
    </NetworkMonitoringProvider>
  );
}
