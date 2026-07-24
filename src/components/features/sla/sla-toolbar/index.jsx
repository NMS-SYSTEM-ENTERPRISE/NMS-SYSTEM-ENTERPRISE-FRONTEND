'use client';

import { useSla } from '@/hooks/sla';
import styles from './styles.module.css';

export const SlaToolbar = () => {
  const { totalSLAs } = useSla();

  return (
    <div className={styles.toolbar}>
      <span className={styles.resultCount}>{totalSLAs} entries found</span>
    </div>
  );
};
