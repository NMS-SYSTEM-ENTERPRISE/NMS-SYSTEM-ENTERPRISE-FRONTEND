import { useContext } from 'react';
import { LdapContext } from '@/contexts/settings/user/ldap-server/ldap-context';

export const useLdap = () => {
  const context = useContext(LdapContext);
  if (!context) {
    throw new Error('useLdap must be used within a LdapProvider');
  }
  return context;
};
