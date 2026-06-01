'use client';

import { MetricExplorerContent } from '@/components/features/metric-explorer/metric-explorer-content';
import { MetricExplorerProvider } from '@/contexts/metric-explorer';

export default function MetricExplorerPage() {
  return (
    <MetricExplorerProvider>
      <MetricExplorerContent />
    </MetricExplorerProvider>
  );
}
