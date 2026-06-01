'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import { TRAP_SEVERITY } from '@/utils/constants/trap-explorer';
import { TRAP_LIVE_STREAM_DATA } from '@/utils/dummy-data/trap-explorer';
import styles from './styles.module.css';

export const TrapLiveStream = () => {
  const [autoRefresh, setAutoRefresh] = useState(false);

  const stats = useMemo(() => {
    const acknowledged = TRAP_LIVE_STREAM_DATA.filter((t) => t.acknowledged).length;
    return {
      total: TRAP_LIVE_STREAM_DATA.length,
      acknowledged,
      unacknowledged: TRAP_LIVE_STREAM_DATA.length - acknowledged,
    };
  }, []);

  return (
    <div className={styles.liveViewer}>
      <div className={styles.liveControls}>
        <h3 className={styles.sectionTitle}>
          <Icon icon="mdi:access-point" width={20} />
          Live Trap Stream
        </h3>
        <div className={styles.controlButtons}>
          <Checkbox
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
            label="Auto Refresh"
          />
          <Button variant="ghost" size="icon" className={styles.refreshIconBtn} title="Refresh">
            <Icon icon="mdi:refresh" width={18} />
          </Button>
        </div>
      </div>

      <div className={styles.liveStats}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.total}</div>
          <div className={styles.statLabel}>Total Traps</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.statValue_success}`}>{stats.acknowledged}</div>
          <div className={styles.statLabel}>Acknowledged</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.statValue_danger}`}>{stats.unacknowledged}</div>
          <div className={styles.statLabel}>Unacknowledged</div>
        </div>
      </div>

      <div className={styles.trapStream}>
        {TRAP_LIVE_STREAM_DATA.map((trap) => {
          const config = TRAP_SEVERITY[trap.severity] || TRAP_SEVERITY.info;
          return (
            <div key={trap.id} className={styles.trapItem}>
              <div className={`${styles.trapSeverityBar} ${styles[`severityBar_${trap.severity}`]}`} />
              <div className={styles.trapContent}>
                <div className={styles.trapHeader}>
                  <div className={styles.trapTime}>
                    <Icon icon="mdi:clock-outline" width={14} />
                    {trap.time}
                  </div>
                  <div className={styles.trapSource}>
                    <Icon icon="mdi:server" width={14} />
                    {trap.source}
                  </div>
                </div>
                <div className={styles.trapName}>{trap.trapName}</div>
                <div className={styles.trapMessage}>{trap.message}</div>
                <div className={styles.trapFooter}>
                  <Badge variant={config.badgeVariant}>{trap.severity.toUpperCase()}</Badge>
                  {!trap.acknowledged ? (
                    <Button variant="ghost" size="sm" className={styles.acknowledgeBtn}>
                      <Icon icon="mdi:check-circle" width={14} />
                      Acknowledge
                    </Button>
                  ) : (
                    <span className={styles.acknowledgedBadge}>
                      <Icon icon="mdi:check" width={14} />
                      Acknowledged
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
