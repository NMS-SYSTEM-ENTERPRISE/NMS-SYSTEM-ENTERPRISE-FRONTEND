'use client';

import sharedStyles from '@/components/features/reports/detail/shared/styles.module.css';
import { ReportDetailHeader } from '@/components/features/reports/detail/report-detail-header';
import { ReportDetailMetadata } from '@/components/features/reports/detail/report-detail-metadata';
import { ReportDetailNotes } from '@/components/features/reports/detail/report-detail-notes';
import { ReportDetailTable } from '@/components/features/reports/detail/report-detail-table';
import { ReportDetailToolbar } from '@/components/features/reports/detail/report-detail-toolbar';

import { useReportsDetail } from '@/hooks/reports-detail';

export const ReportDetailContent = () => {
  const { report, loading, error } = useReportsDetail();

  if (loading) {
    return <div className={sharedStyles.reportDetail} style={{ padding: '24px' }}>Loading report details...</div>;
  }

  if (error || !report) {
    return <div className={sharedStyles.reportDetail} style={{ padding: '24px', color: 'red' }}>Failed to load report.</div>;
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
