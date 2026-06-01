'use client';

import { useContext } from 'react';
import { SloDetailContext } from '@/contexts/slo-detail';

export const useSloDetail = () => {
  const context = useContext(SloDetailContext);
  if (!context) {
    throw new Error('useSloDetail must be used within a SloDetailProvider');
  }
  return context;
};
