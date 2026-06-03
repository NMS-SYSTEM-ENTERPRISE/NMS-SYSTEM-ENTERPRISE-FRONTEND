'use client';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { TicketingRequestsTable } from '@/components/features/ticketing/ticketing-requests-table';
import sharedStyles from '@/components/features/ticketing/shared/styles.module.css';
import { useTicketing } from '@/hooks/ticketing';
import { NoDataFound } from '@/components/ui/no-data-found';

export const TicketingListAccordion = () => {
  const { expandedSections, toggleSection, filteredRequests } = useTicketing();
  const isOpen = expandedSections.has('list');

  return (
    <div className={sharedStyles.accordionGroup} data-open={isOpen}>
      <button
        type="button"
        className={clsx(sharedStyles.accordionHeader, sharedStyles.accordionHeaderBtn)}
        onClick={() => toggleSection('list')}
      >
        <div className={sharedStyles.headerNode}>
          <Icon icon="mdi:format-list-bulleted" width={18} />
        </div>
        <div className={sharedStyles.headerInfo}>
          <h3 className={sharedStyles.sectionTitle}>
            Top Conversations <span className={sharedStyles.badge} data-type="list">Summary</span>
          </h3>
        </div>
        <Icon
          icon="mdi:chevron-down"
          className={clsx(
            sharedStyles.accordionChevron,
            isOpen && sharedStyles.accordionChevronExpanded
          )}
          width={20}
        />
      </button>
      <div className={clsx(sharedStyles.accordionContent, sharedStyles.accordionContentFlush)}>
        {filteredRequests?.length === 0 ? (
          <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
            <NoDataFound title="No Tickets Found" description="No tickets match your current category or search query." icon="mdi:format-list-bulleted" />
          </div>
        ) : (
          <TicketingRequestsTable />
        )}
      </div>
    </div>
  );
};
