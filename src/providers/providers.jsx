'use client';

import { AuthProvider } from '@/contexts/authentication-context';
import { ToastProvider } from '@/contexts/toast-context';
import { UserProvider } from '@/contexts/settings/user/users/user-context';
import { RoleProvider } from '@/contexts/settings/user/roles/role-context';
import { GroupProvider } from '@/contexts/settings/user/groups/group-context';
import { UserProfileProvider } from '@/contexts/settings/user/user-profiles/user-profile-context';
import { PatProvider } from '@/contexts/settings/user/personal-access-token/pat-context';
import { PasswordPolicyProvider } from '@/contexts/settings/user/password-settings/password-policy-context';

export function Providers({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <UserProvider>
          <RoleProvider>
            <GroupProvider>
              <UserProfileProvider>
                <PatProvider>
                  <PasswordPolicyProvider>
                    {children}
                  </PasswordPolicyProvider>
                </PatProvider>
              </UserProfileProvider>
            </GroupProvider>
          </RoleProvider>
        </UserProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
