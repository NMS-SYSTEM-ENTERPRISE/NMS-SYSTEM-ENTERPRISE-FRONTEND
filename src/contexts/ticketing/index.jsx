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
  const [summary, setSummary] = useState(null);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const CURRENT_USER = typeof window !== 'undefined' ? (localStorage.getItem('userEmail') || 'System') : 'System'; // Dynamic user from auth

  const loadTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery || undefined,
      };

      if (activeCategory === 'open') params.status = 'open';
      if (activeCategory === 'closed') params.status = 'closed';
      if (activeCategory === 'my-tickets') params.assignee = CURRENT_USER;

      const response = await fetchTicketsApi(params);
      const data = response?.data || response || {};

      const apiTickets = Array.isArray(data.tickets) ? data.tickets : [];

      const formattedTickets = apiTickets.map(t => {
        const safeStatus = typeof t.status === 'string' ? t.status : 'Open';
        const safePriority = typeof t.priority === 'string' ? t.priority : 'Medium';

        return {
          id: t.ticket_ref || t.id || 'N/A',
          subject: t.subject || 'No Subject',
          deviceName: t.device_name || '',
          deviceIp: t.device_ip || '',
          requester: t.requester || 'System',
          createdDate: t.created_at ? new Date(t.created_at).toLocaleString() : 'Unknown',
          assignee: t.assignee || 'Unassigned',
          status: safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1).toLowerCase(),
          priority: safePriority.charAt(0).toUpperCase() + safePriority.slice(1).toLowerCase(),
          dueStatus: safeStatus.toLowerCase() === 'open' || safeStatus.toLowerCase() === 'active' ? 'Due soon' : (safeStatus.toLowerCase() === 'resolved' || safeStatus.toLowerCase() === 'closed' ? 'Completed' : 'In Progress'),
          notes: t.notes || ''
        };
      });

      setTickets(formattedTickets);
      setSummary(data.summary || null);
      setTotalTickets(data.total_tickets || 0);
      setTotalPages(data.total_pages || 0);

    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error(`Failed to fetch tickets: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, activeCategory, currentPage, itemsPerPage, CURRENT_USER]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, itemsPerPage]);

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
    paginatedRequests: tickets,
    loadTickets,
    isLoading,
    CURRENT_USER,
    tickets,
    summary,
    totalTickets,
    totalPages,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  };

  return <TicketingContext.Provider value={value}>{children}</TicketingContext.Provider>;
};
