'use client';

import { Badge } from '@/components/ui/badge';
import sharedStyles from '@/components/features/alarm-history/shared/styles.module.css';
import { ALARM_HISTORY_DATA } from '@/utils/dummy-data/alarm-history';

export const AlarmHistoryInfoPanel = () => {
  const data = ALARM_HISTORY_DATA;

  const rows = [
    { label: 'Monitor', value: data.monitor },
    { label: 'IP', value: data.ip },
    { label: 'Alert ID', value: data.alertId },
    { label: 'Host', value: data.host },
    { label: 'Correlated Alerts', value: data.correlatedAlerts },
    { label: 'Alert Policy', value: data.alertPolicy },
    { label: 'First seen', value: data.firstSeen },
  ];

  return (
    <div className={sharedStyles.leftPanel}>
      <div className={sharedStyles.infoCard}>
        {rows.map((row) => (
          <div key={row.label} className={sharedStyles.infoRow}>
            <span className={sharedStyles.infoLabel}>{row.label}</span>
            <span className={sharedStyles.infoValue}>{row.value}</span>
          </div>
        ))}
        <div className={sharedStyles.infoRow}>
          <span className={sharedStyles.infoLabel}>Severity</span>
          <Badge variant="danger" className={sharedStyles.severityBadge}>
            {data.severity}
          </Badge>
        </div>
      </div>
    </div>
  );
};
