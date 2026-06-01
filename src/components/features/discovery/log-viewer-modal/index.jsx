import { useEffect, useState, useRef, useContext } from 'react';
import { DiscoveryProfileContext } from '@/contexts/discovery-settings/discovery-profile/profile-context';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import styles from './styles.module.css';

export const LogViewerModal = ({ profile, onClose }) => {
  const { getDiscoveryLogs } = useContext(DiscoveryProfileContext);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef(null);

  const fetchLogs = async () => {
    setLoading(true);
    const data = await getDiscoveryLogs(profile.id);
    if (data && data.logs) {
      setLogs(data.logs);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (profile) {
      fetchLogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  // Auto scroll to bottom
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;
    setAutoScroll(isAtBottom);
  };

  if (!profile) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleArea}>
            <h2 className={styles.modalTitle}>Discovery Logs: {profile.name}</h2>
            <div className={styles.statusBadge}>
              Live Engine Output
            </div>
          </div>
          <button className={styles.modalClose} onClick={onClose}>
            <Icon icon="mdi:close" width={24} height={24} />
          </button>
        </div>

        <div className={styles.modalToolbar}>
          <Button variant="secondary" onClick={fetchLogs} disabled={loading} className={styles.refreshBtn}>
            <Icon icon={loading ? "mdi:loading" : "mdi:refresh"} className={loading ? styles.spin : ''} width={16} />
            Refresh Logs
          </Button>
          <div className={styles.toolbarRight}>
            <label className={styles.autoScrollToggle}>
              <input
                type="checkbox"
                checked={autoScroll}
                onChange={(e) => setAutoScroll(e.target.checked)}
              />
              Auto-scroll
            </label>
          </div>
        </div>

        <div className={styles.terminalContainer} ref={scrollRef} onScroll={handleScroll}>
          {loading && logs.length === 0 ? (
            <div className={styles.loadingState}>Connecting to engine logs...</div>
          ) : logs.length > 0 ? (
            <pre className={styles.logText}>
              {logs.map((log, index) => (
                <div key={index} className={styles.logLine}>
                  {log}
                </div>
              ))}
            </pre>
          ) : (
            <div className={styles.emptyState}>No logs found.</div>
          )}
        </div>

        <div className={styles.modalFooter}>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
