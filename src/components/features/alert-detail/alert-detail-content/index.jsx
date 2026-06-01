'use client';

import { AlertDetailAccordion } from '@/components/features/alert-detail/alert-detail-accordion';
import { AlertDetailHeader } from '@/components/features/alert-detail/alert-detail-header';
import sharedStyles from '@/components/features/alert-detail/shared/styles.module.css';
import { useAlertDetail } from '@/hooks/alert-detail';
import { useAlertDetailCharts } from '@/hooks/alert-detail/useAlertDetailCharts';
import { ALERT_DETAIL_EVENT_TYPES, ALERT_DETAIL_SECTIONS } from '@/utils/constants/alert-detail';
import { ALERT_DETAIL_HISTORY, ALERT_DETAILS, DEFAULT_ALERT_DETAIL } from '@/utils/dummy-data/alert-detail';
import { useParams } from 'next/navigation';

export const AlertDetailContent = () => {
  const { alertId } = useParams();
  const { openSections, toggleSection } = useAlertDetail();
  const alertData = ALERT_DETAILS[alertId] || DEFAULT_ALERT_DETAIL;
  const { trendChartRef, countChartRef } = useAlertDetailCharts(openSections.analytics);

  return (
    <div className={sharedStyles.alertDetail}>
      <AlertDetailHeader alertData={alertData} />

      <div className={sharedStyles.contentArea}>
        <div className={sharedStyles.accordionContainer}>
          <AlertDetailAccordion
            title={ALERT_DETAIL_SECTIONS.summary.title}
            icon={ALERT_DETAIL_SECTIONS.summary.icon}
            badge={ALERT_DETAIL_SECTIONS.summary.badge}
            isOpen={openSections.summary}
            onToggle={() => toggleSection('summary')}
          >
            <div className={sharedStyles.statsRow}>
              <div className={sharedStyles.metricTile}>
                <span className={sharedStyles.metricLabel}>ID</span>
                <span className={sharedStyles.metricValue}>{alertData.alertId}</span>
              </div>
              <div className={sharedStyles.metricTile}>
                <span className={sharedStyles.metricLabel}>STATUS</span>
                <span className={`${sharedStyles.metricValue} ${sharedStyles.metricValue_danger}`}>
                  ACTIVE
                </span>
              </div>
              <div className={sharedStyles.metricTile}>
                <span className={sharedStyles.metricLabel}>OCCURRENCES</span>
                <span className={sharedStyles.metricValue}>{alertData.count}</span>
              </div>
              <div className={sharedStyles.metricTile}>
                <span className={sharedStyles.metricLabel}>DURATION</span>
                <span className={sharedStyles.metricValue}>{alertData.duration}</span>
              </div>
            </div>
          </AlertDetailAccordion>

          <AlertDetailAccordion
            title={ALERT_DETAIL_SECTIONS.intelligence.title}
            icon={ALERT_DETAIL_SECTIONS.intelligence.icon}
            badge={ALERT_DETAIL_SECTIONS.intelligence.badge}
            isOpen={openSections.intelligence}
            onToggle={() => toggleSection('intelligence')}
          >
            <div className={sharedStyles.intelGrid}>
              <div className={sharedStyles.intelSection}>
                <span className={sharedStyles.intelTitle}>TECHNICAL CONTEXT</span>
                <div className={sharedStyles.metaGrid}>
                  <div className={sharedStyles.metaItem}>
                    <span className={sharedStyles.metaLabel}>Source Metric</span>
                    <span className={sharedStyles.metaValue}>{alertData.metric}</span>
                  </div>
                  <div className={sharedStyles.metaItem}>
                    <span className={sharedStyles.metaLabel}>Trigger Condition</span>
                    <span className={sharedStyles.metaValue}>{alertData.triggerCondition}</span>
                  </div>
                  <div className={sharedStyles.metaItem}>
                    <span className={sharedStyles.metaLabel}>Monitor Entity</span>
                    <span className={sharedStyles.metaValue}>{alertData.monitor}</span>
                  </div>
                  <div className={sharedStyles.metaItem}>
                    <span className={sharedStyles.metaLabel}>Component</span>
                    <span className={sharedStyles.metaValue}>{alertData.instance}</span>
                  </div>
                </div>
              </div>
              <div className={sharedStyles.intelSection}>
                <span className={sharedStyles.intelTitle}>METADATA & TAGS</span>
                <div className={sharedStyles.metaGrid}>
                  <div className={sharedStyles.metaItem}>
                    <span className={sharedStyles.metaLabel}>Environment Zone</span>
                    <span className={sharedStyles.metaValue}>Production-NOC</span>
                  </div>
                  <div className={sharedStyles.metaItem}>
                    <span className={sharedStyles.metaLabel}>Correlation ID</span>
                    <span className={sharedStyles.metaValue}>POL-992-X1</span>
                  </div>
                  <div className={sharedStyles.metaItem}>
                    <span className={sharedStyles.metaLabel}>Assignment Group</span>
                    <span className={sharedStyles.metaValue}>L2_Network_Support</span>
                  </div>
                  <div className={sharedStyles.metaItem}>
                    <span className={sharedStyles.metaLabel}>App Business Unit</span>
                    <span className={sharedStyles.metaValue}>FinTech_Operations</span>
                  </div>
                </div>
              </div>
            </div>
          </AlertDetailAccordion>

          <AlertDetailAccordion
            title={ALERT_DETAIL_SECTIONS.analytics.title}
            icon={ALERT_DETAIL_SECTIONS.analytics.icon}
            badge={ALERT_DETAIL_SECTIONS.analytics.badge}
            isOpen={openSections.analytics}
            onToggle={() => toggleSection('analytics')}
          >
            <div className={sharedStyles.analyticsRow}>
              <div className={sharedStyles.chartContainer}>
                <span className={sharedStyles.chartName}>Vulnerability Trend (24H)</span>
                <div ref={trendChartRef} className={sharedStyles.chartBox} />
              </div>
              <div className={sharedStyles.chartContainer}>
                <span className={sharedStyles.chartName}>Violation Distribution</span>
                <div ref={countChartRef} className={sharedStyles.chartBox} />
              </div>
            </div>
          </AlertDetailAccordion>

          <AlertDetailAccordion
            title={ALERT_DETAIL_SECTIONS.history.title}
            icon={ALERT_DETAIL_SECTIONS.history.icon}
            badge={ALERT_DETAIL_SECTIONS.history.badge}
            isOpen={openSections.history}
            onToggle={() => toggleSection('history')}
          >
            <div className={sharedStyles.historyTimeline}>
              {ALERT_DETAIL_HISTORY.map((item, idx) => (
                <div key={item.timestamp} className={sharedStyles.historyNode}>
                  <div className={sharedStyles.timeTrack}>
                    <div className={sharedStyles.timelineMarker}>
                      <div className={sharedStyles.nodeDot} />
                      <div className={sharedStyles.timelinePulse} />
                    </div>
                    <span className={sharedStyles.nodeTime}>{item.timestamp}</span>
                  </div>
                  <div className={sharedStyles.eventCard}>
                    <div className={sharedStyles.eventHeader}>
                      <div className={sharedStyles.severityIndicator} />
                      <span className={sharedStyles.eventType}>
                        {ALERT_DETAIL_EVENT_TYPES[idx] || ALERT_DETAIL_EVENT_TYPES[3]}
                      </span>
                    </div>
                    <div className={sharedStyles.nodeMsg}>{item.message}</div>
                    <div className={sharedStyles.eventMeta}>
                      <span className={sharedStyles.metaBadge}>POLICY: LOW-FLOW-01</span>
                      <span className={sharedStyles.metaBadge}>SOURCE: SNMP-POLL</span>
                      {idx < 2 && (
                        <span className={sharedStyles.metaBadge}>ACTION: ESCALATE</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AlertDetailAccordion>
        </div>
      </div>
    </div>
  );
};
