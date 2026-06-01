'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import sharedStyles from '@/components/features/ticketing/shared/styles.module.css';
import { useTicketing } from '@/hooks/ticketing';

const getStatusClass = (status) => {
  if (status === 'Open') return sharedStyles.statusOpen;
  if (status === 'Resolved') return sharedStyles.statusResolved;
  return sharedStyles.statusProgress;
};

export const TicketingRequestsTable = () => {
  const { activeCategory, filteredRequests, handleOpenSidebar } = useTicketing();

  return (
    <div className={sharedStyles.requestsContainer}>
      <div className={sharedStyles.requestsToolbar}>
        <div className={sharedStyles.filterTags}>
          {activeCategory !== 'all' && activeCategory !== 'dashboard' && (
            <div className={sharedStyles.filterTag}>
              Status:{' '}
              {activeCategory === 'open'
                ? 'Open'
                : activeCategory === 'closed'
                  ? 'Closed'
                  : 'All'}
            </div>
          )}
          <div className={sharedStyles.filterTag}>
            Sort: Newest First
            <Icon icon="mdi:chevron-down" width={14} />
          </div>
        </div>
        <div className={sharedStyles.headerActions}>
          <Button variant="ghost" size="icon" className={sharedStyles.actionBtn} title="Refresh">
            <Icon icon="mdi:refresh" width={18} />
          </Button>
          <Button variant="ghost" size="icon" className={sharedStyles.actionBtn} title="Columns">
            <Icon icon="mdi:view-column-outline" width={18} />
          </Button>
        </div>
      </div>

      <div className={sharedStyles.tableWrapper}>
        <table className={sharedStyles.requestsTable}>
          <thead>
            <tr>
              <th className={sharedStyles.checkboxCol}>
                <Checkbox aria-label="Select all" />
              </th>
              <th>ID</th>
              <th>Subject</th>
              <th>Requester</th>
              <th>Created</th>
              <th>Assignee</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr
                key={request.id}
                className={sharedStyles.clickableRow}
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
                <td onClick={(e) => e.stopPropagation()}>
                  <Checkbox aria-label={`Select ${request.id}`} />
                </td>
                <td>
                  <span className={sharedStyles.ticketId}>{request.id}</span>
                </td>
                <td>
                  <span className={sharedStyles.subjectLink}>{request.subject}</span>
                </td>
                <td>{request.requester}</td>
                <td>{request.createdDate}</td>
                <td>
                  <div className={sharedStyles.userCell}>
                    <div className={sharedStyles.userAvatar}>
                      {request.assignee.charAt(0).toUpperCase()}
                    </div>
                    {request.assignee}
                  </div>
                </td>
                <td>
                  <span className={clsx(sharedStyles.statusBadge, getStatusClass(request.status))}>
                    {request.status}
                  </span>
                </td>
                <td>
                  <span className={clsx(sharedStyles.statusBadge, sharedStyles.priorityLow)}>
                    {request.priority}
                  </span>
                </td>
                <td>
                  <div className={sharedStyles.dueStatus}>
                    <Icon icon="mdi:clock-outline" width={14} className={sharedStyles.dueIcon} />
                    {request.dueStatus.includes('Due in') ? 'In 6h' : 'Overdue'}
                  </div>
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan={9} className={sharedStyles.emptyCell}>
                  No tickets found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
