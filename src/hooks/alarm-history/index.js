'use client';

import { useContext } from 'react';
import { AlarmHistoryContext } from '@/contexts/alarm-history';

export const useAlarmHistory = () => {
  const context = useContext(AlarmHistoryContext);
  if (!context) {
    throw new Error('useAlarmHistory must be used within an AlarmHistoryProvider');
  }
  return context;
};
