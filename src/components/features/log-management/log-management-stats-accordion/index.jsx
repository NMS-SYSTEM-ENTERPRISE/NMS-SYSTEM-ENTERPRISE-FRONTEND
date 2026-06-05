'use client';

import { LogManagementChart } from '@/components/features/log-management/log-management-chart';
import sharedStyles from '@/components/features/log-management/shared/styles.module.css';
import { NoDataFound } from '@/components/ui/no-data-found';
import { useLogManagement } from '@/hooks/log-management';
import { useLogManagementChartOptions } from '@/hooks/log-management/useLogManagementChartOptions';
import { LOG_METRIC_VALUE_CLASS } from '@/utils/constants/log-management';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

export const LogManagementStatsAccordion = () => {
  const { expandedSections, toggleSection, displayedEvents } =
    useLogManagement();
  const { getSummarySparklineOption } = useLogManagementChartOptions();
  const isOpen = expandedSections.has('stats');

  // Dynamic metrics calculation
  const totalEvents = displayedEvents?.length || 0;
  const criticalEvents =
    displayedEvents?.filter(
      (e) =>
        e.severity === 'critical' ||
        e.severity === 'emergency' ||
        e.severity === 'alert' ||
        e.severity === 'error'
    ).length || 0;
  const warnings =
    displayedEvents?.filter((e) => e.severity === 'warning').length || 0;

  const dynamicMetrics = [
    { id: 'm1', label: 'Total Events', value: totalEvents, colorToken: 'cyan' },
    {
      id: 'm2',
      label: 'Critical / Alert',
      value: criticalEvents,
      colorToken: 'violet',
    },
    { id: 'm3', label: 'Warnings', value: warnings, colorToken: 'green' },
  ];

  return (
    <div className={sharedStyles.accordionGroup} data-open={isOpen}>
      <div className={sharedStyles.accordionHeaderWrap}>
        <button
          type="button"
          className={clsx(
            sharedStyles.accordionHeader,
            sharedStyles.accordionHeaderBtn
          )}
          onClick={() => toggleSection('stats')}
        >
          <div
            className={clsx(sharedStyles.headerNode, sharedStyles.headerNodeCyan)}
          >
            <Icon icon="mdi:chart-timeline-variant" width={16} height={16} />
          </div>
          <div className={sharedStyles.headerInfo}>
            <h3 className={sharedStyles.sectionTitle}>
              Performance Overview
              <span className={sharedStyles.badge} data-type="live">
                LIVE
              </span>
            </h3>
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
          style={{ padding: '20px 24px' }}
        >
          {displayedEvents?.length === 0 ? (
            <div
              style={{
                padding: '40px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <NoDataFound
                title="No Overview Data"
                description="No log events match your current criteria."
                icon="mdi:chart-timeline-variant"
              />
            </div>
          ) : (
            <div className={sharedStyles.realtimeGrid}>
              {dynamicMetrics.map((metric) => (
                <div key={metric.id} className={sharedStyles.metricWidget}>
                  <div className={sharedStyles.metricMeta}>
                    <span className={sharedStyles.metricLabel}>
                      {metric.label}
                    </span>
                    <span
                      className={clsx(
                        sharedStyles.metricValue,
                        sharedStyles[LOG_METRIC_VALUE_CLASS[metric.colorToken]]
                      )}
                    >
                      {metric.value}
                    </span>
                  </div>
                  <div className={sharedStyles.sparklineWrap}>
                    <LogManagementChart
                      option={getSummarySparklineOption([], metric.colorToken)}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
