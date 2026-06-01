'use client';

import { useContext } from 'react';
import { ReportsDetailContext } from '@/contexts/reports-detail';

export const useReportsDetail = () => {
  const context = useContext(ReportsDetailContext);
  if (!context) {
    throw new Error('useReportsDetail must be used within ReportsDetailProvider');
  }
  return context;
};
