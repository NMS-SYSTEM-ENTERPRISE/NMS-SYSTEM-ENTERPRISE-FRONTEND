import { useContext } from 'react';
import { CredentialProfileContext } from '@/contexts/discovery-settings/credential-profile/profile-context';

export const useCredentialProfile = () => {
  const context = useContext(CredentialProfileContext);
  if (!context) {
    throw new Error('useCredentialProfile must be used within a CredentialProfileProvider');
  }
  return context;
};
