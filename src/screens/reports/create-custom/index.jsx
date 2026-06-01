'use client';

import { ReportsCreateContent } from '@/components/features/reports-create-custom/reports-create-content';
import { ReportsCreateCustomProvider } from '@/contexts/reports-create-custom';

export default function CreateCustomReportPage() {
  return (
    <ReportsCreateCustomProvider>
      <ReportsCreateContent />
    </ReportsCreateCustomProvider>
  );
}
