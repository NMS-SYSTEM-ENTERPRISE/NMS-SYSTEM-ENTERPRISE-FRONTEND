'use client';

import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import sharedStyles from '@/components/features/log-management/shared/styles.module.css';
import { useLogManagement } from '@/hooks/log-management';
import { NoDataFound } from '@/components/ui/no-data-found';

const formatTimestamp = (ts) => {
  if (!ts) return '';
  const date = new Date(ts);
  return isNaN(date.getTime()) ? ts : date.toLocaleString('en-US', { hour12: false }).replace(',', '');
};

export const LogManagementEventsAccordion = () => {
  const { expandedSections, toggleSection, displayedEvents, handleEventClick } = useLogManagement();
  const isOpen = expandedSections.has('events');

  const [collapsedGroups, setCollapsedGroups] = useState(new Set());

  const toggleGroup = (groupId) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  const groupedEvents = useMemo(() => {
    const critical = [];
    const error = [];
    const warning = [];
    const info = [];

    displayedEvents.forEach((event) => {
      const sev = event.severity?.toLowerCase() || 'info';
      if (['critical', 'emergency', 'alert'].includes(sev)) {
        critical.push(event);
      } else if (sev === 'error') {
        error.push(event);
      } else if (['warning', 'notice'].includes(sev)) {
        warning.push(event);
      } else {
        info.push(event);
      }
    });

    return [
      { id: 'critical', name: 'Critical & Alerts', events: critical, color: '#f43f5e', icon: 'mdi:alert-decagram' },
      { id: 'error', name: 'Errors', events: error, color: '#ef4444', icon: 'mdi:alert-circle' },
      { id: 'warning', name: 'Warnings', events: warning, color: '#f59e0b', icon: 'mdi:alert-outline' },
      { id: 'info', name: 'Informational', events: info, color: '#06b6d4', icon: 'mdi:information-outline' },
    ];
  }, [displayedEvents]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {displayedEvents?.length === 0 ? (
        <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
          <NoDataFound title="No Events Found" description="No event logs match your current filters or search criteria." icon="mdi:format-list-bulleted" />
        </div>
      ) : (
        <div className={sharedStyles.tableWrapper} style={{ flex: 1, overflow: 'auto', border: 'none', borderRadius: 0, padding: 0, margin: 0, height: '100%' }}>
          <table className={sharedStyles.eventsTable} style={{ margin: 0, border: 'none' }}>
            <thead>
              <tr>
                <th style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--color-bg-primary, #0b0f19)' }}>TIMESTAMP</th>
                <th style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--color-bg-primary, #0b0f19)' }}>SEVERITY</th>
                <th style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--color-bg-primary, #0b0f19)' }}>SOURCE</th>
                <th style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--color-bg-primary, #0b0f19)' }}>CATEGORY</th>
                <th style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--color-bg-primary, #0b0f19)' }}>TYPE</th>
                <th style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--color-bg-primary, #0b0f19)' }}>MESSAGE</th>
                <th style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--color-bg-primary, #0b0f19)', width: '50px', textAlign: 'center' }}></th>
              </tr>
            </thead>
            <tbody>
              {groupedEvents.map((group) => {
                const isGroupOpen = !collapsedGroups.has(group.id);
                if (group.events.length === 0) return null;

                return (
                  <React.Fragment key={group.id}>
                    {/* Group Header Row */}
                    <tr 
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.02)', 
                        cursor: 'pointer',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                      }} 
                      onClick={() => toggleGroup(group.id)}
                    >
                      <td colSpan={7} style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Icon
                            icon="lucide:chevron-down"
                            style={{
                              transform: isGroupOpen ? 'none' : 'rotate(-90deg)',
                              transition: 'transform 0.2s',
                              color: 'var(--text-muted)'
                            }}
                            width={14}
                          />
                          <Icon icon={group.icon} width={16} style={{ color: group.color }} />
                          <span style={{ color: 'var(--text-primary)', fontSize: '13px' }}>{group.name}</span>
                          <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)', marginLeft: '6px' }}>
                            {group.events.length}
                          </span>
                        </div>
                      </td>
                    </tr>
                    {/* Group Member Rows */}
                    {isGroupOpen && group.events.map((event) => (
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
                        <td className={sharedStyles.timeCell}>{formatTimestamp(event.timestamp)}</td>
                        <td>
                          <span
                            className={sharedStyles.severityBadge}
                            data-severity={event.severity?.toLowerCase() || 'info'}
                          >
                            {event.severity}
                          </span>
                        </td>
                        <td className={sharedStyles.ipCell}>{event.source}</td>
                        <td>{event.category}</td>
                        <td>
                          <span className={sharedStyles.badge} data-type="info">
                            {event.type}
                          </span>
                        </td>
                        <td className={sharedStyles.msgCell} title={event.message}>
                          {event.message}
                        </td>
                        <td style={{ textAlign: 'center', width: '50px', padding: '0 8px', verticalAlign: 'middle' }}>
                          <div className={sharedStyles.rowActionBtn}>
                            <Icon icon="mdi:open-in-new" width={14} height={14} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
