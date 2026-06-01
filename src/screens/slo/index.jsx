'use client';

import { SloActionSidebar } from '@/components/features/slo/slo-action-sidebar';
import { SloGridView } from '@/components/features/slo/slo-grid-view';
import { SloHeader } from '@/components/features/slo/slo-header';
import { SloSidebar } from '@/components/features/slo/slo-sidebar';
import { SloTableView } from '@/components/features/slo/slo-table-view';
import { SloToolbar } from '@/components/features/slo/slo-toolbar';
import { SloProvider } from '@/contexts/slo';
import { useSlo } from '@/hooks/slo';
import styles from './styles.module.css';

const SloContent = () => {
  const { viewMode } = useSlo();

  return (
    <div className={styles.slo}>
      <SloSidebar />

      <div className={styles.mainContentWrapper}>
        <SloHeader />

        <div className={styles.contentArea}>
          <SloToolbar />
          {viewMode === 'table' ? <SloTableView /> : <SloGridView />}
        </div>
      </div>

      <SloActionSidebar />
    </div>
  );
};

export default function SloPage() {
  return (
    <SloProvider>
      <SloContent />
    </SloProvider>
  );
};
