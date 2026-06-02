"use client";
import { getNetworkTopology } from '@/networking/network-monitoring/network-monitoring-apis';
import React, { createContext, useContext, useEffect, useState } from 'react';

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
  const [topologyError, setTopologyError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchTopology = async () => {
      try {
        if (isMounted) {
          setTopologyError(null);
        }
        const data = await getNetworkTopology();
        if (isMounted) {
          setTopologyData(data);
        }
      } catch (error) {
        console.error('Failed to fetch network topology:', error);
        if (isMounted) {
          setTopologyError(error?.detail || error?.message || 'Unable to load network topology.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingTopology(false);
        }
      }
    };

    fetchTopology();
    const interval = setInterval(fetchTopology, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
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
    layoutType,
    setLayoutType,
    expandedNodes,
    setExpandedNodes,
    focusedNode,
    setFocusedNode,
    topologyData,
    setTopologyData,
    isLoadingTopology,
    topologyError,
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
