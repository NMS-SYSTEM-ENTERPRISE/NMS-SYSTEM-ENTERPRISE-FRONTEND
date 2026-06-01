'use client';

import { GroupsContent } from '@/components/features/settings/user/groups/groups-content';
import { GroupsScreenProvider } from '@/contexts/settings/user/groups/groups-screen-context';

const Groups = () => (
  <GroupsScreenProvider>
    <GroupsContent />
  </GroupsScreenProvider>
);

export default Groups;
