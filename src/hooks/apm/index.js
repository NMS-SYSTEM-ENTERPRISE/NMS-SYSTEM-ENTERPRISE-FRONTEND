"use client";
import { useContext } from 'react';
import { ApmContext } from '@/contexts/apm';

export const useApm = () => {
  const context = useContext(ApmContext);
  if (!context) {
    throw new Error('useApm must be used within an ApmProvider');
  }
  return context;
};
