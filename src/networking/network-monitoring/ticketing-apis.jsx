import { authApi } from '@/services/axios';

export const TICKETING_ENDPOINTS = {
  TICKETS: 'ticketing/tickets',
};

export const fetchTicketsApi = async (params = {}) => {
  return authApi.get(TICKETING_ENDPOINTS.TICKETS, { params });
};

export const createTicketApi = async (data) => {
  return authApi.post(TICKETING_ENDPOINTS.TICKETS, data);
};

export const updateTicketApi = async (ticketId, data) => {
  return authApi.put(`${TICKETING_ENDPOINTS.TICKETS}/${ticketId}`, data);
};
