'use client';

import { AlertsHeader } from '@/components/features/alerts/alerts-header';
import { AlertsList } from '@/components/features/alerts/alerts-list';
import { AlertsOverview } from '@/components/features/alerts/alerts-overview';
import { AlertsSidebar } from '@/components/features/alerts/alerts-sidebar';
import { AlertsProvider } from '@/contexts/alerts';
import { useAlerts } from '@/hooks/alerts';
import styles from './styles.module.css';

const AlertsContent = () => {
  const { view } = useAlerts();

  return (
    <div className={styles.alerts}>
      <AlertsSidebar />
      <div className={styles.mainContentWrapper}>
        <AlertsHeader />
        <div className={styles.contentArea}>
          {view === 'overview' ? <AlertsOverview /> : <AlertsList />}
        </div>
      </div>
    </div>
  );
};

export default function AlertsPage() {
  return (
    <AlertsProvider>
      <AlertsContent />
    </AlertsProvider>
  );
}
