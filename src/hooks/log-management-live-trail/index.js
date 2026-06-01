'use client';

import { useContext } from 'react';
import { LogManagementLiveTrailContext } from '@/contexts/log-management-live-trail';

export const useLogManagementLiveTrail = () => {
  const context = useContext(LogManagementLiveTrailContext);
  if (!context) {
    throw new Error(
      'useLogManagementLiveTrail must be used within LogManagementLiveTrailProvider'
    );
  }
  return context;
};
