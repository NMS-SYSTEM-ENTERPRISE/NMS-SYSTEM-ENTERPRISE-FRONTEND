'use client';

import { useContext } from 'react';
import { GroupsScreenContext } from '@/contexts/settings/user/groups/groups-screen-context';

export const useGroupsScreen = () => {
  const context = useContext(GroupsScreenContext);
  if (!context) {
    throw new Error('useGroupsScreen must be used within GroupsScreenProvider');
  }
  return context;
};
