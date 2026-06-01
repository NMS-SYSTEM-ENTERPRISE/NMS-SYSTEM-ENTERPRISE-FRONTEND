'use client';

import { LdapContent } from '@/components/features/settings/user/ldap-server/ldap-content';
import { LdapScreenProvider } from '@/contexts/settings/user/ldap-server/ldap-screen-context';

const LDAPServerSettings = () => (
  <LdapScreenProvider>
    <LdapContent />
  </LdapScreenProvider>
);

export default LDAPServerSettings;
