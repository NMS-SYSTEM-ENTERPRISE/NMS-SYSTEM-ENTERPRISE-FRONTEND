'use client';

import { useAuthContext } from '@/hooks/useauth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const AuthGuard = ({ children }) => {
  const { isInitialized, isLoggedIn } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  // Routes that are accessible to unauthenticated users
  const publicRoutes = ['/', '/manual'];

  useEffect(() => {
    if (isInitialized && !isLoggedIn && !publicRoutes.includes(pathname)) {
      router.replace('/');
    }
  }, [isInitialized, isLoggedIn, pathname, router]);

  if (!isInitialized) {
    return null; // Render nothing while auth context initializes
  }

  // If not logged in and not on a public route, don't render children
  // (Prevents a brief flash of protected content before the redirect happens)
  if (!isLoggedIn && !publicRoutes.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
};
