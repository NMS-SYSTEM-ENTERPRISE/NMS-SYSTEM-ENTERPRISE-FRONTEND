'use client';
import { createContext, useState, useEffect } from 'react';
import { getNetPaths } from '@/networking/network-monitoring/network-monitoring-apis';

export const NetPathContext = createContext();

export const NetPathProvider = ({ children }) => {
  const [paths, setPaths] = useState([]);
  const [activePathId, setActivePathId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    source: '',
    destination: '',
    portMin: '',
    portMax: '',
  });

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        setIsLoading(true);
        const response = await getNetPaths();

        const getArray = (res, key) => {
          if (Array.isArray(res)) return res;
          if (res?.[key] && Array.isArray(res[key])) return res[key];
          if (res?.data && Array.isArray(res.data)) return res.data;
          if (res?.items && Array.isArray(res.items)) return res.items;
          return [];
        };

        const safePaths = getArray(response, 'paths');
        setPaths(safePaths);

        if (safePaths.length > 0) {
          setActivePathId(safePaths[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch net paths:", err);
        setError("Failed to load network paths.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPaths();
  }, []);

  const filteredPaths = paths.filter((path) => {
    // Basic search query
    const matchesSearch =
      path.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.destination.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Advanced Sidebar Filters
    if (filters.status && path.status !== filters.status) return false;
    if (filters.source && !path.source.toLowerCase().includes(filters.source.toLowerCase())) return false;
    if (filters.destination && !path.destination.toLowerCase().includes(filters.destination.toLowerCase())) return false;

    // Port filtering (if applicable)
    if (filters.portMin || filters.portMax) {
      const portNum = parseInt(path.port, 10);
      if (!isNaN(portNum)) {
        if (filters.portMin && portNum < parseInt(filters.portMin, 10)) return false;
        if (filters.portMax && portNum > parseInt(filters.portMax, 10)) return false;
      }
    }

    return true;
  });

  const activePath = paths.find((p) => p.id === activePathId) || paths[0] || null;

  return (
    <NetPathContext.Provider
      value={{
        paths,
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
        isLoading,
        error
      }}
    >
      {children}
    </NetPathContext.Provider>
  );
};
