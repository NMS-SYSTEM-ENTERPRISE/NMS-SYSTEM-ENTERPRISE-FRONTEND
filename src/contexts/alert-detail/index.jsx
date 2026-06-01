'use client';

import { createContext, useCallback, useState } from 'react';
import { DEFAULT_ALERT_DETAIL_SECTIONS } from '@/utils/constants/alert-detail';

export const AlertDetailContext = createContext(null);

export const AlertDetailProvider = ({ children }) => {
  const [openSections, setOpenSections] = useState(DEFAULT_ALERT_DETAIL_SECTIONS);

  const toggleSection = useCallback((section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  return (
    <AlertDetailContext.Provider value={{ openSections, toggleSection }}>
      {children}
    </AlertDetailContext.Provider>
  );
};
