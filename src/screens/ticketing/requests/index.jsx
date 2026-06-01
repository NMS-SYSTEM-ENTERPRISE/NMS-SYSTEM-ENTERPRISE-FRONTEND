'use client';

import { TicketingRequestsStandalone } from '@/components/features/ticketing/ticketing-requests-standalone';
import { TicketingProvider } from '@/contexts/ticketing';

export default function TicketingRequestsPage() {
  return (
    <TicketingProvider initialCategory="all">
      <TicketingRequestsStandalone />
    </TicketingProvider>
  );
}
