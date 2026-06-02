'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import { getFlowFilters } from '@/networking/network-monitoring/network-monitoring-apis';

export const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedEventSource, setSelectedEventSource] = useState('');
  const [selectedInterface, setSelectedInterface] = useState('');
  const [showActionSidebar, setShowActionSidebar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [flowConfig, setFlowConfig] = useState({});
  const [filterOptions, setFilterOptions] = useState({ eventSources: [], interfaces: [] });

  useEffect(() => {
    getFlowFilters()
      .then(data => setFilterOptions(data))
      .catch(err => console.error("Failed to load filters", err));
  }, []);

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
    filterOptions,
  };

  return (
    <FlowContext.Provider value={value}>
      {children}
    </FlowContext.Provider>
  );
};
