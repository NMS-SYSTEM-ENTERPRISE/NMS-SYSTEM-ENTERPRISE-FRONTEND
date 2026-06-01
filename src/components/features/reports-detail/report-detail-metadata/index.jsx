'use client';

import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/reports-detail/shared/styles.module.css';
import { useReportsDetail } from '@/hooks/reports-detail';

export const ReportDetailMetadata = () => {
  const { report } = useReportsDetail();

  return (
    <div className={sharedStyles.metadataContainer}>
      <div className={sharedStyles.metadataRow}>
        <span className={sharedStyles.metaLabel}>
          <Icon icon="mdi:folder" width={14} className={sharedStyles.metaIconCyan} />
          Category
        </span>
        <span className={sharedStyles.metaCapsule}>{report.category}</span>
      </div>
      <div className={sharedStyles.metadataRow}>
        <span className={sharedStyles.metaLabel}>
          <Icon icon="mdi:file-document" width={14} className={sharedStyles.metaIconViolet} />
          Type
        </span>
        <span className={sharedStyles.metaCapsule}>{report.type}</span>
      </div>
      <div className={sharedStyles.metadataRow}>
        <span className={sharedStyles.metaLabel}>
          <Icon icon="mdi:clock-outline" width={14} className={sharedStyles.metaIconAmber} />
          Time Period
        </span>
        <span className={sharedStyles.metaCapsule}>
          {report.timePeriod || 'Custom'}
        </span>
      </div>
      <div className={sharedStyles.metadataRow}>
        <span className={sharedStyles.metaLabel}>
          <Icon icon="mdi:calendar-clock" width={14} className={sharedStyles.metaIconGreen} />
          Generated At
        </span>
        <span className={sharedStyles.metaCapsule}>{report.generatedAt}</span>
      </div>
    </div>
  );
};
