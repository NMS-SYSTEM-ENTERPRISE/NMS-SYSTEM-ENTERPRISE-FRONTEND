'use client';

import sharedStyles from '@/components/features/slo-detail/shared/styles.module.css';
import { Icon } from '@iconify/react';

export const SloOverviewSection = ({ sloData, trendChartRef }) => {
  const summaryFields = [
    { label: 'Business Service', value: sloData.businessServiceName },
    { label: 'Frequency', value: sloData.frequency },
    { label: 'Metric', value: sloData.sloMetric },
    { label: 'Elapsed', value: sloData.elapsedTime },
    { label: 'Remaining', value: sloData.remainingTime },
    { label: 'Burn Rate', value: sloData.burnRate },
  ];

  return (
    <div className={sharedStyles.splitLayout}>
      <div className={sharedStyles.column}>
        <div className={sharedStyles.columnHeader}>
          <Icon icon="ph:list-bullets-bold" /> SLO Details
        </div>
        <div className={sharedStyles.summaryColumn}>
          {summaryFields.map((item) => (
            <div key={item.label} className={sharedStyles.summaryItem}>
              <span className={sharedStyles.summaryLabel}>{item.label}</span>
              <span className={sharedStyles.summaryValue}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={sharedStyles.verticalDivider} aria-hidden />
      <div className={sharedStyles.column}>
        <div className={sharedStyles.columnHeader}>
          <Icon icon="ph:trend-up-bold" /> SLO Trend & Forecast (24h)
        </div>
        <div ref={trendChartRef} className={sharedStyles.chartContainer} />
      </div>
    </div>
  );
};
