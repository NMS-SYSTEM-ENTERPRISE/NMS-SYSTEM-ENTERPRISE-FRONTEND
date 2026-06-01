'use client';

import { LogManagementContent } from '@/components/features/log-management/log-management-content';
import { LogManagementProvider } from '@/contexts/log-management';

export default function LogManagementPage() {
  return (
    <LogManagementProvider>
      <LogManagementContent />
    </LogManagementProvider>
  );
}
