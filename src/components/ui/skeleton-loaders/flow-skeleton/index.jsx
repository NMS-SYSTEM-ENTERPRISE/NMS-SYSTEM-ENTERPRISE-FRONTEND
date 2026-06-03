import React from 'react';
import styles from './styles.module.css';

export const FlowViewSkeleton = () => {
  return (
    <div className={styles.flowViewSkeleton}>
       {[1, 2, 3].map(i => (
         <div key={i} className={styles.accordionSkeleton}>
            <div className={styles.accordionHeaderSkeleton}>
               <div className={styles.headerLeft}>
                  <div className={`${styles.skeletonInner} ${styles.iconSkeleton}`} />
                  <div className={`${styles.skeletonInner} ${styles.titleSkeleton}`} style={{ width: `${140 + (i * 20)}px` }} />
                  <div className={`${styles.skeletonInner} ${styles.badgeSkeleton}`} />
               </div>
               <div className={`${styles.skeletonInner} ${styles.iconSkeleton}`} style={{ borderRadius: '50%', width: 24, height: 24 }} />
            </div>
            {i === 1 && (
               <div className={styles.accordionBodySkeleton}>
                  <div className={styles.grid3}>
                     <div className={`${styles.skeletonInner} ${styles.bodyBlockSkeleton}`} />
                     <div className={`${styles.skeletonInner} ${styles.bodyBlockSkeleton}`} />
                     <div className={`${styles.skeletonInner} ${styles.bodyBlockSkeleton}`} />
                  </div>
               </div>
            )}
            {i === 2 && (
               <div className={styles.accordionBodySkeleton}>
                  <div className={styles.grid2}>
                     <div className={`${styles.skeletonInner} ${styles.largeBlockSkeleton}`} />
                     <div className={`${styles.skeletonInner} ${styles.largeBlockSkeleton}`} />
                  </div>
               </div>
            )}
         </div>
       ))}
    </div>
  );
};
