'use client';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import sharedStyles from '@/components/features/audit/shared/styles.module.css';
import { useAudit } from '@/hooks/audit';

export const AuditEventsAccordion = () => {
  const { activeView, expandedSections, toggleSection, filteredEvents, handleOpenActionSidebar } =
    useAudit();

  if (activeView !== 'overview' && activeView !== 'events') return null;

  const isOpen = expandedSections.has('events');

  return (
    <div className={sharedStyles.accordionGroup} data-open={isOpen}>
      <button
        type="button"
        className={clsx(sharedStyles.accordionHeader, sharedStyles.accordionHeaderBtn)}
        onClick={() => toggleSection('events')}
      >
        <div className={clsx(sharedStyles.headerNode, sharedStyles.headerNodeRose)}>
          <Icon icon="mdi:format-list-bulleted" width={18} />
        </div>
        <div className={sharedStyles.headerInfo}>
          <h3 className={sharedStyles.sectionTitle}>
            Top Conversations <span className={sharedStyles.badge} data-type="summary">SUMMARY</span>
          </h3>
        </div>
        <Icon
          icon="mdi:chevron-down"
          className={clsx(
            sharedStyles.accordionChevron,
            isOpen && sharedStyles.accordionChevronExpanded
          )}
        />
      </button>

      {isOpen && (
        <div className={sharedStyles.accordionContent}>
          <div className={sharedStyles.tableWrapper}>
            <table className={sharedStyles.eventsTable}>
              <thead>
                <tr>
                  <th>TIMESTAMP</th>
                  <th>MODULE</th>
                  <th>OPERATION</th>
                  <th>USER</th>
                  <th>REMOTE IP</th>
                  <th>MESSAGE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr
                    key={event.id}
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
                    <td className={sharedStyles.timeCell}>{event.timestamp}</td>
                    <td>{event.module}</td>
                    <td>
                      <span className={sharedStyles.opBadge}>{event.operationType}</span>
                    </td>
                    <td className={sharedStyles.userCell}>{event.user}</td>
                    <td className={sharedStyles.ipCell}>{event.remoteIp}</td>
                    <td className={sharedStyles.msgCell} title={event.message}>
                      {event.message}
                    </td>
                    <td>
                      <span
                        className={sharedStyles.statusBadge}
                        data-status={event.status.toLowerCase()}
                      >
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
