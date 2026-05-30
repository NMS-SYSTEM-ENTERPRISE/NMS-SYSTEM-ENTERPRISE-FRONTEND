import { useContext } from 'react';
import { CredentialGroupsContext } from '@/contexts/discovery-settings/credential-profile/groups-context';

export const useCredentialGroups = () => {
  const context = useContext(CredentialGroupsContext);
  if (!context) {
    throw new Error('useCredentialGroups must be used within a CredentialGroupsProvider');
  }
  return context;
};
