'use client';

import { AuthProvider } from '@/contexts/authentication-context';
import { ToastProvider } from '@/contexts/toast-context';
import { UserProvider } from '@/contexts/user-context';

export function Providers({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
