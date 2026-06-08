'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export const ExportContext = createContext(null);

export const ExportProvider = ({ children }) => {
  const [isExportPanelOpen, setIsExportPanelOpen] = useState(false);
  const [lastExportMeta, setLastExportMeta] = useState(null);

  const openExportPanel = useCallback(() => setIsExportPanelOpen(true), []);
  const closeExportPanel = useCallback(() => setIsExportPanelOpen(false), []);
  const toggleExportPanel = useCallback(
    () => setIsExportPanelOpen((prev) => !prev),
    []
  );

  const value = useMemo(
    () => ({
      isExportPanelOpen,
      openExportPanel,
      closeExportPanel,
      toggleExportPanel,
      lastExportMeta,
      setLastExportMeta,
    }),
    [isExportPanelOpen, openExportPanel, closeExportPanel, toggleExportPanel, lastExportMeta]
  );

  return (
    <ExportContext.Provider value={value}>{children}</ExportContext.Provider>
  );
};

export const useExport = () => {
  const context = useContext(ExportContext);
  if (!context) {
    throw new Error('useExport must be used within ExportProvider');
  }
  return context;
};
