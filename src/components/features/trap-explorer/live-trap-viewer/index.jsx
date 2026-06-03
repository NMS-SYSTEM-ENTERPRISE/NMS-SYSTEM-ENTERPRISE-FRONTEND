'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { LIVE_LOG_SEVERITY_MAP } from '@/utils/constants/trap-explorer';
import { useTrapExplorer } from '@/hooks/trap-explorer';
import { TRAPS_WEBSOCKET_URL } from '@/networking/network-monitoring/network-monitoring-apis';
import styles from './styles.module.css';

export const LiveTrapViewer = () => {
  const { showLiveViewer, setShowLiveViewer } = useTrapExplorer();
  const [logs, setLogs] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [filterText, setFilterText] = useState('');
  const logsEndRef = useRef(null);

  useEffect(() => {
    if (!showLiveViewer || !TRAPS_WEBSOCKET_URL) return undefined;

    const ws = new WebSocket(TRAPS_WEBSOCKET_URL);

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.event === 'trap_received' && !isPaused) {
          const newLog = {
            id: payload.id || Date.now(),
            timestamp: payload.timestamp.split(' ')[4] || new Date().toLocaleTimeString(),
            severity: payload.severity || 'Info',
            source: payload.source || 'Unknown',
            message: payload.message || `Trap received from device. OID: ${payload.trapOid}`,
          };
          setLogs((prev) => [...prev.slice(-99), newLog]);
        }
      } catch (err) {
        console.error('WebSocket parse error:', err);
      }
    };

    return () => ws.close();
  }, [showLiveViewer, isPaused]);

  useEffect(() => {
    if (logsEndRef.current && !isPaused) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isPaused]);

  if (!showLiveViewer) return null;

  const filteredLogs = logs.filter(
    (log) =>
      log.message.toLowerCase().includes(filterText.toLowerCase()) ||
      log.source.includes(filterText)
  );

  const getSeverityVariant = (severity) => {
    const token = LIVE_LOG_SEVERITY_MAP[severity] || 'info';
    const map = { critical: 'danger', warning: 'warning', info: 'success' };
    return map[token] || 'neutral';
  };

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
              <span className={`${styles.dot} ${isPaused ? styles.paused : styles.active}`} />
              {isPaused ? 'Paused' : 'Live'}
            </div>
            <Button variant="ghost" size="icon" className={styles.closeBtn} onClick={() => setShowLiveViewer(false)}>
              <Icon icon="mdi:close" width={24} height={24} />
            </Button>
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <div className={styles.searchBar}>
              <Icon icon="mdi:magnify" width={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Filter logs..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className={styles.searchInput}
              />
              {filterText && (
                <button className={styles.searchClearBtn} onClick={() => setFilterText('')} aria-label="Clear">
                  <Icon icon="mdi:close-circle" width={14} />
                </button>
              )}
            </div>
          </div>
          <div className={styles.controls}>
            <Button variant="ghost" className={styles.controlBtn} onClick={() => setIsPaused(!isPaused)}>
              <Icon icon={isPaused ? 'mdi:play' : 'mdi:pause'} width={18} height={18} />
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            <Button variant="ghost" className={styles.controlBtn} onClick={() => setLogs([])}>
              <Icon icon="mdi:delete-sweep" width={18} height={18} />
              Clear
            </Button>
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
                    <Badge variant={getSeverityVariant(log.severity)}>{log.severity}</Badge>
                  </td>
                  <td className={styles.sourceCell}>{log.source}</td>
                  <td className={styles.messageCell}>{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div ref={logsEndRef} />
          {filteredLogs.length === 0 && (
            <div className={styles.emptyState}>Waiting for incoming traps...</div>
          )}
        </div>
      </div>
    </div>
  );
};
