'use client';

import { AlarmHistoryContent } from '@/components/features/alarm-history/alarm-history-content';
import { AlarmHistoryProvider } from '@/contexts/alarm-history';

export default function AlarmHistoryPage() {
  return (
    <AlarmHistoryProvider>
      <AlarmHistoryContent />
    </AlarmHistoryProvider>
  );
}
