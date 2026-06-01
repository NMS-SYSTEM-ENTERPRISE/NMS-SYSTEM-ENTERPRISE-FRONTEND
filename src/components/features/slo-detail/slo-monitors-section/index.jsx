'use client';

import { Badge } from '@/components/ui/badge';
import sharedStyles from '@/components/features/slo-detail/shared/styles.module.css';
import { MONITOR_STATUS_BADGE_VARIANT } from '@/utils/constants/slo-detail';
import { SLO_MONITOR_DATA } from '@/utils/dummy-data/slo-detail';
import { Icon } from '@iconify/react';

export const SloMonitorsSection = () => (
  <div className={sharedStyles.timelineStrip}>
    {SLO_MONITOR_DATA.map((mon) => (
      <div key={mon.name} className={sharedStyles.historyRow}>
        <div className={`${sharedStyles.iconWrapper} ${sharedStyles.monitorIconWrapper}`}>
          <Icon icon="ph:monitor-bold" width={18} />
        </div>
        <div className={sharedStyles.historyInfo}>
          <span className={sharedStyles.historyTitle}>{mon.name}</span>
          <span className={sharedStyles.historySub}>System Performance Monitor</span>
        </div>
        <div className={sharedStyles.monitorStatusContainer}>
          <div className={sharedStyles.monitorAvailability}>
            <div className={sharedStyles.monitorAvailabilityValue}>{mon.availability}</div>
            <div className={sharedStyles.monitorAvailabilityLabel}>AVAILABILITY</div>
          </div>
          <Badge variant={MONITOR_STATUS_BADGE_VARIANT[mon.status] || 'neutral'}>
            {mon.status}
          </Badge>
        </div>
      </div>
    ))}
  </div>
);
