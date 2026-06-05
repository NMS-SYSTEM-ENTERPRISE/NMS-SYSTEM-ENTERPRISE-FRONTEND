'use client';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import sharedStyles from '@/components/features/ticketing/shared/styles.module.css';
import { useTicketing } from '@/hooks/ticketing';
import { Pagination } from '@/components/ui/pagination';

const getStatusClass = (status) => {
  if (status === 'Open') return sharedStyles.statusOpen;
  if (status === 'Resolved') return sharedStyles.statusResolved;
  return sharedStyles.statusProgress;
};

const getDeviceColor = (deviceName) => {
  if (!deviceName) return { bg: 'rgba(255, 255, 255, 0.05)', text: '#9ca3af' };
  const firstLetter = deviceName.charAt(0).toUpperCase();
  if (firstLetter < 'H') return { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' }; // Amber
  if (firstLetter < 'P') return { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' }; // Blue
  return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' }; // Green
};

export const TicketingRequestsTable = () => {
  const {
    filteredRequests,
    paginatedRequests,
    handleOpenSidebar,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage
  } = useTicketing();

  return (
    <div className={sharedStyles.requestsContainer}>
      {/* Fixed Header */}
      <div className={sharedStyles.tableHeaderRow}>
        <span>ID</span>
        <span>Device Name</span>
        <span>IP Address</span>
        <span>Subject</span>
        <span>Assignee</span>
        <span>Status</span>
        <span>Priority</span>
        <span>Due</span>
      </div>

      {/* Scrollable Body */}
      <div className={sharedStyles.tableBody}>
        {paginatedRequests.map((request) => (
          <div
            key={request.id}
            className={sharedStyles.tableRow}
            onClick={() => handleOpenSidebar('details', request)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenSidebar('details', request);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className={sharedStyles.cellItem}>
              <span className={sharedStyles.ticketId}>{request.id}</span>
            </div>
            <div className={sharedStyles.cellItem}>
              <div className={sharedStyles.deviceCell}>
                <div
                  className={sharedStyles.deviceAvatar}
                  style={{
                    backgroundColor: getDeviceColor(request.deviceName).bg,
                    color: getDeviceColor(request.deviceName).text
                  }}
                >
                  {request.deviceName ? request.deviceName.substring(0, 2).toUpperCase() : 'UK'}
                </div>
                <span className={sharedStyles.identityNameRow}>{request.deviceName || 'Unknown'}</span>
              </div>
            </div>
            <div className={sharedStyles.cellItem}>
              <span className={sharedStyles.ipText}>{request.deviceIp || '0.0.0.0'}</span>
            </div>
            <div className={sharedStyles.cellItem}>
              <span className={sharedStyles.subjectLink}>{request.subject}</span>
            </div>
            <div className={sharedStyles.cellItem}>
              <div className={sharedStyles.userCell}>
                <div className={sharedStyles.userAvatar}>
                  {request.assignee.charAt(0).toUpperCase()}
                </div>
                {request.assignee}
              </div>
            </div>
            <div className={sharedStyles.cellItem}>
              <span className={clsx(sharedStyles.statusBadge, getStatusClass(request.status))}>
                {request.status}
              </span>
            </div>
            <div className={sharedStyles.cellItem}>
              <span className={clsx(sharedStyles.statusBadge, sharedStyles.priorityLow)}>
                {request.priority}
              </span>
            </div>
            <div className={sharedStyles.cellItem}>
              <div className={sharedStyles.dueStatus}>
                {request.dueStatus.includes('Due in') ? '2 days 1 hour' : 'Overdue by 1h'}
              </div>
            </div>
          </div>
        ))}
        {paginatedRequests.length === 0 && (
          <div className={sharedStyles.emptyState}>
            No tickets found matching your criteria.
          </div>
        )}
      </div>

      {/* Fixed Pagination Footer */}
      {filteredRequests.length > 0 && (
        <Pagination
          className={sharedStyles.pagination_wrapper}
          currentPage={currentPage}
          totalItems={filteredRequests.length}
          pageSize={itemsPerPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setItemsPerPage}
          pageSizeOptions={[50, 100]}
        />
      )}
    </div>
  );
};
