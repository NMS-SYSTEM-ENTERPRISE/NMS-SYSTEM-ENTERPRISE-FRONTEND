'use client';

import { TicketingRequestsStandalone } from '@/components/features/ticketing/requests';
import { TicketingProvider } from '@/contexts/ticketing';

export default function TicketingRequestsPage() {
  return (
    <TicketingProvider initialCategory="all">
      <TicketingRequestsStandalone />
    </TicketingProvider>
  );
}
