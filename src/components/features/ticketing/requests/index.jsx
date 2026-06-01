'use client';

import { TicketingRequestsTable } from '@/components/features/ticketing/ticketing-requests-table';
import sharedStyles from '@/components/features/ticketing/shared/styles.module.css';

export const TicketingRequestsStandalone = () => (
  <div className={sharedStyles.standalonePage}>
    <TicketingRequestsTable />
  </div>
);
