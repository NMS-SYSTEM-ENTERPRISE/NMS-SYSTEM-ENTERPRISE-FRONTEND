'use client';

import sharedStyles from '@/components/features/slo-detail/shared/styles.module.css';
import { SloDetailAccordion } from '@/components/features/slo-detail/slo-detail-accordion';
import { SloDetailHeader } from '@/components/features/slo-detail/slo-detail-header';
import { SloHistorySection } from '@/components/features/slo-detail/slo-history-section';
import { SloMetricsSection } from '@/components/features/slo-detail/slo-metrics-section';
import { SloMonitorsSection } from '@/components/features/slo-detail/slo-monitors-section';
import { SloOverviewSection } from '@/components/features/slo-detail/slo-overview-section';
import { useSloDetail } from '@/hooks/slo-detail';
import { useSloDetailCharts } from '@/hooks/slo-detail/useSloDetailCharts';
import { SLO_DETAIL_SECTIONS } from '@/utils/constants/slo-detail';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export const SloDetailContent = () => {
  const { sloId } = useParams();
  const { openSections, toggleSection, sloData, isLoading, errorMessage, loadSloDetail } = useSloDetail();

  useEffect(() => {
    loadSloDetail(sloId);
  }, [loadSloDetail, sloId]);

  const { trendChartRef, burndownChartRef, burnRateChartRef } =
    useSloDetailCharts({
      sloData,
      openSections,
    });

  if (isLoading) {
    return <div className={sharedStyles.sloDetail}>Loading SLO detail...</div>;
  }

  if (errorMessage || !sloData) {
    return <div className={sharedStyles.sloDetail}>{errorMessage || 'SLO not found.'}</div>;
  }

  const achievedMet = Number(sloData.achieved) >= Number(sloData.target);

  return (
    <div className={sharedStyles.sloDetail}>
      <SloDetailHeader sloData={sloData} />

      <main className={sharedStyles.content}>
        <div className={sharedStyles.accordionContainer}>
          <SloDetailAccordion
            title={SLO_DETAIL_SECTIONS.overview.title}
            icon={SLO_DETAIL_SECTIONS.overview.icon}
            isOpen={openSections.overview}
            onToggle={() => toggleSection('overview')}
            badge={sloData.type}
            badgeClassName={sharedStyles.badgeAccentBlue}
          >
            <SloOverviewSection
              sloData={sloData}
              trendChartRef={trendChartRef}
            />
          </SloDetailAccordion>

          <SloDetailAccordion
            title={SLO_DETAIL_SECTIONS.metrics.title}
            icon={SLO_DETAIL_SECTIONS.metrics.icon}
            isOpen={openSections.metrics}
            onToggle={() => toggleSection('metrics')}
            badge={`${sloData.achieved}% Achieved`}
            badgeClassName={clsx(
              achievedMet ? sharedStyles.badgeSuccess : sharedStyles.badgeDanger
            )}
          >
            <SloMetricsSection
              sloData={sloData}
              burndownChartRef={burndownChartRef}
              burnRateChartRef={burnRateChartRef}
            />
          </SloDetailAccordion>

          <SloDetailAccordion
            title={SLO_DETAIL_SECTIONS.monitors.title}
            icon={SLO_DETAIL_SECTIONS.monitors.icon}
            isOpen={openSections.monitors}
            onToggle={() => toggleSection('monitors')}
            badge={`${sloData.monitors?.length || 0} Monitors`}
            badgeClassName={sharedStyles.badgeWarning}
          >
            <SloMonitorsSection monitors={sloData.monitors || []} />
          </SloDetailAccordion>

          <SloDetailAccordion
            title={SLO_DETAIL_SECTIONS.history.title}
            icon={SLO_DETAIL_SECTIONS.history.icon}
            isOpen={openSections.history}
            onToggle={() => toggleSection('history')}
            badge={`${sloData.history?.length || 0} Periods`}
            badgeClassName={sharedStyles.badgeMuted}
          >
            <SloHistorySection history={sloData.history || []} />
          </SloDetailAccordion>
        </div>
      </main>
    </div>
  );
};
