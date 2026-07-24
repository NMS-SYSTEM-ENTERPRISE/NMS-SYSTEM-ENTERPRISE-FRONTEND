'use client';

import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useSla } from '@/hooks/sla';
import styles from './styles.module.css';
import { SlaGridSkeleton } from '@/components/ui/skeleton-loaders/sla-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

export const SlaGridView = () => {
  const router = useRouter();
  const { paginatedSLAs, isLoading, errorMessage } = useSla();

  const handleCardClick = (sla) => {
    // Navigate to device details or SLA details based on device_id
    router.push(`/sla/${sla.device_id || sla.id}`);
  };

  const getSlaStatus = (percentageStr) => {
    if (!percentageStr) return { label: 'UNKNOWN', variant: 'neutral', colorClass: '' };
    const val = parseFloat(percentageStr.replace('%', ''));
    if (isNaN(val)) return { label: 'UNKNOWN', variant: 'neutral', colorClass: '' };

    if (val >= 99) return { label: 'OK', variant: 'success', colorClass: styles.metricValueAchieved };
    if (val >= 95) return { label: 'WARNING', variant: 'warning', colorClass: styles.metricValueWarning || '' };
    return { label: 'BREACHED', variant: 'destructive', colorClass: styles.metricValueViolation };
  };

  if (isLoading) {
    return <SlaGridSkeleton />;
  }

  if (errorMessage || paginatedSLAs.length === 0) {
    return (
      <div className={styles.gridWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%', minHeight: '400px', padding: '0' }}>
        <NoDataFound
          title="No SLAs Found"
          description={errorMessage || "No SLA reports match your current filters."}
          icon="mdi:target-variant"
        />
      </div>
    );
  }

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.gridContainer}>
        {paginatedSLAs.map((sla, idx) => {
          const status = getSlaStatus(sla.sla_percentage);
          return (
            <div
              key={sla.device_id || idx}
              className={styles.gridCard}
              onClick={() => handleCardClick(sla)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(sla)}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardName} title={sla.ip_address}>
                  {sla.hostname || sla.ip_address || 'Unknown Device'}
                </span>
                <Badge variant={status.variant}>
                  {status.label}
                </Badge>
              </div>
              <div className={styles.cardMeta}>
                <div className={styles.cardMetaItem}>
                  <span className={styles.cardMetaLabel}>Group</span>
                  <span className={styles.cardMetaValue}>{sla.group || 'N/A'}</span>
                </div>
                <div className={styles.cardMetaItem}>
                  <span className={styles.cardMetaLabel}>Type</span>
                  <span className={styles.cardMetaValue}>{sla.device_type || 'N/A'}</span>
                </div>
              </div>
              <div className={styles.cardMetrics}>
                <div className={styles.metric}>
                  <div className={styles.metricLabel}>Avail</div>
                  <div className={`${styles.metricValueGrid}`}>
                    {sla.availability_achieved || 'N/A'}
                  </div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricLabel}>Perf</div>
                  <div className={`${styles.metricValueGrid}`}>
                    {sla.performance_achieved || 'N/A'}
                  </div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricLabel}>SLA %</div>
                  <div className={`${styles.metricValueGrid} ${status.colorClass}`}>
                    {sla.sla_percentage || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
