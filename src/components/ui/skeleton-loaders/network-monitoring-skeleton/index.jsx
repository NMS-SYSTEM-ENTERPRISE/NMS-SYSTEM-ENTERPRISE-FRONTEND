import React from 'react';
import styles from './styles.module.css';

export const NetworkMonitoringSkeleton = () => {
  return (
    <div className={styles.monitoringSkeleton}>
      {/* Top Stat Cards */}
      <div className={styles.statsGrid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`${styles.skeleton} ${styles.statCard}`}>
            <div className={`${styles.skeletonInner} ${styles.iconPlaceholder}`} />
            <div className={styles.statContent}>
              <div className={`${styles.skeletonInner} ${styles.statTitle}`} />
              <div className={`${styles.skeletonInner} ${styles.statValue}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Middle Charts Row */}
      <div className={styles.chartsRow}>
        <div className={`${styles.skeleton} ${styles.chartPanel}`}>
          <div className={`${styles.skeletonInner} ${styles.panelHeader}`} />
          <div className={`${styles.skeletonInner} ${styles.chartArea}`} />
        </div>
        <div className={`${styles.skeleton} ${styles.chartPanel}`}>
          <div className={`${styles.skeletonInner} ${styles.panelHeader}`} />
          <div className={`${styles.skeletonInner} ${styles.chartArea}`} />
        </div>
      </div>

      {/* Bottom Table/Grid Row */}
      <div className={`${styles.skeleton} ${styles.tablePanel}`}>
        <div className={styles.tableHeader}>
          <div className={`${styles.skeletonInner} ${styles.panelHeader}`} />
          <div className={`${styles.skeletonInner} ${styles.tableAction}`} />
        </div>
        <div className={styles.tableRows}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`${styles.skeletonInner} ${styles.tableRow}`} />
          ))}
        </div>
      </div>
    </div>
  );
};
