'use client';

import clsx from 'clsx';
import { TicketingChart } from '@/components/features/ticketing/ticketing-chart';
import sharedStyles from '@/components/features/ticketing/shared/styles.module.css';
import { useTicketingChartOptions } from '@/hooks/ticketing/useTicketingChartOptions';
import { TICKETING_STAT_VALUE_CLASS } from '@/utils/constants/ticketing';
import { useTicketing } from '@/hooks/ticketing';

export const TicketingStats = () => {
  const { getSparklineOption } = useTicketingChartOptions();
  const { summary } = useTicketing();

  const total = summary?.total_tickets || 0;
  const openCount = summary?.open_tickets || 0;
  const closedCount = summary?.closed_tickets || 0;

  const dynamicMetrics = [
    { id: '1', label: 'Total Tickets', value: total, colorToken: 'cyan', sparkColorToken: 'cyan' },
    { id: '2', label: 'Open Tickets', value: openCount, colorToken: 'violet', sparkColorToken: 'violet' },
    { id: '3', label: 'Closed Tickets', value: closedCount, colorToken: 'green', sparkColorToken: 'green' }
  ];

  return (
    <div className={sharedStyles.realtimeGrid}>
      {dynamicMetrics.map((metric) => (
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
