'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_TRAP_FILTERS } from '@/utils/constants/trap-explorer';
import { MOCK_TRAPS } from '@/utils/dummy-data/trap-explorer';

export const TrapExplorerContext = createContext(null);

const matchesCategory = (trap, activeCategory) => {
  if (activeCategory === 'all') return true;
  return trap.severity === activeCategory;
};

const matchesFilters = (trap, filters) => {
  if (filters.trapOid && trap.trapOid !== filters.trapOid) return false;
  if (filters.source && !trap.source.includes(filters.source)) return false;
  if (filters.severity && trap.severity !== filters.severity) return false;
  if (filters.acknowledged !== '') {
    const ack = filters.acknowledged === 'true';
    if (trap.acknowledged !== ack) return false;
  }
  if (filters.countMin && trap.count < Number(filters.countMin)) return false;
  if (filters.countMax && trap.count > Number(filters.countMax)) return false;
  return true;
};

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
  const [expandedTrapIds, setExpandedTrapIds] = useState(new Set(['1']));
  const [selectedTrapIds, setSelectedTrapIds] = useState([]);

  const filteredTraps = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return MOCK_TRAPS.filter((trap) => {
      const matchesSearch =
        !query ||
        trap.name.toLowerCase().includes(query) ||
        trap.trapOid.toLowerCase().includes(query) ||
        trap.source.toLowerCase().includes(query);
      return matchesSearch && matchesCategory(trap, activeCategory) && matchesFilters(trap, filters);
    });
  }, [searchQuery, activeCategory, filters]);

  const paginatedTraps = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTraps.slice(start, start + itemsPerPage);
  }, [filteredTraps, currentPage, itemsPerPage]);

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
      setSelectedTrapIds(checked ? paginatedTraps.map((t) => t.id) : []);
    },
    [paginatedTraps]
  );

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
    filteredTraps,
    paginatedTraps,
    totalTraps: filteredTraps.length,
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
