import { useContext } from 'react';
import { DiscoveryProfileContext } from '@/contexts/discovery-settings/discovery-profile/profile-context';

export const useDiscoveryProfile = () => {
  const context = useContext(DiscoveryProfileContext);
  if (!context) {
    throw new Error('useDiscoveryProfile must be used within a DiscoveryProfileProvider');
  }
  return context;
};
