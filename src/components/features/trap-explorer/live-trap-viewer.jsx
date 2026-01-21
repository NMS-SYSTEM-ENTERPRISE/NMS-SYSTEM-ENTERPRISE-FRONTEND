import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import styles from './live-trap-viewer.module.css';

export const LiveTrapViewer = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [filterText, setFilterText] = useState('');
  const logsEndRef = useRef(null);

  // Simulate incoming logs
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        severity: Math.random() > 0.8 ? 'Critical' : Math.random() > 0.6 ? 'Warning' : 'Info',
        source: `192.168.1.${Math.floor(Math.random() * 255)}`,
        message: `Trap received from device. OID: 1.3.6.1.4.1.${Math.floor(Math.random() * 1000)}`,
      };
      setLogs((prev) => [...prev.slice(-99), newLog]); // Keep last 100 logs
    }, 2000);

    return () => clearInterval(interval);
  }, [isOpen, isPaused]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (logsEndRef.current && !isPaused) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isPaused]);

  if (!isOpen) return null;

  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(filterText.toLowerCase()) ||
    log.source.includes(filterText)
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.title}>
            <Icon icon="mdi:pulse" width={24} height={24} className={styles.icon} />
            <h2>Live Trap Viewer</h2>
          </div>
          <div className={styles.actions}>
            <div className={styles.statusIndicator}>
              <span className={`${styles.dot} ${isPaused ? styles.paused : styles.active}`}></span>
              {isPaused ? 'Paused' : 'Live'}
            </div>
            <button onClick={onClose} className={styles.closeBtn}>
              <Icon icon="mdi:close" width={24} height={24} />
            </button>
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Icon icon="mdi:magnify" width={18} height={18} />
            <input 
              type="text" 
              placeholder="Filter logs..." 
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <div className={styles.controls}>
            <button 
              className={styles.controlBtn} 
              onClick={() => setIsPaused(!isPaused)}
            >
              <Icon icon={isPaused ? "mdi:play" : "mdi:pause"} width={18} height={18} />
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button 
              className={styles.controlBtn} 
              onClick={() => setLogs([])}
            >
              <Icon icon="mdi:delete-sweep" width={18} height={18} />
              Clear
            </button>
          </div>
        </div>

        <div className={styles.logContainer}>
          <table className={styles.logTable}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Severity</th>
                <th>Source</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className={styles.logRow}>
                  <td className={styles.timeCell}>{log.timestamp}</td>
                  <td>
                    <span className={`${styles.severityBadge} ${styles[log.severity.toLowerCase()]}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className={styles.sourceCell}>{log.source}</td>
                  <td className={styles.messageCell}>{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div ref={logsEndRef} />
          {filteredLogs.length === 0 && (
            <div className={styles.emptyState}>
              Waiting for incoming traps...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
