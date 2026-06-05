'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import sharedStyles from '@/components/features/alert-detail/shared/styles.module.css';

export const AlertDetailHeader = ({ alertData }) => {
  const router = useRouter();

  return (
    <header className={sharedStyles.header}>
      <div className={sharedStyles.headerLeft}>
        <Button
          variant="ghost"
          size="icon"
          className={sharedStyles.backBtn}
          onClick={() => router.push('/alerts')}
          aria-label="Back to alerts"
        >
          <Icon icon="mdi:arrow-left" width={20} />
        </Button>
        <div className={sharedStyles.titleSection}>
          <Badge variant="danger">{alertData.severity}</Badge>
          <h1 className={sharedStyles.title}>{alertData.title}</h1>
        </div>
      </div>
    </header>
  );
};
