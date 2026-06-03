'use client';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { AuditChart } from '@/components/features/audit/audit-chart';
import sharedStyles from '@/components/features/audit/shared/styles.module.css';
import { useAudit } from '@/hooks/audit';
import { useAuditChartOptions } from '@/hooks/audit/useAuditChartOptions';
import { AUDIT_METRIC_VALUE_CLASS } from '@/utils/constants/audit';
import { NoDataFound } from '@/components/ui/no-data-found';

export const AuditSummaryAccordion = () => {
  const { activeView, expandedSections, toggleSection, auditEvents } = useAudit();
  const { getSummarySparklineOption, summaryMetrics } = useAuditChartOptions(auditEvents);

  if (activeView !== 'overview') return null;

  const isOpen = expandedSections.has('summary');

  return (
    <div className={sharedStyles.accordionGroup} data-open={isOpen}>
      <button
        type="button"
        className={clsx(sharedStyles.accordionHeader, sharedStyles.accordionHeaderBtn)}
        onClick={() => toggleSection('summary')}
      >
        <div className={clsx(sharedStyles.headerNode, sharedStyles.headerNodeSky)}>
          <Icon icon="mdi:pulse" width={18} />
        </div>
        <div className={sharedStyles.headerInfo}>
          <h3 className={sharedStyles.sectionTitle}>
            Real-time Analytics <span className={sharedStyles.badge} data-type="live">LIVE</span>
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
              <NoDataFound title="No Analytics Data" description="No audit logs available for real-time analysis." icon="mdi:pulse" />
            </div>
          ) : (
            <div className={sharedStyles.realtimeGrid}>
              {(summaryMetrics || []).map((metric) => (
                <div key={metric.id} className={sharedStyles.metricWidget}>
                  <div className={sharedStyles.metricMeta}>
                    <span className={sharedStyles.metricLabel}>{metric.label}</span>
                    <span
                      className={clsx(
                        sharedStyles.metricValue,
                        sharedStyles[AUDIT_METRIC_VALUE_CLASS[metric.colorToken]]
                      )}
                    >
                      {metric.value}
                    </span>
                  </div>
                  <div className={sharedStyles.sparklineWrap}>
                    <AuditChart
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
          )}
        </div>
      )}
    </div>
  );
};
