import React from 'react';
import styles from './styles.module.css';

export const SloTableSkeleton = () => {
  return (
    <div className={styles.tableSkeleton}>
      <div className={styles.tableHeaderSkeleton} />
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className={styles.tableRowSkeleton}>
          <div className={`${styles.skeletonInner} ${styles.cellLarge}`} style={{ width: `${30 + (i % 3) * 10}%` }} />
          <div className={`${styles.skeletonInner} ${styles.cellSmall}`} />
          <div className={`${styles.skeletonInner} ${styles.cellMedium}`} />
          <div className={`${styles.skeletonInner} ${styles.cellMedium}`} />
          <div className={`${styles.skeletonInner} ${styles.cellSmall}`} />
        </div>
      ))}
    </div>
  );
};

export const SloGridSkeleton = () => {
  return (
    <div className={styles.gridWrapper}>
      <div className={styles.gridContainer}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={styles.gridCardSkeleton}>
            <div className={styles.cardHeader}>
              <div className={`${styles.skeletonInner} ${styles.titleSkeleton}`} style={{ width: `${40 + (i % 3) * 10}%` }} />
              <div className={`${styles.skeletonInner} ${styles.badgeSkeleton}`} />
            </div>
            <div className={styles.cardMeta}>
              <div className={`${styles.skeletonInner} ${styles.metaSkeleton}`} />
              <div className={`${styles.skeletonInner} ${styles.metaSkeleton}`} />
            </div>
            <div className={styles.cardMetrics}>
              <div className={`${styles.skeletonInner} ${styles.metricSkeleton}`} />
              <div className={`${styles.skeletonInner} ${styles.metricSkeleton}`} />
              <div className={`${styles.skeletonInner} ${styles.metricSkeleton}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SloDetailSkeleton = () => {
  return (
    <div className={styles.detailSkeleton}>
      <div className={styles.detailHeaderSkeleton}>
        <div className={`${styles.skeletonInner} ${styles.headerIconSkeleton}`} />
        <div className={styles.headerInfoSkeleton}>
          <div className={`${styles.skeletonInner} ${styles.headerTitleSkeleton}`} />
          <div className={`${styles.skeletonInner} ${styles.headerDescSkeleton}`} />
        </div>
        <div className={styles.headerActionsSkeleton}>
          <div className={`${styles.skeletonInner} ${styles.actionBtnSkeleton}`} />
          <div className={`${styles.skeletonInner} ${styles.actionBtnSkeleton}`} />
        </div>
      </div>

      <div className={styles.accordionContainer}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.accordionSkeleton}>
            <div className={styles.accordionHeaderSkeleton}>
              <div className={styles.accHeaderLeft}>
                <div className={`${styles.skeletonInner} ${styles.accIconSkeleton}`} />
                <div className={`${styles.skeletonInner} ${styles.accTitleSkeleton}`} style={{ width: `${100 + (i * 20)}px` }} />
                <div className={`${styles.skeletonInner} ${styles.accBadgeSkeleton}`} />
              </div>
              <div className={`${styles.skeletonInner} ${styles.accIconSkeleton}`} style={{ borderRadius: '50%' }} />
            </div>
            {i === 1 && (
              <div className={styles.accordionBodySkeleton}>
                <div className={styles.grid2}>
                  <div className={`${styles.skeletonInner} ${styles.chartSkeleton}`} />
                  <div className={`${styles.skeletonInner} ${styles.chartSkeleton}`} />
                </div>
              </div>
            )}
            {i === 2 && (
              <div className={styles.accordionBodySkeleton}>
                <div className={styles.grid3}>
                  <div className={`${styles.skeletonInner} ${styles.statBlockSkeleton}`} />
                  <div className={`${styles.skeletonInner} ${styles.statBlockSkeleton}`} />
                  <div className={`${styles.skeletonInner} ${styles.statBlockSkeleton}`} />
                </div>
                <div className={`${styles.skeletonInner} ${styles.chartSkeleton}`} style={{ marginTop: 16 }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
