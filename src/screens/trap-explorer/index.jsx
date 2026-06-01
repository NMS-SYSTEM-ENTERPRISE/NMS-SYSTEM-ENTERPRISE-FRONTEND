'use client';

import { LiveTrapViewer } from '@/components/features/trap-explorer/live-trap-viewer';
import { TrapActionSidebar } from '@/components/features/trap-explorer/trap-action-sidebar';
import { TrapDashboard } from '@/components/features/trap-explorer/trap-dashboard';
import { TrapHeader } from '@/components/features/trap-explorer/trap-header';
import { TrapHistorySidebar } from '@/components/features/trap-explorer/trap-history-sidebar';
import { TrapList } from '@/components/features/trap-explorer/trap-list';
import { TrapSidebar } from '@/components/features/trap-explorer/trap-sidebar';
import { TrapExplorerProvider } from '@/contexts/trap-explorer';
import { useTrapExplorer } from '@/hooks/trap-explorer';
import styles from './styles.module.css';

const TrapExplorerContent = () => {
  const { viewMode } = useTrapExplorer();

  return (
    <div className={styles.trapExplorer}>
      <TrapSidebar />

      <div className={styles.mainContentWrapper}>
        <TrapHeader />

        <div className={styles.contentArea}>
          {viewMode === 'list' ? <TrapList /> : <TrapDashboard />}
        </div>
      </div>

      <TrapActionSidebar />
      <TrapHistorySidebar />
      <LiveTrapViewer />
    </div>
  );
};

export default function TrapExplorerPage() {
  return (
    <TrapExplorerProvider>
      <TrapExplorerContent />
    </TrapExplorerProvider>
  );
}
