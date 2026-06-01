'use client';

import { useContext } from 'react';
import { TrapExplorerContext } from '@/contexts/trap-explorer';

export const useTrapExplorer = () => {
  const context = useContext(TrapExplorerContext);
  if (!context) {
    throw new Error('useTrapExplorer must be used within a TrapExplorerProvider');
  }
  return context;
};
