'use client';

import { DeveloperDocsProvider } from './contexts/DeveloperDocsContext';
import DeveloperDocsHeader from './components/DeveloperDocsHeader';
import DeveloperDocsSidebar from './components/DeveloperDocsSidebar';
import DeveloperDocsContent from './components/DeveloperDocsContent';
import DeveloperDocsFooter from './components/DeveloperDocsFooter';
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
        <DeveloperDocsFooter />
      </div>
    </DeveloperDocsProvider>
  );
}
