'use client';

import { UsersContent } from '@/components/features/settings/user/users/users-content';
import { UsersScreenProvider } from '@/contexts/settings/user/users/users-screen-context';

const Users = () => (
  <UsersScreenProvider>
    <UsersContent />
  </UsersScreenProvider>
);

export default Users;
