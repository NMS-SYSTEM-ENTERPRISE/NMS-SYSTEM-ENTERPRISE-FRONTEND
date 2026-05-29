'use client';

import { AuthProvider } from '@/contexts/authentication-context';
import { ToastProvider } from '@/contexts/toast-context';
import { UserProvider } from '@/contexts/settings/user/users/user-context';
import { RoleProvider } from '@/contexts/settings/user/roles/role-context';
import { GroupProvider } from '@/contexts/settings/user/groups/group-context';

export function Providers({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <UserProvider>
          <RoleProvider>
            <GroupProvider>
              {children}
            </GroupProvider>
          </RoleProvider>
        </UserProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
