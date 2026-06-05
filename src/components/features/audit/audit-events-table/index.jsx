'use client';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import sharedStyles from '@/components/features/audit/shared/styles.module.css';
import { useAudit } from '@/hooks/audit';
import { NoDataFound } from '@/components/ui/no-data-found';
import { Pagination } from '@/components/ui/pagination';
import React from 'react';

export const AuditEventsTable = () => {
  const { filteredEvents, handleOpenActionSidebar } = useAudit();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(50);

  const totalItems = filteredEvents.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 if filteredEvents change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filteredEvents]);

  return (
    <div className={sharedStyles.requestsContainer}>
      <div className={sharedStyles.tableHeaderRow}>
        <span>TIMESTAMP</span>
        <span>MODULE</span>
        <span>OPERATION</span>
        <span>USER</span>
        <span>REMOTE IP</span>
        <span>MESSAGE</span>
        <span>STATUS</span>
      </div>

      <div className={sharedStyles.tableBody}>
        {paginatedEvents.map((event) => (
          <div
            key={event.id}
            className={sharedStyles.tableRow}
            onClick={() => handleOpenActionSidebar('details')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenActionSidebar('details');
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className={sharedStyles.cellItem}>
              <span className={sharedStyles.timeCell}>{event.timestamp}</span>
            </div>
            <div className={sharedStyles.cellItem}>{event.module}</div>
            <div className={sharedStyles.cellItem}>
              <span className={sharedStyles.opBadge}>{event.operationType}</span>
            </div>
            <div className={sharedStyles.cellItem}>
              <span className={sharedStyles.userCell}>{event.user}</span>
            </div>
            <div className={sharedStyles.cellItem}>
              <span className={sharedStyles.ipCell}>{event.remoteIp}</span>
            </div>
            <div className={sharedStyles.cellItem}>
              <span className={sharedStyles.msgCell} title={event.message}>
                {event.message}
              </span>
            </div>
            <div className={sharedStyles.cellItem}>
              <span
                className={sharedStyles.statusBadge}
                data-status={event.status.toLowerCase()}
              >
                {event.status}
              </span>
            </div>
          </div>
        ))}
        {paginatedEvents.length === 0 && (
          <div className={sharedStyles.emptyState}>
            <NoDataFound 
              title="No Events Found" 
              description="No audit events match your current filters or search criteria." 
              icon="mdi:text-box-search-outline" 
            />
          </div>
        )}
      </div>

      {totalItems > 0 && (
        <Pagination
          className={sharedStyles.pagination_wrapper}
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={itemsPerPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setItemsPerPage}
          pageSizeOptions={[50, 100]}
        />
      )}
    </div>
  );
};
