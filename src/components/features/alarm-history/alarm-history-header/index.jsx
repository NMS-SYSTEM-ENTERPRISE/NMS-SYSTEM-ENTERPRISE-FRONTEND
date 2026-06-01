'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import sharedStyles from '@/components/features/alarm-history/shared/styles.module.css';

export const AlarmHistoryHeader = () => {
  const router = useRouter();

  return (
    <header className={sharedStyles.header}>
      <Button
        variant="ghost"
        size="icon"
        className={sharedStyles.backBtn}
        onClick={() => router.push('/alerts')}
        aria-label="Back to alerts"
      >
        <Icon icon="mdi:arrow-left" width={20} height={20} />
      </Button>
      <h1 className={sharedStyles.title}>Alarm History</h1>
      <div className={sharedStyles.headerActions}>
        <Button variant="ghost" className={sharedStyles.actionBtn}>
          Acknowledge Alert
        </Button>
        <Button variant="ghost" className={sharedStyles.actionBtn}>
          Suppress Alert
        </Button>
      </div>
    </header>
  );
};
