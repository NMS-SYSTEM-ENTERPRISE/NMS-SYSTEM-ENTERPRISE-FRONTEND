'use client';

import { createContext, useCallback, useMemo, useState } from 'react';
import {
  DEFAULT_TICKETING_CATEGORY,
  DEFAULT_TICKETING_EXPANDED_SECTIONS,
} from '@/utils/constants/ticketing';
import { MOCK_CURRENT_USER_ASSIGNEE, MOCK_TICKET_REQUESTS } from '@/utils/dummy-data/ticketing';

export const TicketingContext = createContext(null);

export const TicketingProvider = ({ children, initialCategory = DEFAULT_TICKETING_CATEGORY }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState(
    () => new Set(DEFAULT_TICKETING_EXPANDED_SECTIONS)
  );
  const [sidebarState, setSidebarState] = useState({
    isOpen: false,
    mode: 'details',
    ticketData: null,
  });

  const filteredRequests = useMemo(() => {
    return MOCK_TICKET_REQUESTS.filter((req) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        req.subject.toLowerCase().includes(query) ||
        req.id.toLowerCase().includes(query) ||
        req.requester.toLowerCase().includes(query);

      let matchesCategory = true;
      if (activeCategory === 'open') matchesCategory = req.status === 'Open';
      if (activeCategory === 'closed') {
        matchesCategory = req.status === 'Resolved' || req.status === 'Closed';
      }
      if (activeCategory === 'my-tickets') {
        matchesCategory = req.assignee === MOCK_CURRENT_USER_ASSIGNEE;
      }

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const toggleSection = useCallback((section) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  }, []);

  const setCategory = useCallback((categoryId) => {
    setActiveCategory(categoryId);
    setExpandedSections((prev) => new Set(prev).add('list'));
  }, []);

  const handleOpenSidebar = useCallback((mode, ticketData = null) => {
    setSidebarState({ isOpen: true, mode, ticketData });
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const value = {
    activeCategory,
    setActiveCategory: setCategory,
    searchQuery,
    setSearchQuery,
    isSidebarOpen,
    setIsSidebarOpen,
    expandedSections,
    toggleSection,
    sidebarState,
    handleOpenSidebar,
    handleCloseSidebar,
    filteredRequests,
  };

  return <TicketingContext.Provider value={value}>{children}</TicketingContext.Provider>;
};
