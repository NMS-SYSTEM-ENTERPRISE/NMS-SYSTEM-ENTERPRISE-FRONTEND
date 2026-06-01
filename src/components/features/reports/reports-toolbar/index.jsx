'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import sharedStyles from '@/components/features/reports/shared/styles.module.css';
import { useReports } from '@/hooks/reports';

export const ReportsToolbar = () => {
  const router = useRouter();
  const { filteredReports, setShowFilterSidebar } = useReports();

  return (
    <div className={sharedStyles.toolbar}>
      <div className={sharedStyles.toolbarLeft}>
        <span className={sharedStyles.resultCount}>
          Showing {filteredReports.length} report
          {filteredReports.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className={sharedStyles.toolbarRight}>
        <Button
          variant="ghost"
          size="icon"
          className={sharedStyles.actionBtn}
          onClick={() => setShowFilterSidebar(true)}
          title="Filters & Search"
        >
          <Icon icon="mdi:filter" width={18} height={18} />
        </Button>
        <Button
          className={sharedStyles.createBtn}
          onClick={() => router.push('/reports/create-custom')}
        >
          Create Custom Report
        </Button>
      </div>
    </div>
  );
};
