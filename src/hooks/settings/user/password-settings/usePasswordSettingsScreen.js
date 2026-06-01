'use client';

import { useContext } from 'react';
import { PasswordSettingsScreenContext } from '@/contexts/settings/user/password-settings/password-settings-screen-context';

export const usePasswordSettingsScreen = () => {
  const context = useContext(PasswordSettingsScreenContext);
  if (!context) {
    throw new Error(
      'usePasswordSettingsScreen must be used within PasswordSettingsScreenProvider'
    );
  }
  return context;
};
