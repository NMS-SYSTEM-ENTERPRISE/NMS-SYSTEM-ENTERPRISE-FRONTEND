'use client';

import sharedStyles from '@/components/features/reports/shared/styles.module.css';
import { ReportsFilterSidebar } from '@/components/features/reports/reports-filter-sidebar';
import { ReportsSidebar } from '@/components/features/reports/reports-sidebar';
import { ReportsTable } from '@/components/features/reports/reports-table';
import { ReportsToolbar } from '@/components/features/reports/reports-toolbar';

export const ReportsContent = () => (
  <div className={sharedStyles.reports}>
    <div className={sharedStyles.reports_content}>
      <div className={sharedStyles.contentWrapper}>
        <ReportsSidebar />
        <div className={sharedStyles.mainContent}>
          <ReportsToolbar />
          <ReportsTable />
        </div>
      </div>
    </div>
    <ReportsFilterSidebar />
  </div>
);
