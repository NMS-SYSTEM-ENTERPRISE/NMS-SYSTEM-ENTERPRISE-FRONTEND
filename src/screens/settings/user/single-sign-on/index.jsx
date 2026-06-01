'use client';

import { SsoContent } from '@/components/features/settings/user/single-sign-on/sso-content';
import { SsoScreenProvider } from '@/contexts/settings/user/single-sign-on/sso-screen-context';

const SingleSignOn = () => (
  <SsoScreenProvider>
    <SsoContent />
  </SsoScreenProvider>
);

export default SingleSignOn;
