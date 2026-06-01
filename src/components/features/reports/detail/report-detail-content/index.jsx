'use client';

import sharedStyles from '@/components/features/reports/detail/shared/styles.module.css';
import { ReportDetailHeader } from '@/components/features/reports/detail/report-detail-header';
import { ReportDetailMetadata } from '@/components/features/reports/detail/report-detail-metadata';
import { ReportDetailNotes } from '@/components/features/reports/detail/report-detail-notes';
import { ReportDetailTable } from '@/components/features/reports/detail/report-detail-table';
import { ReportDetailToolbar } from '@/components/features/reports/detail/report-detail-toolbar';

export const ReportDetailContent = () => (
  <div className={sharedStyles.reportDetail}>
    <ReportDetailHeader />
    <ReportDetailMetadata />
    <ReportDetailNotes />
    <ReportDetailToolbar />
    <ReportDetailTable />
  </div>
);
