'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import sharedStyles from '@/components/features/alerts/shared/styles.module.css';
import { getAlertSeverityClassSuffix } from '@/utils/constants/alerts';

export const AlertsListRow = ({ alert, index, isExpanded, onToggle }) => {
  const router = useRouter();
  const severitySuffix = getAlertSeverityClassSuffix(alert.severity);

  return (
    <div className={sharedStyles.accordionRow} data-expanded={isExpanded}>
      <div className={sharedStyles.rowMain} onClick={onToggle}>
        <span className={sharedStyles.monitorText}>{index + 1}</span>
        <div className={sharedStyles.alertIdentity}>
          <div className={`${sharedStyles.severityCircle} ${sharedStyles[`severity${severitySuffix}`]}`} />
          <span className={sharedStyles.alertName}>{alert.alert}</span>
        </div>
        <span className={sharedStyles.typeTag}>{alert.type}</span>
        <span className={sharedStyles.monitorText}>{alert.monitor}</span>
        <span className={sharedStyles.monitorText}>{alert.instance || '-'}</span>
        <span className={`${sharedStyles.badgeVal} ${sharedStyles[`val${severitySuffix}`]}`}>
          {alert.value}
        </span>
        <span className={sharedStyles.durationText}>{alert.duration}</span>
        <Button
          variant="ghost"
          size="icon"
          className={sharedStyles.linkBtn}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/alerts/${alert.id}`);
          }}
          title="View Detailed Analytics"
        >
          <Icon icon="mdi:open-in-new" width={18} />
        </Button>
        <Icon
          icon="mdi:chevron-down"
          width={20}
          className={clsx(sharedStyles.chevron, isExpanded && sharedStyles.chevronExpanded)}
        />
      </div>

      {isExpanded && (
        <div className={sharedStyles.rowDetails}>
          <div className={sharedStyles.detailsGrid}>
            <div className={sharedStyles.detailSection}>
              <span className={sharedStyles.detailTitle}>Contextual Analysis</span>
              <div className={sharedStyles.metaGrid}>
                <div className={sharedStyles.metaItem}>
                  <span className={sharedStyles.metaLabel}>Metric Path</span>
                  <span className={sharedStyles.metaValue}>{alert.metric}</span>
                </div>
                <div className={sharedStyles.metaItem}>
                  <span className={sharedStyles.metaLabel}>Last Captured</span>
                  <span className={sharedStyles.metaValue}>{alert.lastSeen}</span>
                </div>
                <div className={sharedStyles.metaItem}>
                  <span className={sharedStyles.metaLabel}>Category</span>
                  <span className={sharedStyles.metaValue}>{alert.category}</span>
                </div>
                <div className={sharedStyles.metaItem}>
                  <span className={sharedStyles.metaLabel}>Threshold</span>
                  <span className={sharedStyles.metaValue}>90% Static</span>
                </div>
              </div>
            </div>
            <div className={sharedStyles.detailSection}>
              <span className={sharedStyles.detailTitle}>Incident Mapping</span>
              <div className={sharedStyles.metaGrid}>
                <div className={sharedStyles.metaItem}>
                  <span className={sharedStyles.metaLabel}>Incident ID</span>
                  <span className={sharedStyles.metaValue}>{alert.incidentDetails || 'N/A'}</span>
                </div>
                <div className={sharedStyles.metaItem}>
                  <span className={sharedStyles.metaLabel}>Assignment Group</span>
                  <span className={sharedStyles.metaValue}>Network_NOC_L1</span>
                </div>
                <div className={sharedStyles.metaItem}>
                  <span className={sharedStyles.metaLabel}>Correlation</span>
                  <span className={sharedStyles.metaValue}>
                    {alert.correlatedAlerts || 'Single Event'}
                  </span>
                </div>
              </div>
            </div>
            <div className={sharedStyles.detailSection}>
              <span className={sharedStyles.detailTitle}>Quick Actions</span>
              <div className={sharedStyles.quickActions}>
                <Button variant="ghost" size="sm" className={sharedStyles.quickActionBtn}>
                  ACKNOWLEDGE
                </Button>
                <Button variant="ghost" size="sm" className={sharedStyles.quickActionBtn}>
                  VIEW GRAPH
                </Button>
                <Button variant="ghost" size="sm" className={sharedStyles.quickActionBtn}>
                  CREATE INCIDENT
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
