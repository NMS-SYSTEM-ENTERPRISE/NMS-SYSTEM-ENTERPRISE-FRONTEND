'use client';
import { createContext, useState } from 'react';
import { NETWORK_PATHS } from '@/utils/dummy-data/netpath';

export const NetPathContext = createContext();

export const NetPathProvider = ({ children }) => {
  const [activePathId, setActivePathId] = useState(NETWORK_PATHS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    source: '',
    destination: '',
    portMin: '',
    portMax: '',
  });

  const filteredPaths = NETWORK_PATHS.filter(
    (path) =>
      path.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePath = NETWORK_PATHS.find((p) => p.id === activePathId) || NETWORK_PATHS[0];

  return (
    <NetPathContext.Provider
      value={{
        activePathId,
        setActivePathId,
        searchQuery,
        setSearchQuery,
        showFilterSidebar,
        setShowFilterSidebar,
        isSidebarOpen,
        setIsSidebarOpen,
        filters,
        setFilters,
        filteredPaths,
        activePath,
      }}
    >
      {children}
    </NetPathContext.Provider>
  );
};
