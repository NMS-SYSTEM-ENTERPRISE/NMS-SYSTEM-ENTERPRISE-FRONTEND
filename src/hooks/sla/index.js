'use client';

import { useContext } from 'react';
import { SlaContext } from '@/contexts/sla';

export const useSla = () => {
  const context = useContext(SlaContext);
  if (!context) {
    throw new Error('useSla must be used within a SlaProvider');
  }
  return context;
};
