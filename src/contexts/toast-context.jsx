'use client';

import { createContext, useMemo } from 'react';
import { toast } from 'sonner';

export const ToastContext = createContext(null);

/**
 * Safely converts any value into a renderable string for toast messages.
 * Handles FastAPI validation error arrays, nested objects, and primitives.
 */
const toSafeMessage = (value) => {
  if (typeof value === 'string') return value;
  if (value == null) return 'An unknown error occurred.';

  // FastAPI 422 detail array: [{ msg: "...", loc: [...], type: "..." }]
  if (Array.isArray(value)) {
    const messages = value
      .map((item) => (typeof item === 'string' ? item : item?.msg))
      .filter(Boolean);
    return messages.length > 0 ? messages.join('; ') : 'Validation error occurred.';
  }

  // Object with a message or detail string property
  if (typeof value === 'object') {
    if (typeof value.message === 'string') return value.message;
    if (typeof value.detail === 'string') return value.detail;
    if (Array.isArray(value.detail)) return toSafeMessage(value.detail);
    try {
      return JSON.stringify(value);
    } catch {
      return 'An error occurred.';
    }
  }

  return String(value);
};

export const ToastProvider = ({ children }) => {
  const showSuccess = (message) => toast.success(toSafeMessage(message));
  const showError = (message) => toast.error(toSafeMessage(message));
  const showInfo = (message) => toast.info(toSafeMessage(message));

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
