'use client';

import { useContext } from 'react';
import { DiscoveryProfileScreenContext } from '@/contexts/settings/discovery/profile/discovery-profile-screen-context';

export const useDiscoveryProfileScreen = () => {
  const context = useContext(DiscoveryProfileScreenContext);
  if (!context) {
    throw new Error(
      'useDiscoveryProfileScreen must be used within DiscoveryProfileScreenProvider'
    );
  }
  return context;
};
