"use client";
import { getNetworkTopology } from '@/networking/network-monitoring/network-monitoring-apis';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const NetworkTopologyContext = createContext();

export const NetworkTopologyProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState('network');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutType, setLayoutType] = useState('cose');
  const [expandedNodes, setExpandedNodes] = useState({});
  const [focusedNode, setFocusedNode] = useState(null);
  const [topologyData, setTopologyData] = useState(null);
  const [isLoadingTopology, setIsLoadingTopology] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [topologyError, setTopologyError] = useState(null);

  const refreshTopology = useCallback(async () => {
    try {
      setIsRefreshing(true);
      setTopologyError(null);
      const data = await getNetworkTopology();
      setTopologyData(data);
    } catch (error) {
      console.error('Failed to fetch network topology:', error);
      setTopologyError(error?.detail || error?.message || 'Unable to load network topology.');
    } finally {
      setIsLoadingTopology(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    refreshTopology();
    const interval = setInterval(refreshTopology, 60000);
    return () => clearInterval(interval);
  }, [refreshTopology]);

  const handleResetSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const value = {
    viewMode,
    setViewMode,
    selectedDevice,
    setSelectedDevice,
    showDeviceModal,
    setShowDeviceModal,
    searchQuery,
    setSearchQuery,
    handleResetSearch,
    layoutType,
    setLayoutType,
    expandedNodes,
    setExpandedNodes,
    focusedNode,
    setFocusedNode,
    topologyData,
    setTopologyData,
    isLoadingTopology,
    isRefreshing,
    topologyError,
    refreshTopology,
  };

  return (
    <NetworkTopologyContext.Provider value={value}>
      {children}
    </NetworkTopologyContext.Provider>
  );
};

export const useNetworkTopologyContext = () => {
  const context = useContext(NetworkTopologyContext);
  if (!context) {
    throw new Error('useNetworkTopologyContext must be used within a NetworkTopologyProvider');
  }
  return context;
};
