'use client';

import { AuditContent } from '@/components/features/audit/audit-content';
import { AuditProvider } from '@/contexts/audit';

export default function AuditPage() {
  return (
    <AuditProvider>
      <AuditContent />
    </AuditProvider>
  );
}
