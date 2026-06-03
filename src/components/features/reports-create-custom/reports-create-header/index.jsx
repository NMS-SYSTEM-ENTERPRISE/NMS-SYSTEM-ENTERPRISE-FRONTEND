'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import sharedStyles from '@/components/features/reports-create-custom/shared/styles.module.css';
import { useReportsCreateCustom } from '@/hooks/reports-create-custom';

export const ReportsCreateHeader = () => {
  const router = useRouter();

  return (
    <div className={sharedStyles.header}>
      <div className={sharedStyles.headerLeft}>
        <Button
          variant="ghost"
          size="icon"
          className={sharedStyles.backBtn}
          onClick={() => router.push('/reports')}
        >
          <Icon icon="mdi:chevron-left" width={20} />
        </Button>
        <div className={sharedStyles.titleSection}>
          <h1 className={sharedStyles.title}>Create Custom Report</h1>
          <span className={sharedStyles.subtitle}>Select a report type and configure parameters</span>
        </div>
      </div>
      <div className={sharedStyles.headerRight}>
      </div>
    </div>
  );
};
