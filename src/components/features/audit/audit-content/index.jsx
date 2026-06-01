'use client';

import { AuditActionSidebar } from '@/components/features/audit/audit-action-sidebar';
import { AuditAnalyticsAccordion } from '@/components/features/audit/audit-analytics-accordion';
import { AuditEventsAccordion } from '@/components/features/audit/audit-events-accordion';
import { AuditFilterSidebar } from '@/components/features/audit/audit-filter-sidebar';
import { AuditHeader } from '@/components/features/audit/audit-header';
import { AuditSidebar } from '@/components/features/audit/audit-sidebar';
import { AuditSummaryAccordion } from '@/components/features/audit/audit-summary-accordion';
import sharedStyles from '@/components/features/audit/shared/styles.module.css';
import { useAudit } from '@/hooks/audit';

export const AuditContent = () => {
  const {
    showActionSidebar,
    setShowActionSidebar,
    activeActionTab,
    auditEvents,
  } = useAudit();

  return (
    <div className={sharedStyles.audit}>
      <AuditSidebar />

      <div className={sharedStyles.mainContentWrapper}>
        <AuditHeader />

        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.timelineContainer}>
            <AuditSummaryAccordion />
            <AuditAnalyticsAccordion />
            <AuditEventsAccordion />
          </div>
        </div>
      </div>

      <AuditFilterSidebar />

      <AuditActionSidebar
        isOpen={showActionSidebar}
        onClose={() => setShowActionSidebar(false)}
        activeTab={activeActionTab}
        auditData={auditEvents}
      />
    </div>
  );
};
