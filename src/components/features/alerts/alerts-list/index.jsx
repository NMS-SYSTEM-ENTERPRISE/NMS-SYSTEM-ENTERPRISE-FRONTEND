'use client';

import sharedStyles from '@/components/features/alerts/shared/styles.module.css';
import { useAlerts } from '@/hooks/alerts';
import { AlertsListRow } from './alerts-list-row';
import { AlertsListSkeleton } from '@/components/ui/skeleton-loaders/alerts-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

export const AlertsList = () => {
  const { filteredAlerts, expandedRows, toggleRow, isLoading } = useAlerts();

  if (isLoading) {
    return <AlertsListSkeleton />;
  }

  if (filteredAlerts.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <NoDataFound 
          title="No Alerts Found" 
          description="There are currently no active alerts matching your criteria."
          icon="mdi:bell-off-outline"
        />
      </div>
    );
  }

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
