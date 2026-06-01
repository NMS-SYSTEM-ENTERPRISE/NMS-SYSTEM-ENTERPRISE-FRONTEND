'use client';

import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/log-management-live-trail/shared/styles.module.css';
import { useLogManagementLiveTrail } from '@/hooks/log-management-live-trail';

export const LiveTrailLogView = () => {
  const {
    selectedSource,
    logLines,
    isStreaming,
    logContainerRef,
    highlightText,
  } = useLogManagementLiveTrail();

  return (
    <div className={sharedStyles.logDisplay}>
      {!selectedSource ? (
        <div className={sharedStyles.placeholder}>
          <Icon icon="mdi:play-circle-outline" width={64} height={64} />
          <p>Select a source and click play to start live trail</p>
        </div>
      ) : (
        <div ref={logContainerRef} className={sharedStyles.logContainer}>
          {logLines.length === 0 && isStreaming && (
            <div className={sharedStyles.loadingMessage}>
              <Icon icon="mdi:loading" width={24} height={24} className={sharedStyles.spinner} />
              <span>Waiting for logs...</span>
            </div>
          )}
          {logLines.map((line, index) => (
            <div key={index} className={sharedStyles.logLine}>
              <span
                className={sharedStyles.logText}
                dangerouslySetInnerHTML={{ __html: highlightText(line) }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
