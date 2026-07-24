'use client';

import { Badge } from '@/components/ui/badge';
import { useSla } from '@/hooks/sla';
import { SLA_STATUS_BADGE_VARIANT } from '@/utils/constants/sla';
import styles from './styles.module.css';

export const SlaTimelineView = () => {
  const { timelineData } = useSla();

  return (
    <div className={styles.timelineView}>
      <h3 className={styles.sectionTitle}>Activity Log</h3>

      {!timelineData?.length ? (
        <div className={styles.timelineItem}>No SLA timeline events available.</div>
      ) : (
        timelineData.map((day) => {
          const events = day.events || day.items || [];
          return (
            <div key={day.date} className={styles.timelineDay}>
              <div className={styles.timelineDayHeader}>
                <span>{day.date}</span>
              </div>
              <div className={styles.timelineItems}>
                {events.map((item) => (
                  <div key={`${day.date}-${item.time}-${item.sla}`} className={styles.timelineItem}>
                    <div
                      className={`${styles.timelineDot} ${styles[`timelineDot_${item.status}`] || ''}`}
                      aria-hidden
                    />
                    <div className={styles.timelineTime}>{item.time}</div>
                    <div className={styles.timelineSla}>{item.sla}</div>
                    <div className={styles.timelineEvent}>
                      <Badge variant={SLA_STATUS_BADGE_VARIANT[item.status] || 'neutral'}>
                        {item.status}
                      </Badge>
                      <span className={styles.timelineEventText}>{item.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
