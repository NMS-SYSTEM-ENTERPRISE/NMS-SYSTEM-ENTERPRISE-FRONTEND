'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { TRAP_SEVERITY } from '@/utils/constants/trap-explorer';
import styles from './styles.module.css';

export const TrapListRow = ({
  trap,
  isExpanded,
  onToggle,
  isSelected,
  onSelect,
  onViewHistory,
}) => {
  const config = TRAP_SEVERITY[trap.severity] || TRAP_SEVERITY.info;
  const token = config.colorToken;

  return (
    <div className={styles.accordionRow} data-expanded={isExpanded}>
      <div className={styles.rowMain} onClick={onToggle}>
        <div className={styles.rowSelect} onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={isSelected} onChange={() => onSelect(trap.id)} />
        </div>

        <div className={styles.rowIdentity}>
          <div
            className={clsx(
              styles.rowIcon,
              isExpanded ? styles[`rowIconExpanded_${token}`] : styles.rowIconDefault,
              !isExpanded && styles[`severityIcon_${token}`]
            )}
          >
            <Icon icon={config.icon} width={18} height={18} />
          </div>
          <div className={styles.rowInfo}>
            <span className={styles.rowName}>{trap.name}</span>
            <span className={styles.rowSub}>
              <Icon icon="mdi:qrcode-scan" width={10} /> {trap.trapOid}
            </span>
          </div>
        </div>

        <div className={styles.columnSource}>
          <div className={styles.sourceText}>
            <Icon icon="mdi:ip-network" width={14} />
            {trap.source}
          </div>
        </div>

        <div className={styles.columnStats}>
          <span className={styles.countLabel}>Occurrences</span>
          <span className={styles.countValue}>{trap.count}</span>
        </div>

        <div className={styles.columnTime}>
          <span className={styles.timeLabel}>Last Seen</span>
          <span className={styles.timeValue}>
            {trap.timestamp.split(' ').slice(0, 3).join(' ')}
          </span>
          <span className={styles.rowSub}>{trap.timestamp.split(' ').slice(3).join(' ')}</span>
        </div>

        <div className={styles.rowStatus}>
          <Badge variant={trap.acknowledged ? 'success' : 'info'}>
            {trap.acknowledged ? 'Acknowledged' : 'New Trap'}
          </Badge>
        </div>

        <div className={styles.rowAction}>
          <Button
            variant="ghost"
            size="icon"
            className={styles.historyBtn}
            onClick={(e) => {
              e.stopPropagation();
              onViewHistory?.(trap);
            }}
            title="View Full History & Logs"
          >
            <Icon icon="mdi:history" width={18} height={18} />
          </Button>
          <div className={styles.chevron}>
            <Icon icon="mdi:chevron-down" width={18} height={18} />
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.rowDetails}>
          <div className={styles.detailsContentWrapper}>
            <div className={styles.detailSection}>
              <h4 className={styles.sectionTitle}>
                <Icon icon="mdi:text-box-search-outline" />
                Trap Content Payload
              </h4>
              <div className={styles.messageBoxWrapper}>
                <div className={styles.messageHeader}>
                  <span className={styles.messageFormat}>Raw String</span>
                  <Button variant="ghost" size="icon" className={styles.copyBtn} title="Copy Payload">
                    <Icon icon="mdi:content-copy" width={14} />
                  </Button>
                </div>
                <div className={styles.messageBox}>{trap.message}</div>
              </div>
            </div>

            <div className={styles.detailSection}>
              <h4 className={styles.sectionTitle}>
                <Icon icon="mdi:cog-box" />
                Technical Metadata
              </h4>
              <div className={styles.metadataGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Object Identifier (OID)</span>
                  <span className={styles.metaValue}>{trap.trapOid}</span>
                </div>
                <div className={styles.metaRow}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Source Node</span>
                    <span className={styles.metaValue}>{trap.source}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Occurrences</span>
                    <span className={styles.metaValue}>{trap.count}</span>
                  </div>
                </div>
                <div className={styles.metaRow}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Facility</span>
                    <span className={styles.metaValue}>{trap.facility || 'Unknown'}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Mnemonic</span>
                    <span className={styles.metaValue}>{trap.mnemonic || 'N/A'}</span>
                  </div>
                </div>
                {trap.interface && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Active Interface</span>
                    <span className={clsx(styles.metaValue, styles.metaValueAccent)}>
                      {trap.interface}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.detailSection}>
              <h4 className={styles.sectionTitle}>
                <Icon icon="mdi:calendar-clock" />
                Incident Sequence
              </h4>
              <div className={styles.timeline}>
                <div className={styles.timelineItem}>
                  <div className={clsx(styles.timelinePoint, styles[`timelinePoint_${token}`])} />
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <span className={styles.timelineLabel}>Root Event</span>
                      <span className={styles.timelineTime}>2h 15m ago</span>
                    </div>
                    <div className={styles.timelineSub}>Initial PDU received and decoded</div>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelinePoint} />
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <span className={styles.timelineLabel}>State Update</span>
                      <span className={styles.timelineTime}>45m ago</span>
                    </div>
                    <div className={styles.timelineSub}>Count updated to {trap.count} events</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
