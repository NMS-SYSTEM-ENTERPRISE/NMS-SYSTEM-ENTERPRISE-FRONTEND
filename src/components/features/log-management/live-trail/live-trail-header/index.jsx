'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import sharedStyles from '@/components/features/log-management/live-trail/shared/styles.module.css';

export const LiveTrailHeader = () => {
  const router = useRouter();

  return (
    <header className={sharedStyles.header}>
      <Button
        variant="ghost"
        size="icon"
        className={sharedStyles.backBtn}
        onClick={() => router.push('/log-management')}
      >
        <Icon icon="mdi:chevron-left" width={20} height={20} />
      </Button>
      <h1 className={sharedStyles.title}>Start Live Trail</h1>
      <div className={sharedStyles.headerActions}>
        <Button variant="ghost" size="icon" className={sharedStyles.headerBtn} title="Column View">
          <Icon icon="mdi:view-column" width={18} height={18} />
        </Button>
        <Button variant="ghost" size="icon" className={sharedStyles.headerBtn} title="Settings">
          <Icon icon="mdi:cog" width={18} height={18} />
        </Button>
        <Button variant="ghost" size="icon" className={sharedStyles.headerBtn} title="Fullscreen">
          <Icon icon="mdi:fullscreen" width={18} height={18} />
        </Button>
        <Button className={sharedStyles.createParserBtn}>Create Log Parser Plugin</Button>
      </div>
    </header>
  );
};
