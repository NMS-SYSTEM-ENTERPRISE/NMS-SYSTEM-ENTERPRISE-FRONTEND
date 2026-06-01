"use client";
import React, { createContext, useContext, useState } from 'react';

const NetworkTopologyContext = createContext();

export const NetworkTopologyProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState('network');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLayer3, setShowLayer3] = useState(true);
  const [layoutType, setLayoutType] = useState('cose');
  const [expandedNodes, setExpandedNodes] = useState({});
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showCreateViewModal, setShowCreateViewModal] = useState(false);
  const [focusedNode, setFocusedNode] = useState(null);
  const [showMinimap, setShowMinimap] = useState(true);

  const value = {
    viewMode,
    setViewMode,
    selectedDevice,
    setSelectedDevice,
    showDeviceModal,
    setShowDeviceModal,
    searchQuery,
    setSearchQuery,
    showLayer3,
    setShowLayer3,
    layoutType,
    setLayoutType,
    expandedNodes,
    setExpandedNodes,
    showScheduleModal,
    setShowScheduleModal,
    showCreateViewModal,
    setShowCreateViewModal,
    focusedNode,
    setFocusedNode,
    showMinimap,
    setShowMinimap,
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
