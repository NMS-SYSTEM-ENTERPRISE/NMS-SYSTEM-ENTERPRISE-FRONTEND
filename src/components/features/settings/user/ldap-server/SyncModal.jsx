import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import styles from '@/components/ui/delete-modal/styles.module.css';

export const SyncModal = ({ isOpen, onClose, server }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsSyncing(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsSyncing(false);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '400px' }}
      >
        <div 
          className={styles.iconContainer} 
          style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
        >
          <Icon 
            icon={isSyncing ? "mdi:loading" : "mdi:check-circle"} 
            className={styles.warningIcon} 
            style={{ color: 'var(--color-chart-cyan)', animation: isSyncing ? 'spin 1s linear infinite' : 'none' }}
          />
        </div>
        
        <h2 className={styles.title}>
          {isSyncing ? 'Syncing Directory' : 'Sync Complete'}
        </h2>
        
        <div className={styles.description}>
          <p>
            {isSyncing 
              ? `Synchronizing users and groups from ${server?.ipHost}...` 
              : `Successfully synchronized directory with ${server?.ipHost}.`}
          </p>
          
          <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--color-bg-primary)', borderRadius: '3px', marginTop: '16px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--color-chart-cyan)', transition: 'width 0.3s ease' }} />
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="cyan" onClick={onClose} className={styles.btn} disabled={isSyncing}>
            {isSyncing ? 'Cancel' : 'Done'}
          </Button>
        </div>
      </div>
    </div>
  );
};
