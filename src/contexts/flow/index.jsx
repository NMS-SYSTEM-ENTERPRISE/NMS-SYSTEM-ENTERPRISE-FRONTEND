'use client';
import { createContext, useState, useContext } from 'react';
import { INITIAL_FLOW_CONFIG } from '@/utils/dummy-data/flow';

export const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedEventSource, setSelectedEventSource] = useState('');
  const [selectedInterface, setSelectedInterface] = useState('');
  const [showActionSidebar, setShowActionSidebar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [flowConfig, setFlowConfig] = useState(INITIAL_FLOW_CONFIG);

  const value = {
    activeView,
    setActiveView,
    selectedEventSource,
    setSelectedEventSource,
    selectedInterface,
    setSelectedInterface,
    showActionSidebar,
    setShowActionSidebar,
    isSidebarOpen,
    setIsSidebarOpen,
    flowConfig,
    setFlowConfig,
  };

  return (
    <FlowContext.Provider value={value}>
      {children}
    </FlowContext.Provider>
  );
};
