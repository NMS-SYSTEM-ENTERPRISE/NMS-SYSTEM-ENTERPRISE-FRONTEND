'use client';

import { useContext } from 'react';
import { SsoScreenContext } from '@/contexts/settings/user/single-sign-on/sso-screen-context';

export const useSsoScreen = () => {
  const context = useContext(SsoScreenContext);
  if (!context) {
    throw new Error('useSsoScreen must be used within SsoScreenProvider');
  }
  return context;
};
