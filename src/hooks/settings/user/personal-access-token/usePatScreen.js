'use client';

import { useContext } from 'react';
import { PatScreenContext } from '@/contexts/settings/user/personal-access-token/pat-screen-context';

export const usePatScreen = () => {
  const context = useContext(PatScreenContext);
  if (!context) {
    throw new Error('usePatScreen must be used within PatScreenProvider');
  }
  return context;
};
