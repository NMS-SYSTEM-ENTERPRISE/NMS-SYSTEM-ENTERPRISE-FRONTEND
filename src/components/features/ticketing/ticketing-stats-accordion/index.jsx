'use client';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { TicketingStats } from '@/components/features/ticketing/ticketing-stats';
import sharedStyles from '@/components/features/ticketing/shared/styles.module.css';
import { useTicketing } from '@/hooks/ticketing';

export const TicketingStatsAccordion = () => {
  const { expandedSections, toggleSection } = useTicketing();
  const isOpen = expandedSections.has('stats');

  return (
    <div className={sharedStyles.accordionGroup} data-open={isOpen}>
      <button
        type="button"
        className={clsx(sharedStyles.accordionHeader, sharedStyles.accordionHeaderBtn)}
        onClick={() => toggleSection('stats')}
      >
        <div className={sharedStyles.headerNode}>
          <Icon icon="mdi:monitor-dashboard" width={18} />
        </div>
        <div className={sharedStyles.headerInfo}>
          <h3 className={sharedStyles.sectionTitle}>
            Real-time Analytics{' '}
            <span className={sharedStyles.badge} data-type="dashboard">
              Live
            </span>
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
      <div className={sharedStyles.accordionContent}>
        <TicketingStats />
      </div>
    </div>
  );
};
