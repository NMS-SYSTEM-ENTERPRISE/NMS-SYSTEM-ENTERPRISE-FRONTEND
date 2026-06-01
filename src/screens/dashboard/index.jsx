'use client';

import { DashboardContent } from '@/components/features/dashboard/dashboard-content';
import { DashboardProvider } from '@/contexts/dashboard';

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
