import { Icon } from '@iconify/react';
import styles from './styles.module.css';

const TrapHistorySidebar = ({ isOpen, onClose, trap }) => {
  if (!isOpen || !trap) return null;

  // Generate more realistic localized logs based on current trap
  const now = new Date();
  const logs = [
    { id: 1, time: new Date(now.getTime() - 7200000).toLocaleString(), status: 'Received', message: 'Trap PDU packet decoded successfully.', detail: `Source: ${trap.source}` },
    { id: 2, time: new Date(now.getTime() - 7100000).toLocaleString(), status: 'Analyzed', message: 'OID matched against local MIB database.', detail: `Match: ${trap.name}` },
    { id: 3, time: new Date(now.getTime() - 7000000).toLocaleString(), status: 'Enriched', message: 'Added mnemonic and facility labels.', detail: `Mnemonic: ${trap.mnemonic || 'N/A'}` },
    { id: 4, time: new Date(now.getTime() - 6500000).toLocaleString(), status: 'Broadcast', message: 'Notification event emitted to subscribers.', detail: 'Websocket, Dashboard' },
    { id: 5, time: new Date(now.getTime() - 600000).toLocaleString(), status: 'Updated', message: 'Sequence count incremented.', detail: `Current Count: ${trap.count}` },
  ];

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Icon icon="mdi:history" width={22} />
            <span>Trap Detail & History</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <Icon icon="mdi:close" width={22} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.trapSummary}>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Identified Name</span>
                <span className={styles.summaryValue}>{trap.name}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Object Identifier</span>
                <span className={styles.summaryValue}>{trap.trapOid}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Incident Source</span>
                <span className={styles.summaryValue}>{trap.source}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Module/Facility</span>
                <span className={styles.summaryValue}>{trap.facility || 'N/A'}</span>
              </div>
            </div>
            {trap.mnemonic && (
              <div className={styles.mnemonicBadge}>
                <Icon icon="mdi:label-outline" />
                {trap.mnemonic}
              </div>
            )}
          </div>

          <div className={styles.logList}>
            <h3 className={styles.sectionTitle}>
              <Icon icon="mdi:format-list-checks" /> 
              Detailed Log Sequence
            </h3>
            <div className={styles.logContainer}>
              {logs.map((log) => (
                <div key={log.id} className={styles.logItem}>
                  <div className={styles.logLine} />
                  <div className={styles.logDot} />
                  <div className={styles.logInfo}>
                    <div className={styles.logHeader}>
                      <span className={styles.logTime}>{log.time}</span>
                      <span className={styles.logStatus}>{log.status}</span>
                    </div>
                    <div className={styles.logMessage}>{log.message}</div>
                    <div className={styles.logDetail}>{log.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.payloadSection}>
            <h3 className={styles.sectionTitle}>
              <Icon icon="mdi:code-json" />
              Raw PDU Payload
            </h3>
            <div className={styles.rawContainer}>
              <pre className={styles.rawPayload}>
{JSON.stringify(trap, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrapHistorySidebar;
