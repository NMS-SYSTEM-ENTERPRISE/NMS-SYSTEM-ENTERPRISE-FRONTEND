'use client';

import { NetPathContent } from '@/components/features/netpath/netpath-content';
import { NetPathProvider } from '@/contexts/netpath';

export default function NetPathPage() {
  return (
    <NetPathProvider>
      <NetPathContent />
    </NetPathProvider>
  );
}
