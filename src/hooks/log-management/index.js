'use client';

import { useContext } from 'react';
import { LogManagementContext } from '@/contexts/log-management';

export const useLogManagement = () => {
  const context = useContext(LogManagementContext);
  if (!context) {
    throw new Error('useLogManagement must be used within LogManagementProvider');
  }
  return context;
};
