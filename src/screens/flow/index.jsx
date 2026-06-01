'use client';

import { FlowContent } from '@/components/features/flow/flow-content';
import { FlowProvider } from '@/contexts/flow';

export default function FlowPage() {
  return (
    <FlowProvider>
      <FlowContent />
    </FlowProvider>
  );
}
