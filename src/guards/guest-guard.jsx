'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/hooks/useauth';

export const GuestGuard = ({ children }) => {
  const { isInitialized, isLoggedIn } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && isLoggedIn) {
      router.replace('/dashboard');
    }
  }, [isInitialized, isLoggedIn, router]);

  if (!isInitialized) {
    return null; // Render nothing while auth context initializes
  }

  // If user is already logged in, don't render the login screen to prevent a flash
  if (isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};
