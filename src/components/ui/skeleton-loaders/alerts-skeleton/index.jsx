import React from 'react';
import styles from './styles.module.css';

export const AlertsListSkeleton = () => {
  return (
    <div className={styles.listSkeleton}>
      <div className={styles.tableHeaderSkeleton} />
      <div className={styles.listBodySkeleton}>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className={styles.listRowSkeleton}>
            <div className={`${styles.skeletonInner} ${styles.colSmall}`} />
            <div className={`${styles.skeletonInner} ${styles.colIdentity}`} style={{ width: `${30 + (i % 3) * 5}%` }} />
            <div className={`${styles.skeletonInner} ${styles.colType}`} />
            <div className={`${styles.skeletonInner} ${styles.colMonitor}`} />
            <div className={`${styles.skeletonInner} ${styles.colInstance}`} />
            <div className={`${styles.skeletonInner} ${styles.colValue}`} />
            <div className={`${styles.skeletonInner} ${styles.colDuration}`} />
            <div className={`${styles.skeletonInner} ${styles.colAction}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const AlertsOverviewSkeleton = () => {
  return (
    <div className={styles.dashboardSkeleton}>
      <div className={styles.accordionContainer}>
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
                <div className={styles.grid6}>
                  {[1, 2, 3, 4, 5, 6].map((j) => (
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
                <div className={styles.gridCategories}>
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className={`${styles.skeletonInner} ${styles.categoryBlockSkeleton}`} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const AlertDetailSkeleton = () => {
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
                 <div className={`${styles.skeletonInner} ${styles.iconSkeleton}`} />
                 <div className={`${styles.skeletonInner} ${styles.titleSkeleton}`} style={{ width: `${100 + (i * 20)}px` }} />
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
                    <div className={`${styles.skeletonInner} ${styles.statBlockSkeleton}`} style={{ height: 200 }} />
                    <div className={`${styles.skeletonInner} ${styles.statBlockSkeleton}`} style={{ height: 200 }} />
                 </div>
              </div>
            )}
            {i === 3 && (
              <div className={styles.accordionBodySkeleton}>
                 <div className={styles.grid2}>
                    <div className={`${styles.skeletonInner} ${styles.chartSkeleton}`} />
                    <div className={`${styles.skeletonInner} ${styles.chartSkeleton}`} />
                 </div>
              </div>
            )}
            {i === 4 && (
              <div className={styles.accordionBodySkeleton}>
                 <div className={styles.timelineSkeleton}>
                    {[1, 2, 3].map(j => (
                      <div key={j} className={styles.timelineItemSkeleton}>
                         <div className={`${styles.skeletonInner} ${styles.timelineIconSkeleton}`} />
                         <div className={`${styles.skeletonInner} ${styles.timelineContentSkeleton}`} />
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
