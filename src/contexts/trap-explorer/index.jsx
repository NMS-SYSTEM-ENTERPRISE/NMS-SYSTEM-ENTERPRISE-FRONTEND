'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_TRAP_FILTERS } from '@/utils/constants/trap-explorer';
import { getTraps, acknowledgeTrap, TRAPS_WEBSOCKET_URL } from '@/networking/network-monitoring/network-monitoring-apis';

export const TrapExplorerContext = createContext(null);

export const TrapExplorerProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [showLiveViewer, setShowLiveViewer] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_TRAP_FILTERS);
  const [selectedTrapForHistory, setSelectedTrapForHistory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [expandedTrapIds, setExpandedTrapIds] = useState(new Set());
  const [selectedTrapIds, setSelectedTrapIds] = useState([]);

  const [traps, setTraps] = useState([]);
  const [totalTrapsCount, setTotalTrapsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch traps from API
  const fetchTraps = useCallback(async () => {
    try {
      setIsLoading(true);
      const skip = (currentPage - 1) * itemsPerPage;
      let severity = null;
      if (activeCategory !== 'all') {
        severity = activeCategory;
      } else if (filters.severity) {
        severity = filters.severity;
      }

      const res = await getTraps({ 
        skip, 
        limit: itemsPerPage, 
        severity, 
        source: filters.source || null,
        search: searchQuery || null,
        trapOid: filters.trapOid || null,
        vendor: filters.vendor || null,
        acknowledged: filters.acknowledged,
        countMin: filters.countMin || null,
        countMax: filters.countMax || null
      });
      setTraps(res.items || []);
      setTotalTrapsCount(res.total || 0);
    } catch (error) {
      console.error('Failed to fetch traps:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, activeCategory, filters, searchQuery]);

  useEffect(() => {
    fetchTraps();
  }, [fetchTraps]);

  // WebSocket Live Updates
  useEffect(() => {
    if (!TRAPS_WEBSOCKET_URL) return;
    const ws = new WebSocket(TRAPS_WEBSOCKET_URL);
    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.event === 'trap_received') {
          fetchTraps(); // Refresh the list when a new trap arrives
        }
      } catch (err) {
        console.error('WebSocket parse error:', err);
      }
    };
    return () => ws.close();
  }, [fetchTraps]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, filters, itemsPerPage]);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_TRAP_FILTERS);
    setSearchQuery('');
  }, []);

  const handleApplyFilters = useCallback((appliedFilters) => {
    setFilters((prev) => ({ ...prev, ...appliedFilters }));
    setShowFilterSidebar(false);
  }, []);

  const toggleTrapExpanded = useCallback((id) => {
    setExpandedTrapIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleTrapSelected = useCallback((id) => {
    setSelectedTrapIds((prev) =>
      prev.includes(id) ? prev.filter((trapId) => trapId !== id) : [...prev, id]
    );
  }, []);

  const toggleSelectAllTraps = useCallback(
    (checked) => {
      setSelectedTrapIds(checked ? traps.map((t) => t.id) : []);
    },
    [traps]
  );

  const handleAcknowledge = useCallback(async (trapId, acknowledged) => {
    try {
      await acknowledgeTrap(trapId, acknowledged);
      fetchTraps();
    } catch (err) {
      console.error('Failed to acknowledge trap:', err);
    }
  }, [fetchTraps]);

  const value = {
    activeCategory,
    setActiveCategory,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    showFilterSidebar,
    setShowFilterSidebar,
    showLiveViewer,
    setShowLiveViewer,
    isSidebarOpen,
    setIsSidebarOpen,
    filters,
    setFilters,
    selectedTrapForHistory,
    setSelectedTrapForHistory,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    filteredTraps: traps,
    paginatedTraps: traps,
    totalTraps: totalTrapsCount,
    isLoading,
    fetchTraps,
    handleAcknowledge,
    expandedTrapIds,
    selectedTrapIds,
    toggleTrapExpanded,
    toggleTrapSelected,
    toggleSelectAllTraps,
    handleResetFilters,
    handleApplyFilters,
  };

  return (
    <TrapExplorerContext.Provider value={value}>{children}</TrapExplorerContext.Provider>
  );
};
