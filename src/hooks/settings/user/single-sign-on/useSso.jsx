import { useContext } from 'react';
import { SsoContext } from '@/contexts/settings/user/single-sign-on/sso-context';

export const useSso = () => {
  const context = useContext(SsoContext);
  if (!context) {
    throw new Error('useSso must be used within a SsoProvider');
  }
  return context;
};
