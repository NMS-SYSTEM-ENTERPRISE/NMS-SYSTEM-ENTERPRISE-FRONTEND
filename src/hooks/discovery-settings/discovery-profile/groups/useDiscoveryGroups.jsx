import { useContext } from 'react';
import { DiscoveryGroupsContext } from '@/contexts/discovery-settings/discovery-profile/groups-context';

export const useDiscoveryGroups = () => {
  const context = useContext(DiscoveryGroupsContext);
  if (!context) {
    throw new Error('useDiscoveryGroups must be used within a DiscoveryGroupsProvider');
  }
  return context;
};
