import styles from './styles.module.css';

export const ApmSkeleton = () => {
  return (
    <div className={styles.apmSkeletonWrapper}>
      {/* Header Skeleton */}
      <div className={styles.headerSkeleton}>
        <div className={styles.headerLeft}>
          <div
            className={`${styles.skeletonInner} ${styles.iconPlaceholder}`}
          />
          <div
            className={`${styles.skeletonInner} ${styles.titlePlaceholder}`}
          />
        </div>
        <div className={styles.headerRight}>
          <div className={`${styles.skeletonInner} ${styles.searchBar}`} />
          <div className={styles.headerActions}>
            <div className={`${styles.skeletonInner} ${styles.actionButton}`} />
            <div className={`${styles.skeletonInner} ${styles.actionButton}`} />
            <div className={`${styles.skeletonInner} ${styles.actionButton}`} />
          </div>
        </div>
      </div>

      {/* Service Overview Section */}
      <div className={styles.sectionSkeleton}>
        <div className={styles.sectionHeader}>
          <div className={`${styles.skeletonInner} ${styles.sectionTitle}`} />
          <div className={`${styles.skeletonInner} ${styles.badge}`} />
        </div>
        <div className={styles.serviceCardsContainer}>
          {[1, 2].map((i) => (
            <div key={i} className={styles.serviceCard}>
              <div className={styles.cardHeader}>
                <div
                  className={`${styles.skeletonInner} ${styles.serviceIcon}`}
                />
                <div className={styles.cardHeaderText}>
                  <div
                    className={`${styles.skeletonInner} ${styles.serviceName}`}
                  />
                  <div
                    className={`${styles.skeletonInner} ${styles.serviceType}`}
                  />
                </div>
              </div>
              <div className={styles.cardDivider} />
              <div className={styles.cardMetrics}>
                {[1, 2, 3].map((j) => (
                  <div key={j} className={styles.metricItem}>
                    <div
                      className={`${styles.skeletonInner} ${styles.metricLabel}`}
                    />
                    <div
                      className={`${styles.skeletonInner} ${styles.metricValue}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics Section */}
      <div className={styles.sectionSkeleton}>
        <div className={styles.sectionHeader}>
          <div className={`${styles.skeletonInner} ${styles.sectionTitle}`} />
          <div className={`${styles.skeletonInner} ${styles.badge}`} />
        </div>
        <div className={styles.metricsGrid}>
          {/* Top Latency */}
          <div className={styles.metricBox}>
            <div className={`${styles.skeletonInner} ${styles.boxTitle}`} />
            <div className={styles.metricsList}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={styles.metricRow}>
                  <div
                    className={`${styles.skeletonInner} ${styles.metricName}`}
                  />
                  <div
                    className={`${styles.skeletonInner} ${styles.sparkline}`}
                  />
                  <div
                    className={`${styles.skeletonInner} ${styles.metricNumber}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Top Throughput */}
          <div className={styles.metricBox}>
            <div className={`${styles.skeletonInner} ${styles.boxTitle}`} />
            <div className={styles.metricsList}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={styles.metricRow}>
                  <div
                    className={`${styles.skeletonInner} ${styles.metricName}`}
                  />
                  <div
                    className={`${styles.skeletonInner} ${styles.sparkline}`}
                  />
                  <div
                    className={`${styles.skeletonInner} ${styles.metricNumber}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Error Tracking Section */}
      <div className={styles.sectionSkeleton}>
        <div className={styles.sectionHeader}>
          <div className={`${styles.skeletonInner} ${styles.sectionTitle}`} />
          <div className={`${styles.skeletonInner} ${styles.errorBadge}`} />
        </div>
        <div className={styles.errorsList}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.errorRow}>
              <div className={`${styles.skeletonInner} ${styles.errorIcon}`} />
              <div className={styles.errorContent}>
                <div
                  className={`${styles.skeletonInner} ${styles.errorTitle}`}
                />
                <div
                  className={`${styles.skeletonInner} ${styles.errorDetail}`}
                />
              </div>
              <div className={`${styles.skeletonInner} ${styles.errorCount}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
