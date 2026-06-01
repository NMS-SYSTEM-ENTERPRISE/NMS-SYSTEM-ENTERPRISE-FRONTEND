'use client';

import { useContext } from 'react';
import { UsersScreenContext } from '@/contexts/settings/user/users/users-screen-context';

export const useUsersScreen = () => {
  const context = useContext(UsersScreenContext);
  if (!context) {
    throw new Error('useUsersScreen must be used within UsersScreenProvider');
  }
  return context;
};
