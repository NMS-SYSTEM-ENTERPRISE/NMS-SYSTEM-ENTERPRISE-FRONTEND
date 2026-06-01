'use client';

import { ProgressTrack } from '@/components/features/slo-detail/progress-track';
import sharedStyles from '@/components/features/slo-detail/shared/styles.module.css';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

export const SloMetricsSection = ({ sloData, burndownChartRef, burnRateChartRef }) => {
  const achievedMet = sloData.achieved >= sloData.target;

  return (
    <div className={sharedStyles.splitLayout}>
      <div className={sharedStyles.column}>
        <div className={sharedStyles.columnHeader}>
          <Icon icon="ph:chart-bar-bold" /> Objective Achievement
        </div>
        <div className={sharedStyles.gaugeGrid}>
          <div className={sharedStyles.metricCard}>
            <div className={sharedStyles.metricCardHeader}>
              <span className={sharedStyles.metricCardLabel}>Current SLO Achieved</span>
              <span
                className={clsx(
                  sharedStyles.metricCardValue,
                  achievedMet ? sharedStyles.textSuccess : sharedStyles.textDanger
                )}
              >
                {sloData.achieved}%
              </span>
            </div>
            <ProgressTrack
              percent={sloData.achieved}
              targetPercent={sloData.target}
              showTarget
              variant="default"
            />
            <div className={sharedStyles.metricCardFooter}>
              <div className={sharedStyles.infoItem}>
                <span className={sharedStyles.infoLabel}>Violated</span>
                <span className={sharedStyles.infoValue}>{sloData.violatedTime}</span>
              </div>
              <div className={sharedStyles.infoItem}>
                <span className={sharedStyles.infoLabel}>Budget</span>
                <span className={sharedStyles.infoValue}>
                  {sloData.acceptableViolationTime}
                </span>
              </div>
            </div>
          </div>

          <div className={sharedStyles.metricCard}>
            <div className={sharedStyles.metricCardHeader}>
              <span className={sharedStyles.metricCardLabel}>Error Budget Left</span>
              <span className={clsx(sharedStyles.metricCardValue, sharedStyles.textViolet)}>
                {sloData.errorBudgetLeft}%
              </span>
            </div>
            <ProgressTrack
              percent={Math.max(0, sloData.errorBudgetLeft)}
              variant="gradient"
            />
            <div className={sharedStyles.metricCardFooter}>
              <div className={sharedStyles.infoItem}>
                <span className={sharedStyles.infoLabel}>Status</span>
                <span className={clsx(sharedStyles.infoValue, sharedStyles.textSuccess)}>
                  Within Budget
                </span>
              </div>
              <div className={sharedStyles.infoItem}>
                <span className={sharedStyles.infoLabel}>Burn Rate</span>
                <span className={sharedStyles.infoValue}>{sloData.burnRate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={sharedStyles.verticalDivider} aria-hidden />

      <div className={sharedStyles.column}>
        <div className={sharedStyles.columnHeader}>
          <Icon icon="ph:activity-bold" /> Rate Analysis
        </div>
        <div className={sharedStyles.rateGrid}>
          <div className={sharedStyles.rateCard}>
            <div className={sharedStyles.rateCardHeader}>
              <Icon icon="ph:chart-line-down-bold" /> Burndown
            </div>
            <div className={sharedStyles.rateChartContainer} ref={burndownChartRef} />
          </div>
          <div className={sharedStyles.rateCard}>
            <div className={sharedStyles.rateCardHeader}>
              <Icon icon="ph:fire-bold" /> Burn Rate
            </div>
            <div className={sharedStyles.rateChartContainer} ref={burnRateChartRef} />
          </div>
        </div>
        <div className={sharedStyles.infoBox}>
          <div className={sharedStyles.infoBoxContent}>
            <Icon icon="ph:info-bold" width={18} className={sharedStyles.infoIcon} />
            <p className={sharedStyles.infoText}>
              Burn rate is calculated based on error budget consumption over the current window.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
