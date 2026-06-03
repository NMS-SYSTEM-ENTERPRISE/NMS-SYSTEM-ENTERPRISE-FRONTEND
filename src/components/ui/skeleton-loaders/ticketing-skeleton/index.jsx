import React from 'react';
import styles from './styles.module.css';

export const TicketingSkeleton = () => {
  return (
    <div className={styles.ticketingSkeleton}>
      {[1, 2, 3].map((i) => (
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

          {i === 3 && (
            <div className={styles.accordionBodySkeleton}>
               <div className={styles.tableSkeleton}>
                  <div className={styles.tableHeaderSkeleton} />
                  {[1, 2, 3, 4, 5].map((j) => (
                     <div key={j} className={styles.tableRowSkeleton}>
                        <div className={`${styles.skeletonInner} ${styles.tableCell}`} style={{ width: '10%' }} />
                        <div className={`${styles.skeletonInner} ${styles.tableCell}`} style={{ width: '25%' }} />
                        <div className={`${styles.skeletonInner} ${styles.tableCell}`} style={{ width: '15%' }} />
                        <div className={`${styles.skeletonInner} ${styles.tableCell}`} style={{ width: '15%' }} />
                        <div className={`${styles.skeletonInner} ${styles.tableCell}`} style={{ width: '15%' }} />
                        <div className={`${styles.skeletonInner} ${styles.tableCell}`} style={{ width: '10%' }} />
                     </div>
                  ))}
               </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
