import React from 'react';
import styles from './styles.module.css';

export const NetPathSidebarSkeleton = ({ isSidebarOpen = true }) => {
  return (
    <div className={styles.sidebarSkeleton} data-collapsed={!isSidebarOpen}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className={styles.navItemSkeleton} data-collapsed={!isSidebarOpen}>
          <div className={`${styles.skeletonInner} ${styles.avatarSkeleton}`} data-collapsed={!isSidebarOpen} />
          {isSidebarOpen && (
            <div className={styles.navContentSkeleton}>
              <div className={`${styles.skeletonInner} ${styles.titleSkeleton}`} style={{ width: `${60 + (i % 3) * 10}%` }} />
              <div className={`${styles.skeletonInner} ${styles.subtitleSkeleton}`} style={{ width: `${40 + (i % 2) * 20}%` }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const NetPathDetailSkeleton = () => {
  return (
    <div className={styles.detailSkeleton}>
      <div className={styles.headerSkeleton}>
         <div className={styles.headerLeftSkeleton}>
            <div className={`${styles.skeletonInner} ${styles.iconSkeleton}`} />
            <div className={styles.titleGroupSkeleton}>
               <div className={`${styles.skeletonInner} ${styles.mainTitleSkeleton}`} />
               <div className={`${styles.skeletonInner} ${styles.subTitleSkeleton}`} />
            </div>
         </div>
         <div className={styles.headerRightSkeleton}>
            <div className={`${styles.skeletonInner} ${styles.metricSkeleton}`} />
            <div className={`${styles.skeletonInner} ${styles.metricSkeleton}`} />
            <div className={`${styles.skeletonInner} ${styles.metricSkeleton}`} />
         </div>
      </div>
      
      <div className={styles.contentSkeleton}>
         <div className={`${styles.skeletonInner} ${styles.visualizationSkeleton}`} />
         <div className={`${styles.skeletonInner} ${styles.historySkeleton}`} />
      </div>
    </div>
  );
};
