'use client';

import { LogManagementEventDetail } from '@/components/features/log-management/log-management-event-detail';
import { LogManagementEventsAccordion } from '@/components/features/log-management/log-management-events-accordion';
import { LogManagementFilterSidebar } from '@/components/features/log-management/log-management-filter-sidebar';
import { LogManagementHeader } from '@/components/features/log-management/log-management-header';
import { LogManagementSidebar } from '@/components/features/log-management/log-management-sidebar';
import { LogManagementStatsAccordion } from '@/components/features/log-management/log-management-stats-accordion';
import { LogManagementTrendsAccordion } from '@/components/features/log-management/log-management-trends-accordion';
import { LogManagementDistributionAccordion } from '@/components/features/log-management/log-management-distribution-accordion';
import { LogManagementWidgetSidebar } from '@/components/features/log-management/log-management-widget-sidebar';
import sharedStyles from '@/components/features/log-management/shared/styles.module.css';
import { useLogManagement } from '@/hooks/log-management';
import { LogManagementSkeleton } from '@/components/ui/skeleton-loaders/log-management-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

export const LogManagementContent = () => {
  const { isLoading, activeView, layoutView, displayedEvents } = useLogManagement();

  return (
    <div className={sharedStyles.logManagement}>
      <LogManagementSidebar />

      <div className={sharedStyles.mainContentWrapper}>
        <LogManagementHeader />

        <div className={sharedStyles.contentArea} style={{ padding: 0, flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {isLoading ? (
            <div style={{ padding: '24px' }}>
              <LogManagementSkeleton />
            </div>
          ) : displayedEvents.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: 'var(--color-bg-primary, #0b0f19)' }}>
              <NoDataFound
                title={activeView === 'network' ? "No Network Logs" : activeView === 'system' ? "No System Logs" : "No Logs Found"}
                description={
                  activeView === 'network'
                    ? "There are currently no network logs matching your filter criteria."
                    : activeView === 'system'
                      ? "There are currently no system logs matching your filter criteria."
                      : "No log events found in the database."
                }
                icon={
                  activeView === 'network'
                    ? "mdi:router-network"
                    : activeView === 'system'
                      ? "mdi:server"
                      : "mdi:database-search"
                }
              />
            </div>
          ) : (
            <div className={sharedStyles.timelineContainer} style={{ padding: 0, gap: 0, height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
              {layoutView === 'dashboard' && (
                <>
                  <div style={{ flex: '0 0 auto' }}>
                    <LogManagementStatsAccordion />
                  </div>
                  <div style={{ flex: '0 0 auto' }}>
                    <LogManagementTrendsAccordion />
                  </div>
                  <div style={{ flex: '0 0 auto' }}>
                    <LogManagementDistributionAccordion />
                  </div>
                </>
              )}
              {layoutView === 'list' && (
                <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <LogManagementEventsAccordion />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <LogManagementEventDetail />
      <LogManagementWidgetSidebar />
      <LogManagementFilterSidebar />
    </div>
  );
};
