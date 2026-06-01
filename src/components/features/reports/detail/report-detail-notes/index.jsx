'use client';

import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/reports/detail/shared/styles.module.css';
import { useReportsDetail } from '@/hooks/reports-detail';

export const ReportDetailNotes = () => {
  const { report } = useReportsDetail();

  if (!report.notes?.length) return null;

  return (
    <div className={sharedStyles.notesSection}>
      <div className={sharedStyles.notesHeader}>
        <Icon icon="mdi:information" width={16} />
        <span>Important Notes</span>
      </div>
      <ul className={sharedStyles.notesList}>
        {report.notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};
