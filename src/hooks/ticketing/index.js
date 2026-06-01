'use client';

import { useContext } from 'react';
import { TicketingContext } from '@/contexts/ticketing';

export const useTicketing = () => {
  const context = useContext(TicketingContext);
  if (!context) {
    throw new Error('useTicketing must be used within TicketingProvider');
  }
  return context;
};
