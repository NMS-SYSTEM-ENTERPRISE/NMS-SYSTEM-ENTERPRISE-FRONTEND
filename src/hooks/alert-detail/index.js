'use client';

import { useContext } from 'react';
import { AlertDetailContext } from '@/contexts/alert-detail';

export const useAlertDetail = () => {
  const context = useContext(AlertDetailContext);
  if (!context) {
    throw new Error('useAlertDetail must be used within an AlertDetailProvider');
  }
  return context;
};
