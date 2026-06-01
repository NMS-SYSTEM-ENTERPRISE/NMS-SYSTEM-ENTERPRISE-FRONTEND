'use client';

import { useContext } from 'react';
import { UserSettingsContext } from '@/contexts/settings/user-settings';

export const useUserSettings = () => {
  const context = useContext(UserSettingsContext);
  if (!context) {
    throw new Error('useUserSettings must be used within UserSettingsProvider');
  }
  return context;
};
