import { useContext } from 'react';
import { CredentialTagsContext } from '@/contexts/discovery-settings/credential-profile/tags-context';

export const useCredentialTags = () => {
  const context = useContext(CredentialTagsContext);
  if (!context) {
    throw new Error('useCredentialTags must be used within a CredentialTagsProvider');
  }
  return context;
};
