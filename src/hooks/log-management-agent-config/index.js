'use client';

import { useContext } from 'react';
import { LogManagementAgentConfigContext } from '@/contexts/log-management-agent-config';

export const useLogManagementAgentConfig = () => {
  const context = useContext(LogManagementAgentConfigContext);
  if (!context) {
    throw new Error(
      'useLogManagementAgentConfig must be used within LogManagementAgentConfigProvider'
    );
  }
  return context;
};
