'use client';

import { AlertDetailContent } from '@/components/features/alert-detail/alert-detail-content';
import { AlertDetailProvider } from '@/contexts/alert-detail';

export default function AlertDetailPage() {
  return (
    <AlertDetailProvider>
      <AlertDetailContent />
    </AlertDetailProvider>
  );
}
