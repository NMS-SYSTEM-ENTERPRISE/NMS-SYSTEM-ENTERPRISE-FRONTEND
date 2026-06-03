'use client';

import { TicketingActionSidebar } from '@/components/features/ticketing/ticketing-action-sidebar';
import { TicketingAnalyticsAccordion } from '@/components/features/ticketing/ticketing-analytics-accordion';
import { TicketingHeader } from '@/components/features/ticketing/ticketing-header';
import { TicketingListAccordion } from '@/components/features/ticketing/ticketing-list-accordion';
import { TicketingSidebar } from '@/components/features/ticketing/ticketing-sidebar';
import { TicketingStatsAccordion } from '@/components/features/ticketing/ticketing-stats-accordion';
import sharedStyles from '@/components/features/ticketing/shared/styles.module.css';
import { useTicketing } from '@/hooks/ticketing';
import { TicketingSkeleton } from '@/components/ui/skeleton-loaders/ticketing-skeleton';

export const TicketingContent = () => {
  const { sidebarState, handleCloseSidebar, isLoading } = useTicketing();

  return (
    <div className={sharedStyles.ticketingPage}>
      <TicketingSidebar />

      <div className={sharedStyles.mainContentWrapper}>
        <TicketingHeader />

        <div className={sharedStyles.contentArea}>
          {isLoading ? (
            <TicketingSkeleton />
          ) : (
            <div className={sharedStyles.timelineContainer}>
              <TicketingStatsAccordion />
              <TicketingAnalyticsAccordion />
              <TicketingListAccordion />
            </div>
          )}
        </div>
      </div>

      <TicketingActionSidebar
        isOpen={sidebarState.isOpen}
        onClose={handleCloseSidebar}
        mode={sidebarState.mode}
        ticketData={sidebarState.ticketData}
      />
    </div>
  );
};
