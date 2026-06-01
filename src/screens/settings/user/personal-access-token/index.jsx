'use client';

import { PatContent } from '@/components/features/settings/user/personal-access-token/pat-content';
import { PatScreenProvider } from '@/contexts/settings/user/personal-access-token/pat-screen-context';

const PersonalAccessToken = () => (
  <PatScreenProvider>
    <PatContent />
  </PatScreenProvider>
);

export default PersonalAccessToken;
