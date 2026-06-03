import React from 'react';
import styles from './styles.module.css';

export const MetricSidebarSkeleton = () => {
  return (
    <div className={styles.sidebarSkeleton}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className={styles.sidebarGroup}>
          <div className={styles.groupHeader}>
            <div className={`${styles.skeletonInner} ${styles.iconPlaceholder}`} />
            <div className={`${styles.skeletonInner} ${styles.textPlaceholder}`} style={{ width: `${50 + (i % 3) * 15}%` }} />
          </div>
          <div className={styles.groupItems}>
            <div className={`${styles.skeletonInner} ${styles.itemPlaceholder}`} style={{ width: '80%' }} />
            <div className={`${styles.skeletonInner} ${styles.itemPlaceholder}`} style={{ width: '60%' }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const MetricChartSkeleton = () => {
  return (
    <div className={styles.chartSkeleton}>
      <div className={`${styles.skeletonInner} ${styles.chartArea}`} />
    </div>
  );
};
