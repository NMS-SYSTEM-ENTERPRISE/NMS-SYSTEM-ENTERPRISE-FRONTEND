import { useContext } from 'react';
import { UserProfileContext } from '@/contexts/settings/user/user-profiles/user-profile-context';

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
