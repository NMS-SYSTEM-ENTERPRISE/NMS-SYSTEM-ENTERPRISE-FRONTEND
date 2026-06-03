'use client';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import sharedStyles from '@/components/features/log-management/shared/styles.module.css';
import { useLogManagement } from '@/hooks/log-management';
import { NoDataFound } from '@/components/ui/no-data-found';

export const LogManagementEventsAccordion = () => {
  const { expandedSections, toggleSection, filteredEvents, handleEventClick } = useLogManagement();
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
            Event Log Stream <span className={sharedStyles.badge} data-type="summary">LOGS</span>
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
          {filteredEvents?.length === 0 ? (
            <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
              <NoDataFound title="No Events Found" description="No event logs match your current filters or search criteria." icon="mdi:format-list-bulleted" />
            </div>
          ) : (
            <div className={sharedStyles.tableWrapper}>
              <table className={sharedStyles.eventsTable}>
                <thead>
                  <tr>
                    <th>TIMESTAMP</th>
                    <th>SEVERITY</th>
                    <th>SOURCE</th>
                    <th>CATEGORY</th>
                    <th>MESSAGE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event) => (
                    <tr
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleEventClick(event);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <td className={sharedStyles.timeCell}>{event.timestamp}</td>
                      <td>
                        <span
                          className={sharedStyles.severityBadge}
                          data-severity={event.severity.toLowerCase()}
                        >
                          {event.severity}
                        </span>
                      </td>
                      <td className={sharedStyles.ipCell}>{event.source}</td>
                      <td>{event.category}</td>
                      <td className={sharedStyles.msgCell} title={event.message}>
                        {event.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
