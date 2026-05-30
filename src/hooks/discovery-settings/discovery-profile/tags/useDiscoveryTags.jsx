import { useContext } from 'react';
import { DiscoveryTagsContext } from '@/contexts/discovery-settings/discovery-profile/tags-context';

export const useDiscoveryTags = () => {
  const context = useContext(DiscoveryTagsContext);
  if (!context) {
    throw new Error('useDiscoveryTags must be used within a DiscoveryTagsProvider');
  }
  return context;
};
