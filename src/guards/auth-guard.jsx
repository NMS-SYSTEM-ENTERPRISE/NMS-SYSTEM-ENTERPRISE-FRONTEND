'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from '@/hooks/useauth';

export const AuthGuard = ({ children }) => {
  const { isInitialized, isLoggedIn } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isInitialized && !isLoggedIn && pathname !== '/') {
      router.replace('/');
    }
  }, [isInitialized, isLoggedIn, pathname, router]);

  if (!isInitialized) {
    return null; // Render nothing while auth context initializes
  }

  // If not logged in and not on the login page, don't render children
  // (Prevents a brief flash of protected content before the redirect happens)
  if (!isLoggedIn && pathname !== '/') {
    return null;
  }

  return <>{children}</>;
};
