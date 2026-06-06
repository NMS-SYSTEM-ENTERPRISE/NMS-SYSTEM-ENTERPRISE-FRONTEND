'use client';

import { ManualContent } from './components/ManualContent';
import { ManualHeader } from './components/ManualHeader';
import { ManualSidebar } from './components/ManualSidebar';
import { ManualProvider } from './contexts/ManualContext';
import styles from './styles/ManualLayout.module.css';

export default function ManualPage() {
  return (
    <ManualProvider>
      <div className={styles.container}>
        <ManualHeader />
        <div className={styles.mainWrapper}>
          <ManualSidebar />
          <ManualContent />
        </div>
      </div>
    </ManualProvider>
  );
}
