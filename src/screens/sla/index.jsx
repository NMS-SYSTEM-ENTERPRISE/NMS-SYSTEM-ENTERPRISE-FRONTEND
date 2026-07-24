'use client';

import { SlaActionSidebar } from '@/components/features/sla/sla-action-sidebar';
import { SlaGridView } from '@/components/features/sla/sla-grid-view';
import { SlaHeader } from '@/components/features/sla/sla-header';
import { SlaSidebar } from '@/components/features/sla/sla-sidebar';
import { SlaTableView } from '@/components/features/sla/sla-table-view';
import { SlaProvider } from '@/contexts/sla';
import { useSla } from '@/hooks/sla';
import styles from './styles.module.css';

const SlaContent = () => {
  const { viewMode } = useSla();

  return (
    <div className={styles.sla}>
      <SlaSidebar />

      <div className={styles.mainContentWrapper}>
        <SlaHeader />

        <div className={`${styles.contentArea} ${viewMode === 'table' ? styles.contentAreaTableMode : ''}`}>
          {/* <SlaToolbar /> */}
          {viewMode === 'table' ? <SlaTableView /> : <SlaGridView />}
        </div>
      </div>

      <SlaActionSidebar />
    </div>
  );
};

export default function SlaPage() {
  return (
    <SlaProvider>
      <SlaContent />
    </SlaProvider>
  );
}
