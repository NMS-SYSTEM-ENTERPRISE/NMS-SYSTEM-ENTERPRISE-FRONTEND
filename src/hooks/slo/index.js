'use client';

import { useContext } from 'react';
import { SloContext } from '@/contexts/slo';

export const useSlo = () => {
  const context = useContext(SloContext);
  if (!context) {
    throw new Error('useSlo must be used within a SloProvider');
  }
  return context;
};
