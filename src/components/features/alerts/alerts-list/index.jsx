'use client';

import sharedStyles from '@/components/features/alerts/shared/styles.module.css';
import { useAlerts } from '@/hooks/alerts';
import { AlertsListRow } from './alerts-list-row';
import { AlertsListSkeleton } from '@/components/ui/skeleton-loaders/alerts-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';
import { Pagination } from '@/components/ui/pagination';

export const AlertsList = () => {
  const {
    totalAlerts,
    paginatedAlerts,
    expandedRows,
    toggleRow,
    isLoading,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage
  } = useAlerts();

  if (isLoading) {
    return <AlertsListSkeleton />;
  }

  if (paginatedAlerts.length === 0) {
    return (
      <div style={{ height: '100%', width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        <span>MONITOR</span>
        <span>ALERT NAME & SEVERITY</span>
        <span style={{ textAlign: 'center' }}>TYPE</span>
        <span>VALUE</span>
        <span>DURATION</span>
        <span />
      </div>
      <div className={sharedStyles.tableBody}>
        {paginatedAlerts.map((alert, i) => (
          <AlertsListRow
            key={alert.id}
            alert={alert}
            index={i}
            isExpanded={expandedRows.has(alert.id)}
            onToggle={() => toggleRow(alert.id)}
          />
        ))}
      </div>

      <Pagination
        className={sharedStyles.pagination_wrapper}
        currentPage={currentPage}
        totalItems={totalAlerts}
        pageSize={itemsPerPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={setItemsPerPage}
        pageSizeOptions={[50, 100]}
      />
    </div>
  );
};
