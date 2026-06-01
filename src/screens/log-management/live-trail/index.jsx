'use client';

import { LiveTrailContent } from '@/components/features/log-management/live-trail/live-trail-content';
import { LogManagementLiveTrailProvider } from '@/contexts/log-management-live-trail';

export default function LiveTrailPage() {
  return (
    <LogManagementLiveTrailProvider>
      <LiveTrailContent />
    </LogManagementLiveTrailProvider>
  );
}
