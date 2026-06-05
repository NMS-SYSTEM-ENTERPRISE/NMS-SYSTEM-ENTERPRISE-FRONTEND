'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import sharedStyles from '@/components/features/alerts/shared/styles.module.css';
import { getAlertSeverityClassSuffix } from '@/utils/constants/alerts';

const getDeviceIcon = (deviceType) => {
  if (!deviceType) return 'mdi:sitemap-outline';
  const t = deviceType.toLowerCase();
  if (t.includes('server')) return 'mdi:server';
  if (t.includes('ups') || t.includes('power')) return 'mdi:lightning-bolt';
  if (t.includes('cloud')) return 'mdi:cloud-outline';
  if (t.includes('firewall') || t.includes('security')) return 'mdi:shield-outline';
  return 'mdi:sitemap-outline';
};

const getDeviceColor = (deviceType) => {
  if (!deviceType) return { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.2)', text: '#60a5fa' };
  const t = deviceType.toLowerCase();
  if (t.includes('server')) return { bg: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.2)', text: '#c084fc' };
  if (t.includes('ups') || t.includes('power')) return { bg: 'rgba(249, 115, 22, 0.1)', border: 'rgba(249, 115, 22, 0.2)', text: '#fb923c' };
  if (t.includes('cloud')) return { bg: 'rgba(14, 165, 233, 0.1)', border: 'rgba(14, 165, 233, 0.2)', text: '#38bdf8' };
  if (t.includes('firewall') || t.includes('security')) return { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.2)', text: '#f87171' };
  return { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.2)', text: '#60a5fa' };
};

export const AlertsListRow = ({ alert, index, isExpanded, onToggle }) => {
  const router = useRouter();
  const severitySuffix = getAlertSeverityClassSuffix(alert.severity);

  return (
    <div className={sharedStyles.accordionRow} data-expanded={isExpanded}>
      <div className={sharedStyles.rowMain} onClick={onToggle}>
        <span className={sharedStyles.monitorText}>{index + 1}</span>
        {/* 1. MONITOR / SOURCE */}
        <div className={sharedStyles.rowIdentityPill}>
          <div
            className={sharedStyles.identityInitialsRow}
            style={{
              background: getDeviceColor(alert.deviceType).bg,
              borderColor: getDeviceColor(alert.deviceType).border,
              color: getDeviceColor(alert.deviceType).text
            }}
          >
            {alert.deviceName ? alert.deviceName.substring(0, 2).toUpperCase() : 'IP'}
          </div>
          <span className={sharedStyles.identityNameRow}>{alert.deviceName || alert.monitor}</span>
        </div>

        {/* 2. ALERT NAME & SEVERITY */}
        <div className={sharedStyles.alertIdentity}>
          <div className={`${sharedStyles.severityCircle} ${sharedStyles[`severity${severitySuffix}`]}`} />
          <span className={sharedStyles.alertName}>{alert.alert}</span>
        </div>

        {/* 3. TYPE (Device Icon) */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div className={sharedStyles.identityActionRow}>
            <Icon icon={getDeviceIcon(alert.deviceType)} width={14} />
          </div>
        </div>
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

      {
        isExpanded && (
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
                <span className={sharedStyles.detailTitle}>Resolution Context</span>
                <div className={sharedStyles.metaGrid}>
                  <div className={sharedStyles.metaItem}>
                    <span className={sharedStyles.metaLabel}>Acknowledged By</span>
                    <span className={sharedStyles.metaValue}>{alert.acknowledged ? 'System Admin' : 'Pending'}</span>
                  </div>
                  <div className={sharedStyles.metaItem}>
                    <span className={sharedStyles.metaLabel}>Action Taken</span>
                    <span className={sharedStyles.metaValue}>None</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};
