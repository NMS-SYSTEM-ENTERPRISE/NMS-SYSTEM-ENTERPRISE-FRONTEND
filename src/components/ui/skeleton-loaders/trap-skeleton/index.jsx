import React from 'react';
import styles from './styles.module.css';

export const TrapListSkeleton = () => {
  return (
    <div className={styles.listSkeleton}>
      <div className={styles.tableHeaderSkeleton} />
      <div className={styles.listBodySkeleton}>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className={styles.listRowSkeleton}>
            <div className={`${styles.skeletonInner} ${styles.checkboxSkeleton}`} />
            <div className={`${styles.skeletonInner} ${styles.colIdentity}`} style={{ width: `${25 + (i % 3) * 5}%` }} />
            <div className={`${styles.skeletonInner} ${styles.colSource}`} />
            <div className={`${styles.skeletonInner} ${styles.colStats}`} />
            <div className={`${styles.skeletonInner} ${styles.colTime}`} />
            <div className={`${styles.skeletonInner} ${styles.colStatus}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const TrapDashboardSkeleton = () => {
  return (
    <div className={styles.dashboardSkeleton}>
      <div className={styles.accordionContainer}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.accordionSkeleton}>
            <div className={styles.accordionHeaderSkeleton}>
              <div className={styles.accHeaderLeft}>
                <div className={`${styles.skeletonInner} ${styles.iconSkeleton}`} />
                <div className={`${styles.skeletonInner} ${styles.titleSkeleton}`} style={{ width: `${140 + (i * 20)}px` }} />
                <div className={`${styles.skeletonInner} ${styles.badgeSkeleton}`} />
              </div>
              <div className={`${styles.skeletonInner} ${styles.iconSkeleton}`} style={{ borderRadius: '50%', width: 24, height: 24 }} />
            </div>
            {i === 1 && (
              <div className={styles.accordionBodySkeleton}>
                <div className={styles.grid4}>
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className={`${styles.skeletonInner} ${styles.metricBlockSkeleton}`} />
                  ))}
                </div>
              </div>
            )}
            {i === 2 && (
              <div className={styles.accordionBodySkeleton}>
                <div className={styles.grid2}>
                  <div className={`${styles.skeletonInner} ${styles.chartSkeleton}`} />
                  <div className={`${styles.skeletonInner} ${styles.chartSkeleton}`} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
