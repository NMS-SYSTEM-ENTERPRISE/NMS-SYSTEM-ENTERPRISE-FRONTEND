'use client';

import { DiscoveryProfileContent } from '@/components/features/settings/discovery/profile/discovery-profile-content';
import { DiscoveryProfileScreenProvider } from '@/contexts/settings/discovery/profile/discovery-profile-screen-context';

export default function DiscoveryProfile() {
  return (
    <DiscoveryProfileScreenProvider>
      <DiscoveryProfileContent />
    </DiscoveryProfileScreenProvider>
  );
}
