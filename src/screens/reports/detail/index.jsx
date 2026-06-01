'use client';

import { ReportDetailContent } from '@/components/features/reports-detail/report-detail-content';
import { ReportsDetailProvider } from '@/contexts/reports-detail';

export default function ReportDetailPage() {
  return (
    <ReportsDetailProvider>
      <ReportDetailContent />
    </ReportsDetailProvider>
  );
}
