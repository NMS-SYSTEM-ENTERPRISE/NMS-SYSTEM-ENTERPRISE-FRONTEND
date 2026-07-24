'use client';

import { SloDetailContent } from '@/components/features/slo-detail/slo-detail-content';
import { SloDetailProvider } from '@/contexts/slo-detail';

export default function SloDetailPage() {
  return (
    <SloDetailProvider>
      <SloDetailContent />
    </SloDetailProvider>
  );
}
