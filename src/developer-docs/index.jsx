'use client';

import DeveloperDocsContent from './components/DeveloperDocsContent';
import DeveloperDocsHeader from './components/DeveloperDocsHeader';
import DeveloperDocsSidebar from './components/DeveloperDocsSidebar';
import { DeveloperDocsProvider } from './contexts/DeveloperDocsContext';
import styles from './styles/DeveloperDocsLayout.module.css';

export default function DeveloperDocs() {
  return (
    <DeveloperDocsProvider>
      <div className={styles.container}>
        <DeveloperDocsHeader />
        <div className={styles.mainWrapper}>
          <DeveloperDocsSidebar />
          <DeveloperDocsContent />
        </div>
      </div>
    </DeveloperDocsProvider>
  );
}
