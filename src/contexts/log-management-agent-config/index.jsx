'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import {
  AGENT_INSTALL_COMMANDS,
  DEFAULT_AGENT_ID,
  DEFAULT_AGENT_SETTINGS,
} from '@/utils/dummy-data/log-management-agent-config';

export const LogManagementAgentConfigContext = createContext(null);

export const LogManagementAgentConfigProvider = ({ children }) => {
  const [selectedAgent, setSelectedAgent] = useState(DEFAULT_AGENT_ID);
  const [agentSettings, setAgentSettings] = useState(DEFAULT_AGENT_SETTINGS);

  const installCommand = useMemo(
    () => AGENT_INSTALL_COMMANDS[selectedAgent] || '',
    [selectedAgent]
  );

  const updateAgentSettings = useCallback((updates) => {
    setAgentSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetSettings = useCallback(() => {
    setAgentSettings(DEFAULT_AGENT_SETTINGS);
  }, []);

  const value = {
    selectedAgent,
    setSelectedAgent,
    agentSettings,
    updateAgentSettings,
    installCommand,
    resetSettings,
  };

  return (
    <LogManagementAgentConfigContext.Provider value={value}>
      {children}
    </LogManagementAgentConfigContext.Provider>
  );
};
