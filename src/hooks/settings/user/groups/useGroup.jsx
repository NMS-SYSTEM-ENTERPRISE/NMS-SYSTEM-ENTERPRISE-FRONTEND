import { useContext } from 'react';
import { GroupContext } from '@/contexts/settings/user/groups/group-context';

export const useGroup = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error('useGroup must be used within a GroupProvider');
  }
  return context;
};
