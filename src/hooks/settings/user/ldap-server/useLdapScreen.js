'use client';

import { useContext } from 'react';
import { LdapScreenContext } from '@/contexts/settings/user/ldap-server/ldap-screen-context';

export const useLdapScreen = () => {
  const context = useContext(LdapScreenContext);
  if (!context) {
    throw new Error('useLdapScreen must be used within LdapScreenProvider');
  }
  return context;
};
