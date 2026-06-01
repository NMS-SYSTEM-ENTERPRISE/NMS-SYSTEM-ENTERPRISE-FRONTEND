'use client';

import { useContext } from 'react';
import { CredentialScreenContext } from '@/contexts/settings/discovery/credential/credential-screen-context';

export const useCredentialScreen = () => {
  const context = useContext(CredentialScreenContext);
  if (!context) {
    throw new Error('useCredentialScreen must be used within CredentialScreenProvider');
  }
  return context;
};
