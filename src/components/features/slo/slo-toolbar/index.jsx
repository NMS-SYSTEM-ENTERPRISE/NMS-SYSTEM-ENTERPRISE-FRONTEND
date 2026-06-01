'use client';

import { useSlo } from '@/hooks/slo';
import styles from './styles.module.css';

export const SloToolbar = () => {
  const { totalSLOs } = useSlo();

  return (
    <div className={styles.toolbar}>
      <span className={styles.resultCount}>{totalSLOs} entries found</span>
    </div>
  );
};
