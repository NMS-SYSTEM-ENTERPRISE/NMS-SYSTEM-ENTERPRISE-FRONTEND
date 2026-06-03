'use client';

import { createContext, useCallback, useState } from 'react';
import { getSloDetail } from '@/networking/network-monitoring/network-monitoring-apis';
import { DEFAULT_OPEN_SECTIONS } from '@/utils/constants/slo-detail';

export const SloDetailContext = createContext(null);

export const SloDetailProvider = ({ children }) => {
  const [openSections, setOpenSections] = useState(DEFAULT_OPEN_SECTIONS);
  const [sloData, setSloData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleSection = useCallback((section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const loadSloDetail = useCallback(async (sloId) => {
    if (!sloId) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await getSloDetail(sloId);
      setSloData(response);
    } catch (error) {
      console.error('Failed to load SLO detail:', error);
      setSloData(null);
      setErrorMessage('Unable to load this SLO from monitoring history.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <SloDetailContext.Provider
      value={{ openSections, toggleSection, sloData, isLoading, errorMessage, loadSloDetail }}
    >
      {children}
    </SloDetailContext.Provider>
  );
};
