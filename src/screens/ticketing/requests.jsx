'use client';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

const MOCK_REQUESTS = [
  {
    id: 'INC-5',
    subject: 'Router is not working',
    requester: 'john',
    createdDate: 'Fri, Dec 15, 2023 02:55 PM',
    assignee: 'Jerry',
    status: 'Open',
    priority: 'Low',
    dueStatus: 'Due in 6 hours 13 minutes',
  },
  {
    id: 'INC-4',
    subject: 'Low Bandwidth',
    requester: 'john',
    createdDate: 'Fri, Dec 15, 2023 02:55 PM',
    assignee: 'Lizi',
    status: 'In Progress',
    priority: 'Low',
    dueStatus: 'Due in 6 hours 13 minutes',
  },
  {
    id: 'INC-3',
    subject: 'Internet Speed is slow',
    requester: 'Adam',
    createdDate: 'Fri, Dec 15, 2023 02:54 PM',
    assignee: 'john',
    status: 'Open',
    priority: 'Low',
    dueStatus: 'Due in 6 hours 13 minutes',
  },
  {
    id: 'INC-2',
    subject: 'Firewall Misconfiguration',
    requester: 'Jerry',
    createdDate: 'Fri, Dec 15, 2023 02:54 PM',
    assignee: 'James',
    status: 'Resolved',
    priority: 'Low',
    dueStatus: 'In Resolved Status since 1 min',
  },
  {
    id: 'INC-1',
    subject: 'Email is not Working',
    requester: 'john',
    createdDate: 'Fri, Dec 15, 2023 02:53 PM',
    assignee: 'Unassigned',
    status: 'Open',
    priority: 'Low',
    dueStatus: 'Due in 6 hours 13 minutes',
  },
];

const TicketingRequests = ({ category, searchQuery, onTicketClick }) => {
  // Filter logic
  const filteredRequests = MOCK_REQUESTS.filter((req) => {
    const matchesSearch =
      req.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requester.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesCategory = true;
    if (category === 'open') matchesCategory = req.status === 'Open';
    if (category === 'closed')
      matchesCategory = req.status === 'Resolved' || req.status === 'Closed';
    if (category === 'my-tickets') matchesCategory = req.assignee === 'Jerry'; // Mock user

    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.requestsContainer}>
      {/* Optional: Filter Tags or Bulk Actions could go here */}
      <div className={styles.requestsToolbar}>
        <div className={styles.filterTags}>
          {category !== 'all' && (
            <div className={styles.filterTag}>
              Status:{' '}
              {category === 'open'
                ? 'Open'
                : category === 'closed'
                  ? 'Closed'
                  : 'All'}
            </div>
          )}
          <div className={styles.filterTag}>
            Sort: Newest First
            <Icon icon="mdi:chevron-down" width={14} />
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionBtn} title="Refresh">
            <Icon icon="mdi:refresh" width={18} />
          </button>
          <button className={styles.actionBtn} title="Columns">
            <Icon icon="mdi:view-column-outline" width={18} />
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.requestsTable}>
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input type="checkbox" />
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
                onClick={() => onTicketClick(request)}
                style={{ cursor: 'pointer' }}
              >
                <td onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" />
                </td>
                <td>
                  <span className={styles.ticketId}>{request.id}</span>
                </td>
                <td>
                  <span className={styles.subjectLink}>{request.subject}</span>
                </td>
                <td>{request.requester}</td>
                <td>{request.createdDate}</td>
                <td>
                  <div className={styles.userCell}>
                    <div className={styles.userAvatar}>
                      {request.assignee.charAt(0).toUpperCase()}
                    </div>
                    {request.assignee}
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      request.status === 'Open'
                        ? styles.statusOpen
                        : request.status === 'Resolved'
                          ? styles.statusResolved
                          : styles.statusProgress
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${styles.priorityLow}`}
                  >
                    {request.priority}
                  </span>
                </td>
                <td>
                  <div className={styles.dueStatus}>
                    <Icon
                      icon="mdi:clock-outline"
                      width={14}
                      className={styles.dueIcon}
                    />
                    {request.dueStatus.includes('Due in') ? 'In 6h' : 'Overdue'}
                  </div>
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: 'var(--color-text-muted)',
                  }}
                >
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

export default TicketingRequests;
