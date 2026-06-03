'use client';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { LogManagementChart } from '@/components/features/log-management/log-management-chart';
import sharedStyles from '@/components/features/log-management/shared/styles.module.css';
import { useLogManagement } from '@/hooks/log-management';
import { useLogManagementChartOptions } from '@/hooks/log-management/useLogManagementChartOptions';
import { NoDataFound } from '@/components/ui/no-data-found';

export const LogManagementTrendsAccordion = () => {
  const { expandedSections, toggleSection, filteredEvents } = useLogManagement();
  const { lineChartOption } = useLogManagementChartOptions();
  const isOpen = expandedSections.has('trends');

  return (
    <div className={sharedStyles.accordionGroup} data-open={isOpen}>
      <button
        type="button"
        className={clsx(sharedStyles.accordionHeader, sharedStyles.accordionHeaderBtn)}
        onClick={() => toggleSection('trends')}
      >
        <div className={clsx(sharedStyles.headerNode, sharedStyles.headerNodeViolet)}>
          <Icon icon="mdi:trending-up" width={18} />
        </div>
        <div className={sharedStyles.headerInfo}>
          <h3 className={sharedStyles.sectionTitle}>
            Stream Analytics <span className={sharedStyles.badge} data-type="analytics">ANALYTICS</span>
          </h3>
        </div>
        <Icon
          icon="mdi:chevron-down"
          className={clsx(
            sharedStyles.accordionChevron,
            isOpen && sharedStyles.accordionChevronExpanded
          )}
        />
      </button>

      {isOpen && (
        <div className={sharedStyles.accordionContent}>
          {filteredEvents?.length === 0 ? (
            <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
              <NoDataFound title="No Analytics Data" description="Not enough data to display stream trends." icon="mdi:trending-up" />
            </div>
          ) : (
            <div className={sharedStyles.analyticsSection}>
              <LogManagementChart option={lineChartOption} size="md" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
