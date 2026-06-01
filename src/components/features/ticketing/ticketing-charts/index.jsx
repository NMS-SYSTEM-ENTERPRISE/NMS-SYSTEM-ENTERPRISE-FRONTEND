'use client';

import { useMemo } from 'react';
import { TicketingChart } from '@/components/features/ticketing/ticketing-chart';
import sharedStyles from '@/components/features/ticketing/shared/styles.module.css';
import {
  buildStatusPieOption,
  buildTechWorkloadOption,
  useTicketingChartOptions,
} from '@/hooks/ticketing/useTicketingChartOptions';
import { TICKETING_LEGEND_DOT_CLASS } from '@/utils/constants/ticketing';
import {
  TICKETING_STATUS_LEGEND,
  TICKETING_STATUS_PIE_DATA,
  TICKETING_TECH_WORKLOAD,
} from '@/utils/dummy-data/ticketing';

export const TicketingCharts = () => {
  const { resolveColor } = useTicketingChartOptions();

  const pieOption = useMemo(
    () => buildStatusPieOption(TICKETING_STATUS_PIE_DATA, resolveColor),
    [resolveColor]
  );

  const barOption = useMemo(
    () => buildTechWorkloadOption(TICKETING_TECH_WORKLOAD, resolveColor),
    [resolveColor]
  );

  return (
    <div className={sharedStyles.distributionGrid}>
      <div className={sharedStyles.distributionCard}>
        <span className={sharedStyles.subHeader}>TICKET DISTRIBUTION</span>
        <div className={sharedStyles.chartFlex}>
          <TicketingChart option={pieOption} size="pie" />
          <div className={sharedStyles.legendList}>
            {TICKETING_STATUS_LEGEND.map((row) => (
              <div key={row.label} className={sharedStyles.legendRow}>
                <span
                  className={`${sharedStyles.legendDot} ${sharedStyles[TICKETING_LEGEND_DOT_CLASS[row.colorToken]]}`}
                />
                {row.label}
                <span className={sharedStyles.legendCount}>{row.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={sharedStyles.distributionCard}>
        <span className={sharedStyles.subHeader}>TECHNICIAN WORKLOAD</span>
        <div className={sharedStyles.horizontalBarWrap}>
          <TicketingChart option={barOption} size="bar" />
        </div>
      </div>
    </div>
  );
};
