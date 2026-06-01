'use client';

import sharedStyles from '@/components/features/log-management/live-trail/shared/styles.module.css';
import { useLogManagementLiveTrail } from '@/hooks/log-management-live-trail';

export const LiveTrailFooter = () => {
  const { isStreaming, logLines, isPaused, selectedSource } = useLogManagementLiveTrail();

  if (!isStreaming) return null;

  return (
    <footer className={sharedStyles.footer}>
      <div className={sharedStyles.footerStat}>
        <span className={sharedStyles.footerLabel}>Lines:</span>
        <span className={sharedStyles.footerValue}>{logLines.length}</span>
      </div>
      <div className={sharedStyles.footerStat}>
        <span className={sharedStyles.footerLabel}>Status:</span>
        <span
          className={`${sharedStyles.footerValue} ${
            isPaused ? sharedStyles.statusPaused : sharedStyles.statusStreaming
          }`}
        >
          {isPaused ? 'Paused' : 'Streaming'}
        </span>
      </div>
      <div className={sharedStyles.footerStat}>
        <span className={sharedStyles.footerLabel}>Source:</span>
        <span className={sharedStyles.footerValue}>{selectedSource?.label}</span>
      </div>
    </footer>
  );
};
