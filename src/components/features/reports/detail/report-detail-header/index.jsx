'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import sharedStyles from '@/components/features/reports/detail/shared/styles.module.css';
import { useReportsDetail } from '@/hooks/reports-detail';

export const ReportDetailHeader = () => {
  const router = useRouter();
  const { report } = useReportsDetail();

  const handleDownload = () => {
    const reportData = `Report ID,${report.id}\nTitle,${report.title}\nDate,${new Date().toISOString()}`;
    const blob = new Blob([reportData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${report.id}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
          <h1 className={sharedStyles.title}>{report.title}</h1>
          <span className={sharedStyles.subtitle}>Report Details & Data</span>
        </div>
      </div>
      <div className={sharedStyles.headerRight}>
        <Button variant="ghost" size="icon" className={sharedStyles.actionBtn} title="Export" onClick={handleDownload}>
          <Icon icon="mdi:download" width={18} />
        </Button>
      </div>
    </div>
  );
};
