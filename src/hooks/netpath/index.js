import { useContext } from 'react';
import { NetPathContext } from '@/contexts/netpath';

export const useNetPath = () => {
  const context = useContext(NetPathContext);
  if (context === undefined) {
    throw new Error('useNetPath must be used within a NetPathProvider');
  }
  return context;
};
