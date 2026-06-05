'use client';

import { LogManagementChart } from '@/components/features/log-management/log-management-chart';
import sharedStyles from '@/components/features/log-management/shared/styles.module.css';
import { NoDataFound } from '@/components/ui/no-data-found';
import { useLogManagement } from '@/hooks/log-management';
import { useLogManagementChartOptions } from '@/hooks/log-management/useLogManagementChartOptions';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

export const LogManagementTrendsAccordion = () => {
  const { expandedSections, toggleSection, displayedEvents } =
    useLogManagement();
  const { lineChartOption } = useLogManagementChartOptions();
  const isOpen = expandedSections.has('trends');

  return (
    <div
      className={sharedStyles.accordionGroup}
      data-open={isOpen}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      <div className={sharedStyles.accordionHeaderWrap}>
        <button
          type="button"
          className={clsx(
            sharedStyles.accordionHeader,
            sharedStyles.accordionHeaderBtn
          )}
          onClick={() => toggleSection('trends')}
        >
          <div
            className={clsx(
              sharedStyles.headerNode,
              sharedStyles.headerNodeViolet
            )}
          >
            <Icon icon="mdi:trending-up" width={16} height={16} />
          </div>
          <div className={sharedStyles.headerInfo}>
            <h3 className={sharedStyles.sectionTitle}>Stream Analytics</h3>
          </div>
          <Icon
            icon="lucide:chevron-down"
            className={clsx(
              sharedStyles.accordionChevron,
              isOpen && sharedStyles.accordionChevronExpanded
            )}
            width={18}
          />
        </button>
      </div>

      {isOpen && (
        <div
          className={sharedStyles.accordionContent}
          style={{
            padding: '20px 24px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          {displayedEvents?.length === 0 ? (
            <div
              style={{
                padding: '40px',
                display: 'flex',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <NoDataFound
                title="No Analytics Data"
                description="Not enough data to display stream trends."
                icon="mdi:trending-up"
              />
            </div>
          ) : (
            <div
              className={sharedStyles.analyticsSection}
              style={{ flex: 1, overflow: 'hidden' }}
            >
              <LogManagementChart option={lineChartOption} size="md" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
