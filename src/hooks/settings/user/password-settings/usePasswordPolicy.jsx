import { useContext } from 'react';
import { PasswordPolicyContext } from '@/contexts/settings/user/password-settings/password-policy-context';

export const usePasswordPolicy = () => {
  const context = useContext(PasswordPolicyContext);
  if (!context) {
    throw new Error('usePasswordPolicy must be used within a PasswordPolicyProvider');
  }
  return context;
};
