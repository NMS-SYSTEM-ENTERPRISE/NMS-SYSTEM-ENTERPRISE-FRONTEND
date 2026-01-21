import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

const MaintenanceConfirmationModal = ({ monitor, onClose, onConfirm }) => {
  const [remark, setRemark] = useState('');

  const handleConfirm = () => {
    onConfirm(remark);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>
          <Icon icon="mdi:cog" width={32} height={32} className={styles.icon} />

          <h3 className={styles.title}>
            Are you sure, you want to put monitor on maintenance?
          </h3>

          <p className={styles.monitorName}>
            {monitor?.name || monitor?.host || monitor?.ip}{' '}
            {monitor?.type || ''}
          </p>

          <div className={styles.noteSection}>
            <div className={styles.noteHeader}>
              <Icon icon="mdi:information" className={styles.noteIcon} width={16} height={16} />
              <span className={styles.noteText}>
                Note: This will prevent any network configuration activities for
                the monitor.
              </span>
            </div>
          </div>

          <textarea
            className={styles.remarkInput}
            placeholder="Add a remark for maintenance"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            rows={3}
          />

          <div className={styles.actions}>
            <button className={styles.noBtn} onClick={onClose}>
              No
            </button>
            <button className={styles.yesBtn} onClick={handleConfirm}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceConfirmationModal;
