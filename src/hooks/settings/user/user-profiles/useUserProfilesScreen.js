'use client';

import { useContext } from 'react';
import { UserProfilesScreenContext } from '@/contexts/settings/user/user-profiles/user-profiles-screen-context';

export const useUserProfilesScreen = () => {
  const context = useContext(UserProfilesScreenContext);
  if (!context) {
    throw new Error('useUserProfilesScreen must be used within UserProfilesScreenProvider');
  }
  return context;
};
