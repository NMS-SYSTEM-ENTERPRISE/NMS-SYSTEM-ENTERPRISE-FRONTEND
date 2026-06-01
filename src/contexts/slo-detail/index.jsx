'use client';

import { createContext, useCallback, useState } from 'react';
import { DEFAULT_OPEN_SECTIONS } from '@/utils/constants/slo-detail';

export const SloDetailContext = createContext(null);

export const SloDetailProvider = ({ children }) => {
  const [openSections, setOpenSections] = useState(DEFAULT_OPEN_SECTIONS);

  const toggleSection = useCallback((section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  return (
    <SloDetailContext.Provider value={{ openSections, toggleSection }}>
      {children}
    </SloDetailContext.Provider>
  );
};
