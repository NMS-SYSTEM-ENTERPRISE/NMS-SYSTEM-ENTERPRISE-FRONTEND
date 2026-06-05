'use client';

import { AlertDetailAccordion } from '@/components/features/alert-detail/alert-detail-accordion';
import { AlertDetailHeader } from '@/components/features/alert-detail/alert-detail-header';
import sharedStyles from '@/components/features/alert-detail/shared/styles.module.css';
import { useAlertDetail } from '@/hooks/alert-detail';
import { useAlertDetailCharts } from '@/hooks/alert-detail/useAlertDetailCharts';
import { ALERT_DETAIL_EVENT_TYPES, ALERT_DETAIL_SECTIONS } from '@/utils/constants/alert-detail';
import { ALERT_DETAIL_HISTORY, ALERT_DETAILS, DEFAULT_ALERT_DETAIL } from '@/utils/dummy-data/alert-detail';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AlertDetailSkeleton } from '@/components/ui/skeleton-loaders/alerts-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';
import { getAlertById } from '@/networking/network-monitoring/network-monitoring-apis';
import { Icon } from '@iconify/react';

export const AlertDetailContent = () => {
  const { alertId } = useParams();
  const { openSections, toggleSection } = useAlertDetail();
  const [isLoading, setIsLoading] = useState(true);
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const data = await getAlertById(alertId);
        // Map the backend fields to what the UI expects if necessary
        // e.g., mapping id -> alertId for UI compatibility
        if (data) {
          setAlertData({
            ...data,
            alertId: data.id,
            title: data.alert,
            count: 1, // backend doesn't provide count yet
            triggerCondition: 'Threshold exceeded',
            instance: data.instance || 'System',
          });
        }
      } catch (err) {
        console.error('Failed to fetch alert detail:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlert();
  }, [alertId]);

  const { trendChartRef, countChartRef } = useAlertDetailCharts(openSections.analytics);

  if (isLoading) {
    return <AlertDetailSkeleton />;
  }

  if (!alertData) {
    return (
      <div style={{ height: '100%', width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <NoDataFound 
          title="Alert Not Found" 
          description="The requested alert ID does not exist or has been archived."
          icon="mdi:database-off-outline"
        />
      </div>
    );
  }

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
                <span className={`${sharedStyles.metricValue} ${alertData.isActive ? sharedStyles.metricValue_danger : sharedStyles.metricValue_success}`}>
                  {alertData.isActive ? 'ACTIVE' : 'CLEARED'}
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
                    <div className={sharedStyles.identityPill}>
                      <div className={sharedStyles.identityIconWrapper}>
                        <span className={sharedStyles.identityInitials}>
                          {alertData.deviceName ? alertData.deviceName.substring(0, 2).toUpperCase() : 'IP'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className={sharedStyles.identityName}>{alertData.deviceName || 'Unknown Device'}</span>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-geist-mono), monospace' }}>{alertData.monitor}</span>
                      </div>
                      <div className={sharedStyles.identityAction}>
                        <Icon icon="mdi:sitemap-outline" width={14} />
                      </div>
                    </div>
                  </div>
                  <div className={sharedStyles.metaItem}>
                    <span className={sharedStyles.metaLabel}>Location</span>
                    <span className={sharedStyles.metaValue}>{alertData.location || 'Unknown Location'}</span>
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
                    <span className={sharedStyles.metaLabel}>First Seen</span>
                    <span className={sharedStyles.metaValue}>{alertData.firstSeen}</span>
                  </div>
                  <div className={sharedStyles.metaItem}>
                    <span className={sharedStyles.metaLabel}>Last Seen</span>
                    <span className={sharedStyles.metaValue}>{alertData.lastSeen}</span>
                  </div>
                  <div className={sharedStyles.metaItem}>
                    <span className={sharedStyles.metaLabel}>Category</span>
                    <span className={sharedStyles.metaValue}>{alertData.category || 'Network'}</span>
                  </div>
                  <div className={sharedStyles.metaItem}>
                    <span className={sharedStyles.metaLabel}>Value</span>
                    <span className={sharedStyles.metaValue}>{alertData.value}</span>
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
                <span className={sharedStyles.chartName}>ALERT CLASSIFICATION</span>
                <div ref={trendChartRef} className={sharedStyles.chartBox} />
              </div>
              <div className={sharedStyles.chartContainer}>
                <span className={sharedStyles.chartName}>POLICY PERFORMANCE</span>
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
