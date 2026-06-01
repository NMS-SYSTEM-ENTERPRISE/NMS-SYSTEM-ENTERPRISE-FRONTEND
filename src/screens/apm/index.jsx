'use client';

import { ApmContent } from '@/components/features/apm/apm-content';
import { ApmProvider } from '@/contexts/apm';

export default function ApmPage() {
  return (
    <ApmProvider>
      <ApmContent />
    </ApmProvider>
  );
}
