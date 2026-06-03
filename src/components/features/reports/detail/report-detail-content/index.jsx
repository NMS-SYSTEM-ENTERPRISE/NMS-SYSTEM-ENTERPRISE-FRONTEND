'use client';

import sharedStyles from '@/components/features/reports/detail/shared/styles.module.css';
import { ReportDetailHeader } from '@/components/features/reports/detail/report-detail-header';
import { ReportDetailMetadata } from '@/components/features/reports/detail/report-detail-metadata';
import { ReportDetailNotes } from '@/components/features/reports/detail/report-detail-notes';
import { ReportDetailTable } from '@/components/features/reports/detail/report-detail-table';
import { ReportDetailToolbar } from '@/components/features/reports/detail/report-detail-toolbar';

import { useReportsDetail } from '@/hooks/reports-detail';
import { ReportDetailSkeleton } from '@/components/ui/skeleton-loaders/reports-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

export const ReportDetailContent = () => {
  const { report, loading, error } = useReportsDetail();

  if (loading) {
    return <div className={sharedStyles.reportDetail} style={{ padding: '24px' }}><ReportDetailSkeleton /></div>;
  }

  if (error || !report) {
    return (
      <div className={sharedStyles.reportDetail} style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <NoDataFound 
          title="Report Not Found" 
          description={error ? "Unable to load the requested report from the database." : "The requested report does not exist or has been deleted."}
          icon="mdi:file-document-remove-outline"
        />
      </div>
    );
  }

  return (
    <div className={sharedStyles.reportDetail}>
      <ReportDetailHeader />
      <ReportDetailMetadata />
      <ReportDetailNotes />
      <ReportDetailToolbar />
      <ReportDetailTable />
    </div>
  );
};
