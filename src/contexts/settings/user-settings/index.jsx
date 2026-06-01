'use client';

import { createContext, useMemo } from 'react';
import { USER_SETTINGS_STATS } from '@/utils/dummy-data/settings/user-settings';

export const UserSettingsContext = createContext(null);

export const UserSettingsProvider = ({ children, stats = USER_SETTINGS_STATS }) => {
  const value = useMemo(() => ({ stats }), [stats]);

  return (
    <UserSettingsContext.Provider value={value}>{children}</UserSettingsContext.Provider>
  );
};
