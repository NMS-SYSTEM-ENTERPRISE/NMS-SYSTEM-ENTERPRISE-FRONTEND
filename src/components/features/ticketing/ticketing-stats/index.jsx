'use client';

import clsx from 'clsx';
import { TicketingChart } from '@/components/features/ticketing/ticketing-chart';
import sharedStyles from '@/components/features/ticketing/shared/styles.module.css';
import { useTicketingChartOptions } from '@/hooks/ticketing/useTicketingChartOptions';
import { TICKETING_STAT_VALUE_CLASS } from '@/utils/constants/ticketing';
import { TICKETING_STAT_METRICS } from '@/utils/dummy-data/ticketing';

export const TicketingStats = () => {
  const { getSparklineOption } = useTicketingChartOptions();

  return (
    <div className={sharedStyles.realtimeGrid}>
      {TICKETING_STAT_METRICS.map((metric) => (
        <div key={metric.id} className={sharedStyles.metricWidget}>
          <div className={sharedStyles.statHeader}>
            <div
              className={clsx(
                sharedStyles.statValue,
                sharedStyles[TICKETING_STAT_VALUE_CLASS[metric.colorToken]]
              )}
            >
              {metric.value}
            </div>
          </div>
          <div className={sharedStyles.statLabel}>{metric.label}</div>
          <div className={sharedStyles.sparklineWrap}>
            <TicketingChart option={getSparklineOption(metric.sparkColorToken)} size="sm" />
          </div>
        </div>
      ))}
    </div>
  );
};
