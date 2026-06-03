import React from 'react';
import styles from './styles.module.css';

export const DashboardSkeleton = () => {
  return (
    <div className={styles.dashboardSkeleton}>
      {/* Device Stats Bar Skeleton */}
      <div className={styles.statsRow}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`${styles.skeleton} ${styles.statCard}`} />
        ))}
      </div>

      {/* Performance Section Skeleton */}
      <div className={styles.accordionSection}>
        <div className={`${styles.skeleton} ${styles.accordionHeader}`} />
        <div className={styles.accordionGrid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.chartCard}>
              <div className={`${styles.skeleton} ${styles.chartTitle}`} />
              <div className={`${styles.skeleton} ${styles.chartBody}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Resource Section Skeleton */}
      <div className={styles.accordionSection}>
        <div className={`${styles.skeleton} ${styles.accordionHeader}`} />
        <div className={styles.accordionGrid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.chartCard}>
              <div className={`${styles.skeleton} ${styles.chartTitle}`} />
              <div className={`${styles.skeleton} ${styles.chartBody}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
