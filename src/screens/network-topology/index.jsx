'use client';

import { NetworkTopologyContent } from '@/components/features/network-topology/network-topology-content';
import { NetworkTopologyProvider } from '@/contexts/network-topology';

export default function NetworkTopologyPage() {
  return (
    <NetworkTopologyProvider>
      <NetworkTopologyContent />
    </NetworkTopologyProvider>
  );
}
