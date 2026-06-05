'use client';

import { createContext, useCallback, useMemo, useState, useEffect } from 'react';
import {
  DEFAULT_TICKETING_CATEGORY,
  DEFAULT_TICKETING_EXPANDED_SECTIONS,
} from '@/utils/constants/ticketing';
import { fetchTicketsApi } from '@/networking/network-monitoring/ticketing-apis';
import { toast } from 'sonner';

export const TicketingContext = createContext(null);

export const TicketingProvider = ({ children, initialCategory = DEFAULT_TICKETING_CATEGORY }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('dashboard'); // 'dashboard' or 'list'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState(
    () => new Set(DEFAULT_TICKETING_EXPANDED_SECTIONS)
  );
  const [sidebarState, setSidebarState] = useState({
    isOpen: false,
    mode: 'details',
    ticketData: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const CURRENT_USER = localStorage.getItem('userEmail') || 'System'; // Dynamic user from auth

  const loadTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchTicketsApi({
        search: searchQuery || undefined,
        limit: 100,
      });
      const data = response.data || response;

      const formattedTickets = (data || []).map(t => ({
        id: t.ticket_ref,
        subject: t.subject,
        deviceName: t.device_name,
        deviceIp: t.device_ip,
        requester: t.requester,
        createdDate: new Date(t.created_at).toLocaleString(),
        assignee: t.assignee,
        status: t.status,
        priority: t.priority,
        dueStatus: t.status === 'Open' ? 'Due soon' : (t.status === 'Resolved' || t.status === 'Closed' ? 'Completed' : 'In Progress'),
        notes: t.notes
      }));
      setTickets(formattedTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to fetch tickets');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const filteredRequests = useMemo(() => {
    return tickets.filter((req) => {
      let matchesCategory = true;
      if (activeCategory === 'open') matchesCategory = req.status === 'Open' || req.status === 'In Progress';
      if (activeCategory === 'closed') {
        matchesCategory = req.status === 'Resolved' || req.status === 'Closed';
      }
      if (activeCategory === 'my-tickets') {
        matchesCategory = req.assignee === CURRENT_USER;
      }
      return matchesCategory;
    });
  }, [tickets, activeCategory, CURRENT_USER]);

  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRequests.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRequests, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
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
    viewMode,
    setViewMode,
    isSidebarOpen,
    setIsSidebarOpen,
    expandedSections,
    toggleSection,
    sidebarState,
    handleOpenSidebar,
    handleCloseSidebar,
    filteredRequests,
    paginatedRequests,
    loadTickets,
    isLoading,
    CURRENT_USER,
    tickets,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  };

  return <TicketingContext.Provider value={value}>{children}</TicketingContext.Provider>;
};
