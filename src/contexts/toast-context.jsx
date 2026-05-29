'use client';

import { createContext, useMemo } from 'react';
import { toast } from 'sonner';

export const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const showSuccess = (message) => toast.success(message);
  const showError = (message) => toast.error(message);
  const showInfo = (message) => toast.info(message);

  const memoizedValue = useMemo(() => ({
    showSuccess,
    showError,
    showInfo
  }), []);

  return (
    <ToastContext.Provider value={memoizedValue}>
      {children}
    </ToastContext.Provider>
  );
};
