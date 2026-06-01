'use client';

import { DashboardCustomContent } from '@/components/features/dashboard-custom/dashboard-custom-content';
import { DashboardCustomProvider } from '@/contexts/dashboard-custom';

export default function DashboardCustomPage() {
  return (
    <DashboardCustomProvider>
      <DashboardCustomContent />
    </DashboardCustomProvider>
  );
}
