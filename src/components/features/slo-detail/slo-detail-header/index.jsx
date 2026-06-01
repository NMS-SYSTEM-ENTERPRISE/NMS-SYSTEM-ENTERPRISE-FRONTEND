'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { SLO_STATUS_BADGE_VARIANT } from '@/utils/constants/slo';
import styles from './styles.module.css';

export const SloDetailHeader = ({ sloData }) => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <Button
        variant="ghost"
        size="icon"
        className={styles.backBtn}
        onClick={() => router.push('/slo')}
        aria-label="Back to SLO list"
      >
        <Icon icon="ph:arrow-left-bold" />
      </Button>
      <h1 className={styles.title}>{sloData.name}</h1>
      <div className={styles.headerActions}>
        <Badge variant={SLO_STATUS_BADGE_VARIANT[sloData.status] || 'neutral'}>
          {sloData.status}
        </Badge>
      </div>
    </header>
  );
};
