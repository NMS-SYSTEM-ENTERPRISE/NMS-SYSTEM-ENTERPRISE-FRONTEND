'use client';

import { UserProfilesContent } from '@/components/features/settings/user/user-profiles/user-profiles-content';
import { UserProfilesScreenProvider } from '@/contexts/settings/user/user-profiles/user-profiles-screen-context';

const UserProfiles = () => (
  <UserProfilesScreenProvider>
    <UserProfilesContent />
  </UserProfilesScreenProvider>
);

export default UserProfiles;
