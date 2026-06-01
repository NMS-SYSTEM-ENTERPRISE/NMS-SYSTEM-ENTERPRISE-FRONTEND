'use client';

import { LogManagementEventDetail } from '@/components/features/log-management/log-management-event-detail';
import { LogManagementEventsAccordion } from '@/components/features/log-management/log-management-events-accordion';
import { LogManagementFilterSidebar } from '@/components/features/log-management/log-management-filter-sidebar';
import { LogManagementHeader } from '@/components/features/log-management/log-management-header';
import { LogManagementSidebar } from '@/components/features/log-management/log-management-sidebar';
import { LogManagementStatsAccordion } from '@/components/features/log-management/log-management-stats-accordion';
import { LogManagementTrendsAccordion } from '@/components/features/log-management/log-management-trends-accordion';
import { LogManagementWidgetSidebar } from '@/components/features/log-management/log-management-widget-sidebar';
import sharedStyles from '@/components/features/log-management/shared/styles.module.css';

export const LogManagementContent = () => (
  <div className={sharedStyles.logManagement}>
    <LogManagementSidebar />

    <div className={sharedStyles.mainContentWrapper}>
      <LogManagementHeader />

      <div className={sharedStyles.contentArea}>
        <div className={sharedStyles.timelineContainer}>
          <LogManagementStatsAccordion />
          <LogManagementTrendsAccordion />
          <LogManagementEventsAccordion />
        </div>
      </div>
    </div>

    <LogManagementEventDetail />
    <LogManagementWidgetSidebar />
    <LogManagementFilterSidebar />
  </div>
);
