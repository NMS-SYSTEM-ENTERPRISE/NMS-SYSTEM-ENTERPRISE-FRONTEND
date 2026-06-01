'use client';

import { ReportsContent } from '@/components/features/reports/reports-content';
import { ReportsProvider } from '@/contexts/reports';

export default function ReportsPage() {
  return (
    <ReportsProvider>
      <ReportsContent />
    </ReportsProvider>
  );
}
