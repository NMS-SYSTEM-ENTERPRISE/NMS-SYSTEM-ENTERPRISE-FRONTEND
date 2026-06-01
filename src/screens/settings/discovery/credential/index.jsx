'use client';

import { CredentialContent } from '@/components/features/settings/discovery/credential/credential-content';
import { CredentialScreenProvider } from '@/contexts/settings/discovery/credential/credential-screen-context';

export default function CredentialProfile() {
  return (
    <CredentialScreenProvider>
      <CredentialContent />
    </CredentialScreenProvider>
  );
}
