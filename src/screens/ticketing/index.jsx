'use client';

import { TicketingContent } from '@/components/features/ticketing/ticketing-content';
import { TicketingProvider } from '@/contexts/ticketing';

export default function TicketingPage() {
  return (
    <TicketingProvider>
      <TicketingContent />
    </TicketingProvider>
  );
}
