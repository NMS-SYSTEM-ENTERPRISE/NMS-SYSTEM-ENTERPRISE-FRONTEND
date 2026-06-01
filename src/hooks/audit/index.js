'use client';

import { useContext } from 'react';
import { AuditContext } from '@/contexts/audit';

export const useAudit = () => {
  const context = useContext(AuditContext);
  if (!context) {
    throw new Error('useAudit must be used within AuditProvider');
  }
  return context;
};
