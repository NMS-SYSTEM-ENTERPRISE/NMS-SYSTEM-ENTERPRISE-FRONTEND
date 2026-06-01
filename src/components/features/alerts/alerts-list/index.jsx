'use client';

import sharedStyles from '@/components/features/alerts/shared/styles.module.css';
import { useAlerts } from '@/hooks/alerts';
import { AlertsListRow } from './alerts-list-row';

export const AlertsList = () => {
  const { filteredAlerts, expandedRows, toggleRow } = useAlerts();

  return (
    <div className={sharedStyles.tableContainer}>
      <div className={sharedStyles.tableHeaderRow}>
        <span>#</span>
        <span>ALERT NAME & SEVERITY</span>
        <span>TYPE</span>
        <span>MONITOR / SOURCE</span>
        <span>INSTANCE</span>
        <span>VALUE</span>
        <span>DURATION</span>
        <span />
      </div>
      <div className={sharedStyles.tableBody}>
        {filteredAlerts.map((alert, i) => (
          <AlertsListRow
            key={alert.id}
            alert={alert}
            index={i}
            isExpanded={expandedRows.has(alert.id)}
            onToggle={() => toggleRow(alert.id)}
          />
        ))}
      </div>
    </div>
  );
};
