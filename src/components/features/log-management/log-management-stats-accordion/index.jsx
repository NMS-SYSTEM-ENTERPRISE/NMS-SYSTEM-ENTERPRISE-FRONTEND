'use client';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { LogManagementChart } from '@/components/features/log-management/log-management-chart';
import sharedStyles from '@/components/features/log-management/shared/styles.module.css';
import { useLogManagement } from '@/hooks/log-management';
import { useLogManagementChartOptions } from '@/hooks/log-management/useLogManagementChartOptions';
import { LOG_METRIC_VALUE_CLASS } from '@/utils/constants/log-management';
import { LOG_SUMMARY_METRICS } from '@/utils/dummy-data/log-management';

export const LogManagementStatsAccordion = () => {
  const { expandedSections, toggleSection } = useLogManagement();
  const { getSummarySparklineOption } = useLogManagementChartOptions();
  const isOpen = expandedSections.has('stats');

  return (
    <div className={sharedStyles.accordionGroup} data-open={isOpen}>
      <button
        type="button"
        className={clsx(sharedStyles.accordionHeader, sharedStyles.accordionHeaderBtn)}
        onClick={() => toggleSection('stats')}
      >
        <div className={clsx(sharedStyles.headerNode, sharedStyles.headerNodeCyan)}>
          <Icon icon="mdi:chart-timeline-variant" width={18} />
        </div>
        <div className={sharedStyles.headerInfo}>
          <h3 className={sharedStyles.sectionTitle}>
            Performance Overview <span className={sharedStyles.badge} data-type="live">LIVE</span>
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
          <div className={sharedStyles.realtimeGrid}>
            {LOG_SUMMARY_METRICS.map((metric) => (
              <div key={metric.id} className={sharedStyles.metricWidget}>
                <div className={sharedStyles.metricMeta}>
                  <span className={sharedStyles.metricLabel}>{metric.label}</span>
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
                    option={getSummarySparklineOption(
                      metric.sparkMin,
                      metric.sparkMax,
                      metric.colorToken
                    )}
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
