'use client';

import { Badge } from '@/components/ui/badge';
import { SLO_STATUS_BADGE_VARIANT } from '@/utils/constants/slo';
import { SLO_TIMELINE_DATA } from '@/utils/dummy-data/slo';
import styles from './styles.module.css';

export const SloTimelineView = () => (
  <div className={styles.timelineView}>
    <h3 className={styles.sectionTitle}>Activity Log</h3>

    {SLO_TIMELINE_DATA.map((day) => (
      <div key={day.date} className={styles.timelineDay}>
        <div className={styles.timelineDayHeader}>
          <span>{day.date}</span>
        </div>
        <div className={styles.timelineItems}>
          {day.items.map((item) => (
            <div key={`${day.date}-${item.time}-${item.slo}`} className={styles.timelineItem}>
              <div
                className={`${styles.timelineDot} ${styles[`timelineDot_${item.status}`]}`}
                aria-hidden
              />
              <div className={styles.timelineTime}>{item.time}</div>
              <div className={styles.timelineSlo}>{item.slo}</div>
              <div className={styles.timelineEvent}>
                <Badge variant={SLO_STATUS_BADGE_VARIANT[item.status] || 'neutral'}>
                  {item.status}
                </Badge>
                <span className={styles.timelineEventText}>{item.event}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
