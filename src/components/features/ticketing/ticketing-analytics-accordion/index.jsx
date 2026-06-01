'use client';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { TicketingCharts } from '@/components/features/ticketing/ticketing-charts';
import sharedStyles from '@/components/features/ticketing/shared/styles.module.css';
import { useTicketing } from '@/hooks/ticketing';
import { TICKETING_BADGE_ANALYTICS } from '@/utils/constants/ticketing';

export const TicketingAnalyticsAccordion = () => {
  const { expandedSections, toggleSection } = useTicketing();
  const isOpen = expandedSections.has('analytics');

  return (
    <div className={sharedStyles.accordionGroup} data-open={isOpen}>
      <button
        type="button"
        className={clsx(sharedStyles.accordionHeader, sharedStyles.accordionHeaderBtn)}
        onClick={() => toggleSection('analytics')}
      >
        <div className={sharedStyles.headerNode}>
          <Icon icon="mdi:chart-pie" width={18} />
        </div>
        <div className={sharedStyles.headerInfo}>
          <h3 className={sharedStyles.sectionTitle}>
            Traffic Distribution{' '}
            <span className={`${sharedStyles.badge} ${sharedStyles[TICKETING_BADGE_ANALYTICS]}`}>
              Analytics
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
        <TicketingCharts />
      </div>
    </div>
  );
};
