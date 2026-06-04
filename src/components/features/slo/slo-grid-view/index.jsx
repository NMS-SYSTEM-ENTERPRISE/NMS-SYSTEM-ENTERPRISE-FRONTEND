'use client';

import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useSlo } from '@/hooks/slo';
import { SLO_STATUS_BADGE_VARIANT } from '@/utils/constants/slo';
import styles from './styles.module.css';
import { SloGridSkeleton } from '@/components/ui/skeleton-loaders/slo-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

export const SloGridView = () => {
  const router = useRouter();
  const { paginatedSLOs, isLoading, errorMessage } = useSlo();

  const handleCardClick = (slo) => {
    router.push(`/slo/${slo.id}`);
  };

  if (isLoading) {
    return <SloGridSkeleton />;
  }

  if (errorMessage || paginatedSLOs.length === 0) {
    return (
      <div className={styles.gridWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%', minHeight: '400px' }}>
        <NoDataFound 
          title="No SLOs Found" 
          description={errorMessage || "No Service Level Objectives match your current filters."}
          icon="mdi:target-variant"
        />
      </div>
    );
  }

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.gridContainer}>
        {paginatedSLOs.map((slo) => (
          <div
            key={slo.id}
            className={styles.gridCard}
            onClick={() => handleCardClick(slo)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick(slo)}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardName}>{slo.name}</span>
              <Badge variant={SLO_STATUS_BADGE_VARIANT[slo.status] || 'neutral'}>
                {slo.status}
              </Badge>
            </div>
            <div className={styles.cardMeta}>
              <div className={styles.cardMetaItem}>
                <span className={styles.cardMetaLabel}>Category</span>
                <span className={styles.cardMetaValue}>{slo.sloType}</span>
              </div>
              <div className={styles.cardMetaItem}>
                <span className={styles.cardMetaLabel}>Period</span>
                <span className={styles.frequencyBadge}>{slo.frequency}</span>
              </div>
            </div>
            <div className={styles.cardMetrics}>
              <div className={styles.metric}>
                <div className={styles.metricLabel}>Target</div>
                <div className={`${styles.metricValueGrid} ${styles.metricValueTarget}`}>
                  {slo.target}
                </div>
              </div>
              <div className={styles.metric}>
                <div className={styles.metricLabel}>Achieved</div>
                <div className={`${styles.metricValueGrid} ${styles.metricValueAchieved}`}>
                  {slo.achieved}
                </div>
              </div>
              <div className={styles.metric}>
                <div className={styles.metricLabel}>Violation</div>
                <div className={`${styles.metricValueGrid} ${styles.metricValueViolation}`}>
                  {slo.violation}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
