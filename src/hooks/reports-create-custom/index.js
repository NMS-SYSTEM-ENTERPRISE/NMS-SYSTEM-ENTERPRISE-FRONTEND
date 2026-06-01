'use client';

import { useContext } from 'react';
import { ReportsCreateCustomContext } from '@/contexts/reports-create-custom';

export const useReportsCreateCustom = () => {
  const context = useContext(ReportsCreateCustomContext);
  if (!context) {
    throw new Error('useReportsCreateCustom must be used within ReportsCreateCustomProvider');
  }
  return context;
};
