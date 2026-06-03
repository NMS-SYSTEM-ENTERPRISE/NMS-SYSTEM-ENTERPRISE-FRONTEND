'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import { TRAP_SEVERITY } from '@/utils/constants/trap-explorer';
import { useTrapExplorer } from '@/hooks/trap-explorer';
import styles from './styles.module.css';

export const TrapLiveStream = () => {
  const { filteredTraps, fetchTraps, handleAcknowledge, isLoading } = useTrapExplorer();

  const liveTraps = useMemo(() => (filteredTraps || []).slice(0, 50), [filteredTraps]);

  const stats = useMemo(() => {
    const acknowledged = liveTraps.filter((t) => t.acknowledged).length;
    return {
      total: liveTraps.length,
      acknowledged,
      unacknowledged: liveTraps.length - acknowledged,
    };
  }, [liveTraps]);

  const formatTime = (ts) => {
    if (!ts) return '—';
    if (ts.includes('T')) {
      // ISO string
      return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    // Legacy "Tue Jun 03 2026 12:34:56 GMT..."
    const parts = ts.split(' ');
    return parts[4] || ts;
  };

  return (
    <div className={styles.liveViewer}>

      {/* ── Controls Bar ── */}
      <div className={styles.liveControls}>
        <h3 className={styles.sectionTitle}>
          <Icon icon="mdi:access-point" width={18} />
          Live Trap Stream
        </h3>
        <div className={styles.controlButtons}>
          <span className={styles.liveIndicator}>
            <span className={styles.liveDot} />
            LIVE
          </span>
          <button
            className={styles.refreshBtn}
            onClick={() => fetchTraps()}
            disabled={isLoading}
            title="Refresh"
            aria-label="Refresh traps"
          >
            <Icon
              icon={isLoading ? 'mdi:loading' : 'mdi:refresh'}
              className={isLoading ? styles.spinning : ''}
              width={16}
            />
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className={styles.liveStats}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.total}</div>
          <div className={styles.statLabel}>Total</div>
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

      {/* ── Trap List ── */}
      <div className={styles.trapStream}>
        {liveTraps.length === 0 ? (
          <div className={styles.emptyState}>
            <Icon icon="mdi:inbox-outline" width={36} />
            <span>No traps to display.<br />Waiting for incoming events…</span>
          </div>
        ) : (
          liveTraps.map((trap) => {
            const sev = (trap.severity || 'info').toLowerCase();
            const config = TRAP_SEVERITY[sev] || TRAP_SEVERITY.info;
            return (
              <div key={trap.id} className={styles.trapItem}>
                <div className={`${styles.trapSeverityBar} ${styles[`severityBar_${sev}`]}`} />
                <div className={styles.trapContent}>
                  <div className={styles.trapHeader}>
                    <div className={styles.trapTime}>
                      <Icon icon="mdi:clock-outline" width={12} />
                      {formatTime(trap.timestamp)}
                    </div>
                    <div className={styles.trapSource}>
                      <Icon icon="mdi:server" width={12} />
                      {trap.source}
                    </div>
                  </div>
                  <div className={styles.trapName}>{trap.name || trap.trapOid || 'Unknown Trap'}</div>
                  <div className={styles.trapMessage}>{trap.message || 'No description provided.'}</div>
                  <div className={styles.trapFooter}>
                    <Badge variant={config.badgeVariant}>{sev.toUpperCase()}</Badge>
                    {!trap.acknowledged ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className={styles.acknowledgeBtn}
                        onClick={() => handleAcknowledge(trap.id, true)}
                      >
                        <Icon icon="mdi:check-circle-outline" width={13} />
                        Acknowledge
                      </Button>
                    ) : (
                      <span className={styles.acknowledgedBadge}>
                        <Icon icon="mdi:check-circle" width={13} />
                        Acknowledged
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
