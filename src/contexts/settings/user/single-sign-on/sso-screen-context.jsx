'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useSso } from '@/hooks/settings/user/single-sign-on/useSso';

export const SsoScreenContext = createContext(null);

export const SsoScreenProvider = ({ children }) => {
  const { getSsoConfig, updateSsoConfig, resetSsoConfig, isLoading } = useSso();
  const [showTimeline, setShowTimeline] = useState(false);
  const [config, setConfig] = useState(null);

  const fetchConfig = useCallback(async () => {
    const data = await getSsoConfig();
    if (data) setConfig(data);
  }, [getSsoConfig]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleSave = useCallback(async () => {
    if (!config) return;
    const updated = await updateSsoConfig(config);
    if (updated) setConfig(updated);
  }, [config, updateSsoConfig]);

  const handleReset = useCallback(async () => {
    if (
      window.confirm(
        'Are you sure you want to reset all SSO configurations to their defaults?'
      )
    ) {
      const resetData = await resetSsoConfig();
      if (resetData) setConfig(resetData);
    }
  }, [resetSsoConfig]);

  const value = useMemo(
    () => ({
      config,
      setConfig,
      isLoading,
      showTimeline,
      setShowTimeline,
      handleSave,
      handleReset,
    }),
    [config, isLoading, showTimeline, handleSave, handleReset]
  );

  return <SsoScreenContext.Provider value={value}>{children}</SsoScreenContext.Provider>;
};
