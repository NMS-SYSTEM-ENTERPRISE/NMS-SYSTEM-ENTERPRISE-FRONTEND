'use client';

import sharedStyles from '@/components/features/reports-create-custom/shared/styles.module.css';
import { ReportsCreateConfig } from '@/components/features/reports-create-custom/reports-create-config';
import { ReportsCreateHeader } from '@/components/features/reports-create-custom/reports-create-header';
import { ReportsCreateSidebar } from '@/components/features/reports-create-custom/reports-create-sidebar';

export const ReportsCreateContent = () => (
  <div className={sharedStyles.createCustomReport}>
    <ReportsCreateHeader />
    <div className={sharedStyles.content}>
      <ReportsCreateSidebar />
      <ReportsCreateConfig />
    </div>
  </div>
);
