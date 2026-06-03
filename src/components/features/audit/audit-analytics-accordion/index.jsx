'use client';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { AuditChart } from '@/components/features/audit/audit-chart';
import sharedStyles from '@/components/features/audit/shared/styles.module.css';
import { useAudit } from '@/hooks/audit';
import { useAuditChartOptions } from '@/hooks/audit/useAuditChartOptions';
import { AUDIT_LEGEND_DOT_CLASS } from '@/utils/constants/audit';
import { NoDataFound } from '@/components/ui/no-data-found';

export const AuditAnalyticsAccordion = () => {
  const { activeView, expandedSections, toggleSection, auditEvents } = useAudit();
  const { auditEventOption, userActivityOption, legendData } = useAuditChartOptions(auditEvents);

  if (activeView !== 'overview') return null;

  const isOpen = expandedSections.has('analytics');

  return (
    <div className={sharedStyles.accordionGroup} data-open={isOpen}>
      <button
        type="button"
        className={clsx(sharedStyles.accordionHeader, sharedStyles.accordionHeaderBtn)}
        onClick={() => toggleSection('analytics')}
      >
        <div className={clsx(sharedStyles.headerNode, sharedStyles.headerNodeViolet)}>
          <Icon icon="mdi:chart-arc" width={18} />
        </div>
        <div className={sharedStyles.headerInfo}>
          <h3 className={sharedStyles.sectionTitle}>
            Traffic Distribution{' '}
            <span className={sharedStyles.badge} data-type="analytics">
              ANALYTICS
            </span>
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
          {auditEvents.length === 0 ? (
            <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
              <NoDataFound title="No Traffic Data" description="Not enough data to generate module distribution and user activity." icon="mdi:chart-arc" />
            </div>
          ) : (
            <div className={sharedStyles.distributionGrid}>
              <div className={sharedStyles.distributionCard}>
                <span className={sharedStyles.subHeader}>MODULES DISTRIBUTION</span>
                <div className={sharedStyles.chartFlex}>
                  <AuditChart option={auditEventOption} size="md" />
                  <div className={sharedStyles.simpleLegend}>
                    {(legendData || []).map((row) => (
                      <div key={row.label} className={sharedStyles.legendRow}>
                        <span
                          className={clsx(
                            sharedStyles.dot,
                            sharedStyles[AUDIT_LEGEND_DOT_CLASS[row.colorToken]]
                          )}
                        />
                        {row.label} <span className={sharedStyles.val}>{row.percent}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={sharedStyles.distributionCard}>
                <span className={sharedStyles.subHeader}>USER ACTIVITY (TOP LOGS)</span>
                <div className={sharedStyles.horizontalBarWrap}>
                  <AuditChart option={userActivityOption} size="md" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
