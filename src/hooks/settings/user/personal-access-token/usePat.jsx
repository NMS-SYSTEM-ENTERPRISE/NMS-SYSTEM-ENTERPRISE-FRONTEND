import { useContext } from 'react';
import { PatContext } from '@/contexts/settings/user/personal-access-token/pat-context';

export const usePat = () => {
  const context = useContext(PatContext);
  if (!context) {
    throw new Error('usePat must be used within a PatProvider');
  }
  return context;
};
