import React from 'react';
import styles from './styles.module.css';

export const ReportsTableSkeleton = () => {
  return (
    <div className={styles.tableSkeletonWrapper}>
      <div className={styles.tableSkeleton}>
        <div className={styles.tableHeaderSkeleton} />
        <div className={styles.tableBodySkeleton}>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className={styles.tableRowSkeleton}>
              <div className={`${styles.skeletonInner} ${styles.colIcon}`} />
              <div className={`${styles.skeletonInner} ${styles.colName}`} style={{ width: `${20 + (i % 3) * 5}%` }} />
              <div className={`${styles.skeletonInner} ${styles.colDesc}`} style={{ width: `${30 + (i % 2) * 10}%` }} />
              <div className={`${styles.skeletonInner} ${styles.colType}`} />
              <div className={`${styles.skeletonInner} ${styles.colType}`} />
              <div className={`${styles.skeletonInner} ${styles.colDownload}`} />
              <div className={`${styles.skeletonInner} ${styles.colAction}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ReportDetailSkeleton = () => {
  return (
    <div className={styles.detailSkeleton}>
      <div className={styles.headerSkeleton}>
        <div className={`${styles.skeletonInner} ${styles.titleSkeleton}`} />
        <div className={styles.headerActionsSkeleton}>
           <div className={`${styles.skeletonInner} ${styles.actionBtnSkeleton}`} />
           <div className={`${styles.skeletonInner} ${styles.actionBtnSkeleton}`} />
        </div>
      </div>

      <div className={styles.metadataSkeleton}>
         {[1, 2, 3, 4].map(i => (
           <div key={i} className={styles.metaItemSkeleton}>
             <div className={`${styles.skeletonInner} ${styles.metaLabelSkeleton}`} />
             <div className={`${styles.skeletonInner} ${styles.metaValueSkeleton}`} />
           </div>
         ))}
      </div>

      <div className={`${styles.skeletonInner} ${styles.notesSkeleton}`} />

      <div className={styles.tableSkeleton} style={{ marginTop: '24px' }}>
         <div className={styles.tableHeaderSkeleton} />
         <div className={styles.tableBodySkeleton}>
           {[1, 2, 3, 4, 5].map((i) => (
             <div key={i} className={styles.tableRowSkeleton}>
               <div className={`${styles.skeletonInner} ${styles.colDesc}`} style={{ flex: 1 }} />
               <div className={`${styles.skeletonInner} ${styles.colDesc}`} style={{ flex: 1 }} />
               <div className={`${styles.skeletonInner} ${styles.colDesc}`} style={{ flex: 1 }} />
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};
