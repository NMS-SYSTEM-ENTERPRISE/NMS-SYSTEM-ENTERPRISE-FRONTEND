'use client';

import { RolesContent } from '@/components/features/settings/user/roles/roles-content';
import { RolesScreenProvider } from '@/contexts/settings/user/roles/roles-screen-context';

const Roles = () => (
  <RolesScreenProvider>
    <RolesContent />
  </RolesScreenProvider>
);

export default Roles;
