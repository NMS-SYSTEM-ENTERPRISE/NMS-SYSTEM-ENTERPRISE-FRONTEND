'use client';

import { useContext } from 'react';
import { RolesScreenContext } from '@/contexts/settings/user/roles/roles-screen-context';

export const useRolesScreen = () => {
  const context = useContext(RolesScreenContext);
  if (!context) {
    throw new Error('useRolesScreen must be used within RolesScreenProvider');
  }
  return context;
};
