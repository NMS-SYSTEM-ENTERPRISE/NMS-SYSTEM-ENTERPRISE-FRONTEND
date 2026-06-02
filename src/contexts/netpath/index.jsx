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
        const data = await getNetPaths();
        setPaths(data.paths || []);
        if (data.paths && data.paths.length > 0) {
          setActivePathId(data.paths[0].id);
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

  const filteredPaths = paths.filter(
    (path) =>
      path.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
