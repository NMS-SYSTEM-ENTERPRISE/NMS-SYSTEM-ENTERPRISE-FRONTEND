'use client';

import sharedStyles from '@/components/features/dashboard-custom/shared/styles.module.css';
import { DashboardCustomCanvas } from '@/components/features/dashboard-custom/dashboard-custom-canvas';
import { DashboardCustomCreateModal } from '@/components/features/dashboard-custom/dashboard-custom-create-modal';
import { DashboardCustomHeader } from '@/components/features/dashboard-custom/dashboard-custom-header';
import { DashboardCustomSidebar } from '@/components/features/dashboard-custom/dashboard-custom-sidebar';
import { DashboardCustomTimeline } from '@/components/features/dashboard-custom/dashboard-custom-timeline';
import { useDashboardCustom } from '@/hooks/dashboard-custom';

export const DashboardCustomContent = () => {
  const { showCreateModal } = useDashboardCustom();

  return (
    <div className={sharedStyles.dashboardCustom}>
      <DashboardCustomSidebar />

      <div className={sharedStyles.mainArea}>
        <DashboardCustomHeader />
        <DashboardCustomTimeline />
        <DashboardCustomCanvas />
      </div>

      {showCreateModal && <DashboardCustomCreateModal />}
    </div>
  );
};
